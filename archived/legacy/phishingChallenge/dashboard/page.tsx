'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Achievement, RankThreshold, SkillBreakdown } from '../types';
import { loadProgressSummary } from '../utils/progressStore';
import RankCard from '../components/RankCard';
import SkillChart from '../components/SkillChart';
import Achievements from '../components/Achievements';
import Leaderboard from '../components/Leaderboard';

const RANK_THRESHOLDS: RankThreshold[] = [
  { rank: 'Beginner', xpRequired: 0 },
  { rank: 'Trainee', xpRequired: 200 },
  { rank: 'Analyst', xpRequired: 500 },
  { rank: 'Expert', xpRequired: 900 },
  { rank: 'Elite Security Analyst', xpRequired: 1300 },
];

const EMPTY_SKILLS: SkillBreakdown = {
  phishingDetection: 0,
  malwareAwareness: 0,
  passwordSecurity: 0,
};

const EMPTY_ACHIEVEMENTS: Achievement[] = [];

export default function DashboardPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [summary, setSummary] = useState(loadProgressSummary());

  useEffect(() => {
    setSummary(loadProgressSummary());
    setIsLoaded(true);
  }, []);

  const totalXP = summary?.totalXP ?? 0;
  const currentRank = summary?.rank ?? 'Beginner';
  const completedSublevels = summary?.levelsCompleted ?? 0;
  const totalSublevels = summary?.totalLevels ?? 3;
  const accuracy = summary?.accuracy ?? 0;
  const score = summary?.score ?? 0;
  const skills = summary?.skillBreakdown ?? EMPTY_SKILLS;
  const achievements = summary?.achievements ?? EMPTY_ACHIEVEMENTS;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-cyan-950/20 to-slate-950 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-200">CyberGuard</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-emerald-300">
            Progress Dashboard
          </h1>
          <p className="mt-3 text-gray-300">
            Review your summary from Level 1 and keep moving through the training path.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 text-sm font-semibold hover:bg-gray-700 transition-colors"
            >
              Back to Welcome
            </Link>
            <Link
              href="/phishing"
              className="px-4 py-2 rounded-lg bg-cyan-500/20 border border-cyan-400/40 text-cyan-200 text-sm font-semibold hover:bg-cyan-500/30 transition-colors"
            >
              Start Level 1
            </Link>
            <Link
              href="/password"
              className="px-4 py-2 rounded-lg bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-sm font-semibold hover:bg-emerald-500/30 transition-colors"
            >
              Continue to Level 2
            </Link>
          </div>
        </div>

        {!isLoaded ? (
          <div className="rounded-2xl border border-gray-700 bg-gray-900/70 p-6 text-gray-300">
            Loading dashboard...
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="rounded-2xl border border-gray-700 bg-gray-900/70 p-5">
                <p className="text-xs uppercase tracking-wider text-gray-400">Summary Stage</p>
                <p className="mt-2 text-xl font-semibold text-white">{summary?.stageLabel ?? 'No stage completed yet'}</p>
                <p className="mt-1 text-sm text-gray-400">{summary ? `Completed on ${new Date(summary.completedAt).toLocaleString()}` : 'Run Level 1 to generate a summary.'}</p>
              </div>
              <div className="rounded-2xl border border-gray-700 bg-gray-900/70 p-5">
                <p className="text-xs uppercase tracking-wider text-gray-400">Score</p>
                <p className="mt-2 text-3xl font-black text-purple-300">{score}</p>
              </div>
              <div className="rounded-2xl border border-gray-700 bg-gray-900/70 p-5">
                <p className="text-xs uppercase tracking-wider text-gray-400">Accuracy</p>
                <p className="mt-2 text-3xl font-black text-cyan-300">{accuracy}%</p>
              </div>
              <div className="rounded-2xl border border-gray-700 bg-gray-900/70 p-5">
                <p className="text-xs uppercase tracking-wider text-gray-400">Sublevels</p>
                <p className="mt-2 text-3xl font-black text-emerald-300">{completedSublevels}/{totalSublevels}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RankCard rank={currentRank} totalXP={totalXP} thresholds={RANK_THRESHOLDS} />

              <div className="rounded-2xl border border-gray-700 bg-gradient-to-br from-gray-900 to-gray-950 p-5 shadow-lg space-y-4">
                <h3 className="text-lg font-bold text-white">Level 1 Summary</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="rounded-xl border border-gray-700 bg-gray-800/60 p-4">
                    <p className="text-gray-400">Rank</p>
                    <p className="mt-1 text-lg font-semibold text-white">{currentRank}</p>
                  </div>
                  <div className="rounded-xl border border-gray-700 bg-gray-800/60 p-4">
                    <p className="text-gray-400">Total XP</p>
                    <p className="mt-1 text-lg font-semibold text-cyan-300">{totalXP}</p>
                  </div>
                  <div className="rounded-xl border border-gray-700 bg-gray-800/60 p-4">
                    <p className="text-gray-400">Score</p>
                    <p className="mt-1 text-lg font-semibold text-white">{score}</p>
                  </div>
                  <div className="rounded-xl border border-gray-700 bg-gray-800/60 p-4">
                    <p className="text-gray-400">Stage</p>
                    <p className="mt-1 text-lg font-semibold text-amber-300">{summary?.stageNumber ?? 0}</p>
                  </div>
                </div>
              </div>

              <SkillChart skills={skills} />
              <Achievements achievements={achievements} />
            </div>

            <Leaderboard currentXP={totalXP} currentRank={currentRank} />
          </>
        )}
      </div>
    </main>
  );
}
