
/**
 * Track API request failures to prevent excessive retries
 */
let failureCount = 0;
const MAX_FAILURES = 5;

/**
 * Increment the failure counter
 */
export const incrementFailures = (): number => {
  failureCount++;
  console.log(`API failure count increased to ${failureCount}`);
  return failureCount;
};

/**
 * Reset the failure counter
 */
export const resetFailures = (): void => {
  console.log(`Resetting API failure count from ${failureCount} to 0`);
  failureCount = 0;
};

/**
 * Check if too many failures have occurred
 */
export const hasTooManyFailures = (): boolean => {
  return failureCount >= MAX_FAILURES;
};

/**
 * Get the current failure count
 */
export const getFailureCount = (): number => {
  return failureCount;
};
