
import { EmailData } from './types';
import { createConfidentialTemplate, createStandardTemplate } from './templates';

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
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Log what would be sent to a real email service
  console.log("Email would be sent with:", emailData);
  
  const emailjsAvailable = checkEmailJSCredentials();
  
  if (emailjsAvailable) {
    return sendViaEmailJS(emailData);
  }
  
  return true;
};

/**
 * Send email via EmailJS as fallback
 */
export const sendViaEmailJS = async (emailData: EmailData): Promise<boolean> => {
  try {
    const SERVICE_ID = localStorage.getItem('emailjs_service_id') || "";
    const TEMPLATE_ID = localStorage.getItem('emailjs_template_id') || "";
    const USER_ID = localStorage.getItem('emailjs_user_id') || "";
    
    const API_URL = "https://api.emailjs.com/api/v1.0/email/send";
    const requestData = {
      service_id: SERVICE_ID,
      template_id: TEMPLATE_ID,
      user_id: USER_ID,
      template_params: {
        to_email: emailData.to,
        subject: emailData.subject,
        html_content: emailData.isConfidential 
          ? createConfidentialTemplate(emailData.resumeUrl)
          : createStandardTemplate(emailData.resumeUrl),
        resume_url: emailData.resumeUrl,
        candidate_id: emailData.candidateId
      }
    };
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestData),
    });
    
    return response.status === 200;
  } catch (error) {
    console.error("Error in EmailJS:", error);
    return false;
  }
};
