/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Clock } from 'lucide-react';

export type NavTab = 'plan' | 'dataset' | 'sql' | 'excel' | 'powerbi' | 'portfolio' | 'evaluation';

interface NavbarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenTimer: () => void;
  completedDaysCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onOpenTimer,
  completedDaysCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <button
          onClick={() => onSelectTab('plan')}
          className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:text-slate-700 transition-colors"
        >
          Trilha Dados & BI
        </button>

        {/* Zone 2: Navigation Links (Single line, unboxed, hover underline/state) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => onSelectTab('plan')}
            className={`whitespace-nowrap shrink-0 py-1 transition-colors ${
              activeTab === 'plan'
                ? 'text-slate-900 font-semibold border-b-2 border-slate-900'
                : 'hover:text-slate-900'
            }`}
          >
            Plano 30 Dias
          </button>
          <button
            onClick={() => onSelectTab('dataset')}
            className={`whitespace-nowrap shrink-0 py-1 transition-colors ${
              activeTab === 'dataset'
                ? 'text-slate-900 font-semibold border-b-2 border-slate-900'
                : 'hover:text-slate-900'
            }`}
          >
            Dataset Chamados
          </button>
          <button
            onClick={() => onSelectTab('sql')}
            className={`whitespace-nowrap shrink-0 py-1 transition-colors ${
              activeTab === 'sql'
                ? 'text-slate-900 font-semibold border-b-2 border-slate-900'
                : 'hover:text-slate-900'
            }`}
          >
            SQL Lab
          </button>
          <button
            onClick={() => onSelectTab('excel')}
            className={`whitespace-nowrap shrink-0 py-1 transition-colors ${
              activeTab === 'excel'
                ? 'text-slate-900 font-semibold border-b-2 border-slate-900'
                : 'hover:text-slate-900'
            }`}
          >
            Excel & Fórmulas
          </button>
          <button
            onClick={() => onSelectTab('powerbi')}
            className={`whitespace-nowrap shrink-0 py-1 transition-colors ${
              activeTab === 'powerbi'
                ? 'text-slate-900 font-semibold border-b-2 border-slate-900'
                : 'hover:text-slate-900'
            }`}
          >
            Power BI Mock
          </button>
          <button
            onClick={() => onSelectTab('portfolio')}
            className={`whitespace-nowrap shrink-0 py-1 transition-colors ${
              activeTab === 'portfolio' || activeTab === 'evaluation'
                ? 'text-slate-900 font-semibold border-b-2 border-slate-900'
                : 'hover:text-slate-900'
            }`}
          >
            Portfólio & Carreira
          </button>
        </nav>

        {/* Zone 3: Primary Action & Progress */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <span>Progresso:</span>
            <span className="font-mono font-semibold text-slate-800 tabular-nums">
              {completedDaysCount}/30 dias
            </span>
          </div>

          <button
            onClick={onOpenTimer}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 shadow-xs"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Timer 1h</span>
          </button>
        </div>
      </div>

      {/* Mobile Secondary Navigation Bar */}
      <div className="lg:hidden flex items-center gap-2 overflow-x-auto px-4 py-2 border-t border-slate-100 bg-slate-50 text-xs font-medium">
        <button
          onClick={() => onSelectTab('plan')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${
            activeTab === 'plan' ? 'bg-slate-900 text-white' : 'text-slate-600'
          }`}
        >
          Plano 30D
        </button>
        <button
          onClick={() => onSelectTab('dataset')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${
            activeTab === 'dataset' ? 'bg-slate-900 text-white' : 'text-slate-600'
          }`}
        >
          Dataset
        </button>
        <button
          onClick={() => onSelectTab('sql')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${
            activeTab === 'sql' ? 'bg-slate-900 text-white' : 'text-slate-600'
          }`}
        >
          SQL Lab
        </button>
        <button
          onClick={() => onSelectTab('excel')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${
            activeTab === 'excel' ? 'bg-slate-900 text-white' : 'text-slate-600'
          }`}
        >
          Excel
        </button>
        <button
          onClick={() => onSelectTab('powerbi')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${
            activeTab === 'powerbi' ? 'bg-slate-900 text-white' : 'text-slate-600'
          }`}
        >
          Power BI
        </button>
        <button
          onClick={() => onSelectTab('portfolio')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${
            activeTab === 'portfolio' ? 'bg-slate-900 text-white' : 'text-slate-600'
          }`}
        >
          Portfólio
        </button>
      </div>
    </header>
  );
};
