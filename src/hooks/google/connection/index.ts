
import { useConnectionStatus } from './useConnectionStatus';
import { useStatusCheck } from './useStatusCheck';
import { useSignIn } from './useSignIn';
import { useSignOut } from './useSignOut';
import { useInitialStatus } from './useInitialStatus';
import { MissingCredentialsType, ConnectionStatus, ConnectionOperations } from './types';

/**
 * Main hook for Google API connection management,
 * composed of smaller, focused hooks
 */
export const useGoogleConnection = (
  missingCredentials: MissingCredentialsType, 
  clearClientId?: () => boolean
): { 
  status: ConnectionStatus; 
} & ConnectionOperations => {
  const {
    status,
    setLoading,
    setError,
    setAuthorized,
    resetStatus,
    isOperationInProgress
  } = useConnectionStatus();

  const { checkStatus } = useStatusCheck(
    missingCredentials,
    setLoading,
    setAuthorized,
    setError,
    isOperationInProgress
  );

  const { handleSignIn, autoConnect } = useSignIn(
    missingCredentials,
    setLoading,
    setAuthorized,
    setError,
    isOperationInProgress,
    clearClientId
  );

  const { handleSignOut } = useSignOut(
    setLoading,
    resetStatus,
    setError,
    isOperationInProgress
  );

  // Set up initial status check with timeout
  useInitialStatus(checkStatus, setLoading);

  return {
    status,
    checkStatus,
    handleSignIn,
    handleSignOut,
    autoConnect
  };
};

export type { ConnectionStatus, ConnectionOperations, MissingCredentialsType };
