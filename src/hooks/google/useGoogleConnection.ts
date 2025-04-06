
import { useState, useCallback } from 'react';
import { initGoogleApi, signInToGoogle, signOutFromGoogle, isUserAuthorized } from '@/utils/google';
import { toast } from 'sonner';
import { MissingCredentials } from './useGoogleCredentials';

interface ConnectionStatus {
  isInitialized: boolean;
  isAuthorized: boolean;
  isLoading: boolean;
  userEmail: string | null;
}

export const useGoogleConnection = (missingCredentials: MissingCredentials) => {
  const [status, setStatus] = useState<ConnectionStatus>({
    isInitialized: false,
    isAuthorized: false,
    isLoading: true,
    userEmail: null
  });

  const checkStatus = useCallback(async () => {
    setStatus(prev => ({ ...prev, isLoading: true }));
    
    try {
      // Check if API key is missing (the only required credential)
      const savedApiKey = localStorage.getItem('google_api_key');
      
      if (!savedApiKey) {
        setStatus({
          isInitialized: false,
          isAuthorized: false,
          isLoading: false,
          userEmail: null
        });
        return;
      }

      // Check if already authorized
      const authorized = await isUserAuthorized();
      
      setStatus({
        isInitialized: authorized,
        isAuthorized: authorized,
        isLoading: false,
        userEmail: authorized ? 'service-account@example.com' : null
      });
    } catch (error) {
      console.error('Error checking Google API status:', error);
      toast.error('Failed to check Google API status');
      setStatus({
        isInitialized: false,
        isAuthorized: false,
        isLoading: false,
        userEmail: null
      });
    }
  }, []);

  const handleSignIn = async () => {
    if (missingCredentials.apiKey) {
      toast.error('Google API key is missing. Please set it up first.');
      return;
    }

    setStatus(prev => ({ ...prev, isLoading: true }));
    try {
      const success = await signInToGoogle();
      if (success) {
        setStatus({
          isInitialized: true,
          isAuthorized: true,
          isLoading: false,
          userEmail: 'service-account@example.com'
        });
      } else {
        throw new Error('Failed to initialize Google API');
      }
    } catch (error) {
      console.error('Error connecting to Google API:', error);
      toast.error('Failed to connect to Google API');
      setStatus(prev => ({ ...prev, isLoading: false }));
    }
  };

  const handleSignOut = async () => {
    setStatus(prev => ({ ...prev, isLoading: true }));
    try {
      await signOutFromGoogle();
      setStatus({
        isInitialized: false,
        isAuthorized: false,
        isLoading: false,
        userEmail: null
      });
    } catch (error) {
      console.error('Error disconnecting from Google API:', error);
      toast.error('Failed to disconnect from Google API');
      setStatus(prev => ({ ...prev, isLoading: false }));
    }
  };

  const autoConnect = async () => {
    if (missingCredentials.apiKey) {
      return;
    }
    
    setStatus(prev => ({ ...prev, isLoading: true }));
    try {
      const success = await signInToGoogle();
      setStatus({
        isInitialized: success,
        isAuthorized: success,
        isLoading: false,
        userEmail: success ? 'service-account@example.com' : null
      });
    } catch (error) {
      console.error('Error in auto-connect:', error);
      setStatus(prev => ({ ...prev, isLoading: false }));
    }
  };

  return {
    status,
    checkStatus,
    handleSignIn,
    handleSignOut,
    autoConnect
  };
};
