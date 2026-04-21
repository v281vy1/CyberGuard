'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Achievement, Rank, SkillBreakdown } from '../types';
import { loadProgressSummary, saveProgressSummary } from '../utils/progressStore';

interface PasswordRound {
  password: string;
  isStrong: boolean;
  reason: string;
}

const PASSWORD_ROUNDS: PasswordRound[] = [
  {
    password: 'Adm1n!2026#Secure',
    isStrong: true,
    reason: 'Long length, mixed character types, and no obvious dictionary word.',
  },
  {
    password: 'welcome123',
    isStrong: false,
    reason: 'Common word plus a predictable number sequence makes it easy to guess.',
  },
  {
    password: 'N3twork-Guard!47',
    isStrong: true,
    reason: 'Strong mix of length, symbols, and uncommon structure.',
  },
];

const EMPTY_SKILLS: SkillBreakdown = {
  phishingDetection: 0,
  malwareAwareness: 0,
  passwordSecurity: 0,
};

function getRank(totalXP: number): Rank {
  if (totalXP >= 1300) return 'Elite Security Analyst';
  if (totalXP >= 900) return 'Expert';
  if (totalXP >= 500) return 'Analyst';
  if (totalXP >= 200) return 'Trainee';
  return 'Beginner';
}

export default function PasswordPage() {
  const [levelOneSummary, setLevelOneSummary] = useState(loadProgressSummary());
  const [roundIndex, setRoundIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [choice, setChoice] = useState<boolean | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setLevelOneSummary(loadProgressSummary());
  }, []);

  const currentRound = PASSWORD_ROUNDS[roundIndex];
  const totalRounds = PASSWORD_ROUNDS.length;
  const previousTotalXP = levelOneSummary?.totalXP ?? 0;
  const combinedXP = previousTotalXP + score * 10;
  const overallAccuracy = roundIndex > 0 || isAnswered
    ? Math.round((correctAnswers / (roundIndex + (isAnswered ? 1 : 0))) * 100)
    : 0;
  const currentRank = getRank(combinedXP);
  const skills = useMemo<SkillBreakdown>(() => ({
    ...(levelOneSummary?.skillBreakdown ?? EMPTY_SKILLS),
    passwordSecurity: overallAccuracy,
  }), [levelOneSummary, overallAccuracy]);
  const achievements = useMemo<Achievement[]>(() => levelOneSummary?.achievements ?? [], [levelOneSummary]);

  const handleAnswer = (selectedStrong: boolean) => {
    if (isAnswered || completed) return;

    const isCorrect = selectedStrong === currentRound.isStrong;
    setChoice(selectedStrong);
    setIsAnswered(true);
    setFeedback(isCorrect
      ? `Correct. ${currentRound.reason}`
      : `Incorrect. ${currentRound.reason}`);
    setScore((currentScore) => currentScore + (isCorrect ? 1 : 0));
    setStreak((currentStreak) => (isCorrect ? currentStreak + 1 : 0));
    setCorrectAnswers((currentCorrect) => currentCorrect + (isCorrect ? 1 : 0));
  };

  const handleNext = () => {
    if (!isAnswered) return;

    if (roundIndex === totalRounds - 1) {
      saveProgressSummary({
        stageLabel: 'Level 2 Complete - Password Strength',
        stageNumber: 2,
        score,
        streak,
        accuracy: overallAccuracy,
        totalXP: combinedXP,
        rank: currentRank,
        levelsCompleted: totalRounds,
        totalLevels: totalRounds,
        achievements,
        skillBreakdown: skills,
        completedAt: new Date().toISOString(),
        nextRoute: '/dashboard',
      });
      setCompleted(true);
      return;
    }

    setRoundIndex((currentIndex) => currentIndex + 1);
    setIsAnswered(false);
    setChoice(null);
    setFeedback('');
  };

  const currentDisplayRound = roundIndex + 1;

  if (completed) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950/20 to-slate-950 p-4 md:p-8 flex items-center justify-center">
        <div className="w-full max-w-4xl rounded-3xl border border-emerald-500/30 bg-white/5 backdrop-blur-xl p-8 md:p-10 space-y-6 shadow-2xl">
          <div className="text-center space-y-3">
            <p className="text-xs uppercase tracking-[0.35em] text-emerald-200">CyberGuard</p>
            <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-300">
              Level 2 Complete
            </h1>
            <p className="text-gray-300">Password strength analysis is complete and your progress has been saved.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-gray-700 bg-gray-900/70 p-5">
              <p className="text-xs uppercase tracking-wider text-gray-400">Score</p>
              <p className="mt-2 text-3xl font-black text-white">{score}</p>
            </div>
            <div className="rounded-2xl border border-gray-700 bg-gray-900/70 p-5">
              <p className="text-xs uppercase tracking-wider text-gray-400">Accuracy</p>
              <p className="mt-2 text-3xl font-black text-cyan-300">{overallAccuracy}%</p>
            </div>
            <div className="rounded-2xl border border-gray-700 bg-gray-900/70 p-5">
              <p className="text-xs uppercase tracking-wider text-gray-400">Rank</p>
              <p className="mt-2 text-3xl font-black text-emerald-300">{currentRank}</p>
            </div>
            <div className="rounded-2xl border border-gray-700 bg-gray-900/70 p-5">
              <p className="text-xs uppercase tracking-wider text-gray-400">Total XP</p>
              <p className="mt-2 text-3xl font-black text-purple-300">{combinedXP}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/dashboard"
              className="px-5 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold text-center hover:from-emerald-400 hover:to-cyan-400 transition-colors"
            >
              Open Dashboard
            </Link>
            <Link
              href="/"
              className="px-5 py-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 font-semibold text-center hover:bg-gray-700 transition-colors"
            >
              Back to Welcome
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950/20 to-slate-950 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-emerald-200">CyberGuard</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-300">
            Level 2: Password Strength
          </h1>
          <p className="mt-3 text-gray-300">Judge each password as strong or weak, then move to the next sample.</p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/dashboard"
              className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 text-sm font-semibold hover:bg-gray-700 transition-colors"
            >
              Open Dashboard
            </Link>
            <Link
              href="/phishing"
              className="px-4 py-2 rounded-lg bg-cyan-500/20 border border-cyan-400/40 text-cyan-200 text-sm font-semibold hover:bg-cyan-500/30 transition-colors"
            >
              Review Level 1
            </Link>
          </div>
        </div>

        {levelOneSummary && (
          <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-5 text-cyan-100">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-200">Level 1 Summary</p>
            <p className="mt-2 text-lg font-semibold">{levelOneSummary.stageLabel}</p>
            <p className="mt-1 text-sm text-cyan-100/80">
              Score {levelOneSummary.score} | Accuracy {levelOneSummary.accuracy}% | Rank {levelOneSummary.rank}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-gray-700 bg-gray-900/70 p-5">
            <p className="text-xs uppercase tracking-wider text-gray-400">Round</p>
            <p className="mt-2 text-3xl font-black text-white">{currentDisplayRound}/{totalRounds}</p>
          </div>
          <div className="rounded-2xl border border-gray-700 bg-gray-900/70 p-5">
            <p className="text-xs uppercase tracking-wider text-gray-400">Score</p>
            <p className="mt-2 text-3xl font-black text-emerald-300">{score}</p>
          </div>
          <div className="rounded-2xl border border-gray-700 bg-gray-900/70 p-5">
            <p className="text-xs uppercase tracking-wider text-gray-400">Streak</p>
            <p className="mt-2 text-3xl font-black text-orange-300">{streak}</p>
          </div>
          <div className="rounded-2xl border border-gray-700 bg-gray-900/70 p-5">
            <p className="text-xs uppercase tracking-wider text-gray-400">Rank</p>
            <p className="mt-2 text-3xl font-black text-cyan-300">{currentRank}</p>
          </div>
        </div>

        <div className="rounded-3xl border border-gray-700 bg-gradient-to-br from-gray-900 to-gray-950 p-6 md:p-8 shadow-2xl space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Password under review</p>
            <p className="mt-3 font-mono text-2xl md:text-3xl text-white break-all">{currentRound.password}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => handleAnswer(true)}
              disabled={isAnswered}
              className="px-5 py-4 rounded-xl font-semibold bg-gradient-to-r from-emerald-600 to-lime-600 hover:from-emerald-500 hover:to-lime-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Mark as Strong
            </button>
            <button
              onClick={() => handleAnswer(false)}
              disabled={isAnswered}
              className="px-5 py-4 rounded-xl font-semibold bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-500 hover:to-orange-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Mark as Weak
            </button>
          </div>

          {feedback && (
            <div className={`rounded-2xl border p-5 ${choice === currentRound.isStrong ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-100' : 'border-rose-500/40 bg-rose-500/10 text-rose-100'}`}>
              <p className="font-semibold">{choice === currentRound.isStrong ? 'Correct' : 'Incorrect'}</p>
              <p className="mt-2 text-sm leading-relaxed">{feedback}</p>
            </div>
          )}

          <div className="flex justify-end">
            <button
              onClick={handleNext}
              disabled={!isAnswered}
              className="px-5 py-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 font-semibold hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {roundIndex === totalRounds - 1 ? 'Finish Level 2' : 'Next Password →'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
