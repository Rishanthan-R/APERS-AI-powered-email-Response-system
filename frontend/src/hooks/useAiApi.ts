import { useCallback } from 'react';
import { useApi } from './useApi';
import { mockApi } from '@/lib/mockApi';
import { Email } from '@/lib/types';

interface UseAiApiReturn {
  loading: boolean;
  error: string | null;
  clearError: () => void;
  
  // AI operations
  generateDraft: (originalEmail: Email) => Promise<{ draft: string; confidence: number } | null>;
  analyzeEmail: (email: Email) => Promise<{
    confidence: number;
    suggestedAction: string;
    category: string;
    priority: 'high' | 'medium' | 'low';
    tone: string;
  } | null>;
  approveResponse: (emailId: string, response: string) => Promise<{ success: boolean; message: string } | null>;
  rejectResponse: (emailId: string, reason: string) => Promise<{ success: boolean; message: string } | null>;
}

export function useAiApi(): UseAiApiReturn {
  const { loading, error, callApi, clearError } = useApi();

  const generateDraft = useCallback((originalEmail: Email) => 
    callApi(() => mockApi.ai.generateDraft(originalEmail)), [callApi]);

  const analyzeEmail = useCallback((email: Email) => 
    callApi(() => mockApi.ai.analyzeEmail(email)), [callApi]);

  const approveResponse = useCallback((emailId: string, response: string) => 
    callApi(() => mockApi.ai.approveResponse(emailId, response)), [callApi]);

  const rejectResponse = useCallback((emailId: string, reason: string) => 
    callApi(() => mockApi.ai.rejectResponse(emailId, reason)), [callApi]);

  return {
    loading,
    error,
    clearError,
    generateDraft,
    analyzeEmail,
    approveResponse,
    rejectResponse,
  };
}