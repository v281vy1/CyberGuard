export type Difficulty = 'easy' | 'medium' | 'hard';
export type ThreatType = 'Email Phishing' | 'Credential Theft' | 'Malware';
export type EmailTemplate = 'bank' | 'ecommerce' | 'social' | 'payment' | 'support';
export type Rank = 'Beginner' | 'Trainee' | 'Analyst' | 'Expert' | 'Elite Security Analyst';
export type Achievement = 'first-level-completed' | 'fast-responder' | 'phishing-expert' | 'elite-security-analyst';

export interface SkillBreakdown {
  phishingDetection: number;
  malwareAwareness: number;
  passwordSecurity: number;
}

export interface RankThreshold {
  rank: Rank;
  xpRequired: number;
}

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
  totalXP: number;
  rank: Rank;
  levelsCompleted: number;
  totalLevels: number;
  achievements: Achievement[];
  skillBreakdown: SkillBreakdown;
}

export interface FeedbackState {
  isVisible: boolean;
  isCorrect: boolean;
  message: string;
  clues: string[];
  explanation: string;
  xpEarned: number;
}
