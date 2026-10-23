/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar, NavTab } from './components/Navbar';
import { DailyPlanView } from './components/DailyPlanView';
import { DatasetViewer } from './components/DatasetViewer';
import { SqlPlayground } from './components/SqlPlayground';
import { ExcelSimulator } from './components/ExcelSimulator';
import { PowerBiMock } from './components/PowerBiMock';
import { PortfolioHub } from './components/PortfolioHub';
import { StudyTimerModal } from './components/StudyTimerModal';
import { STUDY_PLAN, DayPlan } from './data/studyPlanData';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('plan');
  const [isTimerOpen, setIsTimerOpen] = useState<boolean>(false);
  const [timerDay, setTimerDay] = useState<DayPlan>(STUDY_PLAN[0]);

  // Persistent States
  const [completedDays, setCompletedDays] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('databi_completed_days');
      return saved ? JSON.parse(saved) : [1]; // Start with day 1 unlocked/sample
    } catch {
      return [1];
    }
  });

  const [dailyNotes, setDailyNotes] = useState<Record<number, string>>(() => {
    try {
      const saved = localStorage.getItem('databi_daily_notes');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [evaluationChecklist, setEvaluationChecklist] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('databi_eval_checklist');
      return saved ? JSON.parse(saved) : { item_1: true };
    } catch {
      return { item_1: true };
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('databi_completed_days', JSON.stringify(completedDays));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [completedDays]);

  useEffect(() => {
    try {
      localStorage.setItem('databi_daily_notes', JSON.stringify(dailyNotes));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [dailyNotes]);

  useEffect(() => {
    try {
      localStorage.setItem('databi_eval_checklist', JSON.stringify(evaluationChecklist));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [evaluationChecklist]);

  const handleToggleDay = (day: number) => {
    setCompletedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleUpdateNote = (day: number, note: string) => {
    setDailyNotes((prev) => ({ ...prev, [day]: note }));
  };

  const handleOpenTimerForDay = (dayPlan: DayPlan) => {
    setTimerDay(dayPlan);
    setIsTimerOpen(true);
  };

  const handleToggleChecklistItem = (id: string) => {
    setEvaluationChecklist((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 selection:bg-slate-900 selection:text-white">
      {/* Top Bar following Top Bar Contract */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenTimer={() => {
          // Open timer with either current active day or day 1
          const firstIncomplete = STUDY_PLAN.find((d) => !completedDays.includes(d.day)) || STUDY_PLAN[0];
          setTimerDay(firstIncomplete);
          setIsTimerOpen(true);
        }}
        completedDaysCount={completedDays.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'plan' && (
          <DailyPlanView
            completedDays={completedDays}
            onToggleDay={handleToggleDay}
            onOpenTimerForDay={handleOpenTimerForDay}
            onNavigateTab={setActiveTab}
            notes={dailyNotes}
            onUpdateNote={handleUpdateNote}
          />
        )}

        {activeTab === 'dataset' && <DatasetViewer />}

        {activeTab === 'sql' && <SqlPlayground />}

        {activeTab === 'excel' && <ExcelSimulator />}

        {activeTab === 'powerbi' && <PowerBiMock />}

        {(activeTab === 'portfolio' || activeTab === 'evaluation') && (
          <PortfolioHub
            evaluationChecklist={evaluationChecklist}
            onToggleChecklistItem={handleToggleChecklistItem}
          />
        )}
      </main>

      {/* 1-Hour Dedicated Study Timer Modal */}
      <StudyTimerModal
        isOpen={isTimerOpen}
        onClose={() => setIsTimerOpen(false)}
        dayPlan={timerDay}
        onCompleteSession={() => {
          if (!completedDays.includes(timerDay.day)) {
            handleToggleDay(timerDay.day);
          }
        }}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800">Trilha Dados & BI (30 Dias)</span>
            <span aria-hidden="true">·</span>
            <span>Do Suporte Técnico à Análise de Dados</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('plan')}
              className="hover:text-slate-900 transition-colors"
            >
              Plano de Estudos
            </button>
            <button
              onClick={() => setActiveTab('dataset')}
              className="hover:text-slate-900 transition-colors"
            >
              Base de Chamados
            </button>
            <button
              onClick={() => setActiveTab('portfolio')}
              className="hover:text-slate-900 transition-colors"
            >
              Portfólio & Carreira
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
