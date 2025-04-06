
import { toast } from 'sonner';
import { signInToGoogle } from '@/utils/google';
import { MissingCredentialsType } from './types';

/**
 * Hook for handling sign-in logic
 */
export const useSignIn = (
  missingCredentials: MissingCredentialsType,
  setLoading: (isLoading: boolean) => void,
  setAuthorized: (isAuthorized: boolean, userEmail: string | null) => void,
  setError: (error: string | null) => void,
  isOperationInProgress: React.MutableRefObject<boolean>,
  clearClientId?: () => boolean
) => {
  
  const handleSignIn = async () => {
    if (missingCredentials.apiKey) {
      toast.error('Google API key is missing. Please set it up first.');
      return;
    }
    
    // Prevent multiple simultaneous operations
    if (isOperationInProgress.current) {
      console.log('Operation already in progress, ignoring sign-in request');
      return;
    }
    
    isOperationInProgress.current = true;
    setLoading(true);
    setError(null);
    
    try {
      // Set a timeout to ensure loading state doesn't get stuck
      const signInTimeoutId = setTimeout(() => {
        setLoading(false);
        toast.error('Google API connection is taking too long. Please try again later.');
        isOperationInProgress.current = false;
      }, 15000); // 15 second timeout for sign-in
      
      const success = await signInToGoogle();
      clearTimeout(signInTimeoutId);
      
      if (success) {
        setAuthorized(true, 'service-account@example.com');
      } else {
        throw new Error('Failed to initialize Google API');
      }
    } catch (error) {
      console.error('Error connecting to Google API:', error);
      
      // Extract the error message
      let errorMessage = 'Failed to connect to Google API';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      // If error is about OAuth/origin and we have clearClientId
      if (clearClientId && 
          (errorMessage.includes('idpiframe_initialization_failed') || 
           errorMessage.includes('Not a valid origin') || 
           errorMessage.includes('OAuth'))) {
        toast.error('Client ID error detected. Try using API key only.');
        // Offer to clear client ID and continue
        if (window.confirm('Your Client ID may not be configured for this domain. Remove Client ID and use API key only?')) {
          clearClientId();
          // Small delay before retrying
          setTimeout(() => {
            handleSignIn();
          }, 500);
          return;
        }
      } else {
        toast.error(errorMessage);
      }
      
      setLoading(false);
      setError(errorMessage);
    } finally {
      isOperationInProgress.current = false;
    }
  };

  const autoConnect = async () => {
    if (missingCredentials.apiKey) {
      return;
    }
    
    // Prevent multiple simultaneous operations
    if (isOperationInProgress.current) {
      console.log('Operation already in progress, ignoring auto-connect request');
      return;
    }
    
    isOperationInProgress.current = true;
    setLoading(true);
    
    try {
      // Set a timeout to ensure loading state doesn't get stuck
      const autoConnectTimeoutId = setTimeout(() => {
        setLoading(false);
        isOperationInProgress.current = false;
      }, 10000); // 10 second timeout for auto-connect
      
      const success = await signInToGoogle();
      clearTimeout(autoConnectTimeoutId);
      
      setAuthorized(
        success, 
        success ? 'service-account@example.com' : null
      );
    } catch (error) {
      console.error('Error in auto-connect:', error);
      setLoading(false);
      setError(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      isOperationInProgress.current = false;
    }
  };

  return { handleSignIn, autoConnect };
};
