
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
      // If no EmailJS credentials, just simulate email sending for development
      console.log("Missing EmailJS credentials - simulating email send");
      toast.loading("Email delivery simulation");
      
      // Log what would have been sent
      console.log("Would send email:", {
        to: emailData.to,
        subject: emailData.subject,
        isConfidential: emailData.isConfidential,
        resumeUrl: emailData.resumeUrl
      });
      
      // Simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success notification
      toast.success("Email delivery simulated", {
        description: `Would be sent to ${emailData.to}`
      });
      
      return true; // This is just a simulation, so return success
    }
    
    // At this point we have EmailJS credentials, so let's try to send
    const sendingToast = toast.loading("Sending email via fallback system...");
    
    // Prepare HTML content based on confidentiality
    const htmlContent = emailData.isConfidential
      ? createConfidentialTemplate(emailData.resumeUrl)
      : createStandardTemplate(emailData.resumeUrl);
    
    // Maximum retry attempts
    const maxRetries = 3;
    let attempt = 0;
    let success = false;
    let lastError;
    
    // Try to send with retries
    while (attempt < maxRetries && !success) {
      attempt++;
      
      try {
        // Import EmailJS dynamically to avoid bundling when not needed
        const emailjs = await import('emailjs-com');
        
        // Send the email
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
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt)); // Exponential backoff
        }
      }
    }
    
    toast.dismiss(sendingToast);
    
    if (success) {
      toast.success("Email sent successfully via fallback system");
      return true;
    } else {
      console.error("All EmailJS attempts failed:", lastError);
      toast.error("Fallback email system failed after multiple attempts", {
        description: "Please check your email configuration"
      });
      return false;
    }
  } catch (error) {
    console.error("Critical error in fallback email sending:", error);
    toast.error("Critical email system failure", {
      description: "Please check your network connection and try again"
    });
    return false;
  }
};
