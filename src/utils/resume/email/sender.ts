
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
    // First check if Google API is authorized
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
        try {
          // Try loading Gmail API with timeout protection
          const loadGmailPromise = window.gapi.client.load('gmail', 'v1');
          await Promise.race([
            loadGmailPromise,
            new Promise((_, reject) => setTimeout(() => reject(new Error("Gmail API loading timed out")), 5000))
          ]);
          console.log("Gmail API loaded successfully");
        } catch (error) {
          console.warn("Could not load Gmail API, falling back:", error);
          return fallbackEmailSending(emailData);
        }
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
