'use client';
import { PhishingChallenge } from '@/phishingChallenge/components';

export default function Home() {
  return <PhishingChallenge initialDifficulty="medium" timeLimit={120} />;
}
