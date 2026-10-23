/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, SkipForward, X, Clock, Volume2, CheckCircle2 } from 'lucide-react';
import { DayPlan } from '../data/studyPlanData';

interface StudyTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  dayPlan: DayPlan;
  onCompleteSession?: () => void;
}

type Phase = 'review' | 'practice' | 'challenge';

const PHASE_DURATIONS: Record<Phase, number> = {
  review: 10 * 60,   // 10 minutos (600s)
  practice: 35 * 60, // 35 minutos (2100s)
  challenge: 15 * 60 // 15 minutos (900s)
};

const PHASE_NAMES: Record<Phase, { title: string; subtitle: string; tag: string }> = {
  review: {
    title: '10 min · Revisão do Conteúdo Anterior',
    subtitle: 'Relembre o que aprendeu ontem e fixe os conceitos antes de abrir novas ferramentas.',
    tag: 'Fase 1 de 3',
  },
  practice: {
    title: '35 min · Aula e Prática na Ferramenta',
    subtitle: 'Mão na massa! Pratique com foco total no Excel, SQL ou Power BI.',
    tag: 'Fase 2 de 3',
  },
  challenge: {
    title: '15 min · Exercício Sem Copiar a Solução',
    subtitle: 'Teste sua autonomia. Tente resolver o desafio do dia sozinho antes de checar a dica.',
    tag: 'Fase 3 de 3',
  },
};

export const StudyTimerModal: React.FC<StudyTimerModalProps> = ({
  isOpen,
  onClose,
  dayPlan,
  onCompleteSession,
}) => {
  const [phase, setPhase] = useState<Phase>('review');
  const [timeLeft, setTimeLeft] = useState<number>(PHASE_DURATIONS.review);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [sessionCompleted, setSessionCompleted] = useState<boolean>(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Play gentle sound via Web Audio API
  const playChime = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } catch {
      // Audio not permitted or available
    }
  };

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      playChime();
      if (phase === 'review') {
        setPhase('practice');
        setTimeLeft(PHASE_DURATIONS.practice);
      } else if (phase === 'practice') {
        setPhase('challenge');
        setTimeLeft(PHASE_DURATIONS.challenge);
      } else if (phase === 'challenge') {
        setIsActive(false);
        setSessionCompleted(true);
        if (onCompleteSession) onCompleteSession();
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, phase, onCompleteSession]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(PHASE_DURATIONS[phase]);
  };

  const switchPhase = (newPhase: Phase) => {
    setPhase(newPhase);
    setTimeLeft(PHASE_DURATIONS[newPhase]);
    setIsActive(false);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  const progressPercent = ((PHASE_DURATIONS[phase] - timeLeft) / PHASE_DURATIONS[phase]) * 100;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-slate-700" />
            <h3 className="text-base font-semibold text-slate-900">
              Timer de Estudo (1 Hora) · Dia {dayPlan.day}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Phase Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-100 text-xs font-medium">
          <button
            onClick={() => switchPhase('review')}
            className={`flex-1 py-3 text-center transition-colors ${
              phase === 'review'
                ? 'bg-white text-slate-900 font-semibold border-b-2 border-slate-900'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            1. Revisão (10m)
          </button>
          <button
            onClick={() => switchPhase('practice')}
            className={`flex-1 py-3 text-center transition-colors ${
              phase === 'practice'
                ? 'bg-white text-slate-900 font-semibold border-b-2 border-slate-900'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            2. Prática (35m)
          </button>
          <button
            onClick={() => switchPhase('challenge')}
            className={`flex-1 py-3 text-center transition-colors ${
              phase === 'challenge'
                ? 'bg-white text-slate-900 font-semibold border-b-2 border-slate-900'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            3. Desafio (15m)
          </button>
        </div>

        {/* Timer Body */}
        <div className="p-6 text-center space-y-6">
          {sessionCompleted ? (
            <div className="py-6 space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-900">1 Hora de Estudo Cumprida!</h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Parabéns pela consistência. O hábito diário de 1 hora transforma suporte técnico em raciocínio analítico de alto impacto.
              </p>
              <button
                onClick={() => {
                  setSessionCompleted(false);
                  switchPhase('review');
                }}
                className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
              >
                Reiniciar Ciclo
              </button>
            </div>
          ) : (
            <>
              {/* Active phase metadata */}
              <div className="space-y-1">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {PHASE_NAMES[phase].tag}
                </div>
                <h4 className="text-lg font-bold text-slate-900">
                  {PHASE_NAMES[phase].title}
                </h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  {phase === 'review' && dayPlan.timeSchedule.review10m}
                  {phase === 'practice' && dayPlan.timeSchedule.practice35m}
                  {phase === 'challenge' && dayPlan.timeSchedule.challenge15m}
                </p>
              </div>

              {/* Digital Clock Display */}
              <div className="relative py-4">
                <div className="text-6xl font-mono font-bold tracking-tight text-slate-900 tabular-nums">
                  {formatTime(timeLeft)}
                </div>
                {/* Visual Progress Bar */}
                <div className="w-full bg-slate-200 h-1.5 rounded-full mt-4 overflow-hidden">
                  <div
                    className="bg-slate-900 h-full transition-all duration-500 ease-out"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Action Controls */}
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={resetTimer}
                  className="p-3 text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                  title="Reiniciar tempo da fase"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>

                <button
                  onClick={toggleTimer}
                  className={`px-8 py-3 rounded-lg font-medium text-white flex items-center gap-2 transition-colors ${
                    isActive ? 'bg-amber-600 hover:bg-amber-700' : 'bg-slate-900 hover:bg-slate-800'
                  }`}
                >
                  {isActive ? (
                    <>
                      <Pause className="w-5 h-5" /> Pausar
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5" /> {timeLeft === PHASE_DURATIONS[phase] ? 'Iniciar Estudo' : 'Continuar'}
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    if (phase === 'review') switchPhase('practice');
                    else if (phase === 'practice') switchPhase('challenge');
                    else if (phase === 'challenge') setSessionCompleted(true);
                  }}
                  className="p-3 text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                  title="Avançar para a próxima fase"
                >
                  <SkipForward className="w-5 h-5" />
                </button>
              </div>

              <div className="pt-2 text-xs text-slate-400 flex items-center justify-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5" />
                <span>Sinal sonoro suave ao término de cada fase de estudo</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
