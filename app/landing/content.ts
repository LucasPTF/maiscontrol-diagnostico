export const siteConfig = {
  checkoutUrl: "#checkout",
  whatsappUrl: "#",
  eventDate: "Próxima turma ao vivo",
  eventTime: "Data e horário comunicados no grupo oficial da turma",
  price: "R$29,90",
  expertPhotoHero: "/wellington-hero.png",
  expertPhotoProfile: "/wellington-apresentacao.png",
  logoUrl: "",
  dashboardImage: "",
  selectedAngle: 3,
  canonicalUrl: "",
  tracking: {
    metaPixelId: "",
    ga4Id: "",
  },
} as const;

export const heroAngles = {
  1: {
    headline: "Sua empresa fatura. Mas o dinheiro some — existe um jeito de enxergar onde ele está vazando.",
    subheadline: "Você já tentou sistema, planilha e força de vontade. O erro invisível foi tentar organizar tudo sozinho, sem diagnóstico. Em 2h30, descubra o primeiro furo e sinta clareza de novo.",
    cta: "GARANTIR MINHA VAGA POR R$29,90",
  },
  2: {
    headline: "Você vai sair com um diagnóstico da sua empresa — sem planilha confusa, sem palestra genérica e sem precisar entender ERP.",
    subheadline: "Em 2h30, você responde ao quiz, calcula sua hemorragia em R$ e descobre qual furo tampar primeiro — pronto para agir na próxima segunda-feira.",
    cta: "QUERO MEU DIAGNÓSTICO POR R$29,90",
  },
  3: {
    headline: "O sistema que você abandonou não provou que você falhou — provou que te venderam o caminho errado.",
    subheadline: "Em 2h30, você vai ver por que login, videoaula e chatbot não organizam empresa pequena — e como os 4 Furos do Balde revelam onde o caos começa.",
    cta: "DESCOBRIR O CAMINHO CERTO",
  },
} as const;

export const leaks = [
  { key: "01", icon: "R$", title: "Caixa", text: "O dinheiro entra. Mas os números não batem.", status: "alerta" },
  { key: "02", icon: "▦", title: "Estoque", text: "Seu dinheiro pode estar parado, vencendo ou desaparecendo.", status: "atenção" },
  { key: "03", icon: "↗", title: "Vendas", text: "Faturar não significa vender com lucro.", status: "analisar" },
  { key: "04", icon: "§", title: "Fiscal", text: "Um erro pequeno hoje pode virar uma cobrança grande depois.", status: "revisar" },
];

export const discoveries = [
  "Onde sua empresa perde dinheiro sem isso aparecer claramente no extrato.",
  "Qual furo pesa mais hoje: caixa, estoque, vendas ou fiscal.",
  "Por que as tentativas anteriores não falharam por culpa sua.",
  "Qual é a hemorragia estimada da empresa em reais.",
  "Quais três ações iniciar na próxima segunda-feira.",
  "O que organizar sozinho e onde a ajuda pode evitar abandono.",
];

export const modules = [
  ["01", "Os 4 Furos do Balde", "Como caixa, estoque, vendas e fiscal fazem o dinheiro escapar sem parecer uma perda direta."],
  ["02", "O caminho que você ainda não tentou", "Por que login, videoaula e chatbot não bastam para organizar uma empresa real."],
  ["03", "Seu diagnóstico", "Responda ao quiz e enxergue o score da empresa em cada um dos quatro furos."],
  ["04", "A hemorragia em reais", "Transforme problemas invisíveis em uma estimativa concreta do custo de operar no escuro."],
  ["05", "Sua ordem de ação", "Descubra o maior furo e defina três ações práticas para começar."],
];

export const timeline = [
  ["2018", "A mesma realidade do avatar", "Wellington abriu sua confecção cercado por caderno, Excel, estoque contado no olho e dependência total do dono. O MaisControl nasceu para resolver sua própria empresa."],
  ["2020", "Decidir rápido virou sobrevivência", "Durante a crise, usou as informações do sistema para mudar a operação e produzir máscaras em poucos dias. A empresa permaneceu de pé."],
  ["2025", "A prova da liberdade operacional", "Mudou-se para Uberlândia e passou a administrar a confecção a aproximadamente 1.500 km. A operação continuou acompanhada pelo sistema."],
  ["Hoje", "Gestão nascida no mundo real", "O MaisControl é usado em operações reais. A aula nasce do chão de uma pequena empresa, não apenas de teoria."],
];

