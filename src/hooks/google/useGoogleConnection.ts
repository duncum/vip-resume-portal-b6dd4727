
import { useState, useCallback, useEffect, useRef } from 'react';
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
  
  // Use ref to prevent multiple simultaneous operations
  const isOperationInProgress = useRef(false);

  const checkStatus = useCallback(async () => {
    // Prevent multiple simultaneous status checks
    if (isOperationInProgress.current) {
      console.log('Operation already in progress, ignoring additional status check');
      return;
    }
    
    isOperationInProgress.current = true;
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
        isOperationInProgress.current = false;
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
    } finally {
      isOperationInProgress.current = false;
    }
  }, []);

  // Auto-check status when component mounts
  useEffect(() => {
    checkStatus();
    
    // Add a timeout to ensure loading state doesn't get stuck
    const timeoutId = setTimeout(() => {
      setStatus(prev => {
        if (prev.isLoading) {
          console.log('Status check timeout reached, resetting loading state');
          return { ...prev, isLoading: false };
        }
        return prev;
      });
    }, 5000); // 5 second timeout
    
    return () => clearTimeout(timeoutId);
  }, [checkStatus]);

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
    setStatus(prev => ({ ...prev, isLoading: true }));
    
    try {
      // Set a timeout to ensure loading state doesn't get stuck
      const signInTimeoutId = setTimeout(() => {
        setStatus(prev => {
          if (prev.isLoading) {
            console.log('Sign-in timeout reached, resetting loading state');
            toast.error('Google API connection is taking too long. Please try again later.');
            return { ...prev, isLoading: false };
          }
          return prev;
        });
        isOperationInProgress.current = false;
      }, 15000); // 15 second timeout for sign-in
      
      const success = await signInToGoogle();
      clearTimeout(signInTimeoutId);
      
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
    } finally {
      isOperationInProgress.current = false;
    }
  };

  const handleSignOut = async () => {
    // Prevent multiple simultaneous operations
    if (isOperationInProgress.current) {
      console.log('Operation already in progress, ignoring sign-out request');
      return;
    }
    
    isOperationInProgress.current = true;
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
    setStatus(prev => ({ ...prev, isLoading: true }));
    
    try {
      // Set a timeout to ensure loading state doesn't get stuck
      const autoConnectTimeoutId = setTimeout(() => {
        setStatus(prev => {
          if (prev.isLoading) {
            console.log('Auto-connect timeout reached, resetting loading state');
            return { ...prev, isLoading: false };
          }
          return prev;
        });
        isOperationInProgress.current = false;
      }, 10000); // 10 second timeout for auto-connect
      
      const success = await signInToGoogle();
      clearTimeout(autoConnectTimeoutId);
      
      setStatus({
        isInitialized: success,
        isAuthorized: success,
        isLoading: false,
        userEmail: success ? 'service-account@example.com' : null
      });
    } catch (error) {
      console.error('Error in auto-connect:', error);
      setStatus(prev => ({ ...prev, isLoading: false }));
    } finally {
      isOperationInProgress.current = false;
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
