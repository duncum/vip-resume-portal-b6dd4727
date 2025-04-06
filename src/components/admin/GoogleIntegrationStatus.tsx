
import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import GoogleIcon from './google/GoogleIcon';
import StatusDisplay from './google/StatusDisplay';
import CredentialsToggle from './google/CredentialsToggle';
import ConnectionButton from './google/ConnectionButton';
import { useGoogleIntegration } from './google/useGoogleIntegration';
import { AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

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
    // Check if we should attempt auto-connect (has API key, not yet connected, hasn't tried yet)
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
      }
      
      setCredentials({
        ...credentials,
        apiKey: apiKeyInput.value,
        spreadsheetId: spreadsheetIdInput.value || credentials.spreadsheetId
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

  return (
    <Card className="border-dashed">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center">
          <GoogleIcon className="h-4 w-4 mr-2" />
          Google Integration
        </CardTitle>
        <CardDescription className="text-xs">
          Required for sheet access and resume storage
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-2 pt-0">
        <StatusDisplay 
          isLoading={status.isLoading}
          missingCredentials={missingCredentials}
          isAuthorized={status.isAuthorized}
          userEmail={status.userEmail}
          error={status.error}
          showSetupInstructions={showSetupInstructions}
          switchToApiKeyOnlyMode={switchToApiKeyOnlyMode}
        />
        
        {/* Quick API Key Entry Form */}
        {!status.isAuthorized && missingCredentials.apiKey && (
          <form onSubmit={handleQuickApiKeySubmit} className="mt-3 p-3 bg-gray-50 rounded-md space-y-3">
            <h3 className="text-sm font-medium">Quick Setup (API Key Only Mode)</h3>
            <div className="space-y-2">
              <label className="text-xs">Google API Key:</label>
              <Input 
                name="apiKey" 
                placeholder="Enter your Google API Key" 
                className="h-8 text-xs" 
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs">Spreadsheet ID (optional):</label>
              <Input 
                name="spreadsheetId" 
                placeholder="Your Google Sheet ID" 
                className="h-8 text-xs"
              />
            </div>
            <Button type="submit" size="sm" className="w-full text-xs h-8">
              Connect with API Key
            </Button>
            <p className="text-xs text-gray-500 italic">
              API Key only mode allows read access to view candidates
            </p>
          </form>
        )}
        
        {/* Show API key only mode notice */}
        {status.isAuthorized && isApiKeyOnly && (
          <div className="mt-3 p-3 bg-amber-50 text-xs rounded-md border border-amber-200">
            <div className="flex items-start">
              <AlertCircle className="h-4 w-4 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">API Key Only Mode Limitations:</p>
                <ul className="list-disc pl-4 space-y-1 mt-1">
                  <li>View and search candidates (✓)</li>
                  <li>Add new candidates (✗)</li>
                  <li>Upload resumes to Google Drive (✗)</li>
                </ul>
                <p className="mt-2">
                  To enable all features, add a Google OAuth Client ID with
                  <span className="font-bold"> {window.location.origin}</span> as an authorized JavaScript origin.
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Show a help message about how to share the Google Sheet */}
        {status.isAuthorized && (
          <div className="mt-3 p-2 bg-gray-50 text-xs rounded-md">
            <p className="font-medium mb-1">Google Sheet Setup:</p>
            <ol className="list-decimal pl-4 space-y-1">
              <li>Make sure your Sheet has a tab named "Candidates"</li>
              <li>First row should have column headers</li>
              <li>Share the Sheet either publicly (read access) or with your Google account</li>
            </ol>
          </div>
        )}
        
        <CredentialsToggle 
          showCredentialsForm={showCredentialsForm}
          setShowCredentialsForm={setShowCredentialsForm}
          credentials={credentials}
          setCredentials={setCredentials}
          handleCredentialSubmit={handleCredentialSubmit}
        />
      </CardContent>
      
      <CardFooter className="pt-2">
        <ConnectionButton 
          missingCredentials={missingCredentials}
          isAuthorized={status.isAuthorized}
          isLoading={status.isLoading}
          onShowCredentials={() => setShowCredentialsForm(true)}
          onSignOut={handleSignOut}
          onSignIn={handleSignIn}
        />
      </CardFooter>
    </Card>
  );
};

export default GoogleIntegrationStatus;
