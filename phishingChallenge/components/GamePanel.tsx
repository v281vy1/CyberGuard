'use client';

import { GameState, Difficulty } from '../types';

interface GamePanelProps {
  gameState: GameState;
}

export default function GamePanel({ gameState }: GamePanelProps) {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const isLowTime = gameState.timeRemaining <= 30;
  const difficultyColors: Record<Difficulty, string> = {
    easy: 'bg-green-500/20 text-green-400 border-green-500/50',
    medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
    hard: 'bg-red-500/20 text-red-400 border-red-500/50',
  };

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Left Column */}
      <div className="space-y-4">
        {/* Sublevel Card */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-700 rounded-lg p-4 shadow-lg">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Sublevel
          </p>
          <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            {gameState.level}
          </p>
        </div>

        {/* Threat Type */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-700 rounded-lg p-4 shadow-lg">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Threat Type
          </p>
          <p className="text-lg font-bold text-white">Email Phishing</p>
          <p className="text-xs text-gray-500 mt-1">
            Detection required: High precision
          </p>
        </div>
      </div>

      {/* Right Column */}
      <div className="space-y-4">
        {/* Difficulty Badge */}
        <div
          className={`border rounded-lg p-4 shadow-lg ${difficultyColors[gameState.difficulty]}`}
        >
          <p className="text-xs font-semibold uppercase tracking-wider mb-2">
            Difficulty
          </p>
          <p className="text-2xl font-bold capitalize">
            {gameState.difficulty}
          </p>
        </div>

        {/* Timer */}
        <div className={`rounded-lg p-4 shadow-lg border transition-all ${
          isLowTime
            ? 'bg-red-500/20 border-red-500/50'
            : 'bg-gray-900 border-gray-700'
        } to-gray-950`}>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Time Remaining
          </p>
          <p className={`text-3xl font-black ${isLowTime ? 'text-red-400 animate-pulse' : 'text-white'}`}>
            {formatTime(gameState.timeRemaining)}
          </p>
          <div className="mt-3 w-full bg-gray-700 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-full transition-all ${
                isLowTime ? 'bg-red-500' : 'bg-gradient-to-r from-blue-500 to-purple-500'
              }`}
              style={{
                width: `${(gameState.timeRemaining / gameState.totalTime) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
