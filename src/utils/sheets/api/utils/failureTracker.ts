
/**
 * Utility for tracking API failures
 */

// Track consecutive failures to prevent constant error messages
let consecutiveFailures = 0;
const MAX_FAILURES_BEFORE_RESET = 3;

/**
 * Increments the consecutive failures counter
 */
export const incrementFailures = (): void => {
  consecutiveFailures++;
};

/**
 * Resets the consecutive failures counter
 */
export const resetFailures = (): void => {
  consecutiveFailures = 0;
};

/**
 * Checks if too many consecutive failures have occurred
 * @returns {boolean} True if max failures threshold exceeded
 */
export const hasTooManyFailures = (): boolean => {
  return consecutiveFailures >= MAX_FAILURES_BEFORE_RESET;
};

/**
 * Gets the current failure count
 * @returns {number} The current number of consecutive failures
 */
export const getFailureCount = (): number => {
  return consecutiveFailures;
};
