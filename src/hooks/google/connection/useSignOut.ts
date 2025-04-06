
import { toast } from 'sonner';
import { signOutFromGoogle } from '@/utils/google';

/**
 * Hook for handling sign-out logic
 */
export const useSignOut = (
  setLoading: (isLoading: boolean) => void,
  resetStatus: () => void,
  setError: (error: string | null) => void,
  isOperationInProgress: React.MutableRefObject<boolean>
) => {
  
  const handleSignOut = async () => {
    // Prevent multiple simultaneous operations
    if (isOperationInProgress.current) {
      console.log('Operation already in progress, ignoring sign-out request');
      return;
    }
    
    isOperationInProgress.current = true;
    setLoading(true);
    
    try {
      await signOutFromGoogle();
      resetStatus();
    } catch (error) {
      console.error('Error disconnecting from Google API:', error);
      toast.error('Failed to disconnect from Google API');
      setLoading(false);
      setError(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      isOperationInProgress.current = false;
    }
  };

  return { handleSignOut };
};
