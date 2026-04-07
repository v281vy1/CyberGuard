export type Difficulty = 'easy' | 'medium' | 'hard';
export type ThreatType = 'Email Phishing' | 'Credential Theft' | 'Malware';
export type EmailTemplate = 'bank' | 'ecommerce' | 'social' | 'payment' | 'support';

export interface Email {
  id: string;
  sender: {
    name: string;
    email: string;
  };
  subject: string;
  body: string;
  displayLink: string;
  actualLink: string;
  isPhishing: boolean;
  clues: string[];
  template: EmailTemplate;
  difficulty: Difficulty;
}

export interface GameState {
  level: number;
  score: number;
  streak: number;
  difficulty: Difficulty;
  isAnswered: boolean;
  userAnswer: boolean | null;
  timeRemaining: number;
  totalTime: number;
  accuracy: number;
  gameTotal: number;
}

export interface FeedbackState {
  isVisible: boolean;
  isCorrect: boolean;
  message: string;
  clues: string[];
  explanation: string;
}