export const evidence = [
  ["Testado na própria empresa", "O sistema é utilizado na confecção de Wellington e permitiu acompanhar a operação mesmo a 1.500 km de distância."],
  ["Sistema em produção", "O MaisControl possui clientes reais utilizando o sistema na operação diária."],
  ["Experiência técnica real", "Mais de 25 usuários ativos utilizam softwares desenvolvidos pela equipe, considerando diferentes sistemas em produção."],
];

export const bonuses = [
  ["Quiz Interativo", "Mostra o score da empresa e identifica o furo prioritário.", "QUIZ"],
  ["Diagnóstico em PDF", "Um documento para analisar e compartilhar com sócio, contador ou equipe.", "PDF"],
  ["E-book: 7 Erros do Caixa", "Material de apoio para reconhecer hábitos que comprometem o caixa em 2026.", "E-BOOK"],
  ["VendaBio", "Vitrine profissional para o link da bio, gratuita e vitalícia conforme a oferta.", "BIO"],
  ["Planilhas dos 4 Furos", "Acompanhamento mensal de caixa, estoque, vendas e fiscal.", "XLS"],
  ["Grupo Oficial da Turma", "Avisos, lembretes, aquecimento, link e informações da aula ao vivo.", "GRUPO"],
];

export const forYou = [
  "Tem empresa ativa e de 3 a 20 funcionários.",
  "Fatura, trabalha muito e não sabe quanto sobra.",
  "Ainda depende de caderno, Excel ou controles paralelos.",
  "Usa um sistema antigo ou já abandonou outro ERP.",
  "Sente que a empresa depende de você para tudo.",
  "Quer clareza antes de investir em uma implantação.",
];

export const notForYou = [
  "Ainda não possui uma empresa ativa.",
  "Procura fórmula para ganhar dinheiro sem trabalhar.",
  "Espera que uma aula de 2h30 implante tudo automaticamente.",
  "Já possui ERP funcionando, equipe treinada e números confiáveis.",
];

export const offerItems = [
  "Aula ao vivo de 2h30 com Wellington Camaleão",
  "Quiz dos 4 Furos do Balde",
  "Diagnóstico personalizado em PDF",
  "Cálculo da hemorragia em reais",
  "Três ações práticas",
  "E-book 7 Erros que Acabam com seu Caixa em 2026",
  "VendaBio gratuita e vitalícia",
  "Planilhas de acompanhamento",
  "Acesso ao grupo oficial da turma",
];

export const faqs = [
  ["Vai ser mais uma aula genérica?", "Não. Você responde ao quiz usando informações da sua empresa e recebe um diagnóstico baseado nas suas respostas."],
  ["Preciso entender de ERP?", "Não. Se você entende seu caixa, seu estoque, suas vendas e sua rotina, consegue acompanhar a aula."],
  ["Preciso trocar de sistema?", "Não. O primeiro objetivo é diagnosticar. Você não precisa trocar nada antes de entender onde está o problema."],
  ["Quando será a aula?", "A data e o horário da próxima turma serão comunicados no grupo oficial. Após a compra, entre no grupo para receber os avisos e o link."],
  ["A aula inclui replay?", "O ingresso de R$29,90 não inclui replay. O acesso por 7 dias pode ser adquirido separadamente no checkout por R$49."],
  ["Vou receber meu diagnóstico?", "Sim. O quiz mostra o score dos quatro furos, identifica a área prioritária e gera o diagnóstico correspondente."],
  ["Vocês vão oferecer outro produto?", "Sim, com transparência. Depois do conteúdo e do diagnóstico, Wellington apresentará o Programa Implantação Assistida para quem quiser executar com acompanhamento."],
  ["E se eu não gostar?", "Você possui 7 dias de garantia incondicional para solicitar o reembolso."],
  ["Serve para qualquer empresa?", "A aula foi pensada principalmente para donos de pequenas e médias empresas, com aproximadamente 3 a 20 funcionários, operação ativa e dificuldade para controlar caixa, estoque, vendas e fiscal."],
];
