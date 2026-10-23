/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  CheckCircle2,
  Circle,
  Clock,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  ArrowRight,
  BookOpen,
  Filter,
} from 'lucide-react';
import { DayPlan, STUDY_PLAN } from '../data/studyPlanData';
import { NavTab } from './Navbar';

interface DailyPlanViewProps {
  completedDays: number[];
  onToggleDay: (day: number) => void;
  onOpenTimerForDay: (dayPlan: DayPlan) => void;
  onNavigateTab: (tab: NavTab) => void;
  notes: Record<number, string>;
  onUpdateNote: (day: number, note: string) => void;
}

const WEEKS_INFO = [
  {
    week: 1,
    title: 'Semana 1 · Fundamentos e Excel',
    desc: 'Organizar dados de suporte técnico, dominar fórmulas (SOMA, MÉDIA, CONT.SE) e tabelas dinâmicas.',
    deliverable: 'Planilha organizada com fórmulas, indicadores e pelo menos um gráfico.',
    color: 'border-blue-500',
    tabTarget: 'excel' as NavTab,
  },
  {
    week: 2,
    title: 'Semana 2 · SQL Básico',
    desc: 'Aprender a consultar bancos de dados relacionais com SELECT, WHERE, ORDER BY, GROUP BY e agregações.',
    deliverable: 'Conjunto de consultas SQL para identificar categorias frequentes, volume e tempo médio.',
    color: 'border-emerald-500',
    tabTarget: 'sql' as NavTab,
  },
  {
    week: 3,
    title: 'Semana 3 · Power BI',
    desc: 'Transformar planilhas em relatórios visuais dinâmicos no Power BI Desktop com Power Query e KPIs.',
    deliverable: 'Primeiro painel com cartões de indicadores, tempos médios e gráficos por categoria.',
    color: 'border-amber-500',
    tabTarget: 'powerbi' as NavTab,
  },
  {
    week: 4,
    title: 'Semana 4 · Portfólio & Carreira',
    desc: 'Consolidar o projeto "Análise de Chamados de Suporte", treinar apresentação de 5 min e preparar currículo.',
    deliverable: 'Projeto completo documentado com conclusões acionáveis e roteiro de apresentação.',
    color: 'border-purple-500',
    tabTarget: 'portfolio' as NavTab,
  },
];

