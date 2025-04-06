
import { useEffect } from 'react';
import { useGoogleCredentials } from '@/hooks/google/useGoogleCredentials';
import { useGoogleConnection } from '@/hooks/google/connection';

export const useGoogleIntegration = () => {
  const {
    credentials,
    setCredentials,
    missingCredentials,
    showCredentialsForm,
    setShowCredentialsForm,
    handleCredentialSubmit,
    showSetupInstructions,
    clearClientId
  } = useGoogleCredentials();

  const {
    status,
    checkStatus,
    handleSignIn,
    handleSignOut,
    autoConnect
  } = useGoogleConnection(missingCredentials, clearClientId);

  // Debounce credential changes to prevent excessive status checks
  useEffect(() => {
    // Use a timeout to delay the status check after credential changes
    const timeoutId = setTimeout(() => {
      checkStatus();
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, [missingCredentials, checkStatus]);

  // Wrap the credential submit handler to also check status
  const handleCredentialSubmitWithStatusCheck = (e: React.FormEvent) => {
    const result = handleCredentialSubmit(e);
    if (result) {
      // Delay status check to allow localStorage to update
      setTimeout(() => {
        checkStatus();
      }, 300);
    }
    return result;
  };

  // Provide a way to use API key only mode
  const switchToApiKeyOnlyMode = () => {
    if (clearClientId) {
      const result = clearClientId();
      if (result) {
        setTimeout(() => {
          autoConnect();
        }, 300);
      }
      return result;
    }
    return false;
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
    handleCredentialSubmit: handleCredentialSubmitWithStatusCheck,
    showSetupInstructions,
    autoConnect,
    switchToApiKeyOnlyMode
  };
};
