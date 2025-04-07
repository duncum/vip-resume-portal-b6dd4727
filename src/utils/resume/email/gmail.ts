
import { EmailData } from './types';
import { createEmail, createConfidentialTemplate, createStandardTemplate } from './templates';

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
    return true;
  } catch (error) {
    console.error("Error sending email via Gmail API:", error);
    return false;
  }
};
