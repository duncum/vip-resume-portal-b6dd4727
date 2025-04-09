
/**
 * Utility for handling API rate limiting
 */

// Track last attempt time for rate limiting
let lastAttemptTime = 0;
const MIN_ATTEMPT_INTERVAL = 1000; // 1 second - reduced to improve responsiveness

/**
 * Checks if a request should be throttled based on time since last attempt
 * @returns {boolean} True if the request should be throttled
 */
export const shouldThrottleRequest = (): boolean => {
  const now = Date.now();
  const timeSinceLastAttempt = now - lastAttemptTime;
  
  // Only apply throttling for very frequent calls (less than 1 second apart)
  if (timeSinceLastAttempt < MIN_ATTEMPT_INTERVAL) {
    console.log(`Request too frequent, throttling. Last attempt was ${timeSinceLastAttempt}ms ago`);
    return true;
  }
  
  // Update last attempt time
  lastAttemptTime = now;
  return false;
};
