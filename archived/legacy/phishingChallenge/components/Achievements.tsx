'use client';

import { Achievement } from '../types';

interface AchievementsProps {
  achievements: Achievement[];
}

const ACHIEVEMENT_META: Record<Achievement, { icon: string; label: string }> = {
  'first-level-completed': { icon: '🏅', label: 'First Level Completed' },
  'fast-responder': { icon: '⚡', label: 'Fast Responder' },
  'phishing-expert': { icon: '🧠', label: 'Phishing Expert' },
  'elite-security-analyst': { icon: '🏆', label: 'Elite Security Analyst' },
};

export default function Achievements({ achievements }: AchievementsProps) {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-700 rounded-lg p-5 shadow-lg">
      <h3 className="text-lg font-bold text-white mb-4">Achievements</h3>
      {achievements.length === 0 ? (
        <p className="text-sm text-gray-400">No achievements yet. Keep analyzing emails to unlock rewards.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {achievements.map((achievement) => (
            <div
              key={achievement}
              className="flex items-center gap-3 p-3 rounded-lg border border-amber-500/40 bg-amber-500/10"
            >
              <span className="text-xl">{ACHIEVEMENT_META[achievement].icon}</span>
              <span className="text-sm text-amber-100 font-medium">{ACHIEVEMENT_META[achievement].label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
