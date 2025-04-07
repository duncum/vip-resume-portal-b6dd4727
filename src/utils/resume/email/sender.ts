
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
        
        // Check for Gmail API key blocked error (API_KEY_SERVICE_BLOCKED)
        const errorMsg = String(error);
        if (errorMsg.includes('API_KEY_SERVICE_BLOCKED') || 
            errorMsg.includes('PERMISSION_DENIED') ||
            errorMsg.includes('gmail method') ||
            errorMsg.includes('blocked')) {
          console.log("Gmail API cannot be used with API key only, requires OAuth. Using fallback.");
          toast.warning("Gmail requires OAuth authentication", {
            description: "Using alternative email service instead"
          });
          return fallbackEmailSending(emailData);
        }
        
        // Check for other common Gmail API errors
        if (errorMsg.includes('Gmail API has not been used') || 
            errorMsg.includes('disabled') ||
            errorMsg.includes('SERVICE_DISABLED')) {
          console.log("Gmail API is disabled in Google Cloud project, using fallback");
          toast.warning("Gmail API not enabled", {
            description: "Using alternative email service instead"
          });
        }
        
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
          errorMsg.includes('PERMISSION_DENIED') ||
          errorMsg.includes('API_KEY_SERVICE_BLOCKED')) {
        toast.warning("Gmail API requires OAuth authentication", {
          description: "Using alternative email service instead"
        });
      }
      
      return fallbackEmailSending(emailData);
    }
  } catch (error) {
    console.error("Error in email service:", error);
    return fallbackEmailSending(emailData);
  }
};
