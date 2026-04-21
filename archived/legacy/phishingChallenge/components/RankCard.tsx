'use client';

import { Rank, RankThreshold } from '../types';
import ProgressBar from './ProgressBar';

interface RankCardProps {
  rank: Rank;
  totalXP: number;
  thresholds: RankThreshold[];
}

export default function RankCard({ rank, totalXP, thresholds }: RankCardProps) {
  const currentIndex = thresholds.findIndex((entry) => entry.rank === rank);
  const safeIndex = currentIndex >= 0 ? currentIndex : 0;
  const currentThreshold = thresholds[safeIndex];
  const nextThreshold = thresholds[safeIndex + 1];

  const currentFloor = currentThreshold?.xpRequired ?? 0;
  const nextTarget = nextThreshold?.xpRequired ?? currentFloor;
  const xpInBand = totalXP - currentFloor;
  const bandSize = Math.max(nextTarget - currentFloor, 1);

  return (
    <div className="bg-gradient-to-br from-cyan-500/20 via-blue-500/15 to-indigo-500/20 border border-cyan-500/40 rounded-lg p-5 shadow-lg">
      <p className="text-xs font-semibold text-cyan-200 uppercase tracking-wider mb-2">Current Rank</p>
      <div className="flex items-center justify-between gap-3 mb-4">
        <h3 className="text-xl md:text-2xl font-black text-white">{rank}</h3>
        <span className="text-lg">🛡️</span>
      </div>

      <p className="text-sm text-cyan-100 mb-3">
        XP: <span className="font-bold text-white">{totalXP}</span>
        {nextThreshold ? (
          <span className="text-cyan-200"> / {nextThreshold.xpRequired} to {nextThreshold.rank}</span>
        ) : (
          <span className="text-cyan-200"> (max rank reached)</span>
        )}
      </p>

      {nextThreshold ? (
        <ProgressBar
          value={xpInBand}
          max={bandSize}
          colorClassName="bg-gradient-to-r from-cyan-400 to-blue-500"
        />
      ) : (
        <ProgressBar
          value={1}
          max={1}
          colorClassName="bg-gradient-to-r from-emerald-400 to-cyan-500"
        />
      )}
    </div>
  );
}
