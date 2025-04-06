
import { useEffect, useCallback } from 'react';
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

  // Use a throttled status check to prevent excessive renders
  const throttledCheckStatus = useCallback(() => {
    // Prevent multiple status checks in a short time period
    if (window._lastStatusCheck && (Date.now() - window._lastStatusCheck) < 2000) {
      console.log('Throttling status check - too soon since last check');
      return;
    }
    
    window._lastStatusCheck = Date.now();
    checkStatus();
  }, [checkStatus]);

  // Only check status on mount and when missing credentials change
  useEffect(() => {
    // Initial check with a slight delay to let everything initialize
    const initialCheckTimeout = setTimeout(() => {
      throttledCheckStatus();
    }, 300);
    
    return () => clearTimeout(initialCheckTimeout);
  }, [missingCredentials, throttledCheckStatus]);

  // Wrap the credential submit handler to also check status
  const handleCredentialSubmitWithStatusCheck = (e: React.FormEvent) => {
    const result = handleCredentialSubmit(e);
    if (result) {
      // Delay status check to allow localStorage to update
      setTimeout(() => {
        throttledCheckStatus();
      }, 500);
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
        }, 500);
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

// Add this to the global Window interface
declare global {
  interface Window {
    _lastStatusCheck?: number;
  }
}
