
import { useEffect } from 'react';
import { useGoogleCredentials } from '@/hooks/google/useGoogleCredentials';
import { useGoogleConnection } from '@/hooks/google/useGoogleConnection';

export const useGoogleIntegration = () => {
  const {
    credentials,
    setCredentials,
    missingCredentials,
    showCredentialsForm,
    setShowCredentialsForm,
    handleCredentialSubmit,
    showSetupInstructions
  } = useGoogleCredentials();

  const {
    status,
    checkStatus,
    handleSignIn,
    handleSignOut,
    autoConnect
  } = useGoogleConnection(missingCredentials);

  // Perform credential change side effects
  useEffect(() => {
    checkStatus();
  }, [checkStatus]);

  // Wrap the credential submit handler to also check status
  const handleCredentialSubmitWithStatusCheck = (e: React.FormEvent) => {
    const result = handleCredentialSubmit(e);
    if (result) {
      checkStatus();
    }
    return result;
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
    autoConnect
  };
};
