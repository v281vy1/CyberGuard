'use client';

import { Rank } from '../types';

interface LeaderboardEntry {
  name: string;
  xp: number;
  rank: Rank;
}

interface LeaderboardProps {
  currentXP: number;
  currentRank: Rank;
}

export default function Leaderboard({ currentXP, currentRank }: LeaderboardProps) {
  const entries: LeaderboardEntry[] = [
    { name: 'CipherFox', xp: 1480, rank: 'Elite Security Analyst' as Rank },
    { name: 'PacketKnight', xp: 1180, rank: 'Expert' as Rank },
    { name: 'You', xp: currentXP, rank: currentRank },
    { name: 'HashHunter', xp: 720, rank: 'Analyst' as Rank },
    { name: 'NullGuard', xp: 280, rank: 'Trainee' as Rank },
  ].sort((a, b) => b.xp - a.xp);

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700 rounded-lg p-5 shadow-lg">
      <h3 className="text-lg font-bold text-white mb-4">Leaderboard (Demo)</h3>
      <div className="space-y-2">
        {entries.map((entry, index) => (
          <div
            key={entry.name}
            className={`flex items-center justify-between rounded-lg border px-3 py-2 ${
              entry.name === 'You'
                ? 'bg-cyan-500/15 border-cyan-500/50'
                : 'bg-gray-800/60 border-gray-700'
            }`}
          >
            <p className="text-sm text-gray-200">
              {index + 1}. {entry.name}
            </p>
            <p className="text-xs text-gray-300">
              {entry.rank} • {entry.xp} XP
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
