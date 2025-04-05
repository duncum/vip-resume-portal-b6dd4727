
import { useState, useEffect, useCallback } from 'react';
import { initGoogleApi, isUserAuthorized, signInToGoogle, signOutFromGoogle, getCurrentUserEmail } from '@/utils/google';
import { CLIENT_ID, API_KEY } from '@/utils/google';
import { SPREADSHEET_ID } from '@/utils/sheets';
import { toast } from 'sonner';

export const useGoogleIntegration = () => {
  const [status, setStatus] = useState({
    isInitialized: false,
    isAuthorized: false,
    isLoading: true,
    userEmail: null as string | null
  });

  const [showCredentialsForm, setShowCredentialsForm] = useState(false);
  const [credentials, setCredentials] = useState({
    clientId: CLIENT_ID || '',
    apiKey: API_KEY || '',
    spreadsheetId: SPREADSHEET_ID || ''
  });

  const [missingCredentials, setMissingCredentials] = useState({
    clientId: !CLIENT_ID,
    apiKey: !API_KEY
  });

  // Load saved credentials from localStorage
  useEffect(() => {
    const savedClientId = localStorage.getItem('google_client_id');
    const savedApiKey = localStorage.getItem('google_api_key');
    const savedSpreadsheetId = localStorage.getItem('google_spreadsheet_id');
    
    if (savedClientId || savedApiKey || savedSpreadsheetId) {
      setCredentials({
        clientId: savedClientId || credentials.clientId,
        apiKey: savedApiKey || credentials.apiKey,
        spreadsheetId: savedSpreadsheetId || credentials.spreadsheetId
      });
    }
  }, []);

  const checkStatus = useCallback(async () => {
    setStatus(prev => ({ ...prev, isLoading: true }));
    
    try {
      // Check if credentials are missing
      if (!credentials.clientId || !credentials.apiKey) {
        setMissingCredentials({
          clientId: !credentials.clientId,
          apiKey: !credentials.apiKey
        });
        setStatus({
          isInitialized: false,
          isAuthorized: false,
          isLoading: false,
          userEmail: null
        });
        return;
      }

      // Use credentials from state
      window.localStorage.setItem('google_client_id', credentials.clientId);
      window.localStorage.setItem('google_api_key', credentials.apiKey);
      if (credentials.spreadsheetId) {
        window.localStorage.setItem('google_spreadsheet_id', credentials.spreadsheetId);
      }

      await initGoogleApi();
      const authorized = await isUserAuthorized();
      const email = authorized ? getCurrentUserEmail() : null;
      
      setStatus({
        isInitialized: true,
        isAuthorized: authorized,
        isLoading: false,
        userEmail: email
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
  }, [credentials]);

  useEffect(() => {
    checkStatus();
  }, [checkStatus]);

  const handleSignIn = async () => {
    if (missingCredentials.clientId || missingCredentials.apiKey) {
      toast.error('Google API credentials are missing. Please set them up first.');
      return;
    }

    setStatus(prev => ({ ...prev, isLoading: true }));
    try {
      const success = await signInToGoogle();
      if (success) {
        checkStatus();
        toast.success('Successfully signed in to Google');
      } else {
        setStatus(prev => ({ ...prev, isLoading: false }));
      }
    } catch (error) {
      console.error('Error signing in:', error);
      toast.error('Failed to sign in to Google');
      setStatus(prev => ({ ...prev, isLoading: false }));
    }
  };

  const handleSignOut = async () => {
    setStatus(prev => ({ ...prev, isLoading: true }));
    try {
      await signOutFromGoogle();
      checkStatus();
      toast.success('Successfully signed out from Google');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out from Google');
      setStatus(prev => ({ ...prev, isLoading: false }));
    }
  };

  const handleCredentialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    checkStatus();
    setShowCredentialsForm(false);
    toast.success('Credentials saved');
  };

  const showSetupInstructions = () => {
    toast.info(
      'You need to set up your Google API credentials. Open the browser console (F12) to see detailed instructions.',
      { duration: 8000 }
    );
    // This will trigger the detailed instructions to be printed in the console
    import('@/utils/google/config').then(module => {
      module.printOAuthSetupInstructions();
    });
  };

  return {
    status,
    missingCredentials,
    credentials,
    setCredentials,
    showCredentialsForm,
    setShowCredentialsForm,
    handleSignIn,
    handleSignOut,
    handleCredentialSubmit,
    showSetupInstructions
  };
};
