export type SiteMode = 'demo' | 'production';

export const business = {
  mode: 'demo' as SiteMode,
  name: 'Forma & Madeira',
  descriptor: 'Ambientes planejados',
  shortDescription:
    'Marcenaria sob medida para espaços que equilibram matéria, luz e rotina.',
  city: 'Joinville — SC',
  address: '',
  whatsapp: '',
  instagram: '',
  siteUrl: '',
  serviceArea: [] as string[],
  colors: {
    paper: '#F6F3EC',
    sand: '#E8DFD1',
    olive: '#343C31',
    ink: '#232724',
    wood: '#8A6248',
  },
  seo: {
    title: 'Forma & Madeira — Ambientes planejados',
    description:
      'Projetos de marcenaria sob medida que unem funcionalidade, estética e personalidade.',
  },
} as const;

export const isDemo = business.mode === 'demo';
