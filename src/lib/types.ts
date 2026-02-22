export interface Reference {
  source: string;
  doc: string;
  section?: string;
  url?: string;
  page?: string;
  quote?: string;
}

export interface Concept {
  id: string;
  title: string;
  summary: string;
  explanation: string;
  tags: string[];
  prerequisites?: string[];
  references: Reference[];
}

export interface SymbolData {
  id: string;
  name: string;
  icon: string;
  meaning: string;
  operationalImplication: string;
  references: Reference[];
}

export interface Abbreviation {
  id: string;
  acronym: string;
  expansion: string;
  meaning: string;
  context: string;
  references: Reference[];
}

export interface Exercise {
  id: string;
  type: 'flashcard' | 'multiple-choice' | 'decode' | 'triage' | 'track-distance' | 'performance';
  prompt: string;
  assets?: string[];
  solution: string;
  hints?: string[];
  grading?: {
    correctAnswer: string;
    tolerance?: number;
  };
  category: string;
  references: Reference[];
}

export interface SessionResult {
  id: string;
  timestamp: number;
  exerciseId: string;
  score: number;
  timeSpent: number;
  correct: boolean;
  errors?: string[];
  concepts: string[];
}

export interface UserProgress {
  exerciseId: string;
  timesAttempted: number;
  timesCorrect: number;
  lastAttempt: number;
  mastery: number;
  errors: string[];
}

export interface DailyDrill {
  id: string;
  name: string;
  duration: number;
  exercises: string[];
  category: string;
}
