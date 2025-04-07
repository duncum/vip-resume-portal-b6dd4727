
import { EmailData } from './types';
import { createConfidentialTemplate, createStandardTemplate } from './templates';
import { toast } from "sonner";

/**
 * Check if EmailJS credentials are available
 */
export const checkEmailJSCredentials = (): boolean => {
  const SERVICE_ID = localStorage.getItem('emailjs_service_id');
  const TEMPLATE_ID = localStorage.getItem('emailjs_template_id');
  const USER_ID = localStorage.getItem('emailjs_user_id');
  
  return !!(SERVICE_ID && TEMPLATE_ID && USER_ID &&
    SERVICE_ID !== "your_service_id" && 
    TEMPLATE_ID !== "your_template_id" && 
    USER_ID !== "your_user_id");
};

/**
 * Fallback email sending for when Gmail API is not available
 */
export const fallbackEmailSending = async (emailData: EmailData): Promise<boolean> => {
  console.log("Using fallback email sender with sender: michelle@creconfidential.org");
  
  // Check if EmailJS is available
  const emailjsAvailable = checkEmailJSCredentials();
  
  if (emailjsAvailable) {
    console.log("EmailJS credentials found, attempting to send via EmailJS");
    return sendViaEmailJS(emailData);
  } else {
    console.log("No EmailJS credentials found, using simulated email delivery");
    
    // Provide clear guidance to the user
    toast.info("Email delivery simulation", {
      description: "To send real emails, set up EmailJS credentials or configure Gmail OAuth",
      duration: 5000
    });
    
    // Simulate network latency
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Log what would be sent to a real email service
    console.log("Email would be sent with:", {
      to: emailData.to,
      from: "Michelle CRE Confidential <michelle@creconfidential.org>", 
      subject: emailData.subject,
      isConfidential: emailData.isConfidential,
      resumeUrl: emailData.resumeUrl
    });
    
    toast.success("Email delivery simulated", {
      description: "Set up EmailJS or enable Gmail OAuth for actual delivery"
    });
    
    return true;
  }
};

/**
 * Send email via EmailJS as fallback
 */
export const sendViaEmailJS = async (emailData: EmailData): Promise<boolean> => {
  try {
    console.log("Sending via EmailJS as fallback with sender: michelle@creconfidential.org");
    const SERVICE_ID = localStorage.getItem('emailjs_service_id') || "";
    const TEMPLATE_ID = localStorage.getItem('emailjs_template_id') || "";
    const USER_ID = localStorage.getItem('emailjs_user_id') || "";
    
    const API_URL = "https://api.emailjs.com/api/v1.0/email/send";
    const requestData = {
      service_id: SERVICE_ID,
      template_id: TEMPLATE_ID,
      user_id: USER_ID,
      template_params: {
        from_name: "Michelle CRE Confidential",
        from_email: "michelle@creconfidential.org",
        to_email: emailData.to,
        subject: emailData.subject,
        html_content: emailData.isConfidential 
          ? createConfidentialTemplate(emailData.resumeUrl)
          : createStandardTemplate(emailData.resumeUrl),
        resume_url: emailData.resumeUrl,
        candidate_id: emailData.candidateId
      }
    };
    
    console.log("EmailJS request prepared", { service_id: SERVICE_ID });
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestData),
    });
    
    const success = response.status === 200;
    
    if (success) {
      console.log("EmailJS delivery successful");
    } else {
      console.error("EmailJS error response:", await response.text());
    }
    
    return success;
  } catch (error) {
    console.error("Error in EmailJS:", error);
    toast.error("Failed to send email through EmailJS");
    return false;
  }
};
