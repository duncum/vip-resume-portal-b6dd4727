
import { EmailData } from './types';
import { createEmail, createConfidentialTemplate, createStandardTemplate } from './templates';
import { toast } from "sonner";

/**
 * Test EmailJS configuration with a simple message
 * Returns a promise that resolves to true if successful, false otherwise
 */
export const testEmailJSConfig = async (): Promise<boolean> => {
  try {
    // Check if we have EmailJS credentials
    const serviceId = localStorage.getItem('emailjs_service_id');
    const templateId = localStorage.getItem('emailjs_template_id');
    const userId = localStorage.getItem('emailjs_user_id');

    if (!serviceId || !templateId || !userId) {
      toast.error("EmailJS credentials not found", {
        description: "Please set up EmailJS credentials first"
      });
      return false;
    }
    
    const testingToast = toast.loading("Testing EmailJS configuration...");
    
    try {
      // Import EmailJS dynamically to avoid bundling when not needed
      const emailjs = await import('emailjs-com');
      
      console.log("Testing EmailJS with credentials:", {
        serviceId,
        templateId,
        userId: userId.substring(0, 5) + '...' // Log partial ID for debugging
      });
      
      // Send a test email with minimal parameters
      const response = await emailjs.send(
        serviceId,
        templateId,
        {
          // These parameters must match the template variables in EmailJS
          to_email: "test@example.com", // This will be ignored in test mode
          subject: "EmailJS Test",
          message_html: "<p>This is a test email from the resume application.</p>",
          resume_url: "https://example.com/test-resume"
        },
        userId
      );
      
      toast.dismiss(testingToast);
      
      if (response.status === 200) {
        toast.success("EmailJS configuration is working correctly");
        return true;
      } else {
        toast.error(`EmailJS test failed with status ${response.status}`);
        return false;
      }
    } catch (error) {
      toast.dismiss(testingToast);
      console.error("EmailJS test failed:", error);
      
      // Check for specific error types
      const errorMsg = String(error);
      if (errorMsg.includes("Invalid template ID")) {
        toast.error("Invalid EmailJS template ID", {
          description: "Please check your template ID and try again"
        });
      } else if (errorMsg.includes("Invalid service ID")) {
        toast.error("Invalid EmailJS service ID", {
          description: "Please check your service ID and try again"
        });
      } else if (errorMsg.includes("Invalid user ID")) {
        toast.error("Invalid EmailJS user ID (Public Key)", {
          description: "Please check your user ID and try again"
        });
      } else {
        toast.error("EmailJS test failed", {
          description: errorMsg.substring(0, 100)
        });
      }
      return false;
    }
  } catch (error) {
    console.error("Critical error in EmailJS test:", error);
    toast.error("EmailJS test failed", {
      description: "Unexpected error occurred"
    });
    return false;
  }
};

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
