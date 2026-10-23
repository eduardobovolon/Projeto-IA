/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Database, Table, Check, AlertCircle, Copy, Terminal } from 'lucide-react';
import { executeSql, PRESET_QUERIES, PresetQuery, SqlQueryResult } from '../utils/sqlEngine';

export const SqlPlayground: React.FC = () => {
  const [query, setQuery] = useState<string>(PRESET_QUERIES[0].sql);
  const [activePreset, setActivePreset] = useState<string>(PRESET_QUERIES[0].id);
  const [result, setResult] = useState<SqlQueryResult | null>(null);
  const [copied, setCopied] = useState(false);

  // Execute initial query on mount
  useEffect(() => {
    handleRunQuery(PRESET_QUERIES[0].sql);
  }, []);

  const handleRunQuery = (sqlToRun?: string) => {
    const q = sqlToRun !== undefined ? sqlToRun : query;
    const res = executeSql(q);
    setResult(res);
  };

  const handleSelectPreset = (preset: PresetQuery) => {
    setActivePreset(preset.id);
    setQuery(preset.sql);
    handleRunQuery(preset.sql);
  };

  const copySql = () => {
    navigator.clipboard.writeText(query);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const SCHEMA_COLUMNS = [
    { name: 'id', type: 'VARCHAR(20)', desc: 'Identificador único do ticket' },
    { name: 'titulo', type: 'VARCHAR(255)', desc: 'Descrição resumida do chamado' },
    { name: 'categoria', type: 'VARCHAR(50)', desc: 'Rede, ERP, Acesso, Hardware, etc.' },
    { name: 'prioridade', type: 'VARCHAR(20)', desc: 'Baixa, Média, Alta, Crítica' },
    { name: 'status', type: 'VARCHAR(20)', desc: 'Resolvido, Em Aberto, etc.' },
    { name: 'tempo_horas', type: 'DECIMAL(4,1)', desc: 'Tempo de resolução em horas' },
    { name: 'sla_cumprido', type: 'BOOLEAN', desc: 'true se atendeu o prazo' },
    { name: 'departamento', type: 'VARCHAR(50)', desc: 'Setor solicitante' },
    { name: 'tecnico', type: 'VARCHAR(50)', desc: 'Responsável pelo atendimento' },
    { name: 'data_abertura', type: 'DATE', desc: 'Data do registro' },
    { name: 'csat', type: 'INT', desc: 'Avaliação de satisfação (1 a 5)' },
  ];

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-500 tracking-wider uppercase">
              Semana 2 & 4 · Laboratório Prático de Banco de Dados
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              SQL Lab: Consultas na Tabela `chamados`
            </h1>
            <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
              Escreva e teste consultas SQL reais diretamente no navegador contra os dados de helpdesk. Pratique as cláusulas SELECT, WHERE, ORDER BY, GROUP BY e funções de agregação.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-600 space-y-1">
            <div className="font-semibold text-slate-800 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-slate-700" />
              <span>Tabela disponível:</span>
            </div>
            <code className="font-mono text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200 block">
              chamados (50 linhas)
            </code>
          </div>
        </div>

        {/* 1-Click Preset Queries */}
        <div className="mt-6 pt-6 border-t border-slate-100 space-y-2">
          <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Consultas Prontas da Trilha (Clique para carregar):
          </div>
          <div className="flex flex-wrap gap-2">
            {PRESET_QUERIES.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  activePreset === preset.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Query Editor & Schema Info */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Editor Area (3 Cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
            {/* Editor Toolbar */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-900 text-slate-200 text-xs font-mono">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>Editor SQL</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={copySql}
                  className="flex items-center gap-1 px-2 py-1 rounded bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                  title="Copiar código SQL"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span className="text-[11px] font-sans">{copied ? 'Copiado' : 'Copiar'}</span>
                </button>

                <button
                  onClick={() => setQuery('SELECT * FROM chamados LIMIT 10;')}
                  className="flex items-center gap-1 px-2 py-1 rounded bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                  title="Limpar e resetar query"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-sans">Resetar</span>
                </button>

                <button
                  onClick={() => handleRunQuery()}
                  className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded transition-colors"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span className="text-[11px] font-sans">Executar (Run)</span>
                </button>
              </div>
            </div>

            {/* Code Input */}
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                  e.preventDefault();
                  handleRunQuery();
                }
              }}
              rows={6}
              className="w-full font-mono text-xs p-4 bg-slate-950 text-emerald-300 focus:outline-none resize-y leading-relaxed"
              spellCheck={false}
              placeholder="SELECT ... FROM chamados WHERE ...;"
            />

            <div className="px-4 py-2 bg-slate-900 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Atalho: <kbd className="px-1.5 py-0.5 bg-slate-800 text-slate-200 rounded">Ctrl + Enter</kbd> para executar</span>
              {result && (
                <span className="font-mono text-slate-300">
                  {result.executionTimeMs}ms · {result.rowCount} linha(s) retornada(s)
                </span>
              )}
            </div>
          </div>

          {/* Results Section */}
          {result && (
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Table className="w-4 h-4 text-slate-600" />
                  <span className="text-xs font-semibold text-slate-800">Resultado da Consulta</span>
                </div>
                {result.success ? (
                  <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Executado com Sucesso
                  </span>
                ) : (
                  <span className="text-xs font-medium text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
                    Erro na Consulta
                  </span>
                )}
              </div>

              {result.error ? (
                <div className="p-4 bg-rose-50 text-rose-800 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                  <div>
                    <span className="font-semibold block">Erro SQL:</span>
                    <span className="font-mono">{result.error}</span>
                  </div>
                </div>
              ) : result.rows.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-xs">
                  Nenhum registro corresponde aos critérios especificados.
                </div>
              ) : (
                <div className="overflow-x-auto max-h-96 overflow-y-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="sticky top-0 bg-slate-100 z-10">
                      <tr className="border-b border-slate-200 text-slate-700 font-mono text-[11px] uppercase">
                        {result.columns.map((col) => (
                          <th key={col} className="py-2.5 px-4 font-semibold whitespace-nowrap">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-800">
                      {result.rows.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                          {result.columns.map((col) => {
                            const val = row[col];
                            const isNumeric = typeof val === 'number';
                            return (
                              <td
                                key={col}
                                className={`py-2 px-4 whitespace-nowrap ${
                                  isNumeric ? 'font-mono text-slate-900 tabular-nums' : 'text-slate-700'
                                }`}
                              >
                                {val !== undefined && val !== null ? String(val) : 'NULL'}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Schema Reference Sidebar (1 Col) */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-slate-700" />
              <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                Esquema da Tabela `chamados`
              </h3>
            </div>
            <p className="text-xs text-slate-500">
              Colunas disponíveis para utilizar em SELECT, WHERE, GROUP BY e ORDER BY:
            </p>

            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
              {SCHEMA_COLUMNS.map((col) => (
                <div
                  key={col.name}
                  onClick={() => {
                    setQuery((prev) => prev.replace(/SELECT\s+(.*?)\s+FROM/i, `SELECT ${col.name} FROM`));
                  }}
                  className="p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100 cursor-pointer group"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-semibold text-slate-900 group-hover:text-blue-600">
                      {col.name}
                    </span>
                    <span className="font-mono text-[10px] text-slate-400">
                      {col.type}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {col.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
