
import { trackDownload } from "@/utils/ipTracker";
import { toast } from "sonner";

/**
 * Interface for the email data needed to send a resume
 */
interface SendResumeEmailData {
  recipientEmail: string;
  candidateId: string;
  resumeUrl: string;
}

/**
 * Sends the resume to the specified email address
 * 
 * @param data Email data including recipient, candidate ID, and resume URL
 * @returns Promise resolving to success or error
 */
export const sendResumeEmail = async (data: SendResumeEmailData): Promise<boolean> => {
  const { recipientEmail, candidateId, resumeUrl } = data;
  
  try {
    // Track the download/email action
    trackDownload(candidateId);
    
    // Prepare the email content
    const emailContent = {
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
      candidateId: candidateId
    };
    
    // Send email using a third-party service
    const response = await sendEmailViaAPI(emailContent);
    
    if (response.success) {
      toast.success("Resume sent to your email", {
        description: "Please check your inbox shortly"
      });
      return true;
    } else {
      throw new Error(response.message || "Failed to send email");
    }
  } catch (error) {
    console.error("Error sending resume email:", error);
    toast.error("Failed to send resume", {
      description: "Please try again later"
    });
    return false;
  }
};

/**
 * Send email using a third-party email API service
 * 
 * Note: Replace this with your preferred email service (SendGrid, Mailgun, etc.)
 */
const sendEmailViaAPI = async (emailData: any): Promise<{success: boolean, message?: string}> => {
  try {
    // For this example, we'll use EmailJS as it works directly from frontend
    // API endpoint for your chosen email service
    const API_URL = "https://api.emailjs.com/api/v1.0/email/send";
    
    // Replace these with your actual EmailJS credentials
    const SERVICE_ID = "your_service_id";  // Get this from EmailJS dashboard
    const TEMPLATE_ID = "your_template_id";  // Get this from EmailJS dashboard
    const USER_ID = "your_user_id";  // Get this from EmailJS dashboard
    
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
const fallbackEmailSending = async (emailData: any): Promise<{success: boolean, message?: string}> => {
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Log what would be sent to a real email service
  console.log("Email would be sent with:", emailData);
  
  return { success: true };
};
