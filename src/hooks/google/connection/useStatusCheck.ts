
import { useCallback } from 'react';
import { toast } from 'sonner';
import { isUserAuthorized } from '@/utils/google';
import { MissingCredentialsType } from './types';

/**
 * Hook for handling status checking logic
 */
export const useStatusCheck = (
  missingCredentials: MissingCredentialsType,
  setLoading: (isLoading: boolean) => void,
  setAuthorized: (isAuthorized: boolean, userEmail: string | null) => void,
  setError: (error: string | null) => void,
  isOperationInProgress: React.MutableRefObject<boolean>
) => {
  
  const checkStatus = useCallback(async () => {
    // Prevent multiple simultaneous status checks
    if (isOperationInProgress.current) {
      console.log('Operation already in progress, ignoring additional status check');
      return;
    }
    
    isOperationInProgress.current = true;
    setLoading(true);
    setError(null);
    
    try {
      // Check if API key is missing (the only required credential)
      const savedApiKey = localStorage.getItem('google_api_key');
      
      if (!savedApiKey) {
        setLoading(false);
        setError('API key missing');
        isOperationInProgress.current = false;
        return;
      }

      // Check if already authorized
      const authorized = await isUserAuthorized();
      setAuthorized(authorized, authorized ? 'service-account@example.com' : null);
    } catch (error) {
      console.error('Error checking Google API status:', error);
      toast.error('Failed to check Google API status');
      setLoading(false);
      setError(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      isOperationInProgress.current = false;
    }
  }, [missingCredentials, setLoading, setAuthorized, setError, isOperationInProgress]);

  return { checkStatus };
};
