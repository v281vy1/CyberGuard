'use client';

import { FeedbackState } from '../types';

interface FeedbackModalProps {
  feedback: FeedbackState;
  onNext: () => void;
  nextLabel?: string;
}

export default function FeedbackModal({ feedback, onNext, nextLabel = 'Next Email →' }: FeedbackModalProps) {
  if (!feedback.isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-b from-gray-900 to-gray-950 border border-gray-700 rounded-lg max-w-2xl w-full shadow-2xl animate-in fade-in scale-95 duration-200">
        {/* Header */}
        <div
          className={`px-6 py-4 border-b border-gray-700 flex items-center gap-3 ${
            feedback.isCorrect ? 'bg-green-500/20' : 'bg-red-500/20'
          }`}
        >
          <span className="text-3xl">
            {feedback.isCorrect ? '✅' : '❌'}
          </span>
          <div>
            <h2 className="text-xl font-bold text-white">
              {feedback.isCorrect ? 'Correct Analysis!' : 'Incorrect Analysis'}
            </h2>
            <p className={`text-sm ${feedback.isCorrect ? 'text-green-300' : 'text-red-300'}`}>
              {feedback.message}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-6">
          {/* Explanation */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Analysis</h3>
            <p className="text-gray-300 leading-relaxed">
              {feedback.explanation}
            </p>
          </div>

          {/* Clues */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              Key Indicators
            </h3>
            <div className="space-y-2">
              {feedback.clues.map((clue, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-gray-800/50 border border-gray-700 rounded-lg"
                >
                  <span className="text-lg mt-0.5">
                    {clue.includes('Legitimate') || clue.includes('Professional') || clue.includes('proper')
                      ? '✓'
                      : '⚠️'}
                  </span>
                  <span className="text-sm text-gray-200 leading-relaxed">
                    {clue}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Score Info */}
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-lg p-4">
            <p className="text-sm text-gray-300">
              <span className="font-semibold text-white">Lesson: </span>
              {feedback.isCorrect
                ? 'Great job identifying the threat indicators! Stay vigilant.'
                : 'Review the security indicators above to improve your detection skills.'}
            </p>
            <p className="text-sm text-cyan-200 mt-2">
              XP earned this round: <span className="font-bold text-white">{feedback.xpEarned}</span>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-700 flex justify-end gap-3">
          <button
            onClick={onNext}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-lg transition-all transform hover:scale-105 active:scale-95"
          >
            {nextLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
