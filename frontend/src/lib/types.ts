export type Email = {
  id: string;
  subject: string;
  from: string;
  preview: string;
  date: string;
  read: boolean;
  labels: string[];
  body?: string;
  status?: 'inbox' | 'draft' | 'ai-replied' | 'needs-review';
}

export type User = {
  id: string;
  name: string;
  email: string;
  image?: string;
}

export type AppState = {
  user: User | null;
  emails: Email[];
  drafts: Email[];
  aiReplied: Email[];
  needsReview: Email[];
  loading: boolean;
  currentEmail: Email | null;
}