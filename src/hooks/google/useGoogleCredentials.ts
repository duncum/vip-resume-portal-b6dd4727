
import { useState, useEffect } from 'react';
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

  // Load saved credentials from localStorage
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

  const handleCredentialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Store credentials in localStorage
    if (credentials.clientId) {
      localStorage.setItem('google_client_id', credentials.clientId);
    }
    if (credentials.apiKey) {
      localStorage.setItem('google_api_key', credentials.apiKey);
    }
    if (credentials.spreadsheetId) {
      localStorage.setItem('google_spreadsheet_id', credentials.spreadsheetId);
    }
    
    setMissingCredentials({
      clientId: false, // Always false as it's optional
      apiKey: !credentials.apiKey // Only API key is required
    });
    
    setShowCredentialsForm(false);
    toast.success('Credentials saved');
    
    // Return true to indicate successful submission
    return true;
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
    credentials,
    setCredentials,
    missingCredentials,
    showCredentialsForm,
    setShowCredentialsForm,
    handleCredentialSubmit,
    showSetupInstructions
  };
};
