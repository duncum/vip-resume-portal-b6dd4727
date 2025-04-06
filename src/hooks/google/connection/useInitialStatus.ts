
import { useEffect } from 'react';

/**
 * Hook for initial status check and timeout handling
 */
export const useInitialStatus = (
  checkStatus: () => Promise<void>,
  setLoading: (isLoading: boolean) => void
) => {
  // Only check status once when component mounts
  useEffect(() => {
    let isMounted = true;
    
    // Set to true first to prevent flickering
    setLoading(true);
    
    // Use a timeout to delay first status check
    const timeoutId = setTimeout(() => {
      if (isMounted) {
        checkStatus().catch(() => {
          if (isMounted) setLoading(false);
        });
      }
    }, 300);
    
    // Add a safety timeout to ensure loading state doesn't get stuck
    const safetyTimeoutId = setTimeout(() => {
      if (isMounted) {
        setLoading(false);
        console.log('Safety timeout reached, resetting loading state');
      }
    }, 8000); // 8 second safety timeout
    
    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      clearTimeout(safetyTimeoutId);
    };
  }, [checkStatus, setLoading]);
};
