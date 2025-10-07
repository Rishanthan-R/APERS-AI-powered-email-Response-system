import { Email, User } from '@/lib/types';

// Mock data that matches your existing data structures
const mockUser: User = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex.johnson@company.com',
  image: '/avatar.png'
};

const mockEmails: Email[] = [
  {
    id: '1',
    subject: 'Partnership Proposal for Q1 2024',
    from: 'Sarah Johnson - TechCorp',
    preview: 'We would like to explore a potential partnership opportunity...',
    date: '2024-01-15T14:30:00',
    read: false,
    labels: ['partnership', 'business'],
    status: 'draft',
    body: 'We would like to explore a potential partnership opportunity for the upcoming quarter. Our team has been following your work and we believe there is strong synergy between our companies.'
  },
  {
    id: '2',
    subject: 'Feature Request: Advanced Analytics',
    from: 'Customer Support - GlobalTech',
    preview: 'Our team has been using your platform and we would love to see more advanced analytics features...',
    date: '2024-01-14T11:15:00',
    read: true,
    labels: ['feature-request', 'feedback'],
    status: 'draft',
    body: 'Our team has been using your platform and we would love to see more advanced analytics features, particularly around user behavior tracking.'
  },
  {
    id: '3',
    subject: 'Urgent: Meeting Reschedule Request',
    from: 'Alex Chen - Startup Inc.',
    preview: 'Due to an unexpected conflict, I need to reschedule our meeting...',
    date: '2024-01-14T09:45:00',
    read: false,
    labels: ['scheduling', 'urgent'],
    status: 'draft',
    body: 'Due to an unexpected conflict, I need to reschedule our meeting scheduled for tomorrow. Could we move it to later this week?'
  },
  {
    id: '4',
    subject: 'Collaboration on Upcoming Webinar',
    from: 'Marketing Team - BrandCo',
    preview: 'We would like to invite you to be a guest speaker...',
    date: '2024-01-13T16:20:00',
    read: true,
    labels: ['speaking', 'collaboration'],
    status: 'sent',
    body: 'We would like to invite you to be a guest speaker in our upcoming webinar about digital transformation trends.'
  },
  {
    id: '5',
    subject: 'Welcome to Apers AI Assistant',
    from: 'Apers Team',
    preview: 'Thank you for joining Apers! Get started with AI-powered email management...',
    date: '2024-01-15T10:00:00',
    read: true,
    labels: ['welcome', 'onboarding'],
    status: 'inbox',
    body: 'Thank you for joining Apers! We are excited to help you manage your emails with AI-powered assistance.'
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// AI response templates based on email categories
const aiResponseTemplates = {
  partnership: `Dear [Name],

Thank you for reaching out regarding the partnership opportunity. We're impressed with your company's recent initiatives and would be delighted to explore this further.

Our team would appreciate learning more about your specific goals and how you envision our collaboration. Would you be available for a brief call next week to discuss this in more detail?

Best regards,
[Your Name]`,

  featureRequest: `Hello Team,

Thank you for your valuable feedback regarding new features. We're constantly working to improve our platform, and your suggestions are incredibly helpful.

I've shared your request with our product team for consideration in our upcoming development cycles. We'll keep you updated on our progress.

Warm regards,
[Your Name]`,

  scheduling: `Hi [Name],

No problem at all regarding the schedule change. I understand unexpected conflicts can arise.

I'm available on [Alternative Dates]. Please let me know which time works better for you, and I'll send over the updated calendar invitation.

Best,
[Your Name]`,

  speaking: `Dear [Name],

Thank you for the kind invitation to speak at your upcoming event. This sounds like an excellent opportunity.

Could you please share more details about the expected audience, event format, and potential dates? This will help me prepare accordingly.

Looking forward to it!
[Your Name]`,

  default: `Dear [Name],

Thank you for your email. I appreciate you reaching out and will review your message carefully.

I'll get back to you shortly with a more detailed response.

Best regards,
[Your Name]`
};

export const mockApi = {
  // Auth API
  auth: {
    login: async (email: string, password: string): Promise<User> => {
      await delay(1500);
      if (email && password) {
        return mockUser;
      }
      throw new Error('Invalid credentials');
    },

    logout: async (): Promise<void> => {
      await delay(500);
      return;
    },

    getCurrentUser: async (): Promise<User | null> => {
      await delay(1000);
      return mockUser;
    },
  },

  // Email API
  emails: {
    getInbox: async (): Promise<Email[]> => {
      await delay(800);
      return mockEmails.filter(email => email.status === 'inbox');
    },

    getDrafts: async (): Promise<Email[]> => {
      await delay(600);
      return mockEmails.filter(email => email.status === 'draft');
    },

    getAIReplied: async (): Promise<Email[]> => {
      await delay(700);
      return mockEmails.filter(email => email.status === 'ai-replied');
    },

    getNeedsReview: async (): Promise<Email[]> => {
      await delay(500);
      return mockEmails.filter(email => email.labels?.includes('needs-review'));
    },

    getEmail: async (id: string): Promise<Email | null> => {
      await delay(400);
      return mockEmails.find(email => email.id === id) || null;
    },

    markAsRead: async (id: string): Promise<Email> => {
      await delay(300);
      const email = mockEmails.find(e => e.id === id);
      if (!email) throw new Error('Email not found');
      return { ...email, read: true };
    },

    deleteEmail: async (id: string): Promise<void> => {
      await delay(400);
      // Simulate deletion - in real app, this would update the backend
      console.log('Deleting email:', id);
    },

    sendEmail: async (emailData: Omit<Email, 'id' | 'date'>): Promise<Email> => {
      await delay(1200);
      const newEmail: Email = {
        ...emailData,
        id: Date.now().toString(),
        date: new Date().toISOString(),
      };
      return newEmail;
    },

    updateEmail: async (id: string, updates: Partial<Email>): Promise<Email> => {
      await delay(500);
      const email = mockEmails.find(e => e.id === id);
      if (!email) throw new Error('Email not found');
      return { ...email, ...updates };
    },
  },

  // AI-specific APIs
  ai: {
    generateDraft: async (originalEmail: Email): Promise<{ draft: string; confidence: number }> => {
      await delay(2000);
      
      // Determine the best template based on email content
      let template = aiResponseTemplates.default;
      let confidence = 85;

      if (originalEmail.labels?.includes('partnership')) {
        template = aiResponseTemplates.partnership;
        confidence = 92;
      } else if (originalEmail.labels?.includes('feature-request')) {
        template = aiResponseTemplates.featureRequest;
        confidence = 88;
      } else if (originalEmail.labels?.includes('scheduling')) {
        template = aiResponseTemplates.scheduling;
        confidence = 95;
      } else if (originalEmail.labels?.includes('speaking')) {
        template = aiResponseTemplates.speaking;
        confidence = 90;
      }

      // Extract name from sender
      const senderName = originalEmail.from.split('-')[0]?.trim() || 'Team';
      const personalizedDraft = template.replace(/\[Name\]/g, senderName);

      return {
        draft: personalizedDraft,
        confidence
      };
    },

    analyzeEmail: async (email: Email): Promise<{
      confidence: number;
      suggestedAction: string;
      category: string;
      priority: 'high' | 'medium' | 'low';
      tone: string;
    }> => {
      await delay(1500);
      
      // Simple analysis based on content and labels
      let category = 'General';
      let priority: 'high' | 'medium' | 'low' = 'medium';
      let tone = 'Professional';
      let confidence = Math.floor(Math.random() * 30) + 70; // 70-100%

      if (email.labels?.includes('urgent')) {
        priority = 'high';
        confidence = 95;
      } else if (email.labels?.includes('partnership')) {
        category = 'Business Development';
        tone = 'Collaborative';
      } else if (email.labels?.includes('feature-request')) {
        category = 'Product Feedback';
        tone = 'Appreciative';
      }

      const suggestedActions = {
        high: 'Respond within 24 hours with detailed solution',
        medium: 'Generate professional response and schedule follow-up',
        low: 'Send acknowledgment and add to weekly review'
      };

      return {
        confidence,
        suggestedAction: suggestedActions[priority],
        category,
        priority,
        tone
      };
    },

    approveResponse: async (emailId: string, response: string): Promise<{ success: boolean; message: string }> => {
      await delay(1000);
      console.log('AI response approved for email:', emailId);
      return {
        success: true,
        message: 'Response approved and queued for sending'
      };
    },

    rejectResponse: async (emailId: string, reason: string): Promise<{ success: boolean; message: string }> => {
      await delay(800);
      console.log('AI response rejected for email:', emailId, 'Reason:', reason);
      return {
        success: true,
        message: 'Response rejected and flagged for manual review'
      };
    },
  },

  // Analytics API
  analytics: {
    getPerformanceMetrics: async (): Promise<{
      totalEmails: number;
      aiReplied: number;
      responseRate: number;
      averageResponseTime: string;
      accuracy: number;
    }> => {
      await delay(1200);
      return {
        totalEmails: mockEmails.length,
        aiReplied: mockEmails.filter(e => e.status === 'ai-replied').length,
        responseRate: 89,
        averageResponseTime: '2.3s',
        accuracy: 92
      };
    },

    getWeeklyStats: async (): Promise<Array<{
      week: string;
      emailsProcessed: number;
      aiResponses: number;
      accuracy: number;
    }>> => {
      await delay(1000);
      return [
        { week: '2024-01-08', emailsProcessed: 45, aiResponses: 32, accuracy: 89 },
        { week: '2024-01-01', emailsProcessed: 38, aiResponses: 28, accuracy: 87 },
        { week: '2023-12-25', emailsProcessed: 42, aiResponses: 35, accuracy: 91 },
        { week: '2023-12-18', emailsProcessed: 39, aiResponses: 30, accuracy: 88 }
      ];
    }
  }
};