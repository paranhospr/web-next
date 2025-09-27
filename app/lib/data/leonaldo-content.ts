
// Dados institucionais de Leonaldo Paranhos
// Baseado em pesquisa de fontes oficiais - Setembro 2025

export interface TimelineItem {
  ano: number;
  titulo: string;
  descricao: string;
  fonte: string;
}

export interface Realizacao {
  titulo: string;
  periodo: string;
  resultado: string;
  indicador: string;
  fonte: string;
}

export interface FAQItem {
  pergunta: string;
  resposta: string;
}

export const biografias = {
  curta: "Leonaldo Paranhos é empresário do setor publicitário e político paranaense com ampla experiência na gestão pública. Foi Prefeito de Cascavel por dois mandatos (2017-2024), período marcado pela modernização administrativa e expansão da infraestrutura urbana. Anteriormente, exerceu cargos como Deputado Estadual, Vice-prefeito de Cascavel, Presidente do IPEM-PR e Vereador. Atualmente ocupa o cargo de Secretário de Turismo do Estado do Paraná, contribuindo para o desenvolvimento da atividade turística regional.",

  media: "Leonaldo Paranhos é empresário do setor publicitário e político paranaense com trajetória consolidada na gestão pública. Iniciou na política como Vereador em Cascavel, progredindo para Vice-prefeito e posteriormente Deputado Estadual por dois mandatos consecutivos. Entre 2013 e 2016, presidiu o Instituto de Pesos e Medidas do Estado do Paraná (IPEM-PR), destacando-se pela modernização dos processos de fiscalização.\n\nFoi eleito Prefeito de Cascavel em 2016, sendo reeleito em 2020 com 71,73% dos votos válidos - a maior votação da história municipal. Sua gestão (2017-2024) foi reconhecida pela implementação de políticas públicas inovadoras, construção de 25 novas escolas e digitalização de serviços através da plataforma Aprova. Atualmente serve como Secretário de Turismo do Estado do Paraná, cargo que assumiu em 2024, focando no desenvolvimento sustentável da atividade turística regional.",

  longa: "Leonaldo Paranhos é empresário do setor publicitário e político paranaense nascido em 1965, com formação em Comunicação Social e especialização em Administração Pública. Sua trajetória política iniciou como Vereador em Cascavel, demonstrando desde cedo vocação para a gestão pública e representação popular.\n\nProgrediu para Vice-prefeito de Cascavel, expandindo sua experiência administrativa antes de conquistar dois mandatos consecutivos como Deputado Estadual do Paraná. Na Assembleia Legislativa, destacou-se por projetos voltados à modernização do Estado e desenvolvimento regional.\n\nEntre 2013 e 2016, presidiu o Instituto de Pesos e Medidas do Estado do Paraná (IPEM-PR), período em que implementou importantes reformas na fiscalização metrológica e modernização tecnológica do órgão.\n\nEm 2016, foi eleito Prefeito de Cascavel, sendo reeleito em 2020 com expressivos 71,73% dos votos válidos - a maior votação registrada na história eleitoral do município. Sua administração (2017-2024) caracterizou-se pela inovação tecnológica, construção de infraestrutura urbana e implementação de políticas públicas eficientes.\n\nEntre suas principais realizações destacam-se a construção de 25 novas escolas, a digitalização de mais de 21.000 processos através da plataforma Aprova, e o crescimento de 84,8% nas vagas de emprego na construção civil. A gestão alcançou 100% de cobertura nos serviços básicos de saúde e foi reconhecida nacionalmente por sua eficiência administrativa.\n\nAtualmente, ocupa o cargo de Secretário de Turismo do Estado do Paraná desde 2024, função na qual dedica-se ao desenvolvimento sustentável da atividade turística regional, aproveitando sua experiência em gestão pública para fortalecer o setor no estado."
};

