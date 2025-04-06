
// Handles Google user profile information
// Modified for Memberspace integration to use service account instead of user sign-in

/**
 * Get the current user's email address
 * In Memberspace integration, we return a service account email
 */
export const getCurrentUserEmail = (): string | null => {
  // Return service account email when API is initialized
  if (window.gapi?.client) {
    return 'service-account@example.com';
  }
  return null;
};

/**
 * Get basic user profile information
 * In Memberspace integration, we return service account info
 */
export const getUserProfile = () => {
  // Return service account profile when API is initialized
  if (window.gapi?.client) {
    return {
      id: 'service-account',
      name: 'Service Account',
      email: 'service-account@example.com',
      imageUrl: null
    };
  }
  return null;
};
