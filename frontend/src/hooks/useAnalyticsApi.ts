import { useCallback } from 'react';
import { useApi } from './useApi';
import { mockApi } from '@/lib/mockApi';

interface UseAnalyticsApiReturn {
  loading: boolean;
  error: string | null;
  clearError: () => void;
  
  // Analytics operations
  getPerformanceMetrics: () => Promise<{
    totalEmails: number;
    aiReplied: number;
    responseRate: number;
    averageResponseTime: string;
    accuracy: number;
  } | null>;
  getWeeklyStats: () => Promise<Array<{
    week: string;
    emailsProcessed: number;
    aiResponses: number;
    accuracy: number;
  }> | null>;
}

export function useAnalyticsApi(): UseAnalyticsApiReturn {
  const { loading, error, callApi, clearError } = useApi();

  const getPerformanceMetrics = useCallback(() => 
    callApi(() => mockApi.analytics.getPerformanceMetrics()), [callApi]);

  const getWeeklyStats = useCallback(() => 
    callApi(() => mockApi.analytics.getWeeklyStats()), [callApi]);

  return {
    loading,
    error,
    clearError,
    getPerformanceMetrics,
    getWeeklyStats,
  };
}