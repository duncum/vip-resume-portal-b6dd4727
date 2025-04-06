
import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import GoogleIcon from './google/GoogleIcon';
import StatusDisplay from './google/StatusDisplay';
import CredentialsToggle from './google/CredentialsToggle';
import ConnectionButton from './google/ConnectionButton';
import { useGoogleIntegration } from './google/useGoogleIntegration';

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
