
// Handles Google user profile information

import { initGoogleApi } from './auth';

/**
 * Get the current user's email address
 */
export const getCurrentUserEmail = (): string | null => {
  if (!window.gapi?.auth2?.getAuthInstance?.()) {
    return null;
  }
  
  const user = window.gapi.auth2.getAuthInstance().currentUser.get();
  const profile = user.getBasicProfile();
  
  if (profile) {
    return profile.getEmail();
  }
  
  return null;
};

/**
 * Get basic user profile information
 */
export const getUserProfile = () => {
  if (!window.gapi?.auth2?.getAuthInstance?.()) {
    return null;
  }
  
  const user = window.gapi.auth2.getAuthInstance().currentUser.get();
  const profile = user.getBasicProfile();
  
  if (!profile) return null;
  
  return {
    id: profile.getId(),
    name: profile.getName(),
    email: profile.getEmail(),
    imageUrl: profile.getImageUrl()
  };
};
