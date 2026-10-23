/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Download, Search, FileSpreadsheet, Check, Copy } from 'lucide-react';
import { TICKETS_DATA, Ticket, downloadTicketsCSV } from '../data/ticketsData';

export const DatasetViewer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [selectedPriority, setSelectedPriority] = useState<string>('Todas');
  const [copied, setCopied] = useState(false);

  const categories = useMemo(() => {
    return ['Todas', ...Array.from(new Set(TICKETS_DATA.map((t) => t.categoria)))];
  }, []);

  const priorities = useMemo(() => {
    return ['Todas', 'Crítica', 'Alta', 'Média', 'Baixa'];
  }, []);

  const filteredTickets = useMemo(() => {
    return TICKETS_DATA.filter((ticket) => {
      const matchSearch =
        ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.departamento.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.tecnico.toLowerCase().includes(searchTerm.toLowerCase());

      const matchCat = selectedCategory === 'Todas' || ticket.categoria === selectedCategory;
      const matchPrio = selectedPriority === 'Todas' || ticket.prioridade === selectedPriority;

      return matchSearch && matchCat && matchPrio;
    });
  }, [searchTerm, selectedCategory, selectedPriority]);

  // Key metrics
  const totalCount = filteredTickets.length;
  const avgTime = totalCount > 0
    ? (filteredTickets.reduce((acc, t) => acc + t.tempo_horas, 0) / totalCount).toFixed(1)
    : '0';
  const slaCompliance = totalCount > 0
    ? Math.round((filteredTickets.filter((t) => t.sla_cumprido).length / totalCount) * 100)
    : 0;
  const criticalCount = filteredTickets.filter((t) => t.prioridade === 'Crítica').length;

  const copySampleToClipboard = () => {
    const sample = TICKETS_DATA.slice(0, 10);
    const jsonStr = JSON.stringify(sample, null, 2);
    navigator.clipboard.writeText(jsonStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-500 tracking-wider uppercase">
              Base de Dados do Projeto
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Chamados de Suporte Técnico (Helpdesk)
            </h1>
            <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
              Base com 50 chamados técnicos fictícios de TI (Rede, Sistemas ERP, Acesso VPN, Impressão e Hardware) construída para alimentar os exercícios de Excel, as consultas SQL e o painel no Power BI.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={copySampleToClipboard}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-xs"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copiado!' : 'Copiar Amostra JSON'}</span>
            </button>

            <button
              onClick={downloadTicketsCSV}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>Baixar CSV dos Chamados</span>
            </button>
          </div>
        </div>

        {/* 4 KPI Metrics */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4 border-t border-slate-100 pt-6">
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
            <div className="text-xs font-medium text-slate-500">Total de Chamados</div>
            <div className="text-2xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
              {totalCount}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">Filtrados na visualização</div>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
            <div className="text-xs font-medium text-slate-500">Tempo Médio (MTTR)</div>
            <div className="text-2xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
              {avgTime}h
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">Média por chamado</div>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
            <div className="text-xs font-medium text-slate-500">SLA Cumprido</div>
            <div className="text-2xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
              {slaCompliance}%
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">Dentro do prazo acordado</div>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
            <div className="text-xs font-medium text-slate-500">Chamados Críticos</div>
            <div className="text-2xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
              {criticalCount}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">Impacto severo na operação</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por ID, descrição, departamento ou técnico..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <span>Categoria:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-md px-2 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <span>Prioridade:</span>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-md px-2 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900"
            >
              {priorities.map((prio) => (
                <option key={prio} value={prio}>
                  {prio}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Tabular Data Grid */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                <th className="py-3 px-4 font-mono text-[11px]">ID</th>
                <th className="py-3 px-4">Título do Chamado</th>
                <th className="py-3 px-4">Categoria</th>
                <th className="py-3 px-4">Prioridade</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Tempo (h)</th>
                <th className="py-3 px-4 text-center">SLA</th>
                <th className="py-3 px-4">Departamento</th>
                <th className="py-3 px-4">Técnico</th>
                <th className="py-3 px-4 text-right font-mono text-[11px]">Data</th>
                <th className="py-3 px-4 text-right">CSAT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {filteredTickets.length === 0 ? (
                <tr>
                  <td colSpan={11} className="py-8 text-center text-slate-500 text-xs">
                    Nenhum chamado encontrado com os filtros atuais.
                  </td>
                </tr>
              ) : (
                filteredTickets.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono font-medium text-slate-900 whitespace-nowrap">
                      {t.id}
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-900 max-w-xs truncate">
                      {t.titulo}
                    </td>
                    <td className="py-3 px-4 text-slate-600 whitespace-nowrap">
                      {t.categoria}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span
                        className={`text-xs font-medium ${
                          t.prioridade === 'Crítica'
                            ? 'text-red-700 font-semibold'
                            : t.prioridade === 'Alta'
                            ? 'text-amber-700'
                            : t.prioridade === 'Média'
                            ? 'text-blue-700'
                            : 'text-slate-600'
                        }`}
                      >
                        {t.prioridade}
                      </span>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-slate-600">
                      {t.status}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-medium tabular-nums text-slate-900">
                      {t.tempo_horas.toFixed(1)}h
                    </td>
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      <span
                        className={`text-xs font-medium ${
                          t.sla_cumprido ? 'text-emerald-700' : 'text-rose-700'
                        }`}
                      >
                        {t.sla_cumprido ? 'No Prazo' : 'Estourado'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600 whitespace-nowrap">
                      {t.departamento}
                    </td>
                    <td className="py-3 px-4 text-slate-600 whitespace-nowrap">
                      {t.tecnico}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-slate-500 whitespace-nowrap tabular-nums">
                      {t.data_abertura}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-medium text-slate-900 tabular-nums">
                      {t.csat} / 5
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <FileSpreadsheet className="w-3.5 h-3.5 text-slate-400" />
            <span>Exibindo {filteredTickets.length} de {TICKETS_DATA.length} chamados registrados</span>
          </div>
          <span className="font-mono text-[11px] text-slate-400">Dados 100% fictícios para estudos</span>
        </div>
      </div>
    </div>
  );
};
