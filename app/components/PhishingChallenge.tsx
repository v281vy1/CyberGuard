'use client';

import { useEffect, useState, useCallback } from 'react';
import { Email, GameState, FeedbackState, Difficulty } from '../types';
import { generatePhishingEmail } from '../utils/emailGenerator';
import EmailCard from './EmailCard';
import GamePanel from './GamePanel';
import ActionButtons from './ActionButtons';
import FeedbackModal from './FeedbackModal';

interface PhishingChallengeProps {
  initialDifficulty?: Difficulty;
  timeLimit?: number;
}

export default function PhishingChallenge({
  initialDifficulty = 'medium',
  timeLimit = 120,
}: PhishingChallengeProps) {
  // Game State
  const [gameState, setGameState] = useState<GameState>({
    level: 1,
    score: 0,
    streak: 0,
    difficulty: initialDifficulty,
    isAnswered: false,
    userAnswer: null,
    timeRemaining: timeLimit,
    totalTime: timeLimit,
    accuracy: 0,
    gameTotal: 0,
  });

  // Email State
  const [email, setEmail] = useState<Email | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Feedback State
  const [feedback, setFeedback] = useState<FeedbackState>({
    isVisible: false,
    isCorrect: false,
    message: '',
    clues: [],
    explanation: '',
  });

  // Generate new email
  const generateNewEmail = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      const newEmail = generatePhishingEmail(gameState.difficulty);
      setEmail(newEmail);
      setIsLoading(false);
      setGameState((prev) => ({
        ...prev,
        isAnswered: false,
        userAnswer: null,
        timeRemaining: timeLimit,
      }));
    }, 300);
  }, [gameState.difficulty, timeLimit]);

  // Initialize email on mount
  useEffect(() => {
    generateNewEmail();
  }, []);

  // Timer effect
  useEffect(() => {
    if (gameState.isAnswered || !email) return;

    const interval = setInterval(() => {
      setGameState((prev) => {
        if (prev.timeRemaining <= 1) {
          // Time's up - mark as incorrect
          handleSubmitAnswer(false);
          return {
            ...prev,
            timeRemaining: 0,
          };
        }
        return {
          ...prev,
          timeRemaining: prev.timeRemaining - 1,
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState.isAnswered, email]);

  // Handle answer submission
  const handleSubmitAnswer = useCallback(
    (isPhishingAnswer: boolean) => {
      if (!email || gameState.isAnswered) return;

      const isCorrect = isPhishingAnswer === email.isPhishing;

      setGameState((prev) => {
        const newStreak = isCorrect ? prev.streak + 1 : 0;
        const newScore = isCorrect ? prev.score + (10 * (prev.difficulty === 'hard' ? 3 : prev.difficulty === 'medium' ? 2 : 1)) : Math.max(0, prev.score - 5);
        const newAccuracy = isCorrect ? prev.accuracy + 1 : prev.accuracy;
        const newGameTotal = prev.gameTotal + 1;

        return {
          ...prev,
          isAnswered: true,
          userAnswer: isPhishingAnswer,
          score: newScore,
          streak: newStreak,
          accuracy: newAccuracy,
          gameTotal: newGameTotal,
        };
      });

      // Show feedback
      setFeedback({
        isVisible: true,
        isCorrect,
        message: isCorrect
          ? `You correctly identified this as ${email.isPhishing ? 'phishing' : 'legitimate'}!`
          : `This email was actually ${email.isPhishing ? 'phishing' : 'legitimate'}, not ${
              isPhishingAnswer ? 'phishing' : 'legitimate'
            }!`,
        clues: email.clues,
        explanation: email.isPhishing
          ? 'This email was designed to trick users into revealing sensitive information. Attackers use psychological tactics like urgency, fear, and authority to manipulate users into clicking malicious links.'
          : 'This email is a legitimate communication from a trusted source. It contains proper grammar, legitimate domain addresses, and no requests for sensitive information.',
      });
    },
    [email, gameState.isAnswered]
  );

  // Handle next email
  const handleNextEmail = useCallback(() => {
    setFeedback({ isVisible: false, isCorrect: false, message: '', clues: [], explanation: '' });

    setGameState((prev) => {
      const nextDifficulty: Difficulty = prev.gameTotal % 5 === 0 ? 'hard' : prev.gameTotal % 3 === 0 ? 'medium' : 'easy';

      return {
        ...prev,
        level: prev.level + 1,
        difficulty: nextDifficulty,
      };
    });

    generateNewEmail();
  }, [generateNewEmail]);

  if (!email && !isLoading) {
    return <div>Error loading email</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950/30 to-gray-950 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            🔍 Phishing Analysis Challenge
          </h1>
          <p className="text-gray-400 text-lg">
            Analyze emails and identify phishing attempts before they compromise security
          </p>
        </div>

        {/* Game Panel */}
        <GamePanel gameState={gameState} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Email Card - Left/Full */}
          <div className="lg:col-span-2">
            {isLoading ? (
              <div className="bg-gray-900 rounded-lg border border-gray-700 p-12 flex items-center justify-center min-h-96">
                <div className="text-center">
                  <div className="inline-block animate-spin mb-4">
                    <div className="w-12 h-12 border-4 border-gray-700 border-t-blue-500 rounded-full" />
                  </div>
                  <p className="text-gray-400">Loading email...</p>
                </div>
              </div>
            ) : (
              <EmailCard email={email} />
            )}
          </div>

          {/* Sidebar Info - Right */}
          <div className="space-y-4">
            {/* Quick Tips */}
            <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/50 rounded-lg p-4">
              <h3 className="font-semibold text-amber-300 mb-3 flex items-center gap-2">
                💡 Quick Tips
              </h3>
              <ul className="space-y-2 text-xs text-amber-100/80 leading-relaxed">
                <li>• Check sender email domain carefully</li>
                <li>• Look for urgency or threatening language</li>
                <li>• Hover over links to see actual URL</li>
                <li>• Watch for spelling/grammar errors</li>
                <li>• Legitimate emails rarely request passwords</li>
              </ul>
            </div>

            {/* Strategy */}
            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-300 mb-3">🎯 Your Strategy</h3>
              <p className="text-xs text-blue-100/80 leading-relaxed">
                Analyze each email carefully. Consider all indicators before making your decision.
              </p>
              <div className="mt-3 p-2 bg-blue-950/50 rounded text-xs text-blue-200">
                Current Streak: <span className="font-bold">{gameState.streak}</span>
              </div>
            </div>

            {/* Difficulty Indicator */}
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/50 rounded-lg p-4">
              <h3 className="font-semibold text-purple-300 mb-2">📊 Difficulty</h3>
              <div className="flex gap-1">
                {(['easy', 'medium', 'hard'] as const).map((level) => (
                  <div
                    key={level}
                    className={`flex-1 h-2 rounded-full ${
                      level === gameState.difficulty ? 'bg-purple-500' : 'bg-gray-700'
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-purple-200 mt-2 capitalize">
                {gameState.difficulty} difficulty selected
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-6">
          <ActionButtons
            onPhishing={() => handleSubmitAnswer(true)}
            onLegitimate={() => handleSubmitAnswer(false)}
            isAnswered={gameState.isAnswered}
            isLoading={isLoading}
          />

          {/* Generate New Button (when answered) */}
          {gameState.isAnswered && (
            <button
              onClick={generateNewEmail}
              className="px-4 py-2 text-sm bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-600 rounded-lg transition-all"
            >
              ↻ Regenerate Same Level
            </button>
          )}
        </div>

        {/* Feedback Modal */}
        <FeedbackModal feedback={feedback} onNext={handleNextEmail} />
      </div>
    </div>
  );
}
