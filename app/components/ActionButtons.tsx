'use client';

interface ActionButtonsProps {
  onPhishing: () => void;
  onLegitimate: () => void;
  isAnswered: boolean;
  isLoading?: boolean;
}

export default function ActionButtons({
  onPhishing,
  onLegitimate,
  isAnswered,
  isLoading = false,
}: ActionButtonsProps) {
  return (
    <div className="w-full flex gap-4 flex-col sm:flex-row">
      {/* Phishing Button */}
      <button
        onClick={onPhishing}
        disabled={isAnswered || isLoading}
        className={`flex-1 px-6 py-4 font-bold text-lg rounded-lg transition-all duration-300 transform `+
          `${
            isAnswered
              ? 'bg-red-500/50 text-red-200 cursor-not-allowed opacity-60'
              : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 ' +
                'text-white shadow-lg hover:shadow-red-500/50 hover:scale-105 active:scale-95'
          }`
        }
      >
        <span className="flex items-center justify-center gap-2">
          ⚠️ Phishing
        </span>
      </button>

      {/* Legitimate Button */}
      <button
        onClick={onLegitimate}
        disabled={isAnswered || isLoading}
        className={`flex-1 px-6 py-4 font-bold text-lg rounded-lg transition-all duration-300 transform `+
          `${
            isAnswered
              ? 'bg-green-500/50 text-green-200 cursor-not-allowed opacity-60'
              : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 ' +
                'text-white shadow-lg hover:shadow-green-500/50 hover:scale-105 active:scale-95'
          }`
        }
      >
        <span className="flex items-center justify-center gap-2">
          ✓ Legitimate
        </span>
      </button>
    </div>
  );
}
