/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Table, Calculator, HelpCircle, Check, Sparkles } from 'lucide-react';
import { TICKETS_DATA, Ticket } from '../data/ticketsData';

export const ExcelSimulator: React.FC = () => {
  // Pivot table configuration
  const [pivotRow, setPivotRow] = useState<'categoria' | 'departamento' | 'tecnico'>('categoria');
  const [pivotCol, setPivotCol] = useState<'prioridade' | 'status' | 'none'>('prioridade');
  const [pivotValue, setPivotValue] = useState<'count' | 'avg_time' | 'sum_time'>('count');

  // Formula sandbox interactive states
  const [countIfCategory, setCountIfCategory] = useState<string>('Rede');
  const [countIfThreshold, setCountIfThreshold] = useState<number>(4);

  // Formula evaluations
  const totalTickets = TICKETS_DATA.length;
  const sumHours = TICKETS_DATA.reduce((acc, t) => acc + t.tempo_horas, 0);
  const avgHours = (sumHours / totalTickets).toFixed(2);
  const countIfCatResult = TICKETS_DATA.filter((t) => t.categoria === countIfCategory).length;
  const countIfThresholdResult = TICKETS_DATA.filter((t) => t.tempo_horas > countIfThreshold).length;

  // Pivot Table calculation
  const pivotData = useMemo(() => {
    const rowValues = Array.from(new Set(TICKETS_DATA.map((t) => t[pivotRow]))).sort();
    const colValues = pivotCol === 'none'
      ? ['Total']
      : Array.from(new Set(TICKETS_DATA.map((t) => t[pivotCol]))).sort();

    const matrix: Record<string, Record<string, number>> = {};

    rowValues.forEach((rVal) => {
      matrix[rVal] = {};
      colValues.forEach((cVal) => {
        const matching = TICKETS_DATA.filter((t) => {
          const matchRow = t[pivotRow] === rVal;
          const matchCol = pivotCol === 'none' ? true : t[pivotCol] === cVal;
          return matchRow && matchCol;
        });

        if (pivotValue === 'count') {
          matrix[rVal][cVal] = matching.length;
        } else if (pivotValue === 'avg_time') {
          if (matching.length === 0) {
            matrix[rVal][cVal] = 0;
          } else {
            const sum = matching.reduce((acc, it) => acc + it.tempo_horas, 0);
            matrix[rVal][cVal] = Number((sum / matching.length).toFixed(1));
          }
        } else if (pivotValue === 'sum_time') {
          const sum = matching.reduce((acc, it) => acc + it.tempo_horas, 0);
          matrix[rVal][cVal] = Number(sum.toFixed(1));
        }
      });
    });

    return { rowValues, colValues, matrix };
  }, [pivotRow, pivotCol, pivotValue]);

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8">
        <div className="space-y-2">
          <div className="text-xs font-semibold text-slate-500 tracking-wider uppercase">
            Semana 1 · Laboratório Prático de Excel
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Excel & Fórmulas: Simulador e Tabela Dinâmica
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
            Pratique as fórmulas essenciais (SOMA, MÉDIA, CONT.SE, CONT.VALORES) e explore como uma Tabela Dinâmica (Pivot Table) sintetiza os chamados de suporte técnico em segundos.
          </p>
        </div>
      </div>

      {/* Part 1: Interactive Formulas Sandbox */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        <div className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-slate-700" />
          <h2 className="text-base font-bold text-slate-900">
            1. Fórmulas Essenciais em Ação (Base Chamados)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card SOMA */}
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex justify-between items-start">
              <span className="font-mono text-xs font-bold text-slate-900">=SOMA() / SUM</span>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Total Horas</span>
            </div>
            <code className="text-xs text-slate-600 font-mono block bg-white p-1.5 rounded border border-slate-200">
              =SOMA(F2:F51)
            </code>
            <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
              {sumHours.toFixed(1)}h
            </div>
            <div className="text-[11px] text-slate-500">
              Soma total de horas dedicadas pela equipe de TI.
            </div>
          </div>

          {/* Card MÉDIA */}
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex justify-between items-start">
              <span className="font-mono text-xs font-bold text-slate-900">=MÉDIA() / AVERAGE</span>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">MTTR</span>
            </div>
            <code className="text-xs text-slate-600 font-mono block bg-white p-1.5 rounded border border-slate-200">
              =MÉDIA(F2:F51)
            </code>
            <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
              {avgHours}h
            </div>
            <div className="text-[11px] text-slate-500">
              Tempo médio de resolução por chamado (MTTR).
            </div>
          </div>

          {/* Card CONT.SE Categoria */}
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex justify-between items-start">
              <span className="font-mono text-xs font-bold text-slate-900">=CONT.SE() / COUNTIF</span>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Critério</span>
            </div>
            <div className="flex items-center gap-1.5">
              <select
                value={countIfCategory}
                onChange={(e) => setCountIfCategory(e.target.value)}
                className="text-xs bg-white border border-slate-200 rounded px-1.5 py-1 text-slate-700 w-full"
              >
                <option value="Rede">Rede</option>
                <option value="Sistemas & ERP">Sistemas & ERP</option>
                <option value="Acesso & Segurança">Acesso & Segurança</option>
                <option value="Hardware">Hardware</option>
                <option value="Impressão">Impressão</option>
                <option value="E-mail & Nuvem">E-mail & Nuvem</option>
              </select>
            </div>
            <code className="text-xs text-slate-600 font-mono block bg-white p-1.5 rounded border border-slate-200 truncate">
              =CONT.SE(C2:C51; "{countIfCategory}")
            </code>
            <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
              {countIfCatResult} chamados
            </div>
          </div>

          {/* Card CONT.SE Limiar */}
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex justify-between items-start">
              <span className="font-mono text-xs font-bold text-slate-900">=CONT.SE(&gt;X)</span>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Demorados</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500">Acima de:</span>
              <input
                type="number"
                min={1}
                max={20}
                value={countIfThreshold}
                onChange={(e) => setCountIfThreshold(Number(e.target.value))}
                className="w-16 bg-white border border-slate-200 rounded px-2 py-0.5 text-xs text-slate-900 font-mono"
              />
              <span className="text-slate-500">horas</span>
            </div>
            <code className="text-xs text-slate-600 font-mono block bg-white p-1.5 rounded border border-slate-200 truncate">
              =CONT.SE(F2:F51; "&gt;{countIfThreshold}")
            </code>
            <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
              {countIfThresholdResult} chamados
            </div>
          </div>
        </div>
      </div>

      {/* Part 2: Interactive Pivot Table (Tabela Dinâmica) */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Table className="w-5 h-5 text-slate-700" />
            <h2 className="text-base font-bold text-slate-900">
              2. Construtor de Tabela Dinâmica Interativa (Dia 4)
            </h2>
          </div>

          {/* Pivot Controls */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-medium">Linhas:</span>
              <select
                value={pivotRow}
                onChange={(e) => setPivotRow(e.target.value as any)}
                className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-slate-800"
              >
                <option value="categoria">Categoria</option>
                <option value="departamento">Departamento</option>
                <option value="tecnico">Técnico</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-medium">Colunas:</span>
              <select
                value={pivotCol}
                onChange={(e) => setPivotCol(e.target.value as any)}
                className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-slate-800"
              >
                <option value="prioridade">Prioridade</option>
                <option value="status">Status</option>
                <option value="none">Nenhuma (Apenas Total)</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-medium">Valores:</span>
              <select
                value={pivotValue}
                onChange={(e) => setPivotValue(e.target.value as any)}
                className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-slate-800"
              >
                <option value="count">Contagem de Chamados</option>
                <option value="avg_time">Média de Tempo (h)</option>
                <option value="sum_time">Soma de Tempo (h)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Pivot Grid */}
        <div className="overflow-x-auto border border-slate-200 rounded-lg">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-semibold">
                <th className="py-3 px-4 capitalize">{pivotRow}</th>
                {pivotData.colValues.map((col) => (
                  <th key={col} className="py-3 px-4 text-right">
                    {col}
                  </th>
                ))}
                {pivotCol !== 'none' && (
                  <th className="py-3 px-4 text-right bg-slate-200/60 font-bold">
                    Total Geral
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {pivotData.rowValues.map((rVal) => {
                // Calculate row total
                let rowSum = 0;
                let rowCount = 0;
                pivotData.colValues.forEach((cVal) => {
                  const val = pivotData.matrix[rVal][cVal] || 0;
                  rowSum += val;
                  if (val > 0) rowCount++;
                });

                return (
                  <tr key={rVal} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-4 font-medium text-slate-900 whitespace-nowrap">
                      {rVal}
                    </td>
                    {pivotData.colValues.map((cVal) => (
                      <td key={cVal} className="py-2.5 px-4 text-right font-mono tabular-nums">
                        {pivotData.matrix[rVal][cVal] !== undefined
                          ? pivotData.matrix[rVal][cVal]
                          : '-'}
                        {pivotValue.includes('time') && pivotData.matrix[rVal][cVal] > 0 ? 'h' : ''}
                      </td>
                    ))}
                    {pivotCol !== 'none' && (
                      <td className="py-2.5 px-4 text-right font-mono font-bold bg-slate-50 tabular-nums">
                        {pivotValue === 'avg_time'
                          ? (rowCount > 0 ? (rowSum / rowCount).toFixed(1) : 0) + 'h'
                          : pivotValue === 'sum_time'
                          ? rowSum.toFixed(1) + 'h'
                          : rowSum}
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Part 3: Excel Cheat Sheet (PT-BR vs EN-US) */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-slate-700" />
          <h2 className="text-base font-bold text-slate-900">
            3. Dicionário de Fórmulas: Português vs Inglês
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
            <div className="font-semibold text-slate-900">Soma e Médias</div>
            <div className="font-mono text-slate-700">=SOMA() ⟷ =SUM()</div>
            <div className="font-mono text-slate-700">=MÉDIA() ⟷ =AVERAGE()</div>
            <div className="text-[11px] text-slate-500 mt-1">
              Dica: Use ponto e vírgula (;) no Excel em PT-BR para separar argumentos, e vírgula (,) no Excel em inglês.
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
            <div className="font-semibold text-slate-900">Contagens Condicionais</div>
            <div className="font-mono text-slate-700">=CONT.SE() ⟷ =COUNTIF()</div>
            <div className="font-mono text-slate-700">=CONT.VALORES() ⟷ =COUNTA()</div>
            <div className="text-[11px] text-slate-500 mt-1">
              CONT.VALORES conta qualquer célula não vazia; CONT.SE aceita operadores como "&gt;5" ou "=Rede".
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
            <div className="font-semibold text-slate-900">Lógicas e Procura</div>
            <div className="font-mono text-slate-700">=SE() ⟷ =IF()</div>
            <div className="font-mono text-slate-700">=PROCX() ⟷ =XLOOKUP()</div>
            <div className="text-[11px] text-slate-500 mt-1">
              O PROCX substitui o antigo PROCV com mais segurança e sem travar quando colunas mudam de posição.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
