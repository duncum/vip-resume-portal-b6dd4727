
/**
 * Utility for rate limiting API requests
 */

// Track time of last request to avoid excessive calls
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 500; // 500ms minimum between requests

/**
 * Check if request should be throttled
 */
export const shouldThrottleRequest = (): boolean => {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  
  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    console.log(`Rate limiting API request. Last request was ${timeSinceLastRequest}ms ago`);
    return true;
  }
  
  lastRequestTime = now;
  return false;
};

/**
 * Reset rate limiter
 */
export const resetRateLimiter = (): void => {
  lastRequestTime = 0;
};
