# Phishing Analysis Challenge - Next.js Component

A modern, interactive cybersecurity simulation component built with React, Next.js, and Tailwind CSS. Users analyze emails to determine if they are phishing attempts or legitimate messages.

## 🎯 Features

- **Dynamic Email Generation**: Generates unique emails with randomized mutations based on difficulty level
- **Three Difficulty Levels**: Easy, Medium, and Hard with progressively subtle phishing indicators
- **Realistic Email UI**: Professional email card interface with sender info, subject, body, and clickable links
- **URL Analysis**: Hover over links to see the actual URL destination
- **Smart Feedback System**: Detailed analysis of why an email is phishing or legitimate
- **Scoring System**: Track score, streak, and accuracy across multiple challenges
- **Game Panel**: Real-time timer, level progression, and difficulty scaling
- **Dark Theme**: Modern dark UI with blue/purple accents and smooth animations
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Accessibility**: ARIA labels and keyboard-friendly interactions

## 📂 Project Structure

```
phishingChallenge/
├── components/
│   ├── PhishingChallenge.tsx    # Main game component
│   ├── EmailCard.tsx             # Email display interface
│   ├── GamePanel.tsx             # Score & stats display
│   ├── ActionButtons.tsx         # Phishing/Legitimate buttons
│   ├── FeedbackModal.tsx         # Analysis feedback modal
│   └── index.ts                  # Export barrel file
├── utils/
│   └── emailGenerator.ts         # Email generation & mutation logic
├── types/
│   └── index.ts                  # TypeScript interfaces
├── page.tsx                      # Example Next.js page
└── README.md
```

## 🚀 Quick Start

### 1. Prerequisites

- Node.js 16+
- Next.js 13+
- Tailwind CSS 3+
- React 18+

### 2. Installation

Copy the `phishingChallenge` folder into your Next.js project `app` or `pages` directory.

### 3. Ensure Tailwind CSS is Configured

Your `tailwind.config.ts` should include proper dark mode and color configurations:

```javascript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          850: '#1a1a2e',
          950: '#0f0f1e',
        },
      },
      animation: {
        'in': 'fadeIn 0.2s ease-in',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}

export default config
```

### 4. Use the Component

In your Next.js page or component:

```tsx
'use client';

import { PhishingChallenge } from '@/phishingChallenge/components';

export default function CyberSecurityPage() {
  return (
    <PhishingChallenge
      initialDifficulty="medium"
      timeLimit={120}
    />
  );
}
```

## 🎮 How It Works

### Email Generation System

Each email is generated dynamically with:

1. **Templates**: Bank, ecommerce, social media, payment, support
2. **Mutations**:
   - Synonym replacement (urgent → immediate)
   - Random tone injection (fear, urgency, reward, authority)
   - Fake domain generation (typosquatting)
   - Spelling/grammar injection (difficulty-based)
3. **Threat Distribution**: 70% phishing, 30% legitimate

### Difficulty Scaling

- **Easy**: Obvious phishing indicators (fake domains, dramatic urgency)
- **Medium**: Subtle clues (professional tone, minor errors)
- **Hard**: Almost realistic emails with minimal indicators

### Scoring

- **Correct Answer**: +10 points (Easy), +20 (Medium), +30 (Hard)
- **Wrong Answer**: -5 points
- **Streak**: Increments on correct answers, resets on wrong
- **Accuracy**: Percentage of correct answers over total

## 🎨 Component Props

### PhishingChallenge

```tsx
interface PhishingChallengeProps {
  initialDifficulty?: 'easy' | 'medium' | 'hard';
  timeLimit?: number; // seconds (default: 120)
}
```

## 🧩 Component Architecture

### EmailCard
Displays a realistic email interface with:
- Sender avatar and name
- Subject line
- Email body with text preview
- Interactive button with URL tooltip
- Professional footer

### GamePanel
Shows game state:
- Current level
- Threat type
- Difficulty indicator
- Countdown timer with progress bar
- Score, streak, and accuracy metrics

### ActionButtons
Two main action buttons:
- **Phishing** (red): Mark email as suspicious
- **Legitimate** (green): Mark email as safe

### FeedbackModal
Post-answer feedback system:
- Correct/incorrect indicator
- Explanation of the email type
- List of key indicators with icons
- Security lesson message

## 🔧 Customization

### Add More Templates

Edit `utils/emailGenerator.ts`:

```typescript
const templates: Record<EmailTemplate, {...}> = {
  bank: { /* ... */ },
  custom: {
    senders: ['Custom Sender'],
    subjects: ['Custom Subject'],
  },
};
```

### Adjust Difficulty Progression

In `PhishingChallenge.tsx` `handleNextEmail()`:

```typescript
const nextDifficulty = prev.gameTotal % 5 === 0 ? 'hard' : 'medium';
```

### Modify Scoring System

In `handleSubmitAnswer()`:

```typescript
const newScore = isCorrect
  ? prev.score + (multiplier * difficulty)
  : prev.score - penalty;
```

## 📊 Game State Management

Uses React `useState` and `useEffect` for:

1. **Email State**: Generates new emails on mount and after feedback
2. **Game State**: Tracks level, score, streak, timer, and difficulty
3. **Feedback State**: Manages feedback modal visibility and content
4. **Timer Logic**: Counts down and auto-submits on timeout

## 🎓 Educational Features

- Real-world phishing tactics (urgency, authority, fear)
- Common email spoofing techniques
- URL inspection methods
- Indicator recognition training
- Streaks encourage engagement

## 📱 Responsive Design

- Mobile-first approach
- Tablet optimizations with `md:` breakpoints
- Desktop enhancements with `lg:` grid layouts
- Touch-friendly button sizes

## 🌙 Dark Theme

- Background: `gray-950` to `gray-900`
- Text: `gray-100` to `gray-300`
- Accent colors: Blue, Purple, Red, Green
- Smooth hover transitions with shadow effects

## 🔐 Security Considerations

- No actual links are clickable (safe environment)
- URL preview is educational only
- No data is transmitted or stored
- Component is completely client-side

## 🐛 Troubleshooting

### Emails not generating
- Ensure types are imported correctly
- Check that `generatePhishingEmail` is being called

### Timer not showing
- Verify `totalTime` prop is passed
- Check Tailwind CSS is loading animations

### Styling issues
- Ensure Tailwind dark mode is configured
- Add custom colors to `tailwind.config` if needed

## 📈 Future Enhancements

- [ ] Leaderboard system
- [ ] Achievement badges
- [ ] Audio feedback
- [ ] Export results
- [ ] Multiplayer challenges
- [ ] Custom email creation
- [ ] Advanced phishing techniques (HTTPS spoofing, API mocking)
- [ ] Integration with learning management systems

## 📝 License

Free to use and modify for educational purposes.

## 🤝 Contributing

Suggestions for improvements are welcome!

---

Built with ❤️ for cybersecurity education
