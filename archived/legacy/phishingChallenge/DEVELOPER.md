# Phishing Analysis Challenge - Developer Guide

## Architecture Overview

The Phishing Analysis Challenge is built on a modular architecture with clear separation of concerns:

```
PhishingChallenge (Main Container)
├── GamePanel (State Display)
├── EmailCard (Email Rendering)
├── ActionButtons (User Input)
└── FeedbackModal (Feedback Display)
    └── generatePhishingEmail() (Email Logic)
```

## Type Definitions

### `Difficulty`
```typescript
type Difficulty = 'easy' | 'medium' | 'hard';
```

### `Email`
```typescript
interface Email {
  id: string;
  sender: { name: string; email: string };
  subject: string;
  body: string;
  displayLink: string;
  actualLink: string;
  isPhishing: boolean;
  clues: string[];
  template: EmailTemplate;
  difficulty: Difficulty;
}
```

### `GameState`
```typescript
interface GameState {
  level: number;
  score: number;
  streak: number;
  difficulty: Difficulty;
  isAnswered: boolean;
  userAnswer: boolean | null;
  timeRemaining: number;
  totalTime: number;
  accuracy: number;
  gameTotal: number;
}
```

### `FeedbackState`
```typescript
interface FeedbackState {
  isVisible: boolean;
  isCorrect: boolean;
  message: string;
  clues: string[];
  explanation: string;
}
```

---

## Component API

### PhishingChallenge

**Props:**
```typescript
interface PhishingChallengeProps {
  initialDifficulty?: 'easy' | 'medium' | 'hard'; // Default: 'medium'
  timeLimit?: number; // Seconds (Default: 120)
}
```

**Usage:**
```tsx
<PhishingChallenge
  initialDifficulty="hard"
  timeLimit={180}
/>
```

**Features:**
- Auto-generates emails on mount
- Manages game state with React hooks
- Handles timer countdown
- Processes user answers and scoring
- Shows/hides feedback modal

---

### EmailCard

**Props:**
```typescript
interface EmailCardProps {
  email: Email;
}
```

**Usage:**
```tsx
<EmailCard email={emailObject} />
```

**Features:**
- Displays sender information with avatar
- Shows subject and body
- Interactive button with URL tooltip
- Professional email layout
- Dark theme styling

---

### GamePanel

**Props:**
```typescript
interface GamePanelProps {
  gameState: GameState;
}
```

**Usage:**
```tsx
<GamePanel gameState={gameState} />
```

**Displays:**
- Current level
- Threat type
- Difficulty indicator
- Timer with progress bar
- Score, streak, and accuracy metrics

---

### ActionButtons

**Props:**
```typescript
interface ActionButtonsProps {
  onPhishing: () => void;
  onLegitimate: () => void;
  isAnswered: boolean;
  isLoading?: boolean;
}
```

**Usage:**
```tsx
<ActionButtons
  onPhishing={handlePhishingClick}
  onLegitimate={handleLegitimateClick}
  isAnswered={answered}
/>
```

---

### FeedbackModal

**Props:**
```typescript
interface FeedbackModalProps {
  feedback: FeedbackState;
  onNext: () => void;
}
```

**Usage:**
```tsx
<FeedbackModal
  feedback={feedbackState}
  onNext={handleNextEmail}
/>
```

---

## Utility Functions

### `generatePhishingEmail(difficulty: Difficulty): Email`

**Description:** Generates a random email based on difficulty level.

**Parameters:**
- `difficulty`: `'easy' | 'medium' | 'hard'`

**Returns:** Email object with all properties populated

**Process:**
1. Selects random template (bank, ecommerce, social, payment, support)
2. Decides phishing vs legitimate (70/30 split)
3. Applies mutations based on difficulty:
   - Easy: Obvious indicators, fake domains
   - Medium: Subtle errors, synonym replacement
   - Hard: Minimal indicators, professional tone
4. Generates clues for feedback
5. Creates fake URL if phishing, legitimate if safe

**Example:**
```typescript
import { generatePhishingEmail } from '@/phishingChallenge/utils/emailGenerator';

const email = generatePhishingEmail('hard');
console.log(email.isPhishing); // true or false
console.log(email.clues); // Array of analysis points
```

---

## Mutation System

### Synonym Replacement
Changes common words to synonyms with ~40% probability:

| Original | Replacements |
|----------|--------------|
| urgent | immediate, critical, time-sensitive |
| verify | confirm, validate, authenticate |
| account | profile, credentials, access |
| update | refresh, sync, upgrade |

### Tone Injection
Randomly adds one of four tones:

**Fear:** "Your account has been compromised!"
**Urgency:** "Action required immediately!"
**Reward:** "You have been selected for a special offer!"
**Authority:** "Official message from security team"

### Spelling Mistakes (Medium/Hard)
Injects real misspellings:
- recieve → receive
- neccessary → necessary
- occurence → occurrence

### Domain Generation

**Phishing Domains** (typosquatting):
- amazon-verify.com
- paypa1-confirm.net
- g00gle-security.org

**Legitimate Domains:**
- amazon.com
- paypal.com
- google.com

---

## State Management

### Game State Updates

