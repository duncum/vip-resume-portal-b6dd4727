
import { useState, useRef, useCallback } from 'react';
import { ConnectionStatus } from './types';

/**
 * Hook for managing Google API connection status state
 */
export const useConnectionStatus = () => {
  const [status, setStatus] = useState<ConnectionStatus>({
    isAuthorized: false,
    userEmail: null,
    isLoading: false,
    error: null
  });
  
  const isOperationInProgress = useRef(false);
  
  // Use functions with checks to prevent excessive state updates
  const setLoading = useCallback((isLoading: boolean) => {
    // Only update if value is different to prevent unnecessary renders
    setStatus(prev => {
      if (prev.isLoading === isLoading) return prev;
      return {...prev, isLoading};
    });
  }, []);
  
  const setError = useCallback((error: string | null) => {
    setStatus(prev => {
      if (prev.error === error) return prev;
      return {...prev, error};
    });
  }, []);
  
  const setAuthorized = useCallback((isAuthorized: boolean, userEmail: string | null) => {
    setStatus(prev => {
      // Only update if values changed
      if (prev.isAuthorized === isAuthorized && prev.userEmail === userEmail) {
        return prev;
      }
      return {
        ...prev, 
        isAuthorized, 
        userEmail,
        isLoading: false, // Always clear loading state when auth state changes
        error: null // Clear any errors when auth state changes
      };
    });
  }, []);
  
  const resetStatus = useCallback(() => {
    setStatus({
      isAuthorized: false,
      userEmail: null,
      isLoading: false,
      error: null
    });
  }, []);
  
  return {
    status,
    setLoading,
    setError,
    setAuthorized,
    resetStatus,
    isOperationInProgress
  };
};
