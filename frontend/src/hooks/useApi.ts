import { useState, useCallback } from 'react';

interface UseApiReturn {
  loading: boolean;
  error: string | null;
  callApi: <T>(
    apiCall: () => Promise<T>,
    options?: { showLoading?: boolean; errorMessage?: string }
  ) => Promise<T | null>;
  clearError: () => void;
}

export function useApi(): UseApiReturn {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const callApi = useCallback(async <T>(
    apiCall: () => Promise<T>,
    options: { showLoading?: boolean; errorMessage?: string } = {}
  ): Promise<T | null> => {
    const { showLoading = true, errorMessage = 'An error occurred' } = options;
    
    if (showLoading) setLoading(true);
    setError(null);

    try {
      const result = await apiCall();
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : errorMessage;
      setError(message);
      return null;
    } finally {
      if (showLoading) setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,
    callApi,
    clearError,
  };
}