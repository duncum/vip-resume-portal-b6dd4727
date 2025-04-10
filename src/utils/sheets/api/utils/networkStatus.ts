
/**
 * Utility for handling network status
 */

import { toast } from "sonner";

/**
 * Check if the browser is online
 */
export const isOnline = (): boolean => {
  return navigator.onLine;
};

/**
 * Handle offline state
 */
export const handleOfflineState = (): void => {
  if (!isOnline()) {
    toast.error("You're offline. Please check your internet connection.", {
      id: "offline-toast",
      duration: 5000
    });
    console.log("Device is offline, attempting to use cached data");
  }
};
