/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface DayPlan {
  day: number;
  week: number;
  title: string;
  summary: string;
  tool: 'excel' | 'sql' | 'powerbi' | 'portfolio' | 'career';
  goal: string;
  timeSchedule: {
    review10m: string;
    practice35m: string;
    challenge15m: string;
  };
  keyConcepts: string[];
  resources: { name: string; url: string; description: string }[];
  challenge: {
    prompt: string;
    hint: string;
    solution: string;
  };
  deliverableOfWeek: string;
}

export const STUDY_PLAN: DayPlan[] = [
  // SEMANA 1 — Fundamentos e Excel (Dias 1 a 7)
  {
    day: 1,
    week: 1,
    title: 'Entender o trabalho de um analista de dados e o que é BI',
    summary: 'Compreender a diferença entre suporte operacional e análise de dados, entendendo o ciclo de vida dos dados e o conceito de Business Intelligence.',
    tool: 'excel',
    goal: 'Mapear como a vivência de suporte técnico (chamados, SLAs, métricas de atendimento) é a matéria-prima perfeita para Business Intelligence.',
    timeSchedule: {
      review10m: 'Reflexão sobre os chamados que você já atendeu no suporte: quais problemas repetem mais? Quem pede mais ajuda?',
      practice35m: 'Estudar os pilares de BI: Coleta de Dados -> Limpeza/Tratamento -> Modelagem -> Visualização -> Tomada de Decisão.',
      challenge15m: 'Escreva em 3 linhas a diferença entre responder um chamado e analisar os chamados do mês.',
    },
    keyConcepts: ['Dado vs Informação', 'Ciclo do BI', 'Métricas Operacionais vs Estratégicas', 'SLA (Service Level Agreement)'],
    resources: [
      { name: 'O que é Business Intelligence (Microsoft)', url: 'https://learn.microsoft.com/pt-br/power-bi/fundamentals/power-bi-overview', description: 'Visão geral oficial sobre como dados apoiam decisões' },
      { name: 'Documentação do Excel', url: 'https://support.microsoft.com/pt-br/excel', description: 'Portal de suporte com guias introdutórios' }
    ],
    challenge: {
      prompt: 'Qual a principal diferença entre um analista de suporte N1/N2 e um analista de dados/BI olhando para a mesma fila de chamados?',
      hint: 'O suporte resolve o problema do usuário individual; o analista procura a causa raiz recorrente para a diretoria.',
      solution: 'O suporte foca em "resolver o chamado rápido para fechar o ticket individual". O analista de BI foca em "identificar por que esse chamado aconteceu 40 vezes no mês e qual ação preventiva poupa tempo da empresa".'
    },
    deliverableOfWeek: 'Planilha organizada com fórmulas, indicadores e pelo menos um gráfico de chamados técnicos.'
  },
  {
    day: 2,
    week: 1,
    title: 'Criar uma tabela fictícia de chamados técnicos no Excel',
    summary: 'Estruturar dados tabulares com cabeçalhos padronizados, tipos de dados corretos e formatação profissional.',
    tool: 'excel',
    goal: 'Aprender a organizar colunas essenciais de helpdesk: ID, Categoria, Prioridade, Status, Tempo (h) e Departamento.',
    timeSchedule: {
      review10m: 'Rever os campos essenciais de um sistema de ITSM/Service Desk (ex: Jira, GLPI, Zendesk, ServiceNow).',
      practice35m: 'No Excel, criar ou importar a tabela de chamados fictícios. Formatar como Tabela oficial (Ctrl + Alt + T ou Inserir > Tabela).',
      challenge15m: 'Verificar se todas as colunas numéricas estão com tipo número e se não há textos truncados ou espaços extras.',
    },
    keyConcepts: ['Estrutura Tabular (Linha = Registro, Coluna = Atributo)', 'Formatar como Tabela', 'Tipos de Dados (Texto, Número, Data)'],
    resources: [
      { name: 'Criar e formatar tabelas no Excel', url: 'https://support.microsoft.com/pt-br/office/criar-e-formatar-tabelas-e81aa349-b006-4fb7-a980-004b14649e70', description: 'Guia oficial Microsoft sobre tabelas estruturadas' }
    ],
    challenge: {
      prompt: 'Por que é importante usar a função "Formatar como Tabela" do Excel em vez de apenas pintar as células manualmente?',
      hint: 'Pense em como novas linhas recebem fórmulas automaticamente e como referências estruturadas facilitam o trabalho.',
      solution: 'Formatar como Tabela cria referências estruturadas (ex: Tabela[Tempo]), expande fórmulas automaticamente para novas linhas e facilita conexões dinâmicas com Power BI.'
    },
    deliverableOfWeek: 'Planilha organizada com fórmulas, indicadores e pelo menos um gráfico de chamados técnicos.'
  },
  {
    day: 3,
    week: 1,
    title: 'Praticar SOMA, MÉDIA, CONT.SE e CONT.VALORES',
    summary: 'Dominar as fórmulas matemáticas e estatísticas condicionais essenciais para quantificar indicadores de suporte.',
    tool: 'excel',
    goal: 'Calcular o total de horas gastas, tempo médio de atendimento e quantidade de chamados da categoria Rede e Acesso.',
    timeSchedule: {
      review10m: 'Rever a sintaxe das fórmulas no Excel em Português: =SOMA(), =MÉDIA(), =CONT.SE(), =CONT.VALORES().',
      practice35m: 'Criar um bloco de métricas: =MÉDIA(F2:F51) para tempo médio, =CONT.SE(C2:C51; "Rede") para chamados de rede.',
      challenge15m: 'Calcular a contagem de chamados com prioridade "Crítica" usando =CONT.SE().',
    },
    keyConcepts: ['=SOMA() / SUM', '=MÉDIA() / AVERAGE', '=CONT.SE() / COUNTIF', '=CONT.VALORES() / COUNTA', 'Intervalo e Critério'],
    resources: [
      { name: 'Função CONT.SE (Microsoft)', url: 'https://support.microsoft.com/pt-br/office/fun%C3%A7%C3%A3o-cont-se-e0de10c6-f885-4e71-abb4-1f464816df34', description: 'Como contar células baseadas em um critério específico' }
    ],
    challenge: {
      prompt: 'Qual fórmula calcula quantos chamados tiveram tempo de resolução maior que 5 horas?',
      hint: 'O critério no CONT.SE deve vir entre aspas com operador de comparação.',
      solution: '=CONT.SE(F2:F51; ">5") ou em tabela estruturada =CONT.SE(TabelaChamados[Tempo_Horas]; ">5")'
    },
    deliverableOfWeek: 'Planilha organizada com fórmulas, indicadores e pelo menos um gráfico de chamados técnicos.'
  },
  {
    day: 4,
    week: 1,
    title: 'Aprender filtros, ordenação e tabelas dinâmicas',
    summary: 'Agrupar dados rapidamente sem precisar de dezenas de fórmulas manuais usando Tabelas Dinâmicas (Pivot Tables).',
    tool: 'excel',
    goal: 'Criar uma Tabela Dinâmica que cruze Categoria nas linhas com Média de Tempo de Resolução nos valores.',
    timeSchedule: {
      review10m: 'Rever a utilidade do filtro tradicional (AutoFiltro) e suas limitações para resumos gerenciais.',
      practice35m: 'Inserir > Tabela Dinâmica. Arrastar Categoria para Linhas, ID para Valores (Contagem) e Tempo para Valores (Média).',
      challenge15m: 'Mudar a exibição do tempo de resolução na tabela dinâmica de Soma para Média e formatar com 1 casa decimal.',
    },
    keyConcepts: ['Tabela Dinâmica (Pivot Table)', 'Campos de Linhas e Colunas', 'Configurações do Campo de Valor (Média vs Soma)', 'Segmentação de Dados (Slicer)'],
    resources: [
      { name: 'Criar uma Tabela Dinâmica no Excel', url: 'https://support.microsoft.com/pt-br/office/criar-uma-tabela-din%C3%A2mica-para-analisar-dados-da-planilha-a9a84538-bfe9-40a9-a8e9-f99134456576', description: 'Tutorial passo a passo da Microsoft com imagens e vídeos' }
    ],
    challenge: {
      prompt: 'Na Tabela Dinâmica, como você troca uma coluna que veio por padrão como "Soma de Tempo" para "Média de Tempo"?',
      hint: 'Clique com botão direito sobre o valor ou na seta do campo na lista de campos da tabela dinâmica.',
      solution: 'Clique na seta ao lado do campo na área "Valores" -> selecione "Configurações do Campo de Valor" -> escolha "Média" em vez de "Soma".'
    },
    deliverableOfWeek: 'Planilha organizada com fórmulas, indicadores e pelo menos um gráfico de chamados técnicos.'
  },
  {
    day: 5,
    week: 1,
    title: 'Criar gráficos de chamados por categoria e prioridade',
    summary: 'Escolher a visualização adequada para cada tipo de pergunta: barras para ranking de categorias e colunas para prioridades.',
    tool: 'excel',
    goal: 'Construir gráficos limpos, com títulos claros e rótulos de dados legíveis, eliminando ruídos visuais desnecessários.',
    timeSchedule: {
      review10m: 'Boas práticas de visualização: evitar gráficos de pizza com mais de 3 fatias; priorizar barras horizontais para categorias.',
      practice35m: 'Criar Gráfico Dinâmico de barras com as categorias ordenadas da maior para a menor quantidade de chamados.',
      challenge15m: 'Adicionar rótulo de dados no gráfico e remover linhas de grade excessivas para deixar a visualização limpa.',
    },
    keyConcepts: ['Gráfico de Barras vs Colunas', 'Ordenação Visual', 'Decluttering (Limpeza de Ruídos Visuais)', 'Rótulos de Dados'],
    resources: [
      { name: 'Criar um gráfico no Excel do início ao fim', url: 'https://support.microsoft.com/pt-br/office/criar-um-gr%C3%A1fico-do-in%C3%ADcio-ao-fim-0baf399e-dd61-4e18-8a73-b3fd5d5680c2', description: 'Manual prático de construção e estilização de gráficos' }
    ],
    challenge: {
      prompt: 'Por que o gráfico de barras horizontais é preferível ao gráfico de colunas verticais quando os nomes das categorias são longos (ex: "Acesso & Segurança", "Sistemas & ERP")?',
      hint: 'Observe a legibilidade dos textos no eixo X vs eixo Y.',
      solution: 'Barras horizontais permitem ler rótulos textuais longos na horizontal sem inclinar a cabeça ou cortar palavras, facilitando a interpretação imediata.'
    },
    deliverableOfWeek: 'Planilha organizada com fórmulas, indicadores e pelo menos um gráfico de chamados técnicos.'
  },
  {
    day: 6,
    week: 1,
    title: 'Calcular indicadores e responder perguntas sobre os dados',
    summary: 'Atuar como um analista de negócio respondendo: Qual departamento consome mais horas de TI? Qual técnico tem melhor CSAT?',
    tool: 'excel',
    goal: 'Elaborar respostas quantitativas precisas para perguntas operacionais de liderança.',
    timeSchedule: {
      review10m: 'Rever a diferença entre dado bruto e insight acionável.',
      practice35m: 'Cruzar departamento x tempo médio e técnico x chamados resolvidos na tabela dinâmica.',
      challenge15m: 'Escrever 2 frases executivas com as principais conclusões encontradas nos números da planilha.',
    },
    keyConcepts: ['KPIs de Suporte (MTTR - Tempo Médio para Resolução)', 'CSAT (Customer Satisfaction)', 'Taxa de Cumprimento de SLA'],
    resources: [
      { name: 'Guia de Fórmulas Estatísticas no Excel', url: 'https://support.microsoft.com/pt-br/office/fun%C3%A7%C3%B5es-estat%C3%ADsticas-refer%C3%AAncia-624dac86-a375-4435-bc25-76d659719ffd', description: 'Referência de funções analíticas' }
    ],
    challenge: {
      prompt: 'Se o departamento Financeiro consome 40% das horas totais da TI com problemas de ERP, qual recomendação acionável você daria para o gestor de TI?',
      hint: 'Pense em capacitação do usuário, reunião com o fornecedor de software ou revisão de processos.',
      solution: 'Recomendar treinamento específico no módulo ERP para a equipe financeira e abrir chamado de melhoria com a software house para investigar lentidões na conciliação bancária.'
    },
    deliverableOfWeek: 'Planilha organizada com fórmulas, indicadores e pelo menos um gráfico de chamados técnicos.'
  },
  {
    day: 7,
    week: 1,
    title: 'Revisar o conteúdo e salvar a primeira versão do projeto',
    summary: 'Consolidar a primeira entrega: planilha limpa, formatada, com fórmulas validadas e gráficos bem configurados.',
    tool: 'excel',
    goal: 'Garantir que a planilha de suporte técnico seja o alicerce para as consultas SQL da próxima semana.',
    timeSchedule: {
      review10m: 'Checar consistência de todos os valores e totais calculados.',
      practice35m: 'Organizar a planilha em duas abas: "Base_Chamados" (dados brutos) e "Painel_Resumo" (indicadores e gráficos).',
      challenge15m: 'Salvar uma cópia da planilha no formato CSV (para importar facilmente no banco de dados e Power BI).',
    },
    keyConcepts: ['Boas Práticas de Organização em Abas', 'Integridade dos Dados', 'Exportação CSV vs XLSX', 'Versionamento de Arquivos'],
    resources: [
      { name: 'Exportar dados para CSV no Excel', url: 'https://support.microsoft.com/pt-br/office/salvar-uma-pasta-de-trabalho-no-formato-de-texto-txt-ou-csv-3e9a9d6c-70da-4255-aa28-fcacf1f081e6', description: 'Como gerar arquivos planos compatíveis com SQL' }
    ],
    challenge: {
      prompt: 'Qual a importância de separar os dados brutos (Base_Chamados) das análises e gráficos (Painel_Resumo) em abas diferentes?',
      hint: 'Pense em manutenção futura quando novos dados forem adicionados.',
      solution: 'Evita poluição visual, protege os dados originais contra exclusões acidentais e facilita atualizar a base mensalmente sem quebrar o layout das análises.'
    },
    deliverableOfWeek: 'Planilha organizada com fórmulas, indicadores e pelo menos um gráfico de chamados técnicos.'
  },

  // SEMANA 2 — SQL Básico (Dias 8 a 14)
  {
    day: 8,
    week: 2,
    title: 'Entender bancos de dados, tabelas, linhas e colunas',
    summary: 'Fazer o paralelo mental entre planilhas do Excel e bancos de dados relacionais (RDBMS).',
    tool: 'sql',
    goal: 'Compreender por que empresas armazenam chamados em bancos de dados relacionais em vez de planilhas locais.',
    timeSchedule: {
      review10m: 'Conectar a planilha criada na Semana 1 com o conceito de Tabela no SQL: Linhas = Tuplas/Registros, Colunas = Campos/Atributos.',
      practice35m: 'Acessar o SQLBolt e ler as lições introdutórias sobre tabelas relacionais.',
      challenge15m: 'Listar mentalmente quais seriam as chaves primárias (IDs únicos) da tabela de chamados.',
    },
    keyConcepts: ['Bancos Relacionais (RDBMS)', 'Tabelas, Linhas e Colunas', 'Chave Primária (Primary Key)', 'Tipos SQL: INT, VARCHAR, DECIMAL, DATE'],
    resources: [
      { name: 'SQLBolt - Lição 1: Introdução ao SQL', url: 'https://sqlbolt.com/lesson/introduction', description: 'Plataforma interativa gratuita para aprender SQL no navegador' }
    ],
    challenge: {
      prompt: 'Qual o papel da coluna "id" (ex: CHAM-1001) em uma tabela de banco de dados relacional?',
      hint: 'Pense em garantia de unicidade e relacionamento entre tabelas.',
      solution: 'Atua como Chave Primária (Primary Key), garantindo que cada chamado seja identificado de forma única sem duplicidade no sistema.'
    },
    deliverableOfWeek: 'Conjunto de consultas SQL que identifique categorias frequentes, quantidade de chamados e tempo médio de resolução.'
  },
  {
    day: 9,
    week: 2,
    title: 'Aprender SELECT e FROM',
    summary: 'A estrutura básica de toda consulta SQL: escolher quais colunas exibir e de qual tabela buscar os dados.',
    tool: 'sql',
    goal: 'Escrever as primeiras consultas SQL: SELECT * FROM chamados e selecionar colunas específicas.',
    timeSchedule: {
      review10m: 'Memorizar a sintaxe: SELECT [colunas] FROM [tabela];',
      practice35m: 'Praticar no SQLBolt e no SQL Lab integrado deste aplicativo consultando a tabela `chamados`.',
      challenge15m: 'Escrever uma consulta que traga apenas o ID, Titulo, Categoria e Tempo_Horas da tabela chamados.',
    },
    keyConcepts: ['SELECT', 'FROM', 'Aliases com AS', 'LIMIT para restringir volume'],
    resources: [
      { name: 'SQLBolt - Lição 1 e 2: Queries SELECT', url: 'https://sqlbolt.com/lesson/select_queries_introduction', description: 'Exercícios práticos de projeção de colunas' }
    ],
    challenge: {
      prompt: 'Escreva a query SQL para listar o id, departamento e tempo_horas de todos os chamados da tabela chamados.',
      hint: 'Separe as colunas por vírgula logo após o SELECT.',
      solution: 'SELECT id, departamento, tempo_horas FROM chamados;'
    },
    deliverableOfWeek: 'Conjunto de consultas SQL que identifique categorias frequentes, quantidade de chamados e tempo médio de resolução.'
  },
  {
    day: 10,
    week: 2,
    title: 'Praticar filtros com WHERE',
    summary: 'Filtrar registros no banco usando operadores de comparação e lógica booleana (=, !=, >, <, AND, OR, LIKE).',
    tool: 'sql',
    goal: 'Extrair apenas chamados críticos, chamados de Rede ou chamados que demoraram mais de 5 horas.',
    timeSchedule: {
      review10m: 'Comparar com o filtro do Excel: o WHERE filtra os dados ANTES de trazê-los para a tela.',
      practice35m: 'Executar queries com WHERE categoria = "Rede", WHERE prioridade = "Crítica" AND sla_cumprido = 0.',
      challenge15m: 'Consultar todos os chamados com tempo_horas maior que 4 horas E prioridade Alta.',
    },
    keyConcepts: ['Cláusula WHERE', 'Operadores lógicos (AND, OR, NOT)', 'Comparações (=, <>, >, <, >=, <=)', 'Filtro de texto com aspas'],
    resources: [
      { name: 'SQLBolt - Lição 2 e 3: Queries com Restrições (WHERE)', url: 'https://sqlbolt.com/lesson/select_queries_with_constraints', description: 'Aprenda operadores numéricos e de texto' }
    ],
    challenge: {
      prompt: 'Como filtrar chamados que sejam da categoria "Sistemas & ERP" OU que tenham prioridade "Crítica"?',
      hint: 'Utilize o operador OR.',
      solution: "SELECT * FROM chamados WHERE categoria = 'Sistemas & ERP' OR prioridade = 'Crítica';"
    },
    deliverableOfWeek: 'Conjunto de consultas SQL que identifique categorias frequentes, quantidade de chamados e tempo médio de resolução.'
  },
  {
    day: 11,
    week: 2,
    title: 'Ordenar resultados com ORDER BY',
    summary: 'Organizar a saída da consulta de forma crescente (ASC) ou decrescente (DESC), facilitando encontrar os maiores gargalos.',
    tool: 'sql',
    goal: 'Identificar os chamados mais demorados do suporte ordenando por tempo_horas decrescente.',
    timeSchedule: {
      review10m: 'Rever a ordem das cláusulas: SELECT -> FROM -> WHERE -> ORDER BY.',
      practice35m: 'Executar queries com ORDER BY tempo_horas DESC e combinar com LIMIT 5 para pegar os "Top 5 maiores incidentes".',
      challenge15m: 'Ordenar os chamados por categoria alfabeticamente (ASC) e, em caso de empate, por tempo_horas decrescente (DESC).',
    },
    keyConcepts: ['ORDER BY', 'ASC (Ascendente - padrão)', 'DESC (Decrescente)', 'Múltiplas colunas de ordenação', 'LIMIT / TOP'],
    resources: [
      { name: 'SQLBolt - Lição 5: Consultas simples com ORDER BY', url: 'https://sqlbolt.com/lesson/select_queries_review', description: 'Exercícios práticos de ordenação' }
    ],
    challenge: {
      prompt: 'Qual query retorna os 3 chamados que demoraram mais tempo para serem resolvidos?',
      hint: 'Ordene por tempo_horas decrescente e restrinja a 3 linhas com LIMIT.',
      solution: 'SELECT id, titulo, categoria, tempo_horas FROM chamados ORDER BY tempo_horas DESC LIMIT 3;'
    },
    deliverableOfWeek: 'Conjunto de consultas SQL que identifique categorias frequentes, quantidade de chamados e tempo médio de resolução.'
  },
  {
    day: 12,
    week: 2,
    title: 'Agrupar informações com GROUP BY',
    summary: 'A base do Business Intelligence no SQL: agregar milhares de linhas em resumos por categoria, status ou departamento.',
    tool: 'sql',
    goal: 'Fazer em SQL exatamente o que a Tabela Dinâmica do Excel faz: agrupar chamados por Categoria.',
    timeSchedule: {
      review10m: 'Relembrar a Tabela Dinâmica da Semana 1: Categoria no campo de Linhas é o equivalente direto do GROUP BY categoria.',
      practice35m: 'Executar: SELECT categoria, COUNT(*) FROM chamados GROUP BY categoria;',
      challenge15m: 'Escrever uma query com GROUP BY departamento para ver quantos chamados cada setor abriu.',
    },
    keyConcepts: ['GROUP BY', 'Campos Dimensionais vs Campos Métricos', 'Regra de ouro: toda coluna não agregada no SELECT deve estar no GROUP BY'],
    resources: [
      { name: 'SQLBolt - Lição 11 e 12: Queries com Agregações e GROUP BY', url: 'https://sqlbolt.com/lesson/select_queries_with_aggregates_pt_2', description: 'Lição interativa essencial de agrupamento' }
    ],
    challenge: {
      prompt: 'Por que a query `SELECT categoria, prioridade, COUNT(*) FROM chamados GROUP BY categoria;` dá erro na maioria dos bancos SQL?',
      hint: 'Observe a coluna "prioridade" no SELECT e no GROUP BY.',
      solution: 'Porque a coluna "prioridade" foi solicitada no SELECT mas não está em nenhuma função agregadora (como COUNT) e não foi incluída no GROUP BY. A query correta deve ser: GROUP BY categoria, prioridade;'
    },
    deliverableOfWeek: 'Conjunto de consultas SQL que identifique categorias frequentes, quantidade de chamados e tempo médio de resolução.'
  },
  {
    day: 13,
    week: 2,
    title: 'Praticar COUNT, SUM e AVG',
    summary: 'Combinar funções de agregação numérica com agrupamento para extrair KPIs analíticos reais.',
    tool: 'sql',
    goal: 'Calcular o total de chamados, a soma total de horas gastas e o tempo médio de resolução por categoria.',
    timeSchedule: {
      review10m: 'Rever as funções agregadoras: COUNT(*) conta linhas; SUM(campo) soma números; AVG(campo) calcula média.',
      practice35m: 'Construir a query analítica completa: SELECT categoria, COUNT(*) as qtd, ROUND(AVG(tempo_horas), 1) as media_horas FROM chamados GROUP BY categoria ORDER BY media_horas DESC;',
      challenge15m: 'Adicionar a média de CSAT (satisfação) agrupada por técnico responsável.',
    },
    keyConcepts: ['COUNT()', 'SUM()', 'AVG()', 'ROUND() para arredondamento', 'Aliases descritivos com AS'],
    resources: [
      { name: 'SQLBolt - Lição 10: Funções Agregadas pt. 1', url: 'https://sqlbolt.com/lesson/select_queries_with_aggregates', description: 'Prática de COUNT, SUM, AVG, MIN, MAX' }
    ],
    challenge: {
      prompt: 'Escreva a query para calcular o tempo médio de resolução e o total de chamados para cada nível de prioridade (Baixa, Média, Alta, Crítica).',
      hint: 'Agrupe por prioridade e use AVG e COUNT.',
      solution: 'SELECT prioridade, COUNT(*) AS total_chamados, ROUND(AVG(tempo_horas), 1) AS tempo_medio FROM chamados GROUP BY prioridade ORDER BY tempo_medio DESC;'
    },
    deliverableOfWeek: 'Conjunto de consultas SQL que identifique categorias frequentes, quantidade de chamados e tempo médio de resolução.'
  },
  {
    day: 14,
    week: 2,
    title: 'Resolver exercícios e revisar os comandos aprendidos',
    summary: 'Consolidar as queries da Semana 2 em um roteiro analítico oficial para o projeto de portfólio.',
    tool: 'sql',
    goal: 'Criar um script `.sql` limpo com 4 consultas fundamentais que respondem as perguntas de negócio do suporte.',
    timeSchedule: {
      review10m: 'Revisar todo o ciclo SQL: SELECT -> FROM -> WHERE -> GROUP BY -> HAVING -> ORDER BY -> LIMIT.',
      practice35m: 'Organizar um bloco de 4 queries no SQL Lab deste aplicativo e salvar as anotações.',
      challenge15m: 'Identificar via SQL qual categoria teve a menor média de satisfação do usuário (CSAT).',
    },
    keyConcepts: ['Script SQL Documentado', 'Ordem de Execução do SQL', 'Comentários no código (-- ou /* */)', 'Validação de Resultados'],
    resources: [
      { name: 'SQL Tutorial W3Schools', url: 'https://www.w3schools.com/sql/', description: 'Referência rápida e dicionário de comandos' }
    ],
    challenge: {
      prompt: 'Qual a ordem correta em que o motor do banco de dados processa uma query: SELECT, FROM, WHERE, GROUP BY, ORDER BY?',
      hint: 'O banco primeiro descobre de onde ler os dados (FROM) e depois filtra as linhas (WHERE).',
      solution: 'A ordem lógica de processamento é: 1. FROM -> 2. WHERE -> 3. GROUP BY -> 4. HAVING -> 5. SELECT -> 6. ORDER BY -> 7. LIMIT.'
    },
    deliverableOfWeek: 'Conjunto de consultas SQL que identifique categorias frequentes, quantidade de chamados e tempo médio de resolução.'
  },

  // SEMANA 3 — Power BI (Dias 15 a 21)
  {
    day: 15,
    week: 3,
    title: 'Entender para que serve o Power BI e conhecer sua interface',
    summary: 'Compreender o ecossistema Power BI: Desktop, Serviço em Nuvem e Mobile, conhecendo as 3 visões principais da interface.',
    tool: 'powerbi',
    goal: 'Diferenciar o papel do Excel (planilha ad-hoc) e do Power BI (relatórios governados, interativos e automatizados).',
    timeSchedule: {
      review10m: 'Conectar com a trajetória: Excel (organizar dados) -> SQL (consultar dados) -> Power BI (comunicar dados para a diretoria).',
      practice35m: 'Explorar a interface: Painel de Relatório (telas e gráficos), Painel de Dados (tabelas) e Painel de Modelo (relacionamentos).',
      challenge15m: 'Identificar onde ficam as visualizações, os campos/dados e o painel de filtros na tela do Power BI.',
    },
    keyConcepts: ['Power BI Desktop vs Service', '3 Visões: Relatório, Dados, Modelo', 'Painel de Visualizações e Painel de Dados'],
    resources: [
      { name: 'Treinamento Oficial Microsoft Power BI', url: 'https://learn.microsoft.com/pt-br/training/powerplatform/power-bi/', description: 'Caminho de aprendizagem gratuito e oficial da Microsoft' },
      { name: 'Documentação do Power BI', url: 'https://learn.microsoft.com/pt-br/power-bi/', description: 'Guias de instalação e conceitos fundamentais' }
    ],
    challenge: {
      prompt: 'Por que o Power BI é mais recomendado que o Excel para apresentar relatórios mensais para gerentes e diretores?',
      hint: 'Pense em interatividade, atualização automática e segurança dos dados.',
      solution: 'O Power BI oferece filtragem cruzada interativa com um clique, pode se atualizar automaticamente sem enviar arquivos por e-mail e protege a base de dados original contra edições acidentais.'
    },
    deliverableOfWeek: 'Primeiro painel no Power BI com quantidade de chamados, tempo médio, categorias e prioridades.'
  },
  {
    day: 16,
    week: 3,
    title: 'Instalar ou acessar o Power BI e importar a planilha',
    summary: 'Configurar o ambiente de desenvolvimento e realizar a primeira importação da planilha de chamados.',
    tool: 'powerbi',
    goal: 'Importar a planilha CSV/XLSX de chamados de suporte técnico gerada na Semana 1.',
    timeSchedule: {
      review10m: 'Requisitos do Power BI Desktop (Windows). Se estiver em Mac/Linux: usar máquina virtual, Power BI Service via navegador ou o Power BI Studio interativo aqui.',
      practice35m: 'No Power BI Desktop: Início > Obter Dados > Texto/CSV ou Pasta de Trabalho do Excel. Selecionar o arquivo de chamados.',
      challenge15m: 'Verificar no navegador do Power BI se a pré-visualização das 50 linhas de chamados carregou perfeitamente.',
    },
    keyConcepts: ['Obter Dados (Get Data)', 'Conectores de Dados (CSV, Excel, SQL)', 'Carga Direta vs Transformar Dados'],
    resources: [
      { name: 'Baixar o Power BI Desktop (Microsoft Store)', url: 'https://www.microsoft.com/pt-br/p/power-bi-desktop/9ntr116h323l', description: 'Download gratuito oficial para Windows' },
      { name: 'Importar dados do Excel para o Power BI', url: 'https://learn.microsoft.com/pt-br/power-bi/connect-data/desktop-import-excel-workbooks', description: 'Tutorial passo a passo oficial' }
    ],
    challenge: {
      prompt: 'Ao importar uma planilha, por que você deve clicar em "Transformar Dados" em vez de clicar diretamente em "Carregar"?',
      hint: 'O que acontece se uma coluna tiver datas em formato texto ou valores numéricos com vírgula errada?',
      solution: 'Clicar em "Transformar Dados" abre o Power Query para verificar e corrigir tipos de dados, remover linhas nulas e padronizar textos ANTES que erros cheguem ao relatório final.'
    },
    deliverableOfWeek: 'Primeiro painel no Power BI com quantidade de chamados, tempo médio, categorias e prioridades.'
  },
  {
    day: 17,
    week: 3,
    title: 'Conhecer o Power Query e corrigir problemas simples nos dados',
    summary: 'Aprender ETL (Extract, Transform, Load): tipagem de dados, tratamento de nulos e remoção de colunas desnecessárias.',
    tool: 'powerbi',
    goal: 'Garantir que a coluna `tempo_horas` seja Número Decimal e `data_abertura` seja Data no Power Query.',
    timeSchedule: {
      review10m: 'Conceito de ETL: Extrair (Get Data) -> Transformar (Power Query) -> Carregar (Data Model).',
      practice35m: 'No editor do Power Query: promover cabeçalhos, alterar tipo de dados, remover espaços em branco (Aparar/Trim) e fechar & aplicar.',
      challenge15m: 'Observar a lista de "Etapas Aplicadas" no canto direito do Power Query e entender como ela grava cada transformação.',
    },
    keyConcepts: ['Power Query (M Language)', 'Etapas Aplicadas (Applied Steps)', 'Tipagem Correta (Decimal, Inteiro, Texto, Data)', 'Fechar e Aplicar'],
    resources: [
      { name: 'Visão geral do Power Query', url: 'https://learn.microsoft.com/pt-br/power-query/power-query-what-is-power-query', description: 'Guia oficial sobre tratamento e higienização de dados' }
    ],
    challenge: {
      prompt: 'O que acontece se uma coluna contendo números de horas for deixada como tipo "Texto" no Power Query?',
      hint: 'O Power BI consegue calcular a média matemática de textos?',
      solution: 'Se ficar como Texto, o Power BI não permitirá calcular Soma ou Média no gráfico; ele só conseguirá contar quantas vezes o texto aparece.'
    },
    deliverableOfWeek: 'Primeiro painel no Power BI com quantidade de chamados, tempo médio, categorias e prioridades.'
  },
  {
    day: 18,
    week: 3,
    title: 'Criar gráficos de colunas e cartões de indicadores',
    summary: 'Construir os primeiros elementos visuais na tela: cartões de KPI numéricos e gráficos analíticos.',
    tool: 'powerbi',
    goal: 'Criar 3 Cartões: Total de Chamados, Tempo Médio (h), % No SLA, mais 1 gráfico de barras por Categoria.',
    timeSchedule: {
      review10m: 'Princípio do dashboard executivo: os números mais importantes ficam no topo em formato de cartões (Cards).',
      practice35m: 'Arrastar o visual "Cartão" (123) para a tela. Arrastar a coluna ID e configurar para Contagem distinta. Criar outro cartão com Tempo (Média).',
      challenge15m: 'Inserir um gráfico de barras clusterizado com Categoria no eixo Y e Contagem de Chamados no eixo X.',
    },
    keyConcepts: ['Visual de Cartão (Card KPI)', 'Gráfico de Barras Clusterizado', 'Medidas Rápidas vs Campos Nativos', 'Formatação de Rótulos'],
    resources: [
      { name: 'Criar visuais de cartão no Power BI', url: 'https://learn.microsoft.com/pt-br/power-bi/visuals/power-bi-visualization-card', description: 'Como formatar cartões de números grandes' }
    ],
    challenge: {
      prompt: 'Qual a melhor posição em um dashboard para colocar os cartões com os números principais (Total de Chamados, Tempo Médio)?',
      hint: 'Pense na ordem natural de leitura ocidental (em F ou Z).',
      solution: 'No topo da página (canto superior esquerdo ou alinhados em faixa horizontal superior), onde o olhar humano bate primeiro antes de descer para os gráficos detalhados.'
    },
    deliverableOfWeek: 'Primeiro painel no Power BI com quantidade de chamados, tempo médio, categorias e prioridades.'
  },
  {
    day: 19,
    week: 3,
    title: 'Adicionar filtros e segmentações de dados',
    summary: 'Permitir que o usuário filtre o relatório por Departamento, Prioridade ou Período com um único clique.',
    tool: 'powerbi',
    goal: 'Inserir Segmentações de Dados (Slicers) para tornar o dashboard dinâmico e interativo.',
    timeSchedule: {
      review10m: 'Diferença entre o painel de Filtros laterais (para quem constrói) e a Segmentação de Dados na tela (para o usuário final).',
      practice35m: 'Adicionar um visual de "Segmentação de Dados" com a coluna Prioridade (em formato de botões horizontais ou lista suspensa).',
      challenge15m: 'Clicar na prioridade "Crítica" e observar como todos os cartões e gráficos recalculam instantaneamente.',
    },
    keyConcepts: ['Segmentação de Dados (Slicer)', 'Filtragem Cruzada (Cross-filtering)', 'Interação entre Visuais'],
    resources: [
      { name: 'Segmentações no Power BI', url: 'https://learn.microsoft.com/pt-br/power-bi/visuals/power-bi-visualization-slicers', description: 'Guia completo de segmentações de dados' }
    ],
    challenge: {
      prompt: 'O que é "Filtragem Cruzada" no Power BI?',
      hint: 'O que acontece ao clicar em uma barra de uma categoria específica no gráfico?',
      solution: 'É o comportamento nativo do Power BI onde clicar em um elemento de qualquer gráfico (ex: na barra de "Rede") filtra automaticamente todos os outros gráficos e cartões da tela para aquele contexto.'
    },
    deliverableOfWeek: 'Primeiro painel no Power BI com quantidade de chamados, tempo médio, categorias e prioridades.'
  },
  {
    day: 20,
    week: 3,
    title: 'Montar um painel de chamados de suporte completo',
    summary: 'Organizar o layout final da tela: cabeçalho corporativo, cartões de KPI, gráficos de volume e gráfico de prioridades.',
    tool: 'powerbi',
    goal: 'Finalizar o dashboard com alinhamento profissional, paleta de cores consistente e sem sobreposições.',
    timeSchedule: {
      review10m: 'Checklist de design limpo: não usar fundos pretos pesados sem necessidade; manter espaçamento uniforme entre os cartões.',
      practice35m: 'Estruturar o painel: Cabeçalho "Dashboard de Chamados de TI" no topo, 4 KPIs, gráfico de Categoria na esquerda e Prioridade/Tempo na direita.',
      challenge15m: 'Adicionar uma linha explicativa com a data de última atualização e a fonte dos dados (Helpdesk Interno).',
    },
    keyConcepts: ['Grid e Alinhamento no Power BI', 'Consistência de Cores', 'Contraste e Legibilidade', 'Estrutura Visual Executiva'],
    resources: [
      { name: 'Dicas para criar painéis incríveis no Power BI', url: 'https://learn.microsoft.com/pt-br/power-bi/create-reports/service-dashboards-design-tips', description: 'Princípios oficiais da Microsoft para dashboards profissionais' }
    ],
    challenge: {
      prompt: 'Por que devemos evitar usar 8 cores diferentes e chamativas em um mesmo dashboard corporativo?',
      hint: 'Pense em carga cognitiva para o diretor que está analisando os dados.',
      solution: 'Muitas cores competem pela atenção e cansam o usuário. O ideal é usar uma paleta neutra (tons de cinza/azul) e reservar uma cor de destaque apenas para alertas ou indicadores críticos.'
    },
    deliverableOfWeek: 'Primeiro painel no Power BI com quantidade de chamados, tempo médio, categorias e prioridades.'
  },
  {
    day: 21,
    week: 3,
    title: 'Revisar o painel e verificar se os números estão corretos',
    summary: 'Auditar os números: garantir que a soma dos gráficos bata com o total do Excel e com o resultado das queries SQL.',
    tool: 'powerbi',
    goal: 'Aprender a checar a consistência dos dados para não passar vergonha com métricas divergentes em reuniões.',
    timeSchedule: {
      review10m: 'A regra de ouro do analista de dados: nunca entregue um dashboard sem validar os números contra a fonte.',
      practice35m: 'Comparar: Total de chamados no Excel (50) == Total na query SQL (50) == Cartão do Power BI (50). Conferir tempo médio.',
      challenge15m: 'Tirar prints nítidos do painel para o portfólio da Semana 4.',
    },
    keyConcepts: ['Auditoria de Dados (Data Validation)', 'Reconciliação com Fonte', 'Documentação de Métricas', 'Captura de Telas para Portfólio'],
    resources: [
      { name: 'Solucionar problemas de dados no Power BI', url: 'https://learn.microsoft.com/pt-br/power-bi/connect-data/desktop-troubleshooting-data-view', description: 'Como depurar cálculos e discrepâncias' }
    ],
    challenge: {
      prompt: 'Se o seu cartão do Power BI mostra tempo médio de 3,8h mas o Excel mostra 4,2h, quais são os primeiros passos para investigar?',
      hint: 'Pense em filtros ativos, linhas nulas ou diferença entre média ponderada e simples.',
      solution: '1. Verificar se há algum filtro ou segmentação ativa na página; 2. Verificar se o Power BI excluiu chamados com valor nulo/em aberto; 3. Checar a fórmula de média na aba do Power Query.'
    },
    deliverableOfWeek: 'Primeiro painel no Power BI com quantidade de chamados, tempo médio, categorias e prioridades.'
  },

  // SEMANA 4 — Projeto de Portfólio e Preparação Profissional (Dias 22 a 30)
  {
    day: 22,
    week: 4,
    title: 'Definir o problema e revisar os dados do projeto',
    summary: 'Escrever o escopo executivo do projeto de portfólio: contexto de negócio, problema identificado e objetivos da análise.',
    tool: 'portfolio',
    goal: 'Redigir a seção "Contexto & Problema" do seu projeto de Helpdesk Analytics.',
    timeSchedule: {
      review10m: 'Lembrar que recrutadores não contratam "quem sabe apertar botões no Power BI", contratam quem resolve problemas de negócio.',
      practice35m: 'Escrever: "A empresa enfrentava aumento de 35% no volume de chamados de TI, gerando sobrecarga na equipe de suporte e atrasos no fechamento financeiro..."',
      challenge15m: 'Definir as 2 perguntas centrais do projeto: 1) Quais categorias consomem mais tempo? 2) Quais setores abrem mais chamados?',
    },
    keyConcepts: ['Storytelling com Dados', 'Formulação do Problema de Negócio', 'Estrutura STAR para Portfólio (Situação, Tarefa, Ação, Resultado)'],
    resources: [
      { name: 'Guia de Projetos de Portfólio de Dados', url: 'https://learn.microsoft.com/pt-br/training/', description: 'Microsoft Learn com estudos de caso reais' }
    ],
    challenge: {
      prompt: 'Por que um projeto de suporte técnico é altamente valorizado para vagas júnior de Análise de Dados?',
      hint: 'Qual a vantagem prática de quem já viveu a operação do suporte?',
      solution: 'Porque o candidato conhece a realidade da operação, entende o impacto de um sistema fora do ar, sabe como os usuários interagem com TI e fala a língua do negócio, sem ser puramente acadêmico.'
    },
    deliverableOfWeek: 'Projeto organizado com dados fictícios, planilha, painel, conclusões e uma breve descrição do problema analisado.'
  },
  {
    day: 23,
    week: 4,
    title: 'Corrigir erros e padronizar a planilha',
    summary: 'Refinar a planilha Excel com formatação executiva, comentários nas células de fórmulas e dicionário de dados.',
    tool: 'excel',
    goal: 'Criar uma aba "Dicionário de Dados" explicando o significado de cada coluna (ID, Categoria, Prioridade, SLA, CSAT).',
    timeSchedule: {
      review10m: 'Rever a aparência da planilha: tipografia consistente, cabeçalhos escuros com texto branco, números alinhados à direita.',
      practice35m: 'Adicionar a aba "Dicionário_Dados" e documentar o que cada coluna representa e seus valores possíveis.',
      challenge15m: 'Aplicar formatação condicional sutil para destacar chamados onde o SLA não foi cumprido.',
    },
    keyConcepts: ['Dicionário de Dados (Data Dictionary)', 'Formatação Condicional Limpa', 'Documentação de Metadados'],
    resources: [
      { name: 'Formatação condicional no Excel', url: 'https://support.microsoft.com/pt-br/office/usar-formata%C3%A7%C3%A3o-condicional-para-real%C3%A7ar-informa%C3%A7%C3%B5es-fed60dfa-1d3f-4e13-9ecb-f1951ff89d7f', description: 'Como destacar valores críticos sem poluir' }
    ],
    challenge: {
      prompt: 'Para que serve um "Dicionário de Dados" em um repositório de portfólio no GitHub?',
      hint: 'Quem for avaliar seu projeto sabe o que significa "SLA_Cumprido" ou "CSAT" se você não explicar?',
      solution: 'Permite que qualquer recrutador ou gestor entenda imediatamente as regras de negócio e os tipos de dados sem precisar adivinhar o significado das siglas.'
    },
    deliverableOfWeek: 'Projeto organizado com dados fictícios, planilha, painel, conclusões e uma breve descrição do problema analisado.'
  },
  {
    day: 24,
    week: 4,
    title: 'Conferir os indicadores e praticar consultas SQL relacionadas',
    summary: 'Validar que as queries SQL documentadas geram exatamente os mesmos números mostrados no painel do Power BI.',
    tool: 'sql',
    goal: 'Incluir no repositório um arquivo `analise_chamados.sql` contendo consultas comentadas passo a passo.',
    timeSchedule: {
      review10m: 'Rever as 4 principais queries desenvolvidas na Semana 2.',
      practice35m: 'Adicionar comentários explicativos no SQL: `-- 1. Volume total e tempo médio por categoria`.',
      challenge15m: 'Escrever uma query com a cláusula CASE WHEN para classificar os chamados em: "Rápido (< 2h)", "Normal (2-6h)" e "Longo (> 6h)".',
    },
    keyConcepts: ['Script SQL Profissional', 'CASE WHEN (Condicionais em SQL)', 'Código Limpo e Comentado'],
    resources: [
      { name: 'SQL CASE Expression (W3Schools)', url: 'https://www.w3schools.com/sql/sql_case.asp', description: 'Como categorizar métricas diretamente na consulta' }
    ],
    challenge: {
      prompt: 'Como criar uma coluna calculada no SQL que retorna "Crítico" se tempo_horas > 6 e "Normal" caso contrário?',
      hint: 'Use a sintaxe CASE WHEN condição THEN resultado ELSE outro END.',
      solution: "SELECT id, tempo_horas, CASE WHEN tempo_horas > 6 THEN 'Crítico' ELSE 'Normal' END AS classificacao_tempo FROM chamados;"
    },
    deliverableOfWeek: 'Projeto organizado com dados fictícios, planilha, painel, conclusões e uma breve descrição do problema analisado.'
  },
  {
    day: 25,
    week: 4,
    title: 'Melhorar o painel do Power BI',
    summary: 'Adicionar pequenos toques de acabamento que transformam um trabalho amador em um painel de nível pleno/sênior.',
    tool: 'powerbi',
    goal: 'Ajustar títulos intuitivos, tooltips informativas e medidas DAX com nomes em português claros.',
    timeSchedule: {
      review10m: 'Rever os detalhes: os eixos dos gráficos têm títulos redundantes que podem ser desligados? A fonte está legível?',
      practice35m: 'Substituir agregação padrão por 2 medidas DAX básicas: `Total Chamados = COUNTROWS(Chamados)` e `Tempo Médio = AVERAGE(Chamados[Tempo_Horas])`.',
      challenge15m: 'Configurar a dica de ferramenta (tooltip) para mostrar o CSAT médio ao passar o mouse sobre cada categoria.',
    },
    keyConcepts: ['Medidas DAX Fundamentais', 'COUNTROWS() e AVERAGE()', 'Desativação de Títulos Redundantes no Eixo', 'Dicas de Ferramenta (Tooltips)'],
    resources: [
      { name: 'Noções básicas de DAX no Power BI', url: 'https://learn.microsoft.com/pt-br/power-bi/transform-model/desktop-quickstart-learn-dax-basics', description: 'Tutorial oficial de introdução às medidas' }
    ],
    challenge: {
      prompt: 'Qual a vantagem de criar uma medida explícita em DAX `Total Chamados = COUNTROWS(Tabela)` em vez de arrastar o campo ID e deixar o Power BI fazer contagem implícita?',
      hint: 'Pense em reutilização de medidas e boas práticas de modelagem.',
      solution: 'Medidas explícitas podem ser reutilizadas em dezenas de outros cálculos (ex: % do Total, Variação Mês a Mês), deixam o modelo documentado e evitam comportamentos inesperados.'
    },
    deliverableOfWeek: 'Projeto organizado com dados fictícios, planilha, painel, conclusões e uma breve descrição do problema analisado.'
  },
  {
    day: 26,
    week: 4,
    title: 'Escrever três conclusões baseadas nos resultados',
    summary: 'Traduzir os números brutos em 3 conclusões e recomendações acionáveis com impacto direto no negócio.',
    tool: 'portfolio',
    goal: 'Formular as 3 conclusões centrais do seu case de portfólio de suporte técnico.',
    timeSchedule: {
      review10m: 'Rever os dados: Quais foram as maiores categorias? Quais foram os maiores tempos médios?',
      practice35m: 'Escrever as 3 conclusões estruturadas: Evidência Numérica -> Causa Operacional -> Solução Proposta.',
      challenge15m: 'Conectar cada conclusão a uma economia de tempo ou aumento de satisfação do usuário.',
    },
    keyConcepts: ['Tradução de Métricas em Ações', 'Visão de Negócio', 'Redução de Custos e Economia de Horas', 'Comunicação Executiva'],
    resources: [
      { name: 'Storytelling com Dados (Conceito)', url: 'https://learn.microsoft.com/pt-br/training/', description: 'Como construir narrativas convincentes com métricas' }
    ],
    challenge: {
      prompt: 'Se os chamados de "Reset de Senha" e "Spooler de Impressão" somam 30% do volume mas têm tempo médio de apenas 15 minutos, qual ação de negócio você propõe?',
      hint: 'Pense em automação, portal de autoatendimento e manuais rápidos.',
      solution: 'Implantar portal de autoatendimento com redefinição de senha por SMS/E-mail e criar cartilha de auto-recuperação de impressora, liberando a equipe técnica para focar em problemas complexos de ERP e Rede.'
    },
    deliverableOfWeek: 'Projeto organizado com dados fictícios, planilha, painel, conclusões e uma breve descrição do problema analisado.'
  },
  {
    day: 27,
    week: 4,
    title: 'Preparar um resumo do projeto e organizar os arquivos',
    summary: 'Montar a documentação final: README profissional para GitHub ou arquivo PDF com prints e explicações.',
    tool: 'portfolio',
    goal: 'Organizar a pasta do projeto: `/dados`, `/scripts_sql`, `/dashboard_powerbi` e `README.md`.',
    timeSchedule: {
      review10m: 'Rever os requisitos de anonimização: confirmar que NENHUM dado confidencial da empresa real foi utilizado!',
      practice35m: 'Escrever o README.md completo com título, objetivo, tecnologias utilizadas, prints do painel e as 3 conclusões.',
      challenge15m: 'Fazer o upload para um repositório no GitHub ou salvar no Google Drive com link compartilhável.',
    },
    keyConcepts: ['Estrutura de Repositório no GitHub', 'README.md Impecável', 'Privacidade de Dados (LGPD/Anonimização)', 'Portfólio Vivo'],
    resources: [
      { name: 'Como criar um bom README no GitHub', url: 'https://docs.github.com/pt/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes', description: 'Documentação oficial do GitHub sobre README' }
    ],
    challenge: {
      prompt: 'Por que o aviso de anonimização ("Dados 100% fictícios para fins de estudo") é obrigatório no projeto de portfólio?',
      hint: 'Pense em ética profissional, LGPD e impressão que causa em um recrutador de empresa séria.',
      solution: 'Demonstra ética profissional e respeito à Lei Geral de Proteção de Dados (LGPD). Um recrutador descartaria na hora qualquer candidato que vazasse dados de clientes ou sistemas internos reais.'
    },
    deliverableOfWeek: 'Projeto organizado com dados fictícios, planilha, painel, conclusões e uma breve descrição do problema analisado.'
  },
  {
    day: 28,
    week: 4,
    title: 'Explicar o projeto em uma apresentação de cinco minutos',
    summary: 'Treinar a fala para entrevistas de emprego: explicar o projeto de forma segura, clara e focada no valor gerado.',
    tool: 'career',
    goal: 'Gravar ou ensaiar a apresentação de 5 minutos cronometrada no relógio.',
    timeSchedule: {
      review10m: 'Distribuir os 5 minutos: 1 min (Introdução & Contexto) + 1.5 min (Análise & Gráficos) + 1.5 min (3 Conclusões) + 1 min (Próximos Passos).',
      practice35m: 'Treinar falando em voz alta simulando uma entrevista com gestor de dados.',
      challenge15m: 'Ajustar pontos em que gaguejou ou usou jargões excessivos sem explicar o significado.',
    },
    keyConcepts: ['Pitch de 5 Minutos', 'Comunicação Verbal Clara', 'Confiança Técnica', 'Postura de Transição de Carreira'],
    resources: [
      { name: 'Dicas de Comunicação Técnica para Entrevistas', url: 'https://learn.microsoft.com/pt-br/training/', description: 'Artigos sobre desenvolvimento profissional' }
    ],
    challenge: {
      prompt: 'Se o recrutador perguntar "Por que você analisou dados de suporte técnico em vez de vendas ou marketing?", qual a melhor resposta?',
      hint: 'Destaque que você analisou um domínio que conhece profundamente na prática.',
      solution: '"Eu escolhi suporte técnico porque vivi essa rotina diariamente. Em vez de pegar uma base genérica de vendas da internet, eu apliquei análise de dados onde tenho conhecimento prático de negócio, conseguindo interpretar anomalias que alguém de fora não enxergaria."'
    },
    deliverableOfWeek: 'Projeto organizado com dados fictícios, planilha, painel, conclusões e uma breve descrição do problema analisado.'
  },
  {
    day: 29,
    week: 4,
    title: 'Pesquisar vagas de Analista de Dados Júnior e Analista de BI Júnior',
    summary: 'Mapear os requisitos mais frequentes no mercado de trabalho brasileiro para alinhar seu currículo.',
    tool: 'career',
    goal: 'Identificar 10 anúncios reais de vagas júnior no LinkedIn/Indeed e registrar as ferramentas exigidas.',
    timeSchedule: {
      review10m: 'Entender a diferença de nomenclatura: Analista de BI Jr, Analista de Dados Jr, Analista de Informações Jr, Assistente de BI.',
      practice35m: 'Pesquisar vagas e anotar a recorrência de requisitos: Power BI (90%), SQL (85%), Excel Avançado (80%), Python (30%).',
      challenge15m: 'Atualizar o título do seu perfil no LinkedIn para: "Suporte Técnico em transição para Análise de Dados | SQL | Power BI | Excel".',
    },
    keyConcepts: ['Mapeamento de Mercado', 'Palavras-Chave de Recrutamento (ATS)', 'Posicionamento no LinkedIn', 'Estratégia de Candidatura'],
    resources: [
      { name: 'LinkedIn Vagas de Dados', url: 'https://www.linkedin.com/jobs/search/?keywords=analista%20de%20dados%20junior', description: 'Pesquisa de requisitos reais no mercado' }
    ],
    challenge: {
      prompt: 'Por que você NÃO deve esconder sua experiência de suporte técnico no currículo ao migrar para Dados?',
      hint: 'O que a bagagem de suporte comprova para a empresa contratante?',
      solution: 'Porque a experiência de suporte comprova que você sabe lidar com usuários difíceis sob pressão, entende de sistemas corporativos, tem senso de urgência e já trabalhou com métricas reais, algo que quem nunca trabalhou em TI não possui.'
    },
    deliverableOfWeek: 'Projeto organizado com dados fictícios, planilha, painel, conclusões e uma breve descrição do problema analisado.'
  },
  {
    day: 30,
    week: 4,
    title: 'Revisar o aprendizado, identificar lacunas e planejar o próximo mês',
    summary: 'Completar o checklist dos 30 dias, celebrar a conquista e traçar o plano de estudos para os próximos 60 dias.',
    tool: 'career',
    goal: 'Avaliar os 6 critérios de sucesso e definir a prioridade de aprofundamento (SQL avançado ou modelagem DAX).',
    timeSchedule: {
      review10m: 'Preencher o Checklist Oficial do Dia 30 com sinceridade sobre o que já domina e o que ainda precisa praticar.',
      practice35m: 'Montar o plano do Mês 2: Praticar Joins no SQL (INNER JOIN, LEFT JOIN) e Modelagem Dimensional (Star Schema) no Power BI.',
      challenge15m: 'Comemorar a conclusão dos 30 dias com 1 hora diária de consistência!',
    },
    keyConcepts: ['Autoavaliação de Competências', 'Plano de Continuidade (Mês 2)', 'Consistência Diária', 'Comunidade de Dados'],
    resources: [
      { name: 'Próximos Passos no Microsoft Learn', url: 'https://learn.microsoft.com/pt-br/training/paths/model-data-power-bi/', description: 'Trilha de Modelagem de Dados no Power BI' }
    ],
    challenge: {
      prompt: 'Qual a regra de ouro estabelecida para o seu sucesso após os 30 dias de estudos?',
      hint: 'Lembre-se da frase final do seu plano de estudos.',
      solution: '"Estudar um pouco todos os dias, praticar com problemas reais e transformar o aprendizado em resultados demonstráveis."'
    },
    deliverableOfWeek: 'Projeto organizado com dados fictícios, planilha, painel, conclusões e uma breve descrição do problema analisado.'
  }
];

export const EVALUATION_CHECKLIST_ITEMS = [
  { id: 'item_1', text: 'Consigo organizar e filtrar uma tabela no Excel.', category: 'Excel' },
  { id: 'item_2', text: 'Sei usar fórmulas básicas (SOMA, MÉDIA, CONT.SE) e criar gráficos.', category: 'Excel' },
  { id: 'item_3', text: 'Entendo os principais comandos de SQL (SELECT, WHERE, ORDER BY, GROUP BY, Agregações).', category: 'SQL' },
  { id: 'item_4', text: 'Consigo importar dados e montar um painel simples no Power BI.', category: 'Power BI' },
  { id: 'item_5', text: 'Tenho um projeto documentado e consigo explicar minhas conclusões.', category: 'Portfólio' },
  { id: 'item_6', text: 'Identifiquei os requisitos mais comuns nas vagas que me interessam.', category: 'Carreira' },
];
