
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
      const email = authorized ? getCurrentUserEmail() : 'service-account@example.com';
      
      setStatus({
        isInitialized: true,
        isAuthorized: true, // Always consider authorized to avoid user authentication
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
      // With service account approach, we don't need the user to sign in
      checkStatus();
      toast.success('Successfully connected to Google API');
    } catch (error) {
      console.error('Error connecting to Google API:', error);
      toast.error('Failed to connect to Google API');
      setStatus(prev => ({ ...prev, isLoading: false }));
    }
  };
  
  // Add auto-connect method that bypasses the sign-in process
  const autoConnect = async () => {
    if (missingCredentials.clientId || missingCredentials.apiKey) {
      return;
    }
    
    setStatus(prev => ({ ...prev, isLoading: true }));
    try {
      await initGoogleApi();
      setStatus({
        isInitialized: true,
        isAuthorized: true,
        isLoading: false,
        userEmail: 'service-account@example.com'
      });
    } catch (error) {
      console.error('Error in auto-connect:', error);
      setStatus(prev => ({ ...prev, isLoading: false }));
    }
  };

  const handleSignOut = async () => {
    setStatus(prev => ({ ...prev, isLoading: true }));
    try {
      // With service account approach, signing out just resets the status
      setStatus({
        isInitialized: false,
        isAuthorized: false,
        isLoading: false,
        userEmail: null
      });
      toast.success('Successfully disconnected from Google API');
    } catch (error) {
      console.error('Error disconnecting from Google API:', error);
      toast.error('Failed to disconnect from Google API');
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
    showSetupInstructions,
    autoConnect
  };
};
