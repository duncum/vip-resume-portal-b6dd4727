
// Handles Google user profile information

/**
 * Get the current user's email address
 */
export const getCurrentUserEmail = (): string | null => {
  try {
    if (!window.gapi) {
      console.log("gapi not loaded yet");
      return null;
    }
    
    if (!window.gapi.auth2) {
      console.log("auth2 module not loaded yet");
      return null;
    }
    
    const authInstance = window.gapi.auth2.getAuthInstance();
    if (!authInstance) {
      console.log("No auth instance available");
      return null;
    }
    
    const user = authInstance.currentUser.get();
    if (!user) {
      console.log("No current user available");
      return null;
    }
    
    const profile = user.getBasicProfile();
    
    if (profile) {
      return profile.getEmail();
    } else {
      console.log("No user profile available");
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
    if (!window.gapi) {
      console.log("gapi not loaded yet");
      return null;
    }
    
    if (!window.gapi.auth2) {
      console.log("auth2 module not loaded yet");
      return null;
    }
    
    const authInstance = window.gapi.auth2.getAuthInstance();
    if (!authInstance) {
      console.log("No auth instance available");
      return null;
    }
    
    const user = authInstance.currentUser.get();
    if (!user) {
      console.log("No current user available");
      return null;
    }
    
    const profile = user.getBasicProfile();
    
    if (!profile) {
      console.log("No user profile available");
      return null;
    }
    
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
