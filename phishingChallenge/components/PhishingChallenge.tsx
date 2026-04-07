'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  Email,
  GameState,
  FeedbackState,
  Difficulty,
  Rank,
  RankThreshold,
  Achievement,
} from '../types';
import { generatePhishingEmail } from '../utils/emailGenerator';
import EmailCard from './EmailCard';
import GamePanel from './GamePanel';
import ActionButtons from './ActionButtons';
import FeedbackModal from './FeedbackModal';
import RankCard from './RankCard';
import SkillChart from './SkillChart';
import Achievements from './Achievements';
import Leaderboard from './Leaderboard';

interface PhishingChallengeProps {
  initialDifficulty?: Difficulty;
  timeLimit?: number;
}

const TOTAL_LEVELS = 10;
const FAST_COMPLETION_THRESHOLD = 0.6;

const RANK_THRESHOLDS: RankThreshold[] = [
  { rank: 'Beginner', xpRequired: 0 },
  { rank: 'Trainee', xpRequired: 200 },
  { rank: 'Analyst', xpRequired: 500 },
  { rank: 'Expert', xpRequired: 900 },
  { rank: 'Elite Security Analyst', xpRequired: 1300 },
];

interface SkillStats {
  phishing: { correct: number; total: number };
  malware: { correct: number; total: number };
  password: { correct: number; total: number };
}

const INITIAL_SKILL_STATS: SkillStats = {
  phishing: { correct: 0, total: 0 },
  malware: { correct: 0, total: 0 },
  password: { correct: 0, total: 0 },
};

function calculateXP(accuracy: number, isFast: boolean, isPerfect: boolean, criticalMistake: boolean) {
  let xp = accuracy * 10;
  if (isPerfect) xp += 50;
  if (isFast) xp += 20;
  if (criticalMistake) xp -= 10;
  return xp;
}

function getRank(xp: number): Rank {
  if (xp >= 1300) return 'Elite Security Analyst';
  if (xp >= 900) return 'Expert';
  if (xp >= 500) return 'Analyst';
  if (xp >= 200) return 'Trainee';
  return 'Beginner';
}

function toPercentage(correct: number, total: number) {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
}

function upsertAchievement(list: Achievement[], achievement: Achievement) {
  return list.includes(achievement) ? list : [...list, achievement];
}