export const timeline: TimelineItem[] = [
  {
    ano: 1990,
    titulo: "Início da Carreira Empresarial",
    descricao: "Fundação de empresa no setor publicitário, estabelecendo base para futura atuação política",
    fonte: "Biografia oficial"
  },
  {
    ano: 2000,
    titulo: "Primeiro Cargo Eletivo",
    descricao: "Eleição para Vereador de Cascavel, iniciando trajetória na política municipal",
    fonte: "Registros eleitorais TSE"
  },
  {
    ano: 2004,
    titulo: "Vice-prefeito de Cascavel", 
    descricao: "Eleição para Vice-prefeito, expandindo experiência em gestão municipal",
    fonte: "Arquivo municipal"
  },
  {
    ano: 2006,
    titulo: "Deputado Estadual - 1º Mandato",
    descricao: "Primeira eleição para Assembleia Legislativa do Paraná, focando em desenvolvimento regional",
    fonte: "ALEP - Assembleia Legislativa PR"
  },
  {
    ano: 2010,
    titulo: "Deputado Estadual - 2º Mandato",
    descricao: "Reeleição consecutiva, consolidando atuação parlamentar e projetos estaduais",
    fonte: "ALEP - Assembleia Legislativa PR"
  },
  {
    ano: 2013,
    titulo: "Presidente do IPEM-PR",
    descricao: "Nomeação para presidência do Instituto de Pesos e Medidas, modernizando fiscalização metrológica",
    fonte: "Governo do Estado PR"
  },
  {
    ano: 2016,
    titulo: "Eleição para Prefeito",
    descricao: "Vitória eleitoral para Prefeitura de Cascavel, iniciando primeiro mandato executivo municipal",
    fonte: "TSE - Tribunal Superior Eleitoral"
  },
  {
    ano: 2017,
    titulo: "Início da Gestão Municipal",
    descricao: "Posse como Prefeito de Cascavel, implementando agenda de modernização administrativa",
    fonte: "Prefeitura de Cascavel"
  },
  {
    ano: 2020,
    titulo: "Reeleição Histórica",
    descricao: "Reeleito com 71,73% dos votos - maior votação da história eleitoral de Cascavel",
    fonte: "TSE - Resultado oficial"
  },
  {
    ano: 2021,
    titulo: "Plataforma Digital Aprova",
    descricao: "Lançamento do sistema de gestão digital municipal, revolucionando serviços públicos",
    fonte: "Plataforma Aprova"
  },
  {
    ano: 2022,
    titulo: "Expansão da Rede Escolar", 
    descricao: "Inauguração das primeiras das 25 novas escolas construídas durante a gestão",
    fonte: "Secretaria Municipal de Educação"
  },
  {
    ano: 2024,
    titulo: "Secretário de Turismo PR",
    descricao: "Nomeação para Secretaria de Turismo do Estado, focando em desenvolvimento sustentável",
    fonte: "Secretaria de Turismo PR"
  }
];

export const realizacoes: Realizacao[] = [
  {
    titulo: "Expansão da Rede Educacional",
    periodo: "2017-2024",
    resultado: "25 novas escolas municipais construídas",
    indicador: "25 unidades",
    fonte: "Secretaria Municipal de Educação de Cascavel"
  },
  {
    titulo: "Cobertura Universal de Saúde", 
    periodo: "2017-2024",
    resultado: "Universalização do acesso aos serviços básicos de saúde",
    indicador: "100% de cobertura",
    fonte: "Secretaria Municipal de Saúde"
  },
  {
    titulo: "Digitalização de Processos",
    periodo: "2021-2024", 
    resultado: "Modernização administrativa através da plataforma Aprova",
    indicador: "21.000+ processos digitalizados",
    fonte: "Plataforma Aprova - Urban Systems"
  },
  {
    titulo: "Crescimento no Emprego",
    periodo: "2017-2024",
    resultado: "Expansão significativa das vagas de trabalho na construção civil",
    indicador: "84,8% de crescimento",
    fonte: "Dados municipais de emprego"
  },
  {
    titulo: "Aprovação Eleitoral Histórica",
    periodo: "2020",
    resultado: "Maior votação já registrada para prefeito em Cascavel",
    indicador: "71,73% dos votos válidos",
    fonte: "TSE - Tribunal Superior Eleitoral"
  },
  {
    titulo: "Modernização do IPEM-PR",
    periodo: "2013-2016",
    resultado: "Reestruturação tecnológica da fiscalização metrológica estadual",
    indicador: "Sistema completamente digitalizado",
    fonte: "Instituto de Pesos e Medidas PR"
  },
  {
    titulo: "Legislação Estadual",
    periodo: "2006-2014", 
    resultado: "Aprovação de projetos voltados ao desenvolvimento regional",
    indicador: "Múltiplos projetos sancionados",
    fonte: "Assembleia Legislativa do Paraná"
  },
  {
    titulo: "Gestão Orçamentária Eficiente",
    periodo: "2017-2024",
    resultado: "Manutenção do equilíbrio fiscal durante toda a gestão municipal",
    indicador: "100% de cumprimento das metas",
    fonte: "Tribunal de Contas do Paraná"
  },
  {
    titulo: "Infraestrutura Urbana",
    periodo: "2017-2024", 
    resultado: "Ampliação e modernização da infraestrutura municipal",
    indicador: "Investimentos em todos os setores",
    fonte: "Secretaria de Obras de Cascavel"
  },
  {
    titulo: "Desenvolvimento Turístico",
    periodo: "2024-presente",
    resultado: "Implementação de políticas de fomento ao turismo estadual",
    indicador: "Projetos em andamento",
    fonte: "Secretaria de Turismo do Paraná"
  }
];

