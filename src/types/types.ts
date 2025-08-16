export const CATEGORIES = {
  DIGITALIZACION: 'Digitalización de Sectores',
  TECNOLOGIAS: 'Tecnologías Habilitadoras',
  NUBE: 'Computación en la Nube',
  IA: 'Inteligencia Artificial',
  DATOS: 'Evaluación de Datos',
  PROYECTO: 'Proyecto de Transformación Digital',
} as const;

export type CategoryId = keyof typeof CATEGORIES;
export type CategoryName = typeof CATEGORIES[CategoryId];

export interface Question {
  category: CategoryName;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Player {
  id: number;
  name: string;
  score: Record<CategoryName, boolean>;
  position: number;
}
