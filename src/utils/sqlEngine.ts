/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TICKETS_DATA, Ticket } from '../data/ticketsData';

export interface SqlQueryResult {
  success: boolean;
  columns: string[];
  rows: Record<string, any>[];
  rowCount: number;
  executionTimeMs: number;
  error?: string;
  queryExecuted: string;
}

export interface PresetQuery {
  id: string;
  dayRef: number;
  label: string;
  description: string;
  sql: string;
}

export const PRESET_QUERIES: PresetQuery[] = [
  {
    id: 'dia-9-select',
    dayRef: 9,
    label: 'Dia 9: SELECT básico',
    description: 'Projeta apenas as colunas essenciais dos primeiros 10 chamados.',
    sql: `SELECT id, titulo, categoria, prioridade, tempo_horas \nFROM chamados \nLIMIT 10;`,
  },
  {
    id: 'dia-10-where',
    dayRef: 10,
    label: 'Dia 10: Filtros com WHERE',
    description: 'Filtra apenas chamados Críticos ou com tempo maior que 5 horas.',
    sql: `SELECT id, titulo, categoria, prioridade, tempo_horas, status \nFROM chamados \nWHERE prioridade = 'Crítica' OR tempo_horas > 5;`,
  },
  {
    id: 'dia-11-order',
    dayRef: 11,
    label: 'Dia 11: ORDER BY - Maiores Gargalos',
    description: 'Ordena os chamados pelos maiores tempos de resolução (Top 5).',
    sql: `SELECT id, titulo, categoria, tempo_horas, tecnico \nFROM chamados \nORDER BY tempo_horas DESC \nLIMIT 5;`,
  },
  {
    id: 'dia-12-group',
    dayRef: 12,
    label: 'Dia 12: GROUP BY - Volume por Categoria',
    description: 'Agrupa e conta a quantidade de chamados em cada categoria.',
    sql: `SELECT categoria, COUNT(*) AS total_chamados \nFROM chamados \nGROUP BY categoria \nORDER BY total_chamados DESC;`,
  },
  {
    id: 'dia-13-aggregates',
    dayRef: 13,
    label: 'Dia 13: Funções Agregadas (COUNT, AVG, SUM)',
    description: 'Métricas completas por prioridade: total, média de horas e tempo total.',
    sql: `SELECT prioridade, COUNT(*) AS total_chamados, ROUND(AVG(tempo_horas), 1) AS media_horas, ROUND(SUM(tempo_horas), 1) AS soma_horas \nFROM chamados \nGROUP BY prioridade \nORDER BY media_horas DESC;`,
  },
  {
    id: 'dia-14-delivery',
    dayRef: 14,
    label: 'Dia 14: Entrega da Semana 2 (Análise Completa)',
    description: 'Query analítica que cruza categoria com volume, tempo médio e CSAT médio.',
    sql: `SELECT categoria, COUNT(*) AS volume_chamados, ROUND(AVG(tempo_horas), 1) AS tempo_medio_horas, ROUND(AVG(csat), 2) AS csat_medio \nFROM chamados \nGROUP BY categoria \nORDER BY volume_chamados DESC;`,
  },
  {
    id: 'dia-24-case-when',
    dayRef: 24,
    label: 'Dia 24: Queries do Portfólio (Departamentos)',
    description: 'Análise de demanda de chamados e impacto por departamento da empresa.',
    sql: `SELECT departamento, COUNT(*) AS chamados_abertos, ROUND(AVG(tempo_horas), 1) AS tempo_medio, ROUND(AVG(csat), 1) AS csat_medio \nFROM chamados \nGROUP BY departamento \nORDER BY chamados_abertos DESC;`,
  },
];

