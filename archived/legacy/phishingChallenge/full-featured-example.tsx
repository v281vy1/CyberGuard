'use client';

import { PhishingChallenge } from '../components';
import { useState, useEffect } from 'react';

/**
 * Full-Featured Implementation with Sound, Analytics, and Advanced UI
 * This example shows how to extend the component with additional features
 */
export default function FullFeaturedPhishingPage() {
  const [showStats, setShowStats] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [sessionStats, setSessionStats] = useState({
    duration: 0,
    emailsAnalyzed: 0,
    correctAnswers: 0,
  });

  // Sound effect helper (optional)
  const playSound = (type: 'correct' | 'wrong' | 'level-up') => {
    if (!soundEnabled) return;

    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const envelop = audioContext.createGain();

    oscillator.connect(envelop);
    envelop.connect(audioContext.destination);

    switch (type) {
      case 'correct':
        oscillator.frequency.value = 800;
        envelop.gain.setValueAtTime(0.3, audioContext.currentTime);
        envelop.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
        break;
      case 'wrong':
        oscillator.frequency.value = 400;
        envelop.gain.setValueAtTime(0.2, audioContext.currentTime);
        envelop.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
        break;
      case 'level-up':
        oscillator.frequency.value = 1000;
        envelop.gain.setValueAtTime(0.3, audioContext.currentTime);
        envelop.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.4);
        break;
    }
  };

  // Session timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionStats((prev) => ({
        ...prev,
        duration: prev.duration + 1,
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    }
    return `${minutes}m ${secs}s`;
  };

  return (
    <div className="relative">
      {/* Header with controls */}
      <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-gray-950 to-gray-900 border-b border-gray-700 p-4 z-30">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              🔍 Phishing Challenge
            </h1>
            <p className="text-xs text-gray-400">Session: {formatDuration(sessionStats.duration)}</p>
          </div>

          <div className="flex gap-3">
            {/* Sound Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                soundEnabled
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400'
              }`}
            >
              {soundEnabled ? '🔊' : '🔇'} Sound
            </button>

            {/* Stats Toggle */}
            <button
              onClick={() => setShowStats(!showStats)}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg font-medium transition-all"
            >
              📊 Stats
            </button>

            {/* Help */}
            <button
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg font-medium transition-all"
              onClick={() => alert('Identify whether each email is phishing or legitimate. Check the sender, URLs, and content carefully.')}
            >
              ❓ Help
            </button>
          </div>
        </div>
      </div>

      {/* Stats Panel */}
      {showStats && (
        <div className="fixed right-0 top-16 bottom-0 w-80 bg-gradient-to-b from-gray-900 to-gray-950 border-l border-gray-700 p-6 z-20 overflow-y-auto">
          <h2 className="text-xl font-bold text-white mb-6">Session Statistics</h2>

          <div className="space-y-4">
            {/* Time */}
            <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-4">
              <p className="text-xs text-blue-300 font-semibold mb-1">SESSION TIME</p>
              <p className="text-2xl font-bold text-blue-400">
                {formatDuration(sessionStats.duration)}
              </p>
            </div>

            {/* Emails */}
            <div className="bg-purple-500/20 border border-purple-500/50 rounded-lg p-4">
              <p className="text-xs text-purple-300 font-semibold mb-1">EMAILS ANALYZED</p>
              <p className="text-2xl font-bold text-purple-400">
                {sessionStats.emailsAnalyzed}
              </p>
            </div>

            {/* Correct */}
            <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4">
              <p className="text-xs text-green-300 font-semibold mb-1">CORRECT ANSWERS</p>
              <p className="text-2xl font-bold text-green-400">
                {sessionStats.correctAnswers}
              </p>
            </div>

            {/* Accuracy */}
            <div className="bg-cyan-500/20 border border-cyan-500/50 rounded-lg p-4">
              <p className="text-xs text-cyan-300 font-semibold mb-1">ACCURACY RATE</p>
              <p className="text-2xl font-bold text-cyan-400">
                {sessionStats.emailsAnalyzed > 0
                  ? Math.round((sessionStats.correctAnswers / sessionStats.emailsAnalyzed) * 100)
                  : 0}
                %
              </p>
            </div>

            {/* Performance Tips */}
            <div className="mt-8 p-4 bg-amber-500/10 border border-amber-500/50 rounded-lg">
              <h3 className="font-semibold text-amber-300 mb-3">💡 Performance Tips</h3>
              <ul className="text-sm text-amber-100/80 space-y-2">
                <li>✓ Build your streak for bonus points</li>
                <li>✓ Higher difficulty = more points</li>
                <li>✓ Watch for urgency language</li>
                <li>✓ Always verify sender address</li>
                <li>✓ Hover to inspect URLs</li>
              </ul>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowStats(false)}
              className="w-full mt-6 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg font-medium transition-all"
            >
              ← Close
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={`${showStats ? 'mr-80' : ''} transition-all duration-300`}>
        <div className="pt-20">
          <PhishingChallenge initialDifficulty="medium" timeLimit={120} />
        </div>
      </div>
    </div>
  );
}
