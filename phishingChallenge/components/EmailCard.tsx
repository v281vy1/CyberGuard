'use client';

import { Email } from '../types';
import { useState } from 'react';

interface EmailCardProps {
  email: Email;
}

export default function EmailCard({ email }: EmailCardProps) {
  const [showActualUrl, setShowActualUrl] = useState(false);

  return (
    <div className="w-full bg-gray-900 rounded-lg border border-gray-700 shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700 p-4">
        <h3 className="text-sm font-medium text-gray-300 mb-3">From:</h3>
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">
              {email.sender.name.charAt(0)}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">
              {email.sender.name}
            </p>
            <p className="text-xs text-gray-400 truncate">
              {email.sender.email}
            </p>
          </div>
        </div>
      </div>

      {/* Subject */}
      <div className="bg-gray-900 border-b border-gray-700 px-6 py-4">
        <p className="text-xs font-medium text-gray-400 mb-2">Subject:</p>
        <h2 className="text-lg font-semibold text-white break-words">
          {email.subject}
        </h2>
      </div>

      {/* Body */}
      <div className="px-6 py-6 bg-gray-850 min-h-64">
        <p className="text-sm text-gray-100 leading-relaxed whitespace-pre-wrap break-words">
          {email.body}
        </p>

        {/* Action Button */}
        <div className="mt-8 pt-6 border-t border-gray-700">
          <button
            className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
            onMouseEnter={() => setShowActualUrl(true)}
            onMouseLeave={() => setShowActualUrl(false)}
          >
            {email.displayLink.split('/').pop() || 'Click Here'}
          </button>

          {/* URL Tooltip */}
          {showActualUrl && (
            <div className="absolute mt-2 p-3 bg-gray-950 border border-gray-600 rounded-lg text-xs text-gray-300 shadow-xl max-w-xs z-10">
              <p className="text-gray-400 font-medium mb-1">Full URL:</p>
              <code className="text-yellow-400 break-all font-mono">
                {email.actualLink}
              </code>
              <p className="text-gray-500 mt-2 text-xs italic">
                Hover to inspect the actual URL destination
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-950 border-t border-gray-700 px-6 py-4">
        <p className="text-xs text-gray-500">
          This is an automated message. Please do not reply to this email.
        </p>
      </div>
    </div>
  );
}
