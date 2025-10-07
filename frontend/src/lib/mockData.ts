import { Email } from './types';

export const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@university.edu',
  image: '/avatars/student.jpg'
};

export const mockEmails: Email[] = [
  {
    id: '1',
    subject: 'Welcome to Apers - AI Email Assistant',
    from: 'support@apers.com',
    preview: 'Thank you for joining Apers! We are excited to help you manage your emails with AI-powered assistance...',
    date: '2024-01-15T10:30:00',
    read: true,
    labels: ['important', 'welcome'],
    status: 'inbox',
    body: 'Dear Student, Welcome to Apers! We are thrilled to have you onboard...'
  },
  {
    id: '2',
    subject: 'University Project Submission',
    from: 'professor@university.edu',
    preview: 'Reminder about your project submission deadline next week. Please ensure all components are completed...',
    date: '2024-01-15T09:15:00',
    read: false,
    labels: ['university', 'urgent'],
    status: 'inbox',
    body: 'Hello, This is a reminder that your Apers project submission is due next Friday...'
  },
  {
    id: '3',
    subject: 'AI Draft: Response to Professor',
    from: 'ai-system@apers.com',
    preview: 'Draft response generated for your professor email. Please review and send...',
    date: '2024-01-15T08:00:00',
    read: false,
    labels: ['ai-draft', 'needs-review'],
    status: 'draft'
  },
  {
    id: '4',
    subject: 'Meeting Request - Technical Discussion',
    from: 'teammate@university.edu',
    preview: 'Hi, can we schedule a meeting to discuss the frontend implementation?',
    date: '2024-01-14T16:45:00',
    read: true,
    labels: ['meeting'],
    status: 'ai-replied'
  }
];

// Filter functions to get different email categories
export const getInboxEmails = () => mockEmails.filter(email => email.status === 'inbox');
export const getDraftEmails = () => mockEmails.filter(email => email.status === 'draft');
export const getAIRepliedEmails = () => mockEmails.filter(email => email.status === 'ai-replied');
export const getNeedsReviewEmails = () => mockEmails.filter(email => email.labels.includes('needs-review'));