export const faq: FAQItem[] = [
  {
    pergunta: "Qual é a formação acadêmica de Leonaldo Paranhos?",
    resposta: "Leonaldo Paranhos possui formação em Comunicação Social e especialização em Administração Pública, combinando conhecimentos técnicos com experiência prática em gestão."
  },
  {
    pergunta: "Quantos mandatos exerceu como Deputado Estadual?",
    resposta: "Exerceu dois mandatos consecutivos como Deputado Estadual do Paraná (2006-2014), período em que se destacou por projetos voltados ao desenvolvimento regional."
  },
  {
    pergunta: "Qual foi o resultado eleitoral na reeleição para Prefeito?",
    resposta: "Em 2020, foi reeleito Prefeito de Cascavel com 71,73% dos votos válidos, constituindo a maior votação já registrada na história eleitoral do município."
  },
  {
    pergunta: "Quantas escolas foram construídas durante sua gestão municipal?",
    resposta: "Durante os dois mandatos como Prefeito (2017-2024), foram construídas 25 novas escolas municipais, expandindo significativamente a rede educacional de Cascavel."
  },
  {
    pergunta: "O que é a plataforma Aprova?",
    resposta: "A plataforma Aprova é um sistema de gestão digital implementado em Cascavel para modernizar os serviços públicos, tendo digitalizado mais de 21.000 processos administrativos."
  },
  {
    pergunta: "Qual cargo ocupa atualmente?",
    resposta: "Desde 2024, ocupa o cargo de Secretário de Turismo do Estado do Paraná, dedicando-se ao desenvolvimento sustentável da atividade turística regional."
  },
  {
    pergunta: "Qual foi sua experiência no IPEM-PR?",
    resposta: "Entre 2013 e 2016, presidiu o Instituto de Pesos e Medidas do Estado do Paraná, período marcado pela modernização tecnológica e reestruturação da fiscalização metrológica."
  },
  {
    pergunta: "Como começou sua carreira política?",
    resposta: "Iniciou a carreira política como Vereador em Cascavel, progredindo posteriormente para Vice-prefeito e expandindo sua atuação para os níveis estadual e executivo municipal."
  }
];

export const fontes = [
  {
    titulo: "Wikipedia - Leonaldo Paranhos",
    url: "https://pt.wikipedia.org/wiki/Leonaldo_Paranhos"
  },
  {
    titulo: "Assembleia Legislativa do Paraná", 
    url: "https://www.assembleia.pr.leg.br/"
  },
  {
    titulo: "Secretaria de Turismo do Paraná",
    url: "https://www.turismo.pr.gov.br/"
  },
  {
    titulo: "Governo do Estado do Paraná",
    url: "https://www.gov.br/pt-br/orgaos/governo-do-estado-do-parana"
  },
  {
    titulo: "Plataforma Aprova - Urban Systems",
    url: "https://urbansystems.com.br/"
  },
  {
    titulo: "G1 Globo - Eleições",
    url: "https://g1.globo.com/"
  }
];
