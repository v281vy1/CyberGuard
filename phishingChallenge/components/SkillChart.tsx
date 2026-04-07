'use client';

import { SkillBreakdown } from '../types';
import ProgressBar from './ProgressBar';

interface SkillChartProps {
  skills: SkillBreakdown;
}

export default function SkillChart({ skills }: SkillChartProps) {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-700 rounded-lg p-5 shadow-lg space-y-4">
      <h3 className="text-lg font-bold text-white">Skill Breakdown</h3>
      <ProgressBar
        value={skills.phishingDetection}
        max={100}
        label={`Phishing Detection: ${skills.phishingDetection}%`}
        colorClassName="bg-gradient-to-r from-red-500 to-orange-500"
      />
      <ProgressBar
        value={skills.malwareAwareness}
        max={100}
        label={`Malware Awareness: ${skills.malwareAwareness}%`}
        colorClassName="bg-gradient-to-r from-violet-500 to-fuchsia-500"
      />
      <ProgressBar
        value={skills.passwordSecurity}
        max={100}
        label={`Password Security: ${skills.passwordSecurity}%`}
        colorClassName="bg-gradient-to-r from-emerald-500 to-lime-500"
      />
    </div>
  );
}
