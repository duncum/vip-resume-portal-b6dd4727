
import { toast } from "sonner";
import { EmailSendResponse } from "./types";

/**
 * Send email using EmailJS
 */
export const sendEmailViaAPI = async (emailData: any): Promise<EmailSendResponse> => {
  try {
    // For this example, we'll use EmailJS as it works directly from frontend
    const API_URL = "https://api.emailjs.com/api/v1.0/email/send";
    
    // Get EmailJS credentials from localStorage (or use defaults for demo)
    const SERVICE_ID = localStorage.getItem('emailjs_service_id') || "your_service_id";
    const TEMPLATE_ID = localStorage.getItem('emailjs_template_id') || "your_template_id";
    const USER_ID = localStorage.getItem('emailjs_user_id') || "your_user_id";
    
    // Check if we have valid credentials
    if (SERVICE_ID === "your_service_id" || TEMPLATE_ID === "your_template_id" || USER_ID === "your_user_id") {
      console.warn("Using fallback email sending because EmailJS credentials not set");
      return fallbackEmailSending(emailData);
    }
    
    const requestData = {
      service_id: SERVICE_ID,
      template_id: TEMPLATE_ID,
      user_id: USER_ID,
      template_params: {
        to_email: emailData.to,
        subject: emailData.subject,
        message: emailData.text,
        resume_url: emailData.resumeUrl,
        candidate_id: emailData.candidateId
      }
    };
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });
    
    // For EmailJS, a 200 status means the request was accepted
    if (response.status === 200) {
      return { success: true };
    } else {
      const errorData = await response.json();
      return { 
        success: false, 
        message: errorData.error || "Failed to send email" 
      };
    }
  } catch (error) {
    console.error("Error in email API call:", error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : "Unknown error occurred" 
    };
  }
};

/**
 * For development/testing purposes
 * This fallback will be used if the email API credentials are not set
 */
export const fallbackEmailSending = async (emailData: any): Promise<EmailSendResponse> => {
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Log what would be sent to a real email service
  console.log("Email would be sent with:", emailData);
  
  return { success: true };
};

/**
 * Prepare email content for sending
 */
export const prepareEmailContent = (recipientEmail: string, resumeUrl: string, candidateId: string) => {
  return {
    to: recipientEmail,
    subject: "Resume from CRE Recruitment",
    text: `You can view the resume at: ${resumeUrl}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Your Requested Resume</h2>
        <p>Thank you for your interest in our candidate. You can view or download the resume using the link below:</p>
        <p><a href="${resumeUrl}" style="display: inline-block; background-color: #daa520; color: #000; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">View Resume</a></p>
        <p>If you have any questions, please contact us.</p>
        <p>Best regards,<br>CRE Recruitment Team</p>
      </div>
    `,
    candidateId: candidateId,
    resumeUrl
  };
};
