
import { useState, useCallback } from 'react';
import { initGoogleApi, isUserAuthorized } from '@/utils/google';
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
      // Check if credentials are missing
      const savedClientId = localStorage.getItem('google_client_id');
      const savedApiKey = localStorage.getItem('google_api_key');
      
      if (!savedClientId || !savedApiKey) {
        setStatus({
          isInitialized: false,
          isAuthorized: false,
          isLoading: false,
          userEmail: null
        });
        return;
      }

      // Use the most up-to-date credentials (from localStorage)
      window.localStorage.setItem('google_client_id', savedClientId);
      window.localStorage.setItem('google_api_key', savedApiKey);
      
      const apiInitialized = await initGoogleApi();
      const authorized = await isUserAuthorized();
      
      setStatus({
        isInitialized: apiInitialized,
        isAuthorized: authorized,
        isLoading: false,
        userEmail: 'service-account@example.com'
      });
    } catch (error) {
      console.error('Error checking Google API status:', error);
      toast.error('Failed to initialize Google API');
      setStatus({
        isInitialized: false,
        isAuthorized: false,
        isLoading: false,
        userEmail: null
      });
    }
  }, []);

  const handleSignIn = async () => {
    if (missingCredentials.clientId || missingCredentials.apiKey) {
      toast.error('Google API credentials are missing. Please set them up first.');
      return;
    }

    setStatus(prev => ({ ...prev, isLoading: true }));
    try {
      const success = await initGoogleApi();
      if (success) {
        setStatus({
          isInitialized: true,
          isAuthorized: true,
          isLoading: false,
          userEmail: 'service-account@example.com'
        });
        toast.success('Successfully connected to Google API');
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
      // Reset the initialization state
      setStatus({
        isInitialized: false,
        isAuthorized: false,
        isLoading: false,
        userEmail: null
      });
      toast.success('Disconnected from Google API');
    } catch (error) {
      console.error('Error disconnecting from Google API:', error);
      toast.error('Failed to disconnect from Google API');
      setStatus(prev => ({ ...prev, isLoading: false }));
    }
  };

  const autoConnect = async () => {
    if (missingCredentials.clientId || missingCredentials.apiKey) {
      return;
    }
    
    setStatus(prev => ({ ...prev, isLoading: true }));
    try {
      const success = await initGoogleApi();
      setStatus({
        isInitialized: success,
        isAuthorized: success,
        isLoading: false,
        userEmail: success ? 'service-account@example.com' : null
      });
      
      if (success) {
        toast.success('Connected to Google API');
      }
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
