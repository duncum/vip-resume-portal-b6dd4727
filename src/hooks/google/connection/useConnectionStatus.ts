
import { useState, useRef } from 'react';
import { ConnectionStatus } from './types';

/**
 * Hook for managing Google API connection status state
 */
export const useConnectionStatus = () => {
  const [status, setStatus] = useState<ConnectionStatus>({
    isInitialized: false,
    isAuthorized: false,
    isLoading: true,
    userEmail: null,
    error: null
  });
  
  // Use ref to prevent multiple simultaneous operations
  const isOperationInProgress = useRef(false);
  
  const setLoading = (isLoading: boolean) => {
    setStatus(prev => ({ ...prev, isLoading }));
  };
  
  const setError = (error: string | null) => {
    setStatus(prev => ({ ...prev, error }));
  };
  
  const setAuthorized = (isAuthorized: boolean, userEmail: string | null = null) => {
    setStatus({
      isInitialized: isAuthorized,
      isAuthorized,
      isLoading: false,
      userEmail,
      error: null
    });
  };
  
  const resetStatus = () => {
    setStatus({
      isInitialized: false,
      isAuthorized: false,
      isLoading: false,
      userEmail: null,
      error: null
    });
  };
  
  return {
    status,
    setStatus,
    setLoading,
    setError,
    setAuthorized,
    resetStatus,
    isOperationInProgress
  };
};
