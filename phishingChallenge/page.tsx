'use client';

import { PhishingChallenge } from '../components';

export default function PhishingPage() {
  return (
    <main>
      <PhishingChallenge initialDifficulty="medium" timeLimit={120} />
    </main>
  );
}
