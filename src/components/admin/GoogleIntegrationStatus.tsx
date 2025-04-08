
import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import GoogleIcon from './google/GoogleIcon';
import StatusDisplay from './google/StatusDisplay';
import CredentialsToggle from './google/CredentialsToggle';
import ConnectionButton from './google/ConnectionButton';
import EmailJSConfig from './google/EmailJSConfig';
import { useGoogleIntegration } from './google/useGoogleIntegration';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { SPREADSHEET_ID } from '@/utils/sheets/config';

const GoogleIntegrationStatus = () => {
  const hasAutoConnected = useRef(false);
  
  const {
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
    autoConnect,
    switchToApiKeyOnlyMode
  } = useGoogleIntegration();

  // Auto-connect to Google only once when the component mounts if credentials are available
  useEffect(() => {
    if (!status.isAuthorized && 
        !missingCredentials.apiKey && 
        !hasAutoConnected.current && 
        !status.isLoading) {
      console.log('Auto-connecting to Google API...');
      hasAutoConnected.current = true;
      autoConnect();
    }
  }, [status.isAuthorized, missingCredentials.apiKey, status.isLoading, autoConnect]);

  // Check if we're in API key only mode
  const isApiKeyOnly = !credentials.clientId && credentials.apiKey;

  // Quick API key entry form
  const handleQuickApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const apiKeyInput = form.elements.namedItem('apiKey') as HTMLInputElement;
    const spreadsheetIdInput = form.elements.namedItem('spreadsheetId') as HTMLInputElement;
    
    if (apiKeyInput.value) {
      localStorage.setItem('google_api_key', apiKeyInput.value);
      
      if (spreadsheetIdInput.value) {
        localStorage.setItem('google_spreadsheet_id', spreadsheetIdInput.value);
        console.log('Saved spreadsheet ID to localStorage:', spreadsheetIdInput.value);
      } else if (SPREADSHEET_ID) {
        // Use the default spreadsheet ID if none provided
        localStorage.setItem('google_spreadsheet_id', SPREADSHEET_ID);
        console.log('Using default spreadsheet ID:', SPREADSHEET_ID);
      }
      
      setCredentials({
        ...credentials,
        apiKey: apiKeyInput.value,
        spreadsheetId: spreadsheetIdInput.value || SPREADSHEET_ID
      });
      
      toast.success("API Key saved! Connecting...");
      
      // Reset form
      form.reset();
      
      // Attempt to connect with new credentials after a short delay
      setTimeout(() => {
        autoConnect();
      }, 500);
    }
  };

  // Get current spreadsheet ID
  const currentSpreadsheetId = localStorage.getItem('google_spreadsheet_id') || SPREADSHEET_ID;

  return (
    <Card className="border-dashed shadow-sm">
      <CardHeader className="py-2 px-4 bg-gray-50">
        <CardTitle className="text-sm flex items-center text-gray-900">
          <GoogleIcon className="h-3 w-3 mr-1" />
          Google Workspace Connection
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-3 bg-white">
        <StatusDisplay 
          isLoading={status.isLoading}
          missingCredentials={missingCredentials}
          isAuthorized={status.isAuthorized}
          userEmail={status.userEmail}
          error={status.error}
          showSetupInstructions={showSetupInstructions}
          switchToApiKeyOnlyMode={switchToApiKeyOnlyMode}
        />
        
        {/* Quick API Key Entry Form (only show when not connected) */}
        {!status.isAuthorized && missingCredentials.apiKey && (
          <form onSubmit={handleQuickApiKeySubmit} className="mt-3 p-2 bg-gray-50 rounded-md space-y-2">
            <div className="space-y-1">
              <label className="text-xs text-gray-900 font-medium">Google API Key:</label>
              <Input 
                name="apiKey" 
                placeholder="Enter your Google API Key" 
                className="h-7 text-xs text-gray-900" 
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-900 font-medium">Spreadsheet ID:</label>
              <Input 
                name="spreadsheetId" 
                placeholder="Your Google Sheet ID" 
                className="h-7 text-xs text-gray-900"
                defaultValue={currentSpreadsheetId !== "1RICk5q_nQr8JHKvlYi-1tdlVwzM57UGbRdDNOdMwOFk" ? currentSpreadsheetId : ""}
              />
              {currentSpreadsheetId && (
                <p className="text-[10px] text-gray-700 mt-1">
                  Current ID: {currentSpreadsheetId.substring(0, 15)}...
                </p>
              )}
            </div>
            <Button type="submit" size="sm" className="w-full text-xs h-7">
              Connect
            </Button>
          </form>
        )}
        
        <div className="flex justify-between items-center mt-3">
          <CredentialsToggle 
            showCredentialsForm={showCredentialsForm}
            setShowCredentialsForm={setShowCredentialsForm}
            credentials={credentials}
            setCredentials={setCredentials}
            handleCredentialSubmit={handleCredentialSubmit}
          />
          
          <ConnectionButton 
            missingCredentials={missingCredentials}
            isAuthorized={status.isAuthorized}
            isLoading={status.isLoading}
            onShowCredentials={() => setShowCredentialsForm(true)}
            onSignOut={handleSignOut}
            onSignIn={handleSignIn}
          />
        </div>
        
        {/* Add EmailJS Configuration Section */}
        <EmailJSConfig />
      </CardContent>
    </Card>
  );
};

export default GoogleIntegrationStatus;
