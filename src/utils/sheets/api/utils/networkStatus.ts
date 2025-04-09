
/**
 * Utility for checking network status
 */

import { toast } from "sonner";
import { isOfflineModeAvailable } from '../../auth-helper';

/**
 * Check if the device is online
 * @returns {boolean} True if the device is online
 */
export const isOnline = (): boolean => {
  return navigator.onLine;
};

/**
 * Handle offline state and show appropriate notifications
 * @returns {boolean} Always returns false to indicate offline state
 */
export const handleOfflineState = (): boolean => {
  console.log("Browser is offline, using offline data");
  
  if (isOfflineModeAvailable()) {
    toast.info("You're offline. Using previously cached data.", {
      duration: 3000
    });
  } else {
    toast.error("You're offline. No cached data is available.", {
      duration: 4000
    });
  }
  
  return false;
};