export default function PhishingChallenge({
  initialDifficulty = 'medium',
  timeLimit = 120,
}: PhishingChallengeProps) {
  const [skillStats, setSkillStats] = useState<SkillStats>(INITIAL_SKILL_STATS);

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
    totalXP: 0,
    rank: 'Beginner',
    levelsCompleted: 0,
    totalLevels: TOTAL_LEVELS,
    achievements: [],
    skillBreakdown: {
      phishingDetection: 0,
      malwareAwareness: 0,
      passwordSecurity: 0,
    },
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
    xpEarned: 0,
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
      const isFast = (gameState.timeRemaining / gameState.totalTime) >= FAST_COMPLETION_THRESHOLD;
      const isPerfect = isCorrect;
      const criticalMistake = !isCorrect && email.isPhishing && !isPhishingAnswer;
      const levelAccuracy = isCorrect ? 100 : 0;
      const xpEarned = calculateXP(levelAccuracy, isFast, isPerfect, criticalMistake);

      const updatedSkillStats: SkillStats = {
        phishing: {
          total: skillStats.phishing.total + 1,
          correct: skillStats.phishing.correct + (isCorrect ? 1 : 0),
        },
        malware: {
          ...skillStats.malware,
        },
        password: {
          ...skillStats.password,
        },
      };

      if (email.template === 'social' || email.template === 'ecommerce') {
        updatedSkillStats.malware.total += 1;
        if (isCorrect) updatedSkillStats.malware.correct += 1;
      }

      if (email.template === 'bank' || email.template === 'payment' || email.template === 'support') {
        updatedSkillStats.password.total += 1;
        if (isCorrect) updatedSkillStats.password.correct += 1;
      }

      setSkillStats(updatedSkillStats);

      setGameState((prev) => {
        const newStreak = isCorrect ? prev.streak + 1 : 0;
        const newScore = isCorrect ? prev.score + (10 * (prev.difficulty === 'hard' ? 3 : prev.difficulty === 'medium' ? 2 : 1)) : Math.max(0, prev.score - 5);
        const newAccuracy = isCorrect ? prev.accuracy + 1 : prev.accuracy;
        const newGameTotal = prev.gameTotal + 1;
        const newTotalXP = Math.max(0, prev.totalXP + xpEarned);
        const newRank = getRank(newTotalXP);
        const newLevelsCompleted = Math.min(prev.totalLevels, prev.levelsCompleted + 1);
        const overallAccuracy = toPercentage(newAccuracy, newGameTotal);
        const newSkillBreakdown = {
          phishingDetection: toPercentage(updatedSkillStats.phishing.correct, updatedSkillStats.phishing.total),
          malwareAwareness: toPercentage(updatedSkillStats.malware.correct, updatedSkillStats.malware.total),
          passwordSecurity: toPercentage(updatedSkillStats.password.correct, updatedSkillStats.password.total),
        };

        let updatedAchievements = [...prev.achievements];
        if (newLevelsCompleted >= 1) {
          updatedAchievements = upsertAchievement(updatedAchievements, 'first-level-completed');
        }
        if (isCorrect && isFast) {
          updatedAchievements = upsertAchievement(updatedAchievements, 'fast-responder');
        }
        if (newSkillBreakdown.phishingDetection >= 85 && updatedSkillStats.phishing.total >= 5) {
          updatedAchievements = upsertAchievement(updatedAchievements, 'phishing-expert');
        }

        const eliteGoalReached =
          newLevelsCompleted >= prev.totalLevels &&
          overallAccuracy >= 80 &&
          newRank === 'Elite Security Analyst';

        if (eliteGoalReached) {
          updatedAchievements = upsertAchievement(updatedAchievements, 'elite-security-analyst');
        }

        return {
          ...prev,
          isAnswered: true,
          userAnswer: isPhishingAnswer,
          score: newScore,
          streak: newStreak,
          accuracy: newAccuracy,
          gameTotal: newGameTotal,
          totalXP: newTotalXP,
          rank: newRank,
          levelsCompleted: newLevelsCompleted,
          achievements: updatedAchievements,
          skillBreakdown: newSkillBreakdown,
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
        xpEarned,
      });
    },
    [email, gameState.isAnswered, gameState.timeRemaining, gameState.totalTime, skillStats]
  );

  // Handle next email
  const handleNextEmail = useCallback(() => {
    setFeedback({ isVisible: false, isCorrect: false, message: '', clues: [], explanation: '', xpEarned: 0 });

    setGameState((prev) => {
      const nextLevel = Math.min(prev.totalLevels, prev.level + 1);
      const nextDifficulty: Difficulty = nextLevel % 5 === 0 ? 'hard' : nextLevel % 3 === 0 ? 'medium' : 'easy';

      return {
        ...prev,
        level: nextLevel,
        difficulty: nextDifficulty,
      };
    });

    generateNewEmail();
  }, [generateNewEmail]);

  if (!email && !isLoading) {
    return <div>Error loading email</div>;
  }

  const overallAccuracy = gameState.gameTotal > 0
    ? Math.round((gameState.accuracy / gameState.gameTotal) * 100)
    : 0;
  const eliteGoalReached =
    gameState.levelsCompleted >= gameState.totalLevels &&
    overallAccuracy >= 80 &&
    gameState.rank === 'Elite Security Analyst';

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

        {/* Progress Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RankCard rank={gameState.rank} totalXP={gameState.totalXP} thresholds={RANK_THRESHOLDS} />

          <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-700 rounded-lg p-5 shadow-lg">
            <h3 className="text-lg font-bold text-white mb-4">Progress Overview</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 rounded-lg bg-gray-800/60 border border-gray-700">
                <p className="text-gray-400">Levels Completed</p>
                <p className="text-xl font-bold text-white">{gameState.levelsCompleted}/{gameState.totalLevels}</p>
              </div>
              <div className="p-3 rounded-lg bg-gray-800/60 border border-gray-700">
                <p className="text-gray-400">Overall Accuracy</p>
                <p className="text-xl font-bold text-white">{overallAccuracy}%</p>
              </div>
              <div className="p-3 rounded-lg bg-gray-800/60 border border-gray-700">
                <p className="text-gray-400">Total XP</p>
                <p className="text-xl font-bold text-cyan-300">{gameState.totalXP}</p>
              </div>
              <div className="p-3 rounded-lg bg-gray-800/60 border border-gray-700">
                <p className="text-gray-400">Final Goal</p>
                <p className={`text-sm font-semibold ${eliteGoalReached ? 'text-emerald-300' : 'text-amber-300'}`}>
                  {eliteGoalReached ? 'Elite Security Analyst unlocked' : 'In progress'}
                </p>
              </div>
            </div>
          </div>

          <SkillChart skills={gameState.skillBreakdown} />
          <Achievements achievements={gameState.achievements} />
        </div>

        <Leaderboard currentXP={gameState.totalXP} currentRank={gameState.rank} />

        {eliteGoalReached && (
          <div className="bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-blue-500/20 border border-emerald-400/50 rounded-lg p-5">
            <h2 className="text-2xl font-black text-white">🏆 Become an Elite Security Analyst</h2>
            <p className="text-emerald-100 mt-2">
              Mission complete: all levels cleared, 80%+ accuracy maintained, and Elite rank achieved.
            </p>
          </div>
        )}

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
              <EmailCard email={email!} />
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
