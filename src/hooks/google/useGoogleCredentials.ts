import { useState, useEffect, useCallback } from 'react';
import { CLIENT_ID, API_KEY } from '@/utils/google';
import { SPREADSHEET_ID } from '@/utils/sheets';
import { toast } from 'sonner';

export interface Credentials {
  clientId: string;
  apiKey: string;
  spreadsheetId: string;
}

export interface MissingCredentials {
  clientId: boolean;
  apiKey: boolean;
}

export const useGoogleCredentials = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    clientId: '',
    apiKey: '',
    spreadsheetId: ''
  });

  const [missingCredentials, setMissingCredentials] = useState<MissingCredentials>({
    clientId: false, // Changed to false since it's optional now
    apiKey: true
  });

  const [showCredentialsForm, setShowCredentialsForm] = useState(false);

  // Load saved credentials from localStorage only once when component mounts
  useEffect(() => {
    const savedClientId = localStorage.getItem('google_client_id');
    const savedApiKey = localStorage.getItem('google_api_key');
    const savedSpreadsheetId = localStorage.getItem('google_spreadsheet_id');
    
    if (savedClientId || savedApiKey || savedSpreadsheetId) {
      setCredentials({
        clientId: savedClientId || '',
        apiKey: savedApiKey || '',
        spreadsheetId: savedSpreadsheetId || ''
      });
      
      // Set missing credentials state - only API key is required
      setMissingCredentials({
        clientId: false, // Always false as it's optional
        apiKey: !savedApiKey // Only API key is required
      });
    }
  }, []);

  const handleCredentialSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    // Store credentials in localStorage
    if (credentials.clientId) {
      localStorage.setItem('google_client_id', credentials.clientId);
    } else {
      // Clear the client ID if it's removed
      localStorage.removeItem('google_client_id');
    }
    
    if (credentials.apiKey) {
      localStorage.setItem('google_api_key', credentials.apiKey);
    } else {
      localStorage.removeItem('google_api_key');
    }
    
    if (credentials.spreadsheetId) {
      localStorage.setItem('google_spreadsheet_id', credentials.spreadsheetId);
    } else {
      localStorage.removeItem('google_spreadsheet_id');
    }
    
    setMissingCredentials({
      clientId: false, // Always false as it's optional
      apiKey: !credentials.apiKey // Only API key is required
    });
    
    setShowCredentialsForm(false);
    toast.success('Credentials saved');
    
    // Return true to indicate successful submission
    return true;
  }, [credentials]);

  // Clear client ID but keep API key
  const clearClientId = useCallback(() => {
    localStorage.removeItem('google_client_id');
    setCredentials(prev => ({
      ...prev,
      clientId: ''
    }));
    toast.success('Client ID removed, using API Key only mode');
    return true;
  }, []);

  const showSetupInstructions = useCallback(() => {
    toast.info(
      'You need to set up your Google API credentials. Open the browser console (F12) to see detailed instructions.',
      { duration: 8000 }
    );
    // This will trigger the detailed instructions to be printed in the console
    import('@/utils/google/config').then(module => {
      module.printOAuthSetupInstructions();
    });
  }, []);

  return {
    credentials,
    setCredentials,
    missingCredentials,
    showCredentialsForm,
    setShowCredentialsForm,
    handleCredentialSubmit,
    showSetupInstructions,
    clearClientId
  };
};
