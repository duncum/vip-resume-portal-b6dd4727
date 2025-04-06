
import { toast } from "sonner";
import { updateCells, findRowByValue } from "@/utils/sheets/operations";

interface SendResumeEmailOptions {
  recipientEmail: string;
  candidateId: string;
  resumeUrl: string;
  useConfidential?: boolean;
}

/**
 * Simple function to send a resume via email
 */
export const sendResumeEmail = async (options: SendResumeEmailOptions): Promise<boolean> => {
  const { recipientEmail, candidateId, resumeUrl, useConfidential = false } = options;
  
  try {
    // 1. Track this email send in Google Sheets
    await trackEmailInSheets(candidateId, recipientEmail);
    
    // 2. Send the email using EmailJS (or fallback for development)
    const success = await sendEmailWithService({
      to: recipientEmail,
      subject: useConfidential ? "Confidential Resume from CRE Recruitment" : "Resume from CRE Recruitment",
      resumeUrl,
      candidateId,
      isConfidential: useConfidential
    });
    
    if (success) {
      toast.success("Resume sent to email", {
        description: "Please check your inbox shortly"
      });
      return true;
    } else {
      throw new Error("Failed to send email");
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
 * Track the email in Google Sheets
 */
const trackEmailInSheets = async (candidateId: string, recipientEmail: string): Promise<boolean> => {
  try {
    // Check if Google API is available
    if (!window.gapi || !window.gapi.client || !window.gapi.client.sheets) {
      console.warn("Google Sheets API not available, skipping email tracking");
      return false;
    }
    
    // Get spreadsheet ID from local storage or default
    const spreadsheetId = localStorage.getItem('google_spreadsheet_id') || "1RICk5q_nQr8JHKvlYi-1tdlVwzM57UGbRdDNOdMwOFk";
    
    if (!spreadsheetId) {
      console.warn("No spreadsheet ID available, skipping email tracking");
      return false;
    }
    
    // Find the candidate row by ID
    const rowIndex = await findRowByValue(
      spreadsheetId,
      "Candidates",
      "A:A", // Search in first column where IDs are stored
      candidateId
    );
    
    if (rowIndex === -1) {
      console.warn(`Candidate with ID ${candidateId} not found in sheet`);
      return false;
    }
    
    // Update the candidate row with email tracking information
    const timestamp = new Date().toISOString();
    
    const success = await updateCells(
      spreadsheetId,
      `Candidates!P${rowIndex}:Q${rowIndex}`,
      [[recipientEmail, timestamp]]
    );
    
    if (success) {
      console.log(`Resume share tracked for candidate ${candidateId}`);
    }
    
    return success;
  } catch (error) {
    console.error("Error tracking email in Google Sheets:", error);
    return false;
  }
};

/**
 * Send the email using EmailJS or fallback
 */
const sendEmailWithService = async (emailData: {
  to: string;
  subject: string;
  resumeUrl: string;
  candidateId: string;
  isConfidential: boolean;
}): Promise<boolean> => {
  try {
    // Get EmailJS credentials from localStorage (or use defaults for demo)
    const SERVICE_ID = localStorage.getItem('emailjs_service_id') || "your_service_id";
    const TEMPLATE_ID = localStorage.getItem('emailjs_template_id') || "your_template_id";
    const USER_ID = localStorage.getItem('emailjs_user_id') || "your_user_id";
    
    // Check if we have valid credentials
    if (SERVICE_ID === "your_service_id" || TEMPLATE_ID === "your_template_id" || USER_ID === "your_user_id") {
      console.warn("Using fallback email sending because EmailJS credentials not set");
      return fallbackEmailSending(emailData);
    }
    
    // Prepare a simple HTML template
    const htmlContent = emailData.isConfidential
      ? `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Confidential Resume</h2>
          <p>This resume is being shared on a confidential basis.</p>
          <div style="background-color: #fff4e5; border-left: 4px solid #daa520; padding: 12px; margin: 15px 0;">
            <p style="margin: 0; color: #333;"><strong>Important:</strong> Please do not redistribute this resume without permission.</p>
          </div>
          <p><a href="${emailData.resumeUrl}" style="display: inline-block; background-color: #daa520; color: #000; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">View Confidential Resume</a></p>
        </div>`
      : `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Resume from CRE Recruitment</h2>
          <p>Thank you for your interest in our candidate. You can view or download the resume using the link below:</p>
          <p><a href="${emailData.resumeUrl}" style="display: inline-block; background-color: #daa520; color: #000; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">View Resume</a></p>
        </div>`;
    
    // Send email using EmailJS
    const API_URL = "https://api.emailjs.com/api/v1.0/email/send";
    const requestData = {
      service_id: SERVICE_ID,
      template_id: TEMPLATE_ID,
      user_id: USER_ID,
      template_params: {
        to_email: emailData.to,
        subject: emailData.subject,
        html_content: htmlContent,
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
    console.error("Error in email service:", error);
    return false;
  }
};

/**
 * For development/testing purposes
 */
const fallbackEmailSending = async (emailData: any): Promise<boolean> => {
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Log what would be sent to a real email service
  console.log("Email would be sent with:", emailData);
  
  return true;
};