```typescript
// Correct answer
setGameState(prev => ({
  ...prev,
  score: prev.score + points,
  streak: prev.streak + 1,
  accuracy: prev.accuracy + 1,
  gameTotal: prev.gameTotal + 1
}));

// Wrong answer
setGameState(prev => ({
  ...prev,
  streak: 0,
  gameTotal: prev.gameTotal + 1
}));
```

### Timer Management

- Starts on email load
- Counts down every second
- Auto-submits as wrong answer on timeout
- Resets when new email loads

---

## Scoring Logic

### Points Calculation

```
Easy:   +10 points per correct answer
Medium: +20 points per correct answer
Hard:   +30 points per correct answer
Wrong:  -5 points
```

### Streak System

- Increments on correct answers
- Resets to 0 on wrong answer
- Displayed with 🔥 emoji

### Accuracy Tracking

```
Accuracy % = (Correct Answers / Total Answers) × 100
```

---

## Customization Examples

### Add Custom Email Template

```typescript
// In emailGenerator.ts
const templates: Record<EmailTemplate, ...> = {
  // ... existing
  healthcare: {
    senders: ['Medical Records', 'Hospital Admin'],
    subjects: ['Update Patient Information', 'Verify Insurance']
  }
};

const phishingBodies = {
  // ... existing
  healthcare: ['Your medical records need updating...']
};

const legitimateBodies = {
  // ... existing
  healthcare: ['Your appointment is confirmed...']
};
```

### Custom Scoring System

```typescript
// In PhishingChallenge.tsx handleSubmitAnswer()
const points = isCorrect ? {
  easy: 5,
  medium: 15,
  hard: 50
}[difficulty] : 0;

const newScore = prev.score + points;
```

### Progressive Difficulty

```typescript
// Auto-increase difficulty based on performance
const shouldIncreaseDifficulty =
  prevAccuracy > 0.8 && gameTotal > 10;

const nextDifficulty: Difficulty =
  shouldIncreaseDifficulty ? 'hard' : difficulty;
```

---

## Hooks Used

### `useState`
- Email state
- Game state
- Feedback state
- Loading state
- URL tooltip state

### `useEffect`
- Email generation on mount
- Timer countdown
- Dependency on answered state

### `useCallback`
- Email generation (memoized)
- Answer submission (memoized)
- Next email handler (memoized)

---

## Performance Optimization

### Current Implementation
- Components are memoized (implicit with FC)
- Email generation happens on demand
- No re-renders during timer ticks (except state update)

### Potential Optimizations
```typescript
// Use React.memo for expensive sub-components
export const EmailCard = React.memo(EmailCardComponent);

// Use useMemo for expensive calculations
const clues = useMemo(() =>
  generateClues(email), [email]
);

// Use useTransition for non-blocking updates
const [isPending, startTransition] = useTransition();
startTransition(() => generateNewEmail());
```

---

## Responsive Design Breakpoints

- **Mobile**: `< 640px` - Single column, full width buttons
- **Tablet**: `640px - 1024px` - Two columns
- **Desktop**: `> 1024px` - Full 3-column layout with sidebar

---

## Accessibility Features

- Semantic HTML structure
- Proper heading hierarchy
- Color contrast compliance
- Keyboard-accessible buttons
- Clear focus states
- ARIA labels on interactive elements (can be enhanced)

---

## Browser Compatibility

Tested on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari 14+, Chrome Mobile)

---

## Testing

### Unit Test Example
```typescript
import { generatePhishingEmail } from '@/utils/emailGenerator';

describe('generatePhishingEmail', () => {
  it('generates valid email with all fields', () => {
    const email = generatePhishingEmail('medium');
    expect(email.id).toBeDefined();
    expect(email.sender.name).toBeDefined();
    expect(email.subject).toBeDefined();
    expect(typeof email.isPhishing).toBe('boolean');
    expect(Array.isArray(email.clues)).toBe(true);
  });

  it('generates phishing 70% of the time', () => {
    const emails = Array.from({ length: 100 }, () =>
      generatePhishingEmail('easy')
    );
    const phishingCount = emails.filter(e => e.isPhishing).length;
    expect(phishingCount).toBeGreaterThan(50);
    expect(phishingCount).toBeLessThan(90);
  });
});
```

---

## Debugging Tips

### Enable Development Logging
```typescript
// In PhishingChallenge.tsx
useEffect(() => {
  console.log('Email generated:', email);
  console.log('Game state:', gameState);
}, [email, gameState]);
```

### Check Email Generation
```typescript
const testEmail = generatePhishingEmail('hard');
console.log({
  isPhishing: testEmail.isPhishing,
  domain: testEmail.actualLink.split('@')[1],
  hasErrors: testEmail.clues
});
```

---

## Known Limitations

1. No backend integration (completely client-side)
2. No user data persistence
3. No analytics or tracking
4. Simple random mutation system (could be more sophisticated)
5. Limited email templates (can be expanded)

---

## Future Enhancement Ideas

- [ ] Backend API for saving scores
- [ ] Leaderboard system
- [ ] Achievement badges
- [ ] Sound effects and notifications
- [ ] Video tutorials
- [ ] Real email dataset integration
- [ ] Multi-language support
- [ ] Offline mode
- [ ] Mobile app version
- [ ] API integration for learning platforms

---

## Support & Contribution

For questions, bugs, or feature requests, please refer to the main README.md or contact the development team.

---

**Last Updated:** 2025
**Version:** 1.0.0
**Author:** Cybersecurity Education Team
