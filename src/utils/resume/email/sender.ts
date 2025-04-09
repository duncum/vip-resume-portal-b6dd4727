import { isUserAuthorized } from "@/utils/google";
import { EmailData } from './types';
import { sendViaGmail } from './gmail';
import { fallbackEmailSending } from './fallback';
import { toast } from "sonner";

/**
 * Send the email using Google Workspace API or fallback with enhanced reliability
 */
export const sendEmailWithService = async (emailData: EmailData): Promise<boolean> => {
  // Set up a timeout promise to ensure we don't hang forever
  const timeoutPromise = new Promise<boolean>((resolve) => {
    setTimeout(() => {
      console.warn("Email sending operation timed out, trying fallback");
      resolve(false);
    }, 15000); // 15 seconds timeout
  });

  try {
    // Check if the fallback method is configured
    const hasEmailJSFallback = 
      localStorage.getItem('emailjs_service_id') && 
      localStorage.getItem('emailjs_template_id') && 
      localStorage.getItem('emailjs_user_id');
    
    // If EmailJS is configured and we're in API key only mode (no client ID),
    // just use the fallback method directly without trying Gmail
    const clientId = localStorage.getItem('google_client_id');
    if (hasEmailJSFallback && !clientId) {
      console.log("API key only mode with EmailJS configured - using fallback directly");
      return fallbackEmailSending(emailData);
    }
    
    // Check if we're in API key only mode
    if (!clientId) {
      console.log("API key only mode - skipping Gmail API, using fallback directly");
      return fallbackEmailSending(emailData);
    }
    
    // Otherwise try OAuth method if authorized
    const isAuthorizedPromise = isUserAuthorized().catch(err => {
      console.warn("Error checking authorization:", err);
      return false;
    });
    
    // Race the authorization check against the timeout
    const isAuthorized = await Promise.race([isAuthorizedPromise, timeoutPromise]);
    
    if (!isAuthorized || !window.gapi?.client) {
      console.log("Google API not available, using fallback email sender");
      return fallbackEmailSending(emailData);
    }

    // Try to use Gmail if available
    try {
      // Check if Gmail API is already loaded
      if (!window.gapi.client.gmail) {
        console.log("Gmail API not loaded, using fallback email sender");
        return fallbackEmailSending(emailData);
      }
      
      // Gmail API is loaded, attempt to send email
      // But wrap in a timeout to prevent hanging
      const sendGmailPromise = sendViaGmail(emailData);
      const gmailResult = await Promise.race([sendGmailPromise, timeoutPromise]);
      
      if (gmailResult === true) {
        return true; // Successfully sent via Gmail
      }
      
      // If we got here, either sendViaGmail returned false or the timeout was triggered
      console.log("Gmail API failed or timed out, using fallback");
      return fallbackEmailSending(emailData);
      
    } catch (error) {
      console.warn("Error in Gmail sending flow:", error);
      
      // Check for specific Gmail auth errors
      const errorMessage = String(error);
      if (errorMessage.includes("insufficient authentication scopes") || 
          errorMessage.includes("Request had insufficient authentication") ||
          errorMessage.includes("scope") ||
          errorMessage.includes("412") ||
          errorMessage.includes("Gmail_API")) {
        console.error("Gmail permission error detected:", error);
        toast.error("Gmail permission error", {
          description: "Your Google account doesn't have the right permissions to send emails. Using backup method."
        });
      }
      
      return fallbackEmailSending(emailData);
    }
  } catch (error) {
    console.error("Critical error in email service:", error);
    // Even if we encounter a critical error, try the fallback as a last resort
    try {
      return fallbackEmailSending(emailData);
    } catch (finalError) {
      console.error("Both primary and fallback email systems failed:", finalError);
      toast.error("All email systems failed", {
        description: "Please check your configuration and try again later"
      });
      return false;
    }
  }
};
