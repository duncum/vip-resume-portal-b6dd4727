
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
    clientId: true,
    apiKey: true
  });

  const [showCredentialsForm, setShowCredentialsForm] = useState(false);

  // Load saved credentials from localStorage only once when component mounts
  useEffect(() => {
    const savedClientId = localStorage.getItem('google_client_id');
    const savedApiKey = localStorage.getItem('google_api_key');
    const savedSpreadsheetId = localStorage.getItem('google_spreadsheet_id') || SPREADSHEET_ID;
    
    if (savedClientId || savedApiKey || savedSpreadsheetId) {
      setCredentials({
        clientId: savedClientId || '',
        apiKey: savedApiKey || '',
        spreadsheetId: savedSpreadsheetId || ''
      });
      
      // Set missing credentials state
      setMissingCredentials({
        clientId: !savedClientId,
        apiKey: !savedApiKey
      });
    }
    
    // Remove API key only mode flag if we have a client ID
    if (savedClientId) {
      localStorage.removeItem('force_api_key_only');
    }
  }, []);

  const handleCredentialSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    // Store credentials in localStorage
    if (credentials.clientId) {
      localStorage.setItem('google_client_id', credentials.clientId);
    } else {
      localStorage.removeItem('google_client_id');
    }
    
    if (credentials.apiKey) {
      localStorage.setItem('google_api_key', credentials.apiKey);
    } else {
      localStorage.removeItem('google_api_key');
    }
    
    // Make spreadsheet ID required and ensure it's saved
    if (credentials.spreadsheetId) {
      localStorage.setItem('google_spreadsheet_id', credentials.spreadsheetId);
      console.log('Saved spreadsheet ID to localStorage:', credentials.spreadsheetId);
    } else if (SPREADSHEET_ID) {
      // If no spreadsheet ID is provided but we have a default, use that
      localStorage.setItem('google_spreadsheet_id', SPREADSHEET_ID);
      console.log('Using default spreadsheet ID:', SPREADSHEET_ID);
    } else {
      toast.error('Spreadsheet ID is required');
      return false;
    }
    
    // If we're setting a client ID, remove the API key only mode flag
    if (credentials.clientId) {
      localStorage.removeItem('force_api_key_only');
    }
    
    setMissingCredentials({
      clientId: !credentials.clientId,
      apiKey: !credentials.apiKey
    });
    
    setShowCredentialsForm(false);
    toast.success('Google API credentials saved');
    
    // Return true to indicate successful submission
    return true;
  }, [credentials]);

  const showSetupInstructions = useCallback(() => {
    toast.info(
      'You need to set up your Google API credentials. Please provide them in the settings.',
      { duration: 8000 }
    );
    // Print instructions to console
    console.log(
      `Google API Setup Instructions:
      
      1. You need to get an API Key and Client ID from Google Cloud Console
      2. Enable the Google Sheets API in your Google Cloud project
      3. For full access, set up OAuth consent screen and create OAuth credentials
      4. Input both credentials in the settings form
      5. Your Spreadsheet ID is found in your Google Sheet URL:
         https://docs.google.com/spreadsheets/d/[YOUR_SPREADSHEET_ID]/edit
      `
    );
  }, []);

  // Clear client ID (for API key only mode)
  const clearClientId = useCallback(() => {
    localStorage.removeItem('google_client_id');
    setCredentials(prev => ({ ...prev, clientId: '' }));
    setMissingCredentials(prev => ({ ...prev, clientId: true }));
    return true;
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
