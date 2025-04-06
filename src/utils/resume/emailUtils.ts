
import { trackDownload } from "@/utils/ipTracker";
import { toast } from "sonner";
import { API_KEY } from "@/utils/google";
import { SPREADSHEET_ID } from "@/utils/sheets";

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
    // Track the download/email action in our local tracking system
    trackDownload(candidateId);
    
    // Also record this action in Google Sheets
    await recordResumeShareToCandidatesSheet(candidateId, recipientEmail);
    
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
    
    // Send email using EmailJS
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
 * Record resume share activity in the Candidates sheet
 * 
 * @param candidateId The ID of the candidate
 * @param recipientEmail Email of the recipient 
 */
const recordResumeShareToCandidatesSheet = async (
  candidateId: string, 
  recipientEmail: string
): Promise<boolean> => {
  try {
    // Check if Google API is available
    if (!window.gapi || !window.gapi.client || !window.gapi.client.sheets) {
      console.warn("Google Sheets API not available, skipping share tracking");
      return false;
    }
    
    // Get spreadsheet ID from local storage or config
    const spreadsheetId = 
      localStorage.getItem('google_spreadsheet_id') || 
      SPREADSHEET_ID;
    
    if (!spreadsheetId) {
      console.warn("No spreadsheet ID available, skipping share tracking");
      return false;
    }
    
    // First, get the candidate row by searching for the ID in the Candidates sheet
    const response = await window.gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Candidates!A:A", // Search in first column where IDs are stored
    });
    
    const values = response.result.values || [];
    let rowIndex = -1;
    
    // Find the row with the matching candidate ID
    for (let i = 0; i < values.length; i++) {
      if (values[i][0] === candidateId) {
        rowIndex = i + 1; // Sheets rows are 1-indexed
        break;
      }
    }
    
    if (rowIndex === -1) {
      console.warn(`Candidate with ID ${candidateId} not found in sheet`);
      return false;
    }
    
    // Determine which columns to update (assuming we add these columns to the sheet)
    // We'll update the "LastEmailedTo" and "LastEmailedDate" columns
    // Assuming these might be columns P and Q (adjust based on your sheet structure)
    const timestamp = new Date().toISOString();
    
    // Update the candidate row with email tracking information
    // Using the append method which is available in the API
    await window.gapi.client.sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `Candidates!P${rowIndex}:Q${rowIndex}`,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "OVERWRITE",
      resource: {
        values: [[recipientEmail, timestamp]]
      }
    });
    
    console.log(`Resume share recorded for candidate ${candidateId}`);
    return true;
  } catch (error) {
    console.error("Error recording resume share in Google Sheets:", error);
    // Don't throw here - this is a non-critical operation
    return false;
  }
};

/**
 * Send email using EmailJS
 */
const sendEmailViaAPI = async (emailData: any): Promise<{success: boolean, message?: string}> => {
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
const fallbackEmailSending = async (emailData: any): Promise<{success: boolean, message?: string}> => {
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Log what would be sent to a real email service
  console.log("Email would be sent with:", emailData);
  
  return { success: true };
};
