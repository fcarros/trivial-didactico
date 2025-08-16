import { Question, CATEGORIES } from '../types/types';

export const QUESTIONS: Question[] = [
  // Digitalización de Sectores
  {
    category: CATEGORIES.DIGITALIZACION,
    question: '¿Cuál es el principal objetivo de la digitalización en los sectores productivos?',
    options: ['Reducir el personal', 'Aumentar la eficiencia y la competitividad', 'Vender más productos en línea', 'Implementar redes sociales'],
    correctAnswer: 'Aumentar la eficiencia y la competitividad',
  },
  {
    category: CATEGORIES.DIGITALIZACION,
    question: 'La "Industria 4.0" se refiere a:',
    options: ['La cuarta revolución industrial', 'Una marca de software', 'Un tipo de robot industrial', 'Un estándar de calidad'],
    correctAnswer: 'La cuarta revolución industrial',
  },

  // Tecnologías Habilitadoras
  {
    category: CATEGORIES.TECNOLOGIAS,
    question: '¿Cuál de las siguientes NO es considerada una tecnología habilitadora digital clave?',
    options: ['Inteligencia Artificial', 'Internet de las Cosas (IoT)', 'Blockchain', 'Motor de vapor'],
    correctAnswer: 'Motor de vapor',
  },
  {
    category: CATEGORIES.TECNOLOGIAS,
    question: 'El "Internet de las Cosas" (IoT) se refiere a:',
    options: ['Una nueva versión de internet', 'La interconexión de objetos físicos a través de internet', 'Una red social para empresas', 'Un tipo de cable de fibra óptica'],
    correctAnswer: 'La interconexión de objetos físicos a través de internet',
  },

  // Computación en la Nube
  {
    category: CATEGORIES.NUBE,
    question: '¿Qué significa "SaaS" en el contexto de la computación en la nube?',
    options: ['Software as a Service', 'Security as a Standard', 'System as a Service', 'Software and Security'],
    correctAnswer: 'Software as a Service',
  },
  {
    category: CATEGORIES.NUBE,
    question: 'Una ventaja principal de la computación en la nube es:',
    options: ['No requiere conexión a internet', 'La seguridad es siempre perfecta', 'El pago por uso y la escalabilidad', 'Solo funciona en ordenadores de una marca'],
    correctAnswer: 'El pago por uso y la escalabilidad',
  },

  // Inteligencia Artificial
  {
    category: CATEGORIES.IA,
    question: 'El "Machine Learning" o Aprendizaje Automático es una rama de:',
    options: ['La ciberseguridad', 'La Inteligencia Artificial', 'El análisis de datos', 'La computación cuántica'],
    correctAnswer: 'La Inteligencia Artificial',
  },
  {
    category: CATEGORIES.IA,
    question: '¿Qué tarea es un buen ejemplo de aplicación de la IA en la industria?',
    options: ['El control de calidad de productos mediante visión artificial', 'La facturación mensual a clientes', 'El diseño del logo de la empresa', 'La instalación de nuevo software'],
    correctAnswer: 'El control de calidad de productos mediante visión artificial',
  },

  // Evaluación de Datos
  {
    category: CATEGORIES.DATOS,
    question: '¿Qué es "Big Data"?',
    options: ['Una base de datos muy grande', 'Un software de análisis', 'Conjuntos de datos tan grandes y complejos que requieren herramientas especiales', 'Un tipo de gráfico estadístico'],
    correctAnswer: 'Conjuntos de datos tan grandes y complejos que requieren herramientas especiales',
  },
  {
    category: CATEGORIES.DATOS,
    question: 'El análisis predictivo de datos busca:',
    options: ['Describir lo que ya ha pasado', 'Entender por qué ocurrió algo', 'Predecir resultados futuros basándose en datos históricos', 'Almacenar datos de forma segura'],
    correctAnswer: 'Predecir resultados futuros basándose en datos históricos',
  },

  // Proyecto de Transformación Digital
  {
    category: CATEGORIES.PROYECTO,
    question: '¿Cuál es el primer paso crucial en un proyecto de transformación digital?',
    options: ['Comprar la última tecnología', 'Definir la estrategia y los objetivos de negocio', 'Contratar a un consultor', 'Formar a todos los empleados en IA'],
    correctAnswer: 'Definir la estrategia y los objetivos de negocio',
  },
  {
    category: CATEGORIES.PROYECTO,
    question: 'La gestión del cambio en un proyecto de transformación digital se enfoca en:',
    options: ['El aspecto tecnológico del proyecto', 'El aspecto humano y cultural de la organización', 'El presupuesto y los plazos', 'La comunicación con los clientes'],
    correctAnswer: 'El aspecto humano y cultural de la organización',
  },
];
