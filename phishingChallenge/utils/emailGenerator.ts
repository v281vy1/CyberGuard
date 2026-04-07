import { Email, Difficulty, EmailTemplate } from '../types';

// Mutation data
const synonyms: Record<string, string[]> = {
  urgent: ['immediate', 'critical', 'time-sensitive', 'pressing'],
  verify: ['confirm', 'validate', 'authenticate', 'check'],
  account: ['profile', 'credentials', 'access', 'login'],
  update: ['refresh', 'sync', 'upgrade', 'renew'],
  confirm: ['affirm', 'verify', 'authenticate', 'approve'],
  click: ['tap', 'select', 'press', 'activate'],
  action: ['step', 'measure', 'procedure', 'task'],
  security: ['protection', 'safety', 'defense', 'safeguard'],
};

const tones = {
  fear: [
    'Your account has been compromised!',
    'Suspicious activity detected on your account!',
    'Unauthorized access attempt blocked!',
    'Security alert: Unusual login detected!',
  ],
  urgency: [
    'Action required immediately!',
    'Time-sensitive: Act within 24 hours',
    'Limited time offer - respond now!',
    'Urgent: Complete this step today',
  ],
  reward: [
    'You have been selected for a special offer!',
    'Congratulations! You have won a prize!',
    'Exclusive deal just for you!',
    'Claim your reward now!',
  ],
  authority: [
    'This is an official message from our security team',
    'Notice from the Finance Department',
    'Verified security update',
    'Official notification from your bank',
  ],
};

const phishingDomains = [
  'amazon-verify.com',
  'paypa1-confirm.net',
  'app1e-id.com',
  'g00gle-security.org',
  'microsoft-secure.io',
  'bank-of-update.biz',
  'linkedln-verify.net',
  'twitter-auth.co',
  'facebook-confirm.xyz',
];

const legitimateDomains = [
  'amazon.com',
  'paypal.com',
  'apple.com',
  'google.com',
  'microsoft.com',
  'bank.com',
  'linkedin.com',
  'twitter.com',
  'facebook.com',
];

const spellingMistakes = [
  'recieve',
  'neccessary',
  'occured',
  'aquire',
  'seperate',
  'occassion',
  'untill',
  'alot',
  'teh',
  'woudl',
];

const templates: Record<EmailTemplate, { senders: string[]; subjects: string[] }> = {
  bank: {
    senders: ['Bank Security Team', 'Your Bank Alert', 'Account Protection'],
    subjects: [
      'ACTION REQUIRED: Verify Your Account',
      'Security Alert: Unusual Activity',
      'Update Your Banking Information',
      'Confirm Your Identity',
    ],
  },
  ecommerce: {
    senders: ['Amazon Support', 'eBay Customer Service', 'Shop Support Team'],
    subjects: [
      "Your Order Requires Verification",
      'Confirm Your Purchase',
      'Update Payment Method',
      'Your Account Access Has Changed',
    ],
  },
  social: {
    senders: ['Facebook Security', 'Twitter Support', 'LinkedIn Alert'],
    subjects: [
      'Confirm Your Account Activity',
      'Unusual Login Detected',
      'Verify Your Identity',
      'Update Your Security Settings',
    ],
  },
  payment: {
    senders: ['PayPal Security', 'Stripe Alerts', 'Payment Team'],
    subjects: [
      'Verify Your Payment Method',
      'Action Required on Your Account',
      'Confirm Transaction',
      'Update Billing Information',
    ],
  },
  support: {
    senders: ['IT Support Team', 'Help Desk', 'Technical Support'],
    subjects: [
      'Password Reset Required',
      'System Maintenance Alert',
      'Compliance Update Needed',
      'Security Patch Available',
    ],
  },
};

const phishingBodies = {
  bank: [
    'We detected unusual activity on your account. Please verify your credentials to secure your account.',
    'Your account has been temporarily locked for security reasons. Confirm your identity to unlock.',
    'We need to update your account information. Click the link below to complete verification.',
  ],
  ecommerce: [
    'Your recent order cannot be processed. Please verify your payment details.',
    'We detected an issue with your account. Confirm your information to proceed.',
    'Your shipping address needs verification. Click here to confirm.',
  ],
  social: [
    'We detected a new login from an unknown location. Verify it was you.',
    'Your account may have been accessed. Re-authenticate your password immediately.',
    'Please confirm your account information to continue using your profile.',
  ],
  payment: [
    'Your payment method has expired. Update it immediately to avoid service interruption.',
    'Verify your payment details to continue. Click below.',
    'We need to confirm your billing information for security purposes.',
  ],
  support: [
    'You must update your password due to a security policy change.',
    'Your access will be revoked in 24 hours if you do not verify your credentials.',
    'Please confirm your account ownership by clicking the link below.',
  ],
};

