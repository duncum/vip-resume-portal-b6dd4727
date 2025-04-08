
import { EmailData } from './types';
import { createEmail, createConfidentialTemplate, createStandardTemplate } from './templates';
import { toast } from "sonner";

/**
 * Send email via Gmail API
 */
export const sendViaGmail = async (emailData: EmailData): Promise<boolean> => {
  try {
    // Check if Gmail API is loaded
    if (!window.gapi.client.gmail) {
      console.warn("Gmail API not available");
      return false;
    }
    
    // Show sending toast
    const sendingToast = toast.loading("Sending email via Gmail...");
    
    try {
      // Prepare HTML content based on confidentiality
      const htmlContent = emailData.isConfidential
        ? createConfidentialTemplate(emailData.resumeUrl)
        : createStandardTemplate(emailData.resumeUrl);
      
      // Encode the email in base64
      const email = createEmail({
        to: emailData.to,
        subject: emailData.subject,
        html: htmlContent
      });
      
      // Send the email
      const response = await window.gapi.client.gmail.users.messages.send({
        userId: 'me',
        resource: {
          raw: email
        }
      });
      
      console.log("Email sent via Gmail API:", response);
      toast.dismiss(sendingToast);
      
      // Check if response contains a message ID
      if (response.result && response.result.id) {
        toast.success("Email sent successfully via Gmail");
        return true;
      } else {
        throw new Error("Gmail API returned success but no message ID");
      }
    } catch (error) {
      toast.dismiss(sendingToast);
      console.error("Error in Gmail API send:", error);
      
      // Provide specific error feedback 
      const errorMsg = String(error);
      if (errorMsg.includes("The user does not have sufficient permissions")) {
        toast.error("Gmail permission error", {
          description: "Your Google account doesn't have permission to send emails"
        });
      } else if (errorMsg.includes("Rate Limit Exceeded")) {
        toast.error("Gmail rate limit exceeded", {
          description: "Too many emails sent. Please try again later."
        });
      } else {
        toast.error("Failed to send via Gmail", {
          description: "Switching to alternative sending method"
        });
      }
      return false;
    }
  } catch (error) {
    console.error("Unexpected error sending email via Gmail API:", error);
    return false;
  }
};
