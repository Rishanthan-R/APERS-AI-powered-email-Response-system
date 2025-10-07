'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Email } from '@/lib/types';
import { mockEmails, getInboxEmails, getDraftEmails, getAIRepliedEmails, getNeedsReviewEmails } from '@/lib/mockData';

interface EmailContextType {
  // State
  emails: Email[];
  currentEmail: Email | null;
  isLoading: boolean;
  
  // Getters
  inboxEmails: Email[];
  draftEmails: Email[];
  aiRepliedEmails: Email[];
  needsReviewEmails: Email[];
  
  // Actions
  setCurrentEmail: (email: Email | null) => void;
  markAsRead: (emailId: string) => void;
  deleteEmail: (emailId: string) => void;
  moveToDrafts: (emailId: string) => void;
  sendEmail: (email: Omit<Email, 'id' | 'date'>) => void;
}

const EmailContext = createContext<EmailContextType | undefined>(undefined);

export function EmailProvider({ children }: { children: ReactNode }) {
  const [emails, setEmails] = useState<Email[]>(mockEmails);
  const [currentEmail, setCurrentEmail] = useState<Email | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Computed values
  const inboxEmails = getInboxEmails();
  const draftEmails = getDraftEmails();
  const aiRepliedEmails = getAIRepliedEmails();
  const needsReviewEmails = getNeedsReviewEmails();

  const markAsRead = (emailId: string): void => {
    setEmails(prev => prev.map(email => 
      email.id === emailId ? { ...email, read: true } : email
    ));
  };

  const deleteEmail = (emailId: string): void => {
    setEmails(prev => prev.filter(email => email.id !== emailId));
    if (currentEmail?.id === emailId) {
      setCurrentEmail(null);
    }
  };

  const moveToDrafts = (emailId: string): void => {
    setEmails(prev => prev.map(email => 
      email.id === emailId ? { ...email, status: 'draft' as const } : email
    ));
  };

  const sendEmail = (emailData: Omit<Email, 'id' | 'date'>): void => {
    const newEmail: Email = {
      ...emailData,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    setEmails(prev => [newEmail, ...prev]);
  };

  return (
    <EmailContext.Provider value={{
      emails,
      currentEmail,
      isLoading,
      inboxEmails,
      draftEmails,
      aiRepliedEmails,
      needsReviewEmails,
      setCurrentEmail,
      markAsRead,
      deleteEmail,
      moveToDrafts,
      sendEmail,
    }}>
      {children}
    </EmailContext.Provider>
  );
}

export function useEmail() {
  const context = useContext(EmailContext);
  if (context === undefined) {
    throw new Error('useEmail must be used within an EmailProvider');
  }
  return context;
}