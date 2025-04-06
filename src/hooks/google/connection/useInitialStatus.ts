
import { useEffect } from 'react';

/**
 * Hook for initial status check and timeout handling
 */
export const useInitialStatus = (
  checkStatus: () => Promise<void>,
  setLoading: (isLoading: boolean) => void
) => {
  // Auto-check status when component mounts
  useEffect(() => {
    checkStatus();
    
    // Add a timeout to ensure loading state doesn't get stuck
    const timeoutId = setTimeout(() => {
      setLoading(false);
      console.log('Status check timeout reached, resetting loading state');
    }, 5000); // 5 second timeout
    
    return () => clearTimeout(timeoutId);
  }, [checkStatus, setLoading]);
};
