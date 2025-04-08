
import { EmailData } from './types';
import { createEmail, createConfidentialTemplate, createStandardTemplate } from './templates';
import { toast } from "sonner";

/**
 * Enhanced EmailJS sender (fallback when Gmail API is unavailable)
 * With added retry logic and error handling
 */
export const fallbackEmailSending = async (emailData: EmailData): Promise<boolean> => {
  try {
    // Check if we have EmailJS credentials
    const serviceId = localStorage.getItem('emailjs_service_id');
    const templateId = localStorage.getItem('emailjs_template_id');
    const userId = localStorage.getItem('emailjs_user_id');

    if (!serviceId || !templateId || !userId) {
      // If no EmailJS credentials, show error
      console.error("EmailJS credentials not found");
      toast.error("Backup email system not configured", {
        description: "Please set up EmailJS credentials in the admin panel"
      });
      return false;
    }
    
    const sendingToast = toast.loading("Sending email via fallback system...");
    
    // Prepare HTML content based on confidentiality
    const htmlContent = emailData.isConfidential
      ? createConfidentialTemplate(emailData.resumeUrl)
      : createStandardTemplate(emailData.resumeUrl);
    
    // Maximum retry attempts
    const maxRetries = 2;
    let attempt = 0;
    let success = false;
    let lastError;
    
    // Try to send with retries
    while (attempt < maxRetries && !success) {
      attempt++;
      
      try {
        // Import EmailJS dynamically to avoid bundling when not needed
        const emailjs = await import('emailjs-com');
        
        console.log(`EmailJS attempt ${attempt} with credentials:`, {
          serviceId,
          templateId,
          userId: userId.substring(0, 5) + '...' // Log partial ID for debugging
        });
        
        // Send the email with specific template parameters
        const response = await emailjs.send(
          serviceId,
          templateId,
          {
            to_email: emailData.to,
            subject: emailData.subject,
            message_html: htmlContent,
            resume_url: emailData.resumeUrl
          },
          userId
        );
        
        console.log("EmailJS response:", response);
        
        if (response.status === 200) {
          success = true;
        } else {
          throw new Error(`EmailJS returned status ${response.status}`);
        }
      } catch (error) {
        lastError = error;
        console.warn(`EmailJS attempt ${attempt} failed:`, error);
        
        // Only wait if we're going to retry
        if (attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 1000)); // Brief delay before retry
        }
      }
    }
    
    toast.dismiss(sendingToast);
    
    if (success) {
      toast.success("Email sent successfully via fallback system");
      return true;
    } else {
      console.error("All EmailJS attempts failed:", lastError);
      toast.error("Email delivery failed", {
        description: "Please verify your EmailJS configuration"
      });
      return false;
    }
  } catch (error) {
    console.error("Critical error in fallback email sending:", error);
    toast.error("Email system failure", {
      description: "Please check your configuration and try again"
    });
    return false;
  }
};
