'use client';

interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  colorClassName?: string;
}

export default function ProgressBar({
  value,
  max,
  label,
  colorClassName = 'bg-gradient-to-r from-cyan-500 to-blue-500',
}: ProgressBarProps) {
  const safeMax = Math.max(max, 1);
  const clamped = Math.min(Math.max(value, 0), safeMax);
  const percentage = Math.round((clamped / safeMax) * 100);

  return (
    <div>
      {label && <p className="text-xs text-gray-300 mb-2">{label}</p>}
      <div className="w-full bg-gray-800 rounded-full h-2.5 overflow-hidden border border-gray-700">
        <div
          className={`h-full transition-all duration-500 ${colorClassName}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
