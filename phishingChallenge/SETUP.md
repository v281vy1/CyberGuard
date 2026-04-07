# Setup Guide for Phishing Analysis Challenge

## Prerequisites

- Node.js 16+ and npm/yarn/pnpm
- Next.js 13+ project
- Tailwind CSS 3+

## Step 1: Create a Next.js Project (if needed)

```bash
npx create-next-app@latest cyber-challenge --typescript --tailwind
cd cyber-challenge
```

## Step 2: Project Structure

Copy the `phishingChallenge` folder to your project root or into your `app` directory:

```
your-project/
├── app/
│   ├── phishingChallenge/
│   │   ├── components/
│   │   ├── utils/
│   │   ├── types/
│   │   ├── page.tsx
│   │   └── README.md
│   └── layout.tsx
└── ...
```

## Step 3: Configure Tailwind CSS

Create or update `tailwind.config.ts`:

```typescript
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
      spacing: {
        '88': '22rem',
        '96': '24rem',
        '128': '32rem',
      },
      animation: {
        'in': 'fadeIn 0.2s ease-in',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.5)',
        'glow-red': '0 0 20px rgba(239, 68, 68, 0.5)',
        'glow-green': '0 0 20px rgba(34, 197, 94, 0.5)',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}

export default config
```

## Step 4: Update `globals.css`

Ensure your `globals.css` includes Tailwind directives:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-gray-950 text-gray-100;
  }
}

@layer components {
  .card {
    @apply bg-gray-900 border border-gray-700 rounded-lg shadow-lg;
  }

  .btn-primary {
    @apply px-6 py-2 font-semibold rounded-lg transition-all transform
           hover:scale-105 active:scale-95;
  }

  .btn-danger {
    @apply btn-primary bg-red-600 hover:bg-red-500 text-white;
  }

  .btn-success {
    @apply btn-primary bg-green-600 hover:bg-green-500 text-white;
  }
}
```

## Step 5: Update `layout.tsx`

```typescript
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Phishing Analysis Challenge',
  description: 'Learn to identify phishing emails with our interactive cybersecurity simulator.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-gray-950 text-gray-100">
        {children}
      </body>
    </html>
  )
}
```

## Step 6: Create App Page

Create `app/page.tsx`:

```typescript
'use client';

import { PhishingChallenge } from '@/phishingChallenge/components';

export default function Home() {
  return (
    <main className="min-h-screen">
      <PhishingChallenge initialDifficulty="medium" timeLimit={120} />
    </main>
  );
}
```

## Step 7: Run Development Server

```bash
npm run dev
# or
yarn dev
```

Visit `http://localhost:3000` in your browser.

## Environment Variables (Optional)

Create `.env.local`:

```
NEXT_PUBLIC_APP_NAME=Cyber Challenge
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## TypeScript Configuration

Ensure your `tsconfig.json` is set up for path aliases:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

## Advanced Configuration

### Adding Custom Themes

In `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#f0f9ff',
        500: '#3b82f6',
        950: '#0c2340',
      },
    },
  },
}
```

### Custom Fonts

```typescript
import { Nunito, JetBrains_Mono } from 'next/font/google'

const nunito = Nunito({ subsets: ['latin'] })
const jetbrains = JetBrains_Mono({ subsets: ['latin'] })
```

Then apply in `layout.tsx`:

```typescript
<body className={nunito.className}>
```

## Deployment

### Vercel

```bash
npx vercel
```

### Other Platforms

```bash
npm run build
npm start
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Tips

1. **Image Optimization**: Use Next.js Image component
2. **Code Splitting**: Components are lazy-loaded
3. **CSS Optimization**: Tailwind purges unused styles
4. **Bundle Size**: ~45KB minified

## Troubleshooting

### Styles not applying
```bash
# Clear Tailwind cache
rm -rf .next
npm run dev
```

### Import errors
- Ensure path aliases are correct
- Check file extensions (.ts/.tsx)
- Verify component exports

### Performance issues
- Check browser DevTools
- Profile with Lighthouse
- Review component renders with React DevTools

## Testing Setup (Optional)

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

Create `jest.config.js`:

```javascript
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
}

module.exports = createJestConfig(customJestConfig)
```

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Hooks Guide](https://react.dev/reference/react/hooks)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

---

For questions or issues, refer to the main README.md in the phishingChallenge folder.
