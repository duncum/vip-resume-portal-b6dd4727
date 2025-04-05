
// Handles Google user profile information

/**
 * Get the current user's email address
 */
export const getCurrentUserEmail = (): string | null => {
  try {
    if (!window.gapi?.auth2?.getAuthInstance?.()) {
      return null;
    }
    
    const authInstance = window.gapi.auth2.getAuthInstance();
    if (!authInstance) return null;
    
    const user = authInstance.currentUser.get();
    if (!user) return null;
    
    const profile = user.getBasicProfile();
    
    if (profile) {
      return profile.getEmail();
    }
  } catch (error) {
    console.error('Error getting user email:', error);
  }
  
  return null;
};

/**
 * Get basic user profile information
 */
export const getUserProfile = () => {
  try {
    if (!window.gapi?.auth2?.getAuthInstance?.()) {
      return null;
    }
    
    const authInstance = window.gapi.auth2.getAuthInstance();
    if (!authInstance) return null;
    
    const user = authInstance.currentUser.get();
    if (!user) return null;
    
    const profile = user.getBasicProfile();
    
    if (!profile) return null;
    
    return {
      id: profile.getId(),
      name: profile.getName(),
      email: profile.getEmail(),
      imageUrl: profile.getImageUrl()
    };
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
};