export const DailyPlanView: React.FC<DailyPlanViewProps> = ({
  completedDays,
  onToggleDay,
  onOpenTimerForDay,
  onNavigateTab,
  notes,
  onUpdateNote,
}) => {
  const [selectedWeek, setSelectedWeek] = useState<number>(0); // 0 = all
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending'>('all');
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [showSolutionDay, setShowSolutionDay] = useState<Record<number, boolean>>({});
  const [showHintDay, setShowHintDay] = useState<Record<number, boolean>>({});

  const filteredDays = STUDY_PLAN.filter((day) => {
    if (selectedWeek !== 0 && day.week !== selectedWeek) return false;
    const isCompleted = completedDays.includes(day.day);
    if (filterStatus === 'completed' && !isCompleted) return false;
    if (filterStatus === 'pending' && isCompleted) return false;
    return true;
  });

  const toggleSolution = (dayNum: number) => {
    setShowSolutionDay((prev) => ({ ...prev, [dayNum]: !prev[dayNum] }));
  };

  const toggleHint = (dayNum: number) => {
    setShowHintDay((prev) => ({ ...prev, [dayNum]: !prev[dayNum] }));
  };

  const progressPercent = Math.round((completedDays.length / STUDY_PLAN.length) * 100);

  return (
    <div className="space-y-8">
      {/* Hero Overview */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-500 tracking-wider uppercase">
              Roteiro Guiado de 30 Dias
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight text-balance">
              Do Suporte Técnico à Análise de Dados & BI
            </h1>
            <p className="text-sm md:text-base text-slate-600 max-w-3xl leading-relaxed">
              Desenvolva fundamentos práticos em Excel, SQL e Power BI estudando 1 hora por dia e construa seu primeiro projeto de portfólio analisando chamados de suporte técnico.
            </p>
          </div>

          {/* Quick Progress Overview */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 min-w-[240px] shrink-0 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span className="font-medium">Progresso Geral</span>
              <span className="font-mono font-bold text-slate-900 tabular-nums">{progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-slate-900 h-full transition-all duration-300 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="text-xs text-slate-500 flex justify-between pt-1">
              <span>{completedDays.length} concluídos</span>
              <span>{30 - completedDays.length} restantes</span>
            </div>
          </div>
        </div>

        {/* Study Method Note */}
        <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600">
          <div className="flex items-start gap-2.5">
            <span className="font-mono font-bold text-slate-900 text-sm">10 min</span>
            <div>
              <p className="font-medium text-slate-800">Revisão Anterior</p>
              <p className="text-slate-500">Fixar os conceitos do dia anterior sem pressão.</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="font-mono font-bold text-slate-900 text-sm">35 min</span>
            <div>
              <p className="font-medium text-slate-800">Aula & Prática</p>
              <p className="text-slate-500">Mão na massa direto no Excel, SQL ou Power BI.</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="font-mono font-bold text-slate-900 text-sm">15 min</span>
            <div>
              <p className="font-medium text-slate-800">Desafio Autônomo</p>
              <p className="text-slate-500">Resolver o exercício sem copiar a solução.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Week Selector Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Week Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg overflow-x-auto">
          <button
            onClick={() => setSelectedWeek(0)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              selectedWeek === 0
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Todas as Semanas
          </button>
          {[1, 2, 3, 4].map((wk) => (
            <button
              key={wk}
              onClick={() => setSelectedWeek(wk)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                selectedWeek === wk
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semana {wk}
            </button>
          ))}
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2 text-xs">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-500">Filtrar:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="bg-white border border-slate-200 rounded-md px-2.5 py-1 text-slate-700 text-xs focus:outline-none focus:ring-1 focus:ring-slate-900"
          >
            <option value="all">Todos os dias</option>
            <option value="pending">Apenas pendentes</option>
            <option value="completed">Apenas concluídos</option>
          </select>
        </div>
      </div>

      {/* Deliverable info if specific week is selected */}
      {selectedWeek > 0 && (
        <div className="bg-slate-900 text-white rounded-lg p-4 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-slate-400 uppercase tracking-wider font-semibold block mb-0.5">
              Entrega Oficial da Semana {selectedWeek}:
            </span>
            <span className="text-sm font-medium text-slate-100">
              {WEEKS_INFO[selectedWeek - 1].deliverable}
            </span>
          </div>
          <button
            onClick={() => onNavigateTab(WEEKS_INFO[selectedWeek - 1].tabTarget)}
            className="px-3 py-1.5 bg-white text-slate-900 font-semibold rounded hover:bg-slate-100 transition-colors whitespace-nowrap self-start sm:self-center"
          >
            Abrir Ferramenta da Semana
          </button>
        </div>
      )}

      {/* Days List */}
      <div className="space-y-3">
        {filteredDays.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-xl border border-slate-200 text-slate-500 text-sm">
            Nenhum dia corresponde aos filtros selecionados.
          </div>
        ) : (
          filteredDays.map((day) => {
            const isCompleted = completedDays.includes(day.day);
            const isExpanded = expandedDay === day.day;

            return (
              <div
                key={day.day}
                className={`bg-white rounded-xl border transition-all ${
                  isCompleted ? 'border-slate-200 bg-slate-50/50' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Header row */}
                <div
                  onClick={() => setExpandedDay(isExpanded ? null : day.day)}
                  className="p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* Completion Checkbox */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleDay(day.day);
                      }}
                      className="text-slate-400 hover:text-slate-900 transition-colors shrink-0"
                      title={isCompleted ? 'Marcar como não concluído' : 'Marcar como concluído'}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-300" />
                      )}
                    </button>

                    {/* Day Number */}
                    <div className="font-mono text-xs font-semibold text-slate-400 shrink-0">
                      Dia {day.day.toString().padStart(2, '0')}
                    </div>

                    {/* Title & Metadata */}
                    <div className="min-w-0">
                      <h3
                        className={`text-sm sm:text-base font-semibold truncate ${
                          isCompleted ? 'text-slate-500 line-through' : 'text-slate-900'
                        }`}
                      >
                        {day.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                        <span className="uppercase tracking-wider font-semibold text-[10px] text-slate-400">
                          Semana {day.week}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="capitalize">{day.tool}</span>
                        <span aria-hidden="true" className="hidden sm:inline">·</span>
                        <span className="hidden sm:inline truncate max-w-xs">{day.goal}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Chevron */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenTimerForDay(day);
                      }}
                      className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                      title="Abrir timer de 1h para este dia"
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>Timer 1h</span>
                    </button>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-4 pb-5 pt-1 sm:px-6 border-t border-slate-100 space-y-6">
                    {/* Goal & Description */}
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                        Objetivo do Dia
                      </div>
                      <p className="text-sm font-medium text-slate-800 leading-relaxed">
                        {day.goal}
                      </p>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        {day.summary}
                      </p>
                    </div>

                    {/* 10-35-15 Protocol */}
                    <div className="space-y-3">
                      <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center justify-between">
                        <span>Estrutura dos 60 Minutos de Hoje</span>
                        <button
                          onClick={() => onOpenTimerForDay(day)}
                          className="text-xs text-slate-900 font-medium hover:underline flex items-center gap-1"
                        >
                          <Clock className="w-3.5 h-3.5" />
                          <span>Iniciar no Timer</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                        <div className="bg-white border border-slate-200 rounded-lg p-3 space-y-1">
                          <span className="font-semibold text-slate-900 block">
                            1. Revisão (10 min)
                          </span>
                          <p className="text-slate-600 leading-normal">
                            {day.timeSchedule.review10m}
                          </p>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-lg p-3 space-y-1">
                          <span className="font-semibold text-slate-900 block">
                            2. Prática (35 min)
                          </span>
                          <p className="text-slate-600 leading-normal">
                            {day.timeSchedule.practice35m}
                          </p>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-lg p-3 space-y-1">
                          <span className="font-semibold text-slate-900 block">
                            3. Desafio (15 min)
                          </span>
                          <p className="text-slate-600 leading-normal">
                            {day.timeSchedule.challenge15m}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Interactive Challenge & Self-Check */}
                    <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 uppercase tracking-wider">
                        <Lightbulb className="w-4 h-4 text-amber-600" />
                        <span>Desafio Prático do Dia</span>
                      </div>

                      <p className="text-sm text-slate-800 font-medium">
                        {day.challenge.prompt}
                      </p>

                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => toggleHint(day.day)}
                          className="px-3 py-1 bg-white border border-slate-300 rounded text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors"
                        >
                          {showHintDay[day.day] ? 'Ocultar Dica' : 'Ver Dica'}
                        </button>

                        <button
                          type="button"
                          onClick={() => toggleSolution(day.day)}
                          className="px-3 py-1 bg-white border border-slate-300 rounded text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors"
                        >
                          {showSolutionDay[day.day] ? 'Ocultar Solução' : 'Ver Solução Explicada'}
                        </button>

                        {/* Direct tool launch button */}
                        {day.tool === 'sql' && (
                          <button
                            type="button"
                            onClick={() => onNavigateTab('sql')}
                            className="px-3 py-1 bg-slate-900 text-white rounded text-xs font-medium hover:bg-slate-800 transition-colors flex items-center gap-1"
                          >
                            <span>Abrir no SQL Lab</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                        {day.tool === 'excel' && (
                          <button
                            type="button"
                            onClick={() => onNavigateTab('excel')}
                            className="px-3 py-1 bg-slate-900 text-white rounded text-xs font-medium hover:bg-slate-800 transition-colors flex items-center gap-1"
                          >
                            <span>Abrir Simulador Excel</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                        {day.tool === 'powerbi' && (
                          <button
                            type="button"
                            onClick={() => onNavigateTab('powerbi')}
                            className="px-3 py-1 bg-slate-900 text-white rounded text-xs font-medium hover:bg-slate-800 transition-colors flex items-center gap-1"
                          >
                            <span>Abrir Mock Power BI</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                        {day.tool === 'portfolio' && (
                          <button
                            type="button"
                            onClick={() => onNavigateTab('portfolio')}
                            className="px-3 py-1 bg-slate-900 text-white rounded text-xs font-medium hover:bg-slate-800 transition-colors flex items-center gap-1"
                          >
                            <span>Ver Hub do Portfólio</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>

                      {showHintDay[day.day] && (
                        <div className="p-3 bg-amber-50 border border-amber-200 rounded text-xs text-amber-900">
                          <span className="font-semibold block mb-0.5">Dica:</span>
                          {day.challenge.hint}
                        </div>
                      )}

                      {showSolutionDay[day.day] && (
                        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-900 font-mono">
                          <span className="font-semibold font-sans block mb-1">Solução Explicada:</span>
                          {day.challenge.solution}
                        </div>
                      )}
                    </div>

                    {/* Key Concepts & Official Free Materials */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      {/* Concepts */}
                      <div className="space-y-1.5">
                        <span className="font-semibold text-slate-700 uppercase tracking-wider block">
                          Conceitos-Chave
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {day.keyConcepts.map((concept, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-xs font-medium"
                            >
                              {concept}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Official Free Materials */}
                      <div className="space-y-1.5">
                        <span className="font-semibold text-slate-700 uppercase tracking-wider block">
                          Materiais Gratuitos Recomendados
                        </span>
                        <div className="space-y-1">
                          {day.resources.map((res, idx) => (
                            <a
                              key={idx}
                              href={res.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between p-2 rounded bg-white border border-slate-200 hover:border-slate-300 transition-colors text-slate-800 group"
                            >
                              <div className="min-w-0 pr-2">
                                <div className="font-medium group-hover:text-slate-900 truncate">
                                  {res.name}
                                </div>
                                <div className="text-[11px] text-slate-500 truncate">
                                  {res.description}
                                </div>
                              </div>
                              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 shrink-0" />
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Personal Notes */}
                    <div className="space-y-1.5 pt-2">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-700 uppercase tracking-wider">
                        <span className="flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Anotações Pessoais do Dia</span>
                        </span>
                        <span className="text-[11px] font-normal text-slate-400 normal-case">
                          Salvo automaticamente no navegador
                        </span>
                      </div>
                      <textarea
                        value={notes[day.day] || ''}
                        onChange={(e) => onUpdateNote(day.day, e.target.value)}
                        placeholder="Escreva aqui seus aprendizados, dúvidas, atalhos do Excel/SQL aprendidos hoje..."
                        rows={2}
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 text-slate-800 resize-y"
                      />
                    </div>

                    {/* Bottom Day Completion Toggle */}
                    <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => onToggleDay(day.day)}
                        className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                          isCompleted
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-slate-900 text-white hover:bg-slate-800'
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{isCompleted ? 'Concluído! (Clique para desmarcar)' : 'Marcar Dia como Concluído'}</span>
                      </button>

                      {isCompleted && (
                        <span className="text-xs text-emerald-700 font-medium">
                          Meta diária atingida com sucesso!
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
