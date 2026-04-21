import { Achievement, Rank, SkillBreakdown } from '../types';

export interface ProgressSummary {
  stageLabel: string;
  stageNumber: number;
  score: number;
  streak: number;
  accuracy: number;
  totalXP: number;
  rank: Rank;
  levelsCompleted: number;
  totalLevels: number;
  achievements: Achievement[];
  skillBreakdown: SkillBreakdown;
  completedAt: string;
  nextRoute: string;
}

const PROGRESS_SUMMARY_KEY = 'cyberguard-progress-summary';

export function saveProgressSummary(summary: ProgressSummary) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(PROGRESS_SUMMARY_KEY, JSON.stringify(summary));
}

export function loadProgressSummary(): ProgressSummary | null {
  if (typeof window === 'undefined') return null;

  const rawSummary = window.localStorage.getItem(PROGRESS_SUMMARY_KEY);
  if (!rawSummary) return null;

  try {
    return JSON.parse(rawSummary) as ProgressSummary;
  } catch {
    return null;
  }
}