const legitimateBodies = {
  bank: [
    'Your monthly statement is ready to view. Log in to your account to review transactions.',
    'We are improving our security. No action is needed at this time.',
    'Your account is secure. We have updated our privacy policy.',
  ],
  ecommerce: [
    'Your order has been shipped. Track your package using the link in your account.',
    'Thank you for your purchase. Your receipt is attached.',
    'Your account settings have been updated successfully.',
  ],
  social: [
    'Your friend just added you to a group. Join the conversation.',
    'Here are your weekly highlights from this week.',
    'We have released new features. Check them out in your settings.',
  ],
  payment: [
    'Your subscription has been renewed successfully.',
    'Your invoice is ready. You can download it from your account.',
    'Your payment was received successfully. Thank you.',
  ],
  support: [
    'Your support ticket has been resolved. We appreciate your patience.',
    'Your account successfully connected to our service.',
    'Your settings have been updated as requested.',
  ],
};

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function applySynonymMutation(text: string): string {
  let mutated = text;
  const words = Object.keys(synonyms);

  for (const word of words) {
    if (Math.random() < 0.4) {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      const replacement = getRandomItem(synonyms[word]);
      mutated = mutated.replace(regex, replacement);
    }
  }

  return mutated;
}

function injectSpellingMistakes(text: string, difficulty: Difficulty): string {
  if (difficulty === 'easy') return text;

  let mutated = text;
  const words = text.split(' ');
  const mistakesCount = difficulty === 'medium' ? 1 : Math.floor(Math.random() * 3) + 1;

  for (let i = 0; i < mistakesCount; i++) {
    const randomIndex = Math.floor(Math.random() * words.length);
    const mistake = getRandomItem(spellingMistakes);
    if (words[randomIndex].length > 3) {
      words[randomIndex] = mistake;
    }
  }

  return words.join(' ');
}

function generateFakeUrl(): { display: string; actual: string } {
  const domain = getRandomItem(phishingDomains);
  const path = Math.random() > 0.5 ? '/verify-account' : '/confirm-identity';

  return {
    display: `https://secure.${domain}${path}`,
    actual: `https://${domain}${path}?phishing=true`,
  };
}

function generateLegitimateUrl(domain: string): { display: string; actual: string } {
  const paths = ['/account', '/security', '/verify', '/settings'];
  const path = getRandomItem(paths);

  return {
    display: `https://${domain}${path}`,
    actual: `https://${domain}${path}`,
  };
}

export function generatePhishingEmail(difficulty: Difficulty): Email {
  const template = getRandomItem(Object.keys(templates)) as EmailTemplate;
  const templateData = templates[template];
  const sender = getRandomItem(templateData.senders);
  const isPhishing = Math.random() > 0.3; // 70% phishing, 30% legitimate

  let subject = getRandomItem(templateData.subjects);
  let body = isPhishing
    ? getRandomItem(phishingBodies[template])
    : getRandomItem(legitimateBodies[template]);

  // Apply mutations based on difficulty
  if (isPhishing) {
    const tone = getRandomItem(Object.keys(tones)) as keyof typeof tones;
    const toneMessage = getRandomItem(tones[tone]);
    body = `${toneMessage} ${body}`;

    subject = applySynonymMutation(subject);
    body = applySynonymMutation(body);

    if (difficulty !== 'easy') {
      body = injectSpellingMistakes(body, difficulty);
    }
  }

  const url = isPhishing
    ? generateFakeUrl()
    : generateLegitimateUrl(getRandomItem(legitimateDomains));

  const clues: string[] = [];

  if (isPhishing) {
    if (url.actual.includes('phishing=true')) {
      clues.push('Suspicious domain with typosquatting');
    }
    if (body.toLowerCase().includes('urgent') || body.toLowerCase().includes('immediate')) {
      clues.push('Excessive urgency language (social engineering tactic)');
    }
    if (body.toLowerCase().includes('verify') || body.toLowerCase().includes('confirm')) {
      clues.push('Requesting credential verification (credential harvesting)');
    }
    if (spellingMistakes.some((mistake) => body.includes(mistake))) {
      clues.push('Grammar or spelling errors (authenticity indicator)');
    }
    clues.push('Email is designed to create panic and prompt immediate action');
  } else {
    clues.push('Legitimate domain from known provider');
    clues.push('Professional tone without excessive urgency');
    clues.push('Proper grammar and formatting');
    clues.push('No credential verification requests');
  }

  const senderEmail = isPhishing
    ? `${sender.toLowerCase().replace(/\s+/g, '.')}@${getRandomItem(phishingDomains)}`
    : `${sender.toLowerCase().replace(/\s+/g, '.')}@${template}.com`;

  return {
    id: `email-${Date.now()}-${Math.random()}`,
    sender: {
      name: sender,
      email: senderEmail,
    },
    subject,
    body,
    displayLink: url.display,
    actualLink: url.actual,
    isPhishing,
    clues,
    template,
    difficulty,
  };
}
