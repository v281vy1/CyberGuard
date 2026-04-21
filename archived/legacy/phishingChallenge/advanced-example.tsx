'use client';

import { PhishingChallenge } from '../components';
import { useState } from 'react';

/**
 * Advanced Example Page with Custom Configuration
 * Demonstrates different difficulty levels and custom settings
 */
export default function AdvancedPhishingPage() {
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [timeLimit, setTimeLimit] = useState(120);
  const [gameStarted, setGameStarted] = useState(false);

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950/30 to-gray-950 p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              🔒 Cybersecurity Training
            </h1>
            <p className="text-gray-400 text-lg">
              Strengthen your phishing detection skills
            </p>
          </div>

          {/* Configuration Card */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-700 rounded-lg p-8 shadow-2xl space-y-6">
            {/* Difficulty Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-4">
                🎯 Select Difficulty Level
              </label>
              <div className="grid grid-cols-3 gap-4">
                {(['easy', 'medium', 'hard'] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => setDifficulty(level)}
                    className={`p-4 rounded-lg font-semibold transition-all ${
                      difficulty === level
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white scale-105'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {level === 'easy' && '🌱'}
                    {level === 'medium' && '⚡'}
                    {level === 'hard' && '🔥'}
                    <br />
                    <span className="text-sm mt-2 block capitalize">{level}</span>
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-2">
                {difficulty === 'easy' && 'Obvious phishing attempts with clear indicators'}
                {difficulty === 'medium' && 'Balanced challenge with realistic emails'}
                {difficulty === 'hard' && 'Advanced phishing with subtle detection clues'}
              </p>
            </div>

            {/* Time Limit Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-4">
                ⏱️ Time Limit per Email
              </label>
              <div className="space-y-3">
                {[60, 90, 120, 180].map((time) => (
                  <button
                    key={time}
                    onClick={() => setTimeLimit(time)}
                    className={`w-full p-3 rounded-lg font-medium transition-all text-left ${
                      timeLimit === time
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {time} seconds ({Math.floor(time / 60)}:{(time % 60)
                      .toString()
                      .padStart(2, '0')})
                  </button>
                ))}
              </div>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-blue-500/20 border border-blue-500/50 rounded p-3">
                <p className="font-semibold text-blue-300 mb-1">📊 Scoring</p>
                <p className="text-blue-100">
                  Easy: +10 pts | Medium: +20 pts | Hard: +30 pts
                </p>
              </div>
              <div className="bg-purple-500/20 border border-purple-500/50 rounded p-3">
                <p className="font-semibold text-purple-300 mb-1">🎯 Goal</p>
                <p className="text-purple-100">
                  Build your streak by identifying threats correctly
                </p>
              </div>
            </div>

            {/* Start Button */}
            <button
              onClick={() => setGameStarted(true)}
              className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold text-lg rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg"
            >
              🚀 Start Challenge
            </button>

            {/* Tips */}
            <div className="bg-amber-500/10 border border-amber-500/50 rounded p-4">
              <p className="text-xs font-semibold text-amber-300 mb-2">💡 Pro Tips</p>
              <ul className="text-xs text-amber-100/80 space-y-1">
                <li>• Always check sender's email address carefully</li>
                <li>• Look for unusual urgency or pressure tactics</li>
                <li>• Hover links to inspect actual URLs</li>
                <li>• Spot spelling and grammar errors</li>
                <li>• Legitimate emails rarely ask for passwords</li>
              </ul>
            </div>
          </div>

          {/* Footer Info */}
          <div className="text-center mt-8 text-gray-500 text-sm">
            <p>
              🎓 This is an interactive educational tool designed to improve your
              cybersecurity awareness
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => setGameStarted(false)}
        className="fixed top-4 left-4 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg z-40 transition-all"
      >
        ← Back to Menu
      </button>
      <PhishingChallenge initialDifficulty={difficulty} timeLimit={timeLimit} />
    </div>
  );
}
