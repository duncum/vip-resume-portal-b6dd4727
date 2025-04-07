
import { isUserAuthorized } from "@/utils/google";
import { EmailData } from './types';
import { sendViaGmail } from './gmail';
import { fallbackEmailSending } from './fallback';
import { toast } from "sonner";

/**
 * Send the email using Google Workspace API or fallback
 */
export const sendEmailWithService = async (emailData: EmailData): Promise<boolean> => {
  try {
    // First check if Google API is authorized
    const isAuthorized = await isUserAuthorized();
    
    if (!isAuthorized || !window.gapi?.client) {
      console.log("Google API not authorized, using fallback email sender");
      return fallbackEmailSending(emailData);
    }

    // Check if Gmail API is loaded
    if (!window.gapi.client.gmail) {
      try {
        // Try loading Gmail API
        console.log("Attempting to load Gmail API...");
        await window.gapi.client.load('gmail', 'v1');
        console.log("Gmail API loaded successfully");
      } catch (error) {
        console.error("Failed to load Gmail API:", error);
        
        // Check for specific Gmail API errors
        const errorMsg = String(error);
        
        // Handle API key authentication error (Gmail requires OAuth)
        if (errorMsg.includes('API_KEY_SERVICE_BLOCKED') || 
            errorMsg.includes('PERMISSION_DENIED')) {
          console.warn("Gmail requires OAuth authentication with proper scopes");
          toast.warning("Gmail API requires OAuth authentication", {
            description: "Please ensure Gmail API is enabled in your Google Cloud Console and you've logged in with OAuth"
          });
          return fallbackEmailSending(emailData);
        }
        
        return fallbackEmailSending(emailData);
      }
    }
    
    // Verify we have the correct OAuth scope for Gmail
    // Since we can't directly check scopes, we'll attempt a simple operation
    // that requires the gmail.send scope to verify permissions
    try {
      // Instead of using getProfile which doesn't exist, create a draft message
      // to test if we have proper permissions (will fail if scope is missing)
      const testEmail = createTestEmail();
      
      // This will throw an error if scope is missing
      await window.gapi.client.gmail.users.drafts?.create({
        userId: 'me',
        resource: {
          message: {
            raw: testEmail
          }
        }
      });
      
      // If we reach here without error, we have the correct scope
    } catch (error) {
      console.error("Gmail scope verification error:", error);
      const errorMsg = String(error);
      
      if (errorMsg.includes('insufficient permission') || 
          errorMsg.includes('scope') || 
          errorMsg.includes('permission')) {
        toast.warning("Gmail requires the gmail.send OAuth scope", {
          description: "Please check your OAuth consent screen configuration"
        });
        return fallbackEmailSending(emailData);
      }
    }
    
    // Attempt to send via Gmail API
    try {
      const success = await sendViaGmail(emailData);
      if (success) {
        return true;
      } else {
        console.log("Gmail API sending failed, using fallback");
        return fallbackEmailSending(emailData);
      }
    } catch (error) {
      console.error("Error sending email via Gmail API:", error);
      
      // Check for specific Gmail API errors
      const errorMsg = String(error);
      if (errorMsg.includes('Permission denied') || 
          errorMsg.includes('insufficient permission') ||
          errorMsg.includes('not authorized')) {
        toast.warning("Gmail requires specific OAuth permissions", {
          description: "Make sure Gmail API is enabled in Google Cloud Console"
        });
      }
      
      return fallbackEmailSending(emailData);
    }
  } catch (error) {
    console.error("Error in email service:", error);
    return fallbackEmailSending(emailData);
  }
};

/**
 * Create a minimal test email for scope testing
 */
function createTestEmail(): string {
  // Create simple email headers with a test subject
  const headers = [
    'Subject: SCOPE_TEST',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=utf-8'
  ];
  
  // Create minimal email content
  const email = headers.join('\r\n') + '\r\n\r\n' + 'This is a scope test.';
  
  // Encode as base64
  return btoa(unescape(encodeURIComponent(email)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}
