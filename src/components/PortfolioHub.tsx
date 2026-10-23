/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  FileText,
  Copy,
  Check,
  Download,
  Presentation,
  Briefcase,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ExternalLink,
} from 'lucide-react';
import { EVALUATION_CHECKLIST_ITEMS } from '../data/studyPlanData';

interface PortfolioHubProps {
  evaluationChecklist: Record<string, boolean>;
  onToggleChecklistItem: (id: string) => void;
}

export const PortfolioHub: React.FC<PortfolioHubProps> = ({
  evaluationChecklist,
  onToggleChecklistItem,
}) => {
  const [copied, setCopied] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);

  const PORTFOLIO_MARKDOWN = `# Projeto de Portfólio: Análise de Chamados de Suporte Técnico (Helpdesk Analytics)

## 1. Visão Geral e Contexto de Negócio
- **Autor:** Eduardo (Transição de Suporte Técnico para Análise de Dados & BI)
- **Ferramentas:** Excel, SQL (PostgreSQL/SQLite), Power BI Desktop
- **Base de Dados:** 50 chamados de TI fictícios e anonimizados (em conformidade com LGPD)

## 2. O Problema
Identificar quais categorias de chamados aparecem com maior frequência e quais demandam maior tempo de resolução (MTTR), a fim de otimizar o tempo da equipe de TI e reduzir paradas operacionais nos departamentos solicitantes.

## 3. Metodologia & Etapas
1. **Excel:** Higienização dos dados brutos, criação de referências estruturadas e cálculos com SOMA, MÉDIA e CONT.SE.
2. **SQL:** Consultas analíticas com GROUP BY, agregações e ordenações para identificar gargalos em grandes volumes.
3. **Power BI:** Modelagem de dados no Power Query, medidas em DAX (Total Chamados, Tempo Médio, % Cumprimento de SLA) e criação de dashboard executivo interativo com segmentações de dados.

## 4. Principais Indicadores Encontrados (KPIs)
- **Volume Total Analisado:** 50 chamados
- **Tempo Médio de Resolução (MTTR):** ~4.2 horas
- **Taxa de Cumprimento de SLA:** 78% (Abaixo da meta de 85%)
- **Média Geral de CSAT (Satisfação):** 4.2 / 5.0

## 5. Três Conclusões e Ações de Negócio
1. **Gargalo de Acesso & Rede:** As categorias "Acesso & Segurança" e "Rede" representam quase 40% do volume. Incidentes de reset de senha e liberação de VPN consomem tempo operacional repetitivo.
   *Ação proposta:* Implementar portal de autoatendimento para redefinição de senhas com autenticação em duas etapas, economizando cerca de 30 horas/mês dos analistas.
2. **Severidade em Sistemas & ERP:** Embora represente menor quantidade de chamados que redes, o ERP Protheus concentra o maior tempo médio (superior a 7 horas por ticket) e menor satisfação do usuário (CSAT 2.8).
   *Ação proposta:* Revisão de deadlocks de banco de dados junto à software house e treinamento de fechamento fiscal para o time Financeiro.
3. **Falsa Urgência em Impressoras e Hardware:** 30% dos chamados marcados como "Alta Prioridade" em impressão eram apenas atolamentos simples de papel ou troca de toner.
   *Ação proposta:* Triagem inteligente no formulário de abertura e afixação de guias visuais ao lado das impressoras departamentais.

## 6. Como Executar Este Projeto
- Baixe o arquivo \`chamados_suporte_tecnico_ficticios.csv\` no repositório.
- Execute o script \`analise_chamados.sql\` no seu SGBD preferido.
- Abra o arquivo \`helpdesk_analytics.pbix\` no Power BI Desktop.
`;

  const SCRIPT_5_MINUTES = `ROTEIRO DE APRESENTAÇÃO DE 5 MINUTOS (ENTREVISTA DE EMPREGO)

[00:00 - 01:00] INTRODUÇÃO & CONTEXTO
"Olá! Eu desenvolvi este projeto de Análise de Chamados de TI para unir minha vivência prática de suporte técnico com a análise de dados e BI. No dia a dia de TI, a gente costuma apagar incêndios e fechar tickets individuais. Meu objetivo aqui foi dar um passo para trás e responder: onde a TI está perdendo mais tempo e como podemos evitar que esses problemas se repitam?"

[01:00 - 02:30] DADOS & METODOLOGIA (EXCEL -> SQL -> POWER BI)
"Estruturei uma base de 50 chamados com métricas reais de operação: tempo de resolução em horas, cumprimento de SLA, departamento e CSAT.
No Excel, usei fórmulas estatísticas e tabelas dinâmicas para a primeira exploração.
No SQL, escrevi consultas com GROUP BY e funções agregadoras para validar o volume e os maiores gargalos.
Por fim, no Power BI, criei um painel executivo com Power Query e medidas DAX, permitindo que a liderança filtre por setor ou prioridade com um clique."

[02:30 - 04:00] OS 3 PRINCIPAIS INSIGHTS
"Encontrei 3 pontos centrais:
Primeiro: Quase 40% dos chamados eram de VPN e Reset de Senha. Tarefas simples que roubavam tempo da equipe. Minha recomendação foi criar um portal de autoatendimento.
Segundo: O ERP era o verdadeiro vilão de produtividade, com tempo médio superior a 7 horas e baixo CSAT no financeiro. Aqui a ação não era culpar o usuário, mas agendar um alinhamento com a fornecedora do ERP para corrigir lentidões.
Terceiro: Identifiquei desvios na marcação de prioridade em chamados de impressora, propondo melhoria no formulário de triagem."

[04:00 - 05:00] CONCLUSÃO & VALOR PARA A EMPRESA
"Esse projeto me ensinou a conectar dados operacionais com impacto de negócio e economia de custos. É exatamente essa visão preventiva e orientada a dados que quero levar para a equipe de vocês como Analista de BI Júnior. Obrigado!"`;

  const copyFullMarkdown = () => {
    navigator.clipboard.writeText(PORTFOLIO_MARKDOWN);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyPresentationScript = () => {
    navigator.clipboard.writeText(SCRIPT_5_MINUTES);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  const downloadMarkdownFile = () => {
    const blob = new Blob([PORTFOLIO_MARKDOWN], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'README_Projeto_Helpdesk_Analytics.md');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const completedChecklistCount = Object.values(evaluationChecklist).filter(Boolean).length;
  const readinessPercent = Math.round((completedChecklistCount / EVALUATION_CHECKLIST_ITEMS.length) * 100);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-500 tracking-wider uppercase">
              Semana 4 · Consolidação Profissional
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Portfólio & Preparação de Carreira
            </h1>
            <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
              Transforme seus 30 dias de aprendizado em um portfólio comprovável. Aqui você encontra a documentação pronta do seu projeto, o roteiro da apresentação de 5 minutos e o checklist de prontidão do Dia 30.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={copyFullMarkdown}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-xs"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copiado!' : 'Copiar README.md'}</span>
            </button>

            <button
              onClick={downloadMarkdownFile}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>Baixar Arquivo README</span>
            </button>
          </div>
        </div>
      </div>

      {/* Part 1: Day 30 Evaluation Checklist */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Avaliação de Progresso no Dia 30</span>
            </h2>
            <p className="text-xs text-slate-500">
              Marque os critérios que você atingiu ao final dos 30 dias para checar seu nível de prontidão:
            </p>
          </div>

          {/* Readiness gauge */}
          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 px-4 py-2 rounded-lg shrink-0">
            <div className="text-right">
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">Prontidão</span>
              <span className="text-sm font-bold text-slate-900">{completedChecklistCount} de 6 critérios</span>
            </div>
            <div className="text-2xl font-mono font-bold text-slate-900 tabular-nums">
              {readinessPercent}%
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {EVALUATION_CHECKLIST_ITEMS.map((item) => {
            const isChecked = !!evaluationChecklist[item.id];
            return (
              <div
                key={item.id}
                onClick={() => onToggleChecklistItem(item.id)}
                className={`p-3.5 rounded-lg border cursor-pointer transition-colors flex items-start gap-3 ${
                  isChecked
                    ? 'bg-emerald-50/60 border-emerald-200 text-slate-900'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {}} // handled by parent div
                  className="mt-0.5 rounded text-slate-900 focus:ring-0 cursor-pointer"
                />
                <div className="text-xs">
                  <div className="font-medium leading-relaxed">{item.text}</div>
                  <div className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5">
                    {item.category}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {readinessPercent === 100 && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <span className="font-bold block">Parabéns! Todos os 6 critérios foram cumpridos.</span>
              <span>Você possui a base inicial completa para iniciar candidaturas a vagas Júnior de BI e Dados.</span>
            </div>
          </div>
        )}
      </div>

      {/* Part 2: The 3 Key Business Insights (Storytelling) */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-600" />
          <h2 className="text-base font-bold text-slate-900">
            As Três Conclusões de Negócio do Projeto (Dia 26)
          </h2>
        </div>
        <p className="text-xs text-slate-600">
          Recrutadores avaliam se você sabe conectar gráficos a ações práticas. Estas são as 3 conclusões formuladas a partir dos dados dos 50 chamados:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-2">
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
            <span className="font-bold text-slate-900 block text-sm">
              1. Gargalo de Acesso & Rede
            </span>
            <p className="text-slate-600 leading-relaxed">
              <b>Evidência:</b> 38% do volume total de chamados concentram-se em reset de senha, VPN e permissões de pasta.
            </p>
            <p className="text-slate-800 font-medium">
              <b>Ação proposta:</b> Criar portal de autoatendimento para senhas e cartilha de acesso remoto. Economia estimada de 30h/mês da equipe técnica.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
            <span className="font-bold text-slate-900 block text-sm">
              2. Severidade no Módulo ERP
            </span>
            <p className="text-slate-600 leading-relaxed">
              <b>Evidência:</b> Chamados de ERP têm o maior tempo médio (7.4h) e o menor índice de satisfação do usuário (CSAT 2.8).
            </p>
            <p className="text-slate-800 font-medium">
              <b>Ação proposta:</b> Abertura de chamado de melhoria com o fornecedor do software para mitigar lentidões e treinamento para o setor Financeiro.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
            <span className="font-bold text-slate-900 block text-sm">
              3. Falsa Urgência em Impressão
            </span>
            <p className="text-slate-600 leading-relaxed">
              <b>Evidência:</b> Incidentes de toner e papel atolado frequentemente eram abertos como "Prioridade Alta" sem necessidade.
            </p>
            <p className="text-slate-800 font-medium">
              <b>Ação proposta:</b> Implementar triagem guiada no formulário de chamados e instruções visuais passo a passo coladas nas impressoras.
            </p>
          </div>
        </div>
      </div>

      {/* Part 3: 5-Minute Presentation Script (Dia 28) */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Presentation className="w-5 h-5 text-slate-700" />
            <h2 className="text-base font-bold text-slate-900">
              Roteiro de Apresentação em 5 Minutos (Dia 28)
            </h2>
          </div>
          <button
            onClick={copyPresentationScript}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            {copiedScript ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedScript ? 'Copiado!' : 'Copiar Roteiro'}</span>
          </button>
        </div>

        <p className="text-xs text-slate-600">
          Use este roteiro para treinar sua fala em entrevistas com gestores técnicos e recrutadores:
        </p>

        <div className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-xs leading-relaxed whitespace-pre-wrap max-h-72 overflow-y-auto">
          {SCRIPT_5_MINUTES}
        </div>
      </div>

      {/* Part 4: Career Transition Strategy (Dia 29 & 30) */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-slate-700" />
          <h2 className="text-base font-bold text-slate-900">
            Estratégia de Currículo: De Suporte a Analista Júnior (Dia 29)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
            <span className="font-bold text-slate-900 block text-sm">
              Como Reescrever Suas Conquistas de Suporte
            </span>
            <ul className="space-y-2 text-slate-600">
              <li>
                <span className="line-through text-slate-400 block">"Atendia chamados de usuários no helpdesk"</span>
                <span className="text-slate-900 font-medium block">
                  👉 "Monitorava fila de atendimento e analisava indicadores operacionais de SLA e MTTR para redução de reincidências de tickets."
                </span>
              </li>
              <li>
                <span className="line-through text-slate-400 block">"Criei uma planilha para controlar os chamados"</span>
                <span className="text-slate-900 font-medium block">
                  👉 "Desenvolvi modelo tabular no Excel e consultas SQL para mapear gargalos de infraestrutura e apoiar tomadas de decisão da coordenação."
                </span>
              </li>
            </ul>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
            <span className="font-bold text-slate-900 block text-sm">
              Requisitos Mais Pedidos nas Vagas Júnior
            </span>
            <div className="space-y-1.5 text-slate-700">
              <div className="flex justify-between">
                <span>Power BI (Relatórios e DAX básico)</span>
                <span className="font-mono font-bold text-slate-900">90% das vagas</span>
              </div>
              <div className="flex justify-between">
                <span>SQL (SELECT, WHERE, JOINs, GROUP BY)</span>
                <span className="font-mono font-bold text-slate-900">85% das vagas</span>
              </div>
              <div className="flex justify-between">
                <span>Excel (Tabelas Dinâmicas, PROCV/X, Fórmulas)</span>
                <span className="font-mono font-bold text-slate-900">80% das vagas</span>
              </div>
              <div className="flex justify-between">
                <span>Visão de Negócio & Comunicação (Soft Skills)</span>
                <span className="font-mono font-bold text-slate-900">100% essencial</span>
              </div>
            </div>
            <div className="pt-2 text-[11px] text-slate-500">
              Sua experiência em suporte cobre 100% da parte de comunicação com usuários e entendimento de sistemas de TI!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
