
/**
 * Utility for handling API rate limiting
 */

// Track last attempt time for rate limiting
let lastAttemptTime = 0;
const MIN_ATTEMPT_INTERVAL = 500; // 500ms - reduced to improve responsiveness while still preventing spam

/**
 * Checks if a request should be throttled based on time since last attempt
 * @returns {boolean} True if the request should be throttled
 */
export const shouldThrottleRequest = (): boolean => {
  const now = Date.now();
  const timeSinceLastAttempt = now - lastAttemptTime;
  
  // Only apply throttling for very frequent calls
  if (timeSinceLastAttempt < MIN_ATTEMPT_INTERVAL) {
    console.log(`Request too frequent, throttling. Last attempt was ${timeSinceLastAttempt}ms ago`);
    return true;
  }
  
  // Update last attempt time
  lastAttemptTime = now;
  return false;
};

// Exponential backoff for retries
const backoffDelays = [1000, 2000, 4000, 8000, 16000]; // 1s, 2s, 4s, 8s, 16s

/**
 * Get delay time for retry attempts using exponential backoff
 * @param retryCount Current retry count
 * @returns Delay in milliseconds
 */
export const getBackoffDelay = (retryCount: number): number => {
  if (retryCount < 0) return 0;
  if (retryCount >= backoffDelays.length) return backoffDelays[backoffDelays.length - 1];
  return backoffDelays[retryCount];
};
