
import { isUserAuthorized } from "@/utils/google";
import { EmailData } from './types';
import { sendViaGmail } from './gmail';
import { fallbackEmailSending } from './fallback';

/**
 * Send the email using Google Workspace API or fallback
 */
export const sendEmailWithService = async (emailData: EmailData): Promise<boolean> => {
  try {
    // First check if Google API is authorized
    const isAuthorized = await isUserAuthorized();
    
    if (!isAuthorized || !window.gapi?.client) {
      console.warn("Google API not authorized, using fallback email sender");
      return fallbackEmailSending(emailData);
    }

    // Check if Gmail API is loaded
    if (!window.gapi.client.gmail) {
      try {
        // Try loading Gmail API
        await window.gapi.client.load('gmail', 'v1');
        console.log("Gmail API loaded successfully");
      } catch (error) {
        console.error("Failed to load Gmail API:", error);
        return fallbackEmailSending(emailData);
      }
    }
    
    // Attempt to send via Gmail API
    try {
      const success = await sendViaGmail(emailData);
      if (success) {
        return true;
      } else {
        return fallbackEmailSending(emailData);
      }
    } catch (error) {
      console.error("Error sending email via Gmail API:", error);
      return fallbackEmailSending(emailData);
    }
  } catch (error) {
    console.error("Error in email service:", error);
    return fallbackEmailSending(emailData);
  }
};