export function executeSql(query: string): SqlQueryResult {
  const startTime = performance.now();
  const rawQuery = query.trim().replace(/;$/, '');

  try {
    if (!rawQuery) {
      throw new Error('A consulta SQL não pode ser vazia.');
    }

    // Normalização básica
    const normalized = rawQuery.replace(/\s+/g, ' ');

    // Verificar se FROM chamados ou FROM tickets existe
    if (!/FROM\s+(chamados|tickets)/i.test(normalized)) {
      throw new Error('Tabela não encontrada. Utilize "FROM chamados" na consulta.');
    }

    let dataset: any[] = JSON.parse(JSON.stringify(TICKETS_DATA));

    // WHERE clause
    const whereMatch = normalized.match(/WHERE\s+(.*?)(?=\s+(GROUP BY|ORDER BY|LIMIT)|$)/i);
    if (whereMatch) {
      const whereCondition = whereMatch[1];
      dataset = filterDataset(dataset, whereCondition);
    }

    // GROUP BY clause
    const groupByMatch = normalized.match(/GROUP\s+BY\s+(.*?)(?=\s+(ORDER BY|LIMIT)|$)/i);
    const selectMatch = normalized.match(/^SELECT\s+(.*?)\s+FROM/i);

    if (!selectMatch) {
      throw new Error('Sintaxe inválida: esperava-se cláusula SELECT no início.');
    }

    const selectFieldsRaw = selectMatch[1];
    let resultRows: Record<string, any>[] = [];
    let columns: string[] = [];

    if (groupByMatch) {
      const groupCols = groupByMatch[1].split(',').map(c => c.trim().toLowerCase());
      resultRows = handleGroupBy(dataset, groupCols, selectFieldsRaw);
      columns = resultRows.length > 0 ? Object.keys(resultRows[0]) : groupCols;
    } else {
      // Non-aggregated or simple select
      if (selectFieldsRaw.trim() === '*') {
        resultRows = dataset;
        columns = ['id', 'titulo', 'categoria', 'prioridade', 'status', 'tempo_horas', 'sla_cumprido', 'departamento', 'tecnico', 'data_abertura', 'csat'];
      } else {
        const fields = parseSelectExpressions(selectFieldsRaw);
        columns = fields.map(f => f.alias);
        resultRows = dataset.map(row => {
          const newRow: Record<string, any> = {};
          fields.forEach(f => {
            newRow[f.alias] = evaluateSimpleExpr(row, f.expr);
          });
          return newRow;
        });
      }
    }

    // ORDER BY clause
    const orderMatch = normalized.match(/ORDER\s+BY\s+(.*?)(?=\s+LIMIT|$)/i);
    if (orderMatch) {
      const orderClause = orderMatch[1].trim();
      const parts = orderClause.split(/\s+/);
      const orderCol = parts[0];
      const isDesc = parts[1] && parts[1].toUpperCase() === 'DESC';

      resultRows.sort((a, b) => {
        let valA = a[orderCol] ?? a[orderCol.toLowerCase()];
        let valB = b[orderCol] ?? b[orderCol.toLowerCase()];

        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();

        if (valA < valB) return isDesc ? 1 : -1;
        if (valA > valB) return isDesc ? -1 : 1;
        return 0;
      });
    }

    // LIMIT clause
    const limitMatch = normalized.match(/LIMIT\s+(\d+)/i);
    if (limitMatch) {
      const limitVal = parseInt(limitMatch[1], 10);
      resultRows = resultRows.slice(0, limitVal);
    }

    const endTime = performance.now();
    return {
      success: true,
      columns,
      rows: resultRows,
      rowCount: resultRows.length,
      executionTimeMs: Math.round((endTime - startTime) * 100) / 100,
      queryExecuted: rawQuery,
    };
  } catch (err: any) {
    const endTime = performance.now();
    return {
      success: false,
      columns: [],
      rows: [],
      rowCount: 0,
      executionTimeMs: Math.round((endTime - startTime) * 100) / 100,
      error: err.message || 'Erro ao executar a consulta SQL.',
      queryExecuted: rawQuery,
    };
  }
}

function filterDataset(dataset: any[], whereCond: string): any[] {
  // Support OR and AND conditions
  const orParts = whereCond.split(/\s+OR\s+/i);
  return dataset.filter(row => {
    return orParts.some(orBlock => {
      const andParts = orBlock.split(/\s+AND\s+/i);
      return andParts.every(condition => evaluateCondition(row, condition.trim()));
    });
  });
}

