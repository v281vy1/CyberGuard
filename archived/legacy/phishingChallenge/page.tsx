'use client';

import Link from 'next/link';

export default function PhishingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950/30 to-gray-950 p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-5xl rounded-3xl border border-cyan-500/30 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-8 md:p-12 space-y-6">
            <div className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-cyan-200 text-sm font-semibold tracking-wide">
              CyberGuard
            </div>
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-emerald-300">
                Secure the mission.
              </h1>
              <p className="text-lg text-gray-300 max-w-xl leading-relaxed">
                Start with Level 1 phishing analysis, review your progress when it ends, and move into Level 2 password strength.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                href="/dashboard"
                className="rounded-xl border border-gray-700 bg-gray-900/80 px-5 py-4 text-left hover:border-cyan-400/40 hover:bg-gray-800 transition-colors"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Overview</p>
                <p className="mt-2 text-lg font-semibold text-white">Open Dashboard</p>
                <p className="mt-1 text-sm text-gray-400">See your latest progress summary, rank, and challenge history.</p>
              </Link>

              <Link
                href="/phishing"
                className="rounded-xl border border-cyan-500/40 bg-cyan-500/10 px-5 py-4 text-left hover:border-cyan-300 hover:bg-cyan-500/20 transition-colors"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-200">Level 1</p>
                <p className="mt-2 text-lg font-semibold text-white">Continue to Phishing</p>
                <p className="mt-1 text-sm text-cyan-100/80">Begin the email analysis stage and unlock the next level.</p>
              </Link>
            </div>
          </div>

          <div className="p-8 md:p-12 border-t lg:border-t-0 lg:border-l border-gray-800 bg-gradient-to-br from-gray-900/60 to-gray-950/90">
            <div className="h-full rounded-2xl border border-gray-700 bg-black/20 p-6 md:p-8 flex flex-col justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-gray-400">Mission flow</p>
                <ol className="mt-6 space-y-4 text-gray-200">
                  <li className="flex gap-4">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-200 font-bold">1</span>
                    <div>
                      <p className="font-semibold">Welcome screen</p>
                      <p className="text-sm text-gray-400">Choose dashboard or start the challenge.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500/20 text-blue-200 font-bold">2</span>
                    <div>
                      <p className="font-semibold">Level 1: Phishing</p>
                      <p className="text-sm text-gray-400">Work through sublevels and get a summary when complete.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-200 font-bold">3</span>
                    <div>
                      <p className="font-semibold">Level 2: Password Strength</p>
                      <p className="text-sm text-gray-400">Use the level 1 summary to continue into password analysis.</p>
                    </div>
                  </li>
                </ol>
              </div>

              <p className="mt-8 text-sm text-gray-500">
                CyberGuard training is designed as a two-stage path: phishing first, password strength next.
              </p>
            </div>
          </div>
        </div>
      </div>
  );
}
