
import { useState, useEffect, useCallback } from 'react';
import { API_KEY } from '@/utils/google';
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
    clientId: false,
    apiKey: true
  });

  const [showCredentialsForm, setShowCredentialsForm] = useState(false);

  // Load saved credentials from localStorage only once when component mounts
  useEffect(() => {
    const savedApiKey = localStorage.getItem('google_api_key');
    const savedSpreadsheetId = localStorage.getItem('google_spreadsheet_id');
    
    if (savedApiKey || savedSpreadsheetId) {
      setCredentials({
        clientId: '', // Always empty, never needed
        apiKey: savedApiKey || '',
        spreadsheetId: savedSpreadsheetId || ''
      });
      
      // Set missing credentials state
      setMissingCredentials({
        clientId: false, // Always false as it's never needed
        apiKey: !savedApiKey // Only API key is required
      });
    }
    
    // Ensure we're always in API key only mode
    localStorage.setItem('force_api_key_only', 'true');
  }, []);

  const handleCredentialSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    // Store credentials in localStorage
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
    
    // Remove any client ID if previously set
    localStorage.removeItem('google_client_id');
    
    // Ensure API key only mode
    localStorage.setItem('force_api_key_only', 'true');
    
    setMissingCredentials({
      clientId: false,
      apiKey: !credentials.apiKey
    });
    
    setShowCredentialsForm(false);
    toast.success('API credentials saved');
    
    // Return true to indicate successful submission
    return true;
  }, [credentials]);

  // Removed clearClientId since it's not needed anymore

  const showSetupInstructions = useCallback(() => {
    toast.info(
      'You need to set up your Google API key. Please provide a valid API key in the settings.',
      { duration: 8000 }
    );
    // Print simplified instructions focused on API key
    console.log(
      `Google Sheets API Key Setup Instructions:
      
      1. You need to get an API Key from Google Cloud Console
      2. Enable the Google Sheets API in your Google Cloud project
      3. Input the API Key in the settings form
      4. Your Spreadsheet ID is found in your Google Sheet URL:
         https://docs.google.com/spreadsheets/d/[YOUR_SPREADSHEET_ID]/edit
      `
    );
  }, []);

  return {
    credentials,
    setCredentials,
    missingCredentials,
    showCredentialsForm,
    setShowCredentialsForm,
    handleCredentialSubmit,
    showSetupInstructions,
    // Since we don't use OAuth, we don't need clearClientId
    clearClientId: () => true
  };
};
