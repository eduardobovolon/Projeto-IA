/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { BarChart3, Filter, SlidersHorizontal, Layers, CheckCircle, Code, HelpCircle } from 'lucide-react';
import { TICKETS_DATA, Ticket } from '../data/ticketsData';

export const PowerBiMock: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [selectedPriority, setSelectedPriority] = useState<string>('Todas');
  const [selectedStatus, setSelectedStatus] = useState<string>('Todos');

  // Filter dataset dynamically
  const filteredData = useMemo(() => {
    return TICKETS_DATA.filter((t) => {
      const matchCat = selectedCategory === 'Todas' || t.categoria === selectedCategory;
      const matchPrio = selectedPriority === 'Todas' || t.prioridade === selectedPriority;
      const matchStat = selectedStatus === 'Todos' || t.status === selectedStatus;
      return matchCat && matchPrio && matchStat;
    });
  }, [selectedCategory, selectedPriority, selectedStatus]);

  // Aggregate stats
  const totalCount = filteredData.length;
  const avgTime = totalCount > 0
    ? (filteredData.reduce((acc, t) => acc + t.tempo_horas, 0) / totalCount).toFixed(1)
    : '0';
  const slaCompliance = totalCount > 0
    ? Math.round((filteredData.filter((t) => t.sla_cumprido).length / totalCount) * 100)
    : 0;
  const avgCsat = totalCount > 0
    ? (filteredData.reduce((acc, t) => acc + t.csat, 0) / totalCount).toFixed(1)
    : '0';

  // Category breakdown for horizontal bar chart
  const categoryStats = useMemo(() => {
    const map: Record<string, number> = {};
    filteredData.forEach((t) => {
      map[t.categoria] = (map[t.categoria] || 0) + 1;
    });
    return Object.entries(map)
      .map(([categoria, count]) => ({ categoria, count }))
      .sort((a, b) => b.count - a.count);
  }, [filteredData]);

  const maxCatCount = Math.max(...categoryStats.map((c) => c.count), 1);

  // Priority breakdown for column chart
  const priorityStats = useMemo(() => {
    const prios = ['Crítica', 'Alta', 'Média', 'Baixa'];
    return prios.map((prio) => {
      const items = filteredData.filter((t) => t.prioridade === prio);
      const count = items.length;
      const avg = count > 0 ? (items.reduce((acc, it) => acc + it.tempo_horas, 0) / count).toFixed(1) : '0';
      return { prioridade: prio, count, avg: Number(avg) };
    });
  }, [filteredData]);

  const maxPrioAvg = Math.max(...priorityStats.map((p) => p.avg), 1);

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8">
        <div className="space-y-2">
          <div className="text-xs font-semibold text-slate-500 tracking-wider uppercase">
            Semana 3 · Simulador de Relatório Visual
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Power BI Mock: Painel Executivo de Chamados
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
            Este relatório simula a experiência interativa que você construirá no Power BI Desktop na Semana 3. Use as segmentações no topo para filtrar cruzadamente todos os visuais.
          </p>
        </div>
      </div>

      {/* Power BI Canvas Frame */}
      <div className="bg-slate-100 p-4 sm:p-6 rounded-xl border border-slate-300 shadow-inner space-y-4">
        {/* Top Report Header Bar */}
        <div className="bg-white rounded-lg p-4 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-6 bg-amber-500 rounded-xs" />
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Helpdesk Operations Dashboard
              </h2>
              <div className="text-[11px] text-slate-500">
                Visão Gerencial de Eficiência e Cumprimento de SLA de TI
              </div>
            </div>
          </div>

          {/* Slicers / Filters Bar */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded px-2 py-1">
              <span className="text-slate-500 font-medium">Categoria:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-transparent text-slate-900 font-medium focus:outline-none"
              >
                <option value="Todas">Todas</option>
                <option value="Rede">Rede</option>
                <option value="Sistemas & ERP">Sistemas & ERP</option>
                <option value="Acesso & Segurança">Acesso & Segurança</option>
                <option value="Hardware">Hardware</option>
                <option value="Impressão">Impressão</option>
                <option value="E-mail & Nuvem">E-mail & Nuvem</option>
              </select>
            </div>

            <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded px-2 py-1">
              <span className="text-slate-500 font-medium">Prioridade:</span>
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="bg-transparent text-slate-900 font-medium focus:outline-none"
              >
                <option value="Todas">Todas</option>
                <option value="Crítica">Crítica</option>
                <option value="Alta">Alta</option>
                <option value="Média">Média</option>
                <option value="Baixa">Baixa</option>
              </select>
            </div>

            <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded px-2 py-1">
              <span className="text-slate-500 font-medium">Status:</span>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-transparent text-slate-900 font-medium focus:outline-none"
              >
                <option value="Todos">Todos</option>
                <option value="Resolvido">Resolvido</option>
                <option value="Em Aberto">Em Aberto</option>
              </select>
            </div>

            {(selectedCategory !== 'Todas' || selectedPriority !== 'Todas' || selectedStatus !== 'Todos') && (
              <button
                onClick={() => {
                  setSelectedCategory('Todas');
                  setSelectedPriority('Todas');
                  setSelectedStatus('Todos');
                }}
                className="px-2 py-1 text-[11px] text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded transition-colors"
              >
                Limpar Filtros
              </button>
            )}
          </div>
        </div>

        {/* 4 Power BI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs">
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Total de Chamados
            </div>
            <div className="text-3xl font-extrabold text-slate-900 font-mono mt-1 tabular-nums">
              {totalCount}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Medida: COUNTROWS(Chamados)</div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs">
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Tempo Médio (Horas)
            </div>
            <div className="text-3xl font-extrabold text-slate-900 font-mono mt-1 tabular-nums">
              {avgTime}h
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Medida: AVERAGE(Tempo_Horas)</div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs">
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Cumprimento de SLA
            </div>
            <div className="text-3xl font-extrabold text-slate-900 font-mono mt-1 tabular-nums">
              {slaCompliance}%
            </div>
            <div className="text-[11px] text-emerald-600 font-medium mt-1">Meta corporativa: &gt; 80%</div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs">
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Satisfação (CSAT)
            </div>
            <div className="text-3xl font-extrabold text-slate-900 font-mono mt-1 tabular-nums">
              {avgCsat} <span className="text-base text-slate-400 font-normal">/ 5</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Média de avaliação do cliente</div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Visual 1: Horizontal Bar Chart - Chamados por Categoria */}
          <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Chamados por Categoria
                </h3>
                <span className="text-[11px] text-slate-400">Visual: Gráfico de Barras Clusterizado</span>
              </div>
              <span className="text-xs text-slate-500 font-mono">{filteredData.length} total</span>
            </div>

            <div className="space-y-3 pt-2">
              {categoryStats.map((item) => {
                const widthPercent = (item.count / maxCatCount) * 100;
                return (
                  <div key={item.categoria} className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-700">
                      <span className="font-medium truncate max-w-[200px]">{item.categoria}</span>
                      <span className="font-mono font-semibold tabular-nums">{item.count} chamados</span>
                    </div>
                    <div className="w-full bg-slate-100 h-4 rounded overflow-hidden">
                      <div
                        className="bg-slate-800 h-full rounded transition-all duration-300"
                        style={{ width: `${widthPercent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Visual 2: Column Chart - Tempo Médio por Prioridade */}
          <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Tempo Médio de Resolução (h) por Prioridade
                </h3>
                <span className="text-[11px] text-slate-400">Visual: Gráfico de Colunas</span>
              </div>
              <span className="text-xs text-slate-500 font-mono">Gargalos críticos</span>
            </div>

            <div className="grid grid-cols-4 gap-3 items-end h-48 pt-6 pb-2 border-b border-slate-100">
              {priorityStats.map((item) => {
                const heightPercent = maxPrioAvg > 0 ? (item.avg / maxPrioAvg) * 100 : 0;
                return (
                  <div key={item.prioridade} className="flex flex-col items-center h-full justify-end group">
                    <span className="text-xs font-mono font-bold text-slate-900 mb-1 tabular-nums">
                      {item.avg}h
                    </span>
                    <div className="w-full max-w-[48px] bg-slate-100 rounded-t overflow-hidden flex items-end h-full">
                      <div
                        className={`w-full rounded-t transition-all duration-300 ${
                          item.prioridade === 'Crítica'
                            ? 'bg-rose-600'
                            : item.prioridade === 'Alta'
                            ? 'bg-amber-600'
                            : item.prioridade === 'Média'
                            ? 'bg-blue-600'
                            : 'bg-slate-600'
                        }`}
                        style={{ height: `${heightPercent}%` }}
                      />
                    </div>
                    <span className="text-[11px] font-medium text-slate-700 mt-2 text-center">
                      {item.prioridade}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="text-[11px] text-slate-500 text-center">
              Nota: Chamados críticos levam em média mais de 7 horas devido à complexidade de infraestrutura e ERP.
            </div>
          </div>
        </div>
      </div>

      {/* Replication Guide in Power BI Desktop */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        <div className="flex items-center gap-2">
          <Code className="w-5 h-5 text-slate-700" />
          <h2 className="text-base font-bold text-slate-900">
            Guia de Replicação Passo a Passo no Power BI Desktop
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
            <span className="font-bold text-slate-900 block text-sm">
              Passo 1 · Importar & Power Query
            </span>
            <ol className="list-decimal list-inside space-y-1 text-slate-600">
              <li>Clique em <b>Obter Dados &gt; Texto/CSV</b> e selecione o arquivo baixado.</li>
              <li>Clique em <b>Transformar Dados</b> (não em Carregar direto).</li>
              <li>Garanta que <code>Tempo_Horas</code> seja tipo <b>Número Decimal</b>.</li>
              <li>Clique em <b>Fechar e Aplicar</b>.</li>
            </ol>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
            <span className="font-bold text-slate-900 block text-sm">
              Passo 2 · Criar Medidas DAX
            </span>
            <div className="space-y-1.5 font-mono text-[11px]">
              <div className="bg-white p-1.5 rounded border border-slate-200 text-slate-800">
                Total Chamados = COUNTROWS(Chamados)
              </div>
              <div className="bg-white p-1.5 rounded border border-slate-200 text-slate-800">
                Tempo Medio = AVERAGE(Chamados[Tempo_Horas])
              </div>
              <div className="bg-white p-1.5 rounded border border-slate-200 text-slate-800">
                CSAT Medio = AVERAGE(Chamados[CSAT])
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
            <span className="font-bold text-slate-900 block text-sm">
              Passo 3 · Montar a Tela
            </span>
            <ul className="list-disc list-inside space-y-1 text-slate-600">
              <li>Insira 4 visuais de <b>Cartão</b> no topo com as medidas criadas.</li>
              <li>Insira <b>Gráfico de Barras Clusterizado</b> (Categoria x Total).</li>
              <li>Insira <b>Segmentação de Dados</b> para Prioridade e Status.</li>
              <li>Desative títulos redundantes no eixo Y para visual limpo.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
