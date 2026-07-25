/*
  Conteúdo central do site — tudo editável aqui, sem tocar em componentes.
  Regra do briefing: nada de dados inventados. Campos vazios ("", [] ou null)
  fazem o bloco correspondente desaparecer da página.
*/

export const site = {
  // TODO: substituir pelo domínio real ao publicar
  url: "https://www.example.com.br",
  // TODO: confirmar nome completo do consultor com o cliente antes de publicar
  name: "Nicolas",
  // Marca curta usada no header e no footer
  brandMark: "NBM Consultoria",
  // TODO: confirmar o título profissional correto conforme registro/atuação real
  role: "Consultor de investimentos · NBM Consultoria",
  headline:
    "Consultoria estratégica para quem quer tomar decisões financeiras com mais clareza, inteligência e visão de longo prazo.",

  // Título do hero de vídeo, em três níveis tipográficos (bold branco /
  // bold prata / serifada itálica menor — ver CinematicIntro)
  heroTitle: {
    line1: "Seu patrimônio",
    line2: "precisa de estratégia.",
    line3: "Não de sorte.",
  },

  // Badges de destaque do hero (fornecidos pelo cliente)
  heroBadges: [
    "Estratégia Personalizada",
    "Segurança e Transparência",
    "Foco em Resultados",
  ],

  email: "contato@nbm.com.br",
  // página oficial da empresa (confirmada pelo cliente, 2026-07-25)
  linkedin: "https://www.linkedin.com/company/nbmconsultoria",
  // handle público real da NBM
  instagram: "https://www.instagram.com/nbmconsultoria/",
  // handle público real da NBM
  facebook: "https://www.facebook.com/nbmfinanceira",
  // TODO: nenhum número comercial informado ainda — preencher para exibir no footer
  whatsapp: "",
  scheduleUrl:
    "https://wa.me/5511958286933?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20conversa%20para%20construir%20a%20estrat%C3%A9gia%20do%20meu%20patrim%C3%B4nio",

  // Vídeos — podem apontar para o mesmo arquivo ou arquivos diferentes (briefing, Atos 05 e 07)
  // TODO: substituir pelos vídeos reais gravados (placeholders não incluídos no repositório)
  heroVideoSrc: "/videos/hero-background.mp4",
  aboutImageSrc: "/images/profile-about.webp",

  // Relação institucional com a XP — apenas texto, nunca o logotipo oficial (briefing)
  // TODO: validar redação exata com o compliance da XP
  xpDisclosure:
    "Agente autônomo de investimentos vinculado à XP Investimentos CCTVM S.A.",

  // Certificações — só aparecem se preenchidas com dados reais. Nunca inventar.
  // Exemplo de item: { label: "CEA", institution: "ANBIMA" }
  certifications: [] as { label: string; institution?: string }[],

  // Blocos do "Sobre" — ocultos enquanto vazios. Nunca preencher com invenção.
  about: {
    // TODO: substituir por biografia real
    bio: "Biografia institucional em construção. Este texto é um placeholder e deve ser substituído pela trajetória real do consultor — formação, experiência no mercado de capitais e filosofia de trabalho.",
    experience: [] as { period: string; title: string; description?: string }[],
    education: [] as { institution: string; course: string }[],
    specialties: [] as string[],
  },

  // TODO: ajustar com o texto jurídico correto exigido pela XP/compliance
  legalDisclaimer:
    "Informações apresentadas neste site possuem caráter institucional e educativo, não constituindo recomendação de investimento. Consultoria e distribuição de produtos de investimento sujeitas à regulamentação da CVM e demais órgãos competentes. Rentabilidade passada não representa garantia de rentabilidade futura.",
};

/*
  Header enxuto (briefing): grupo ÚNICO de links, centralizado, sem
  "Depoimentos"/"Contato" no menu principal — essas seções continuam
  existindo na página normalmente (scroll, footer ou o próprio CTA).
  Antes eram dois grupos jogados nas pontas do container, o que abria um
  vão vazio no meio em telas largas.
*/
export const headerNav = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "FAQ", href: "#faq" },
] as const;

/* Mapa completo do site — usado no footer, que pode ser mais extenso
   que o header enxuto. */
export const footerNav = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "FAQ", href: "#faq" },
  { label: "Contato", href: "#contato" },
] as const;

export const ctaLabels = {
  header: "Agendar conversa",
  heroPrimary: "Agendar uma conversa",
  heroOutline: "Seja cliente",
  heroSecondary: "Conhecer a estratégia",
  final: "Construir minha estratégia",
} as const;