function evaluateCondition(row: any, cond: string): boolean {
  // Matches: col [=, !=, <>, >, <, >=, <=, LIKE] value
  const match = cond.match(/^([\w_]+)\s*(=|!=|<>|>=|<=|>|<|LIKE)\s*(.+)$/i);
  if (!match) return true;

  const col = match[1].toLowerCase();
  const op = match[2].toUpperCase();
  let rawVal = match[3].trim();

  // Strip quotes
  let targetVal: any = rawVal.replace(/^['"](.*)['"]$/, '$1');
  if (!isNaN(Number(targetVal)) && !rawVal.startsWith("'") && !rawVal.startsWith('"')) {
    targetVal = Number(targetVal);
  }

  const rowVal = row[col];

  if (op === '=' ) {
    return String(rowVal).toLowerCase() === String(targetVal).toLowerCase();
  }
  if (op === '!=' || op === '<>') {
    return String(rowVal).toLowerCase() !== String(targetVal).toLowerCase();
  }
  if (op === '>') return Number(rowVal) > Number(targetVal);
  if (op === '<') return Number(rowVal) < Number(targetVal);
  if (op === '>=') return Number(rowVal) >= Number(targetVal);
  if (op === '<=') return Number(rowVal) <= Number(targetVal);
  if (op === 'LIKE') {
    const regexPattern = String(targetVal).replace(/%/g, '.*');
    return new RegExp(`^${regexPattern}$`, 'i').test(String(rowVal));
  }
  return true;
}

interface ParsedField {
  expr: string;
  alias: string;
}

function parseSelectExpressions(selectStr: string): ParsedField[] {
  const parts: string[] = [];
  let current = '';
  let inParen = 0;

  for (let i = 0; i < selectStr.length; i++) {
    const char = selectStr[i];
    if (char === '(') inParen++;
    if (char === ')') inParen--;
    if (char === ',' && inParen === 0) {
      parts.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  if (current.trim()) parts.push(current.trim());

  return parts.map(part => {
    const asMatch = part.match(/^(.*?)\s+AS\s+([\w_]+)$/i);
    if (asMatch) {
      return { expr: asMatch[1].trim(), alias: asMatch[2].trim() };
    }
    // No AS: check if last word is alias or clean
    const spaceMatch = part.match(/^(.*?)\s+([\w_]+)$/);
    if (spaceMatch && !part.includes('(')) {
      return { expr: spaceMatch[1].trim(), alias: spaceMatch[2].trim() };
    }
    return { expr: part, alias: part.replace(/[^a-zA-Z0-9_]/g, '_') };
  });
}

function evaluateSimpleExpr(row: any, expr: string): any {
  const col = expr.toLowerCase();
  if (row[col] !== undefined) return row[col];
  return row[expr] ?? expr;
}

function handleGroupBy(dataset: any[], groupCols: string[], selectStr: string): Record<string, any>[] {
  const parsedFields = parseSelectExpressions(selectStr);
  const groups: Record<string, any[]> = {};

  dataset.forEach(row => {
    const key = groupCols.map(c => String(row[c] ?? '')).join('___');
    if (!groups[key]) groups[key] = [];
    groups[key].push(row);
  });

  return Object.values(groups).map(items => {
    const resRow: Record<string, any> = {};
    const firstItem = items[0];

    parsedFields.forEach(f => {
      const expr = f.expr.trim();
      const exprUpper = expr.toUpperCase();

      // Check group cols
      if (groupCols.includes(expr.toLowerCase())) {
        resRow[f.alias] = firstItem[expr.toLowerCase()];
        return;
      }

      // COUNT(*)
      if (exprUpper.includes('COUNT(*)')) {
        resRow[f.alias] = items.length;
        return;
      }

      // ROUND(AVG(col), n)
      const roundAvgMatch = expr.match(/ROUND\s*\(\s*AVG\s*\(\s*([\w_]+)\s*\)\s*,\s*(\d+)\s*\)/i);
      if (roundAvgMatch) {
        const col = roundAvgMatch[1].toLowerCase();
        const decimals = parseInt(roundAvgMatch[2], 10);
        const sum = items.reduce((acc, curr) => acc + (Number(curr[col]) || 0), 0);
        const avg = items.length > 0 ? sum / items.length : 0;
        resRow[f.alias] = Number(avg.toFixed(decimals));
        return;
      }

      // AVG(col)
      const avgMatch = expr.match(/AVG\s*\(\s*([\w_]+)\s*\)/i);
      if (avgMatch) {
        const col = avgMatch[1].toLowerCase();
        const sum = items.reduce((acc, curr) => acc + (Number(curr[col]) || 0), 0);
        resRow[f.alias] = Number((sum / items.length).toFixed(1));
        return;
      }

      // ROUND(SUM(col), n)
      const roundSumMatch = expr.match(/ROUND\s*\(\s*SUM\s*\(\s*([\w_]+)\s*\)\s*,\s*(\d+)\s*\)/i);
      if (roundSumMatch) {
        const col = roundSumMatch[1].toLowerCase();
        const decimals = parseInt(roundSumMatch[2], 10);
        const sum = items.reduce((acc, curr) => acc + (Number(curr[col]) || 0), 0);
        resRow[f.alias] = Number(sum.toFixed(decimals));
        return;
      }

      // SUM(col)
      const sumMatch = expr.match(/SUM\s*\(\s*([\w_]+)\s*\)/i);
      if (sumMatch) {
        const col = sumMatch[1].toLowerCase();
        const sum = items.reduce((acc, curr) => acc + (Number(curr[col]) || 0), 0);
        resRow[f.alias] = Number(sum.toFixed(1));
        return;
      }

      // MIN(col)
      const minMatch = expr.match(/MIN\s*\(\s*([\w_]+)\s*\)/i);
      if (minMatch) {
        const col = minMatch[1].toLowerCase();
        resRow[f.alias] = Math.min(...items.map(it => Number(it[col]) || 0));
        return;
      }

      // MAX(col)
      const maxMatch = expr.match(/MAX\s*\(\s*([\w_]+)\s*\)/i);
      if (maxMatch) {
        const col = maxMatch[1].toLowerCase();
        resRow[f.alias] = Math.max(...items.map(it => Number(it[col]) || 0));
        return;
      }

      // Default fallback
      resRow[f.alias] = firstItem[expr.toLowerCase()] ?? '-';
    });

    return resRow;
  });
}
