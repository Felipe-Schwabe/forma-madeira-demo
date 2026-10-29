export type ProjectCategory =
  | 'Todos'
  | 'Cozinhas'
  | 'Dormitórios'
  | 'Closets'
  | 'Salas'
  | 'Banheiros'
  | 'Comerciais';

export type Project = {
  id: string;
  title: string;
  category: Exclude<ProjectCategory, 'Todos'>;
  image: string;
  alt: string;
  eyebrow: string;
  description: string;
};

export const projectCategories: ProjectCategory[] = [
  'Todos',
  'Cozinhas',
  'Dormitórios',
  'Closets',
  'Salas',
  'Banheiros',
  'Comerciais',
];

export const projects: Project[] = [
  {
    id: 'cozinha-linha-natural',
    title: 'Linha natural',
    category: 'Cozinhas',
    image: '/images/kitchen-natural.jpg',
    alt: 'Cozinha planejada com madeira natural, ilha central e iluminação quente',
    eyebrow: 'Cozinha · estudo ilustrativo',
    description: 'Veios aparentes e volumes precisos para uma rotina mais leve.',
  },
  {
    id: 'sala-materia-e-luz',
    title: 'Matéria e luz',
    category: 'Salas',
    image: '/images/living-materia.jpg',
    alt: 'Sala contemporânea com painel de madeira e sofá claro',
    eyebrow: 'Sala · estudo ilustrativo',
    description: 'Painel, estante e iluminação em uma composição contínua.',
  },
  {
    id: 'closet-essencial',
    title: 'Closet essencial',
    category: 'Closets',
    image: '/images/closet-essential.jpg',
    alt: 'Closet planejado com portas de vidro e madeira escura',
    eyebrow: 'Closet · estudo ilustrativo',
    description: 'Organização silenciosa, desenho limpo e cada coisa em seu lugar.',
  },
  {
    id: 'dormitorio-calmaria',
    title: 'Calmaria',
    category: 'Dormitórios',
    image: '/images/bedroom-calm.jpg',
    alt: 'Dormitório contemporâneo com cabeceira de madeira e luz indireta',
    eyebrow: 'Dormitório · estudo ilustrativo',
    description: 'Texturas naturais e marcenaria integrada para desacelerar.',
  },
  {
    id: 'banheiro-mineral',
    title: 'Mineral',
    category: 'Banheiros',
    image: '/images/bathroom-mineral.jpg',
    alt: 'Banheiro sofisticado com bancada de pedra e armário de madeira',
    eyebrow: 'Banheiro · estudo ilustrativo',
    description: 'Proporções exatas para transformar o essencial em ritual.',
  },
  {
    id: 'cozinha-entretons',
    title: 'Entre tons',
    category: 'Cozinhas',
    image: '/images/kitchen-tones.jpg',
    alt: 'Cozinha planejada em tons neutros com armários de madeira',
    eyebrow: 'Cozinha · estudo ilustrativo',
    description: 'Contrastes suaves, armazenamento generoso e desenho atemporal.',
  },
  {
    id: 'comercial-estudio',
    title: 'Estúdio aberto',
    category: 'Comerciais',
    image: '/images/commercial-studio.jpg',
    alt: 'Ambiente comercial elegante com balcão de madeira e plantas',
    eyebrow: 'Comercial · estudo ilustrativo',
    description: 'Um espaço de trabalho que também comunica a essência da marca.',
  },
  {
    id: 'sala-conexao',
    title: 'Conexão',
    category: 'Salas',
    image: '/images/living-connection.jpg',
    alt: 'Sala elegante com mobiliário planejado e janela ampla',
    eyebrow: 'Sala · estudo ilustrativo',
    description: 'Móveis que organizam a casa sem interromper o encontro.',
  },
];

// Ative apenas quando houver duas imagens do mesmo ambiente, com origem autorizada.
export const beforeAfter = null as null | { before: string; after: string; alt: string };
