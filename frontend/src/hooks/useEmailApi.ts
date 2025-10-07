import { useCallback } from 'react';
import { useApi } from './useApi';
import { mockApi } from '@/lib/mockApi';
import { Email } from '@/lib/types';

interface UseEmailApiReturn {
  loading: boolean;
  error: string | null;
  clearError: () => void;
  
  // Email operations
  getInbox: () => Promise<Email[] | null>;
  getDrafts: () => Promise<Email[] | null>;
  getAIReplied: () => Promise<Email[] | null>;
  getNeedsReview: () => Promise<Email[] | null>;
  getEmail: (id: string) => Promise<Email | null>;
  markAsRead: (id: string) => Promise<Email | null>;
  deleteEmail: (id: string) => Promise<void | null>;
  sendEmail: (emailData: Omit<Email, 'id' | 'date'>) => Promise<Email | null>;
  updateEmail: (id: string, updates: Partial<Email>) => Promise<Email | null>;
}

export function useEmailApi(): UseEmailApiReturn {
  const { loading, error, callApi, clearError } = useApi();

  const getInbox = useCallback(() => 
    callApi(() => mockApi.emails.getInbox()), [callApi]);

  const getDrafts = useCallback(() => 
    callApi(() => mockApi.emails.getDrafts()), [callApi]);

  const getAIReplied = useCallback(() => 
    callApi(() => mockApi.emails.getAIReplied()), [callApi]);

  const getNeedsReview = useCallback(() => 
    callApi(() => mockApi.emails.getNeedsReview()), [callApi]);

  const getEmail = useCallback((id: string) => 
    callApi(() => mockApi.emails.getEmail(id)), [callApi]);

  const markAsRead = useCallback((id: string) => 
    callApi(() => mockApi.emails.markAsRead(id), { showLoading: false }), [callApi]);

  const deleteEmail = useCallback((id: string) => 
    callApi(() => mockApi.emails.deleteEmail(id)), [callApi]);

  const sendEmail = useCallback((emailData: Omit<Email, 'id' | 'date'>) => 
    callApi(() => mockApi.emails.sendEmail(emailData)), [callApi]);

  const updateEmail = useCallback((id: string, updates: Partial<Email>) => 
    callApi(() => mockApi.emails.updateEmail(id, updates)), [callApi]);

  return {
    loading,
    error,
    clearError,
    getInbox,
    getDrafts,
    getAIReplied,
    getNeedsReview,
    getEmail,
    markAsRead,
    deleteEmail,
    sendEmail,
    updateEmail,
  };
}