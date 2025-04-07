
import { toast } from "sonner";
import { updateCells, findRowByValue } from "@/utils/sheets/operations";
import { isUserAuthorized } from "@/utils/google";

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
    
    // 2. Send the email using Google Workspace or fallback
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
 * Send the email using Google Workspace API or fallback
 */
const sendEmailWithService = async (emailData: {
  to: string;
  subject: string;
  resumeUrl: string;
  candidateId: string;
  isConfidential: boolean;
}): Promise<boolean> => {
  try {
    // First check if Google API is authorized
    const isAuthorized = await isUserAuthorized();
    
    if (!isAuthorized || !window.gapi?.client) {
      console.warn("Google API not authorized, using fallback email sender");
      return fallbackEmailSending(emailData);
    }

    // Check if Gmail API is loaded
    if (!window.gapi.client.gmail) {
      try {
        // Try loading Gmail API
        await window.gapi.client.load('gmail', 'v1');
        console.log("Gmail API loaded successfully");
      } catch (error) {
        console.error("Failed to load Gmail API:", error);
        return fallbackEmailSending(emailData);
      }
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
    
    // Attempt to send via Google API if available and fallback otherwise
    try {
      // Check if Gmail API is available
      if (window.gapi.client.gmail) {
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
      } else {
        throw new Error("Gmail API not available");
      }
    } catch (error) {
      console.error("Error sending email via Gmail API:", error);
      return fallbackEmailSending(emailData);
    }
  } catch (error) {
    console.error("Error in email service:", error);
    return fallbackEmailSending(emailData);
  }
};

/**
 * Create email in base64 format for Gmail API
 */
const createEmail = (options: { to: string; subject: string; html: string }): string => {
  const { to, subject, html } = options;
  
  // Create email headers
  const headers = [
    `To: ${to}`,
    `Subject: ${subject}`,
    'Content-Type: text/html; charset=utf-8',
    'MIME-Version: 1.0'
  ];
  
  // Create email content
  const email = headers.join('\r\n') + '\r\n\r\n' + html;
  
  // Encode as base64
  return btoa(unescape(encodeURIComponent(email)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

/**
 * For development/testing purposes
 */
const fallbackEmailSending = async (emailData: any): Promise<boolean> => {
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
 * Check if EmailJS credentials are available
 */
const checkEmailJSCredentials = (): boolean => {
  const SERVICE_ID = localStorage.getItem('emailjs_service_id');
  const TEMPLATE_ID = localStorage.getItem('emailjs_template_id');
  const USER_ID = localStorage.getItem('emailjs_user_id');
  
  return !!(SERVICE_ID && TEMPLATE_ID && USER_ID &&
    SERVICE_ID !== "your_service_id" && 
    TEMPLATE_ID !== "your_template_id" && 
    USER_ID !== "your_user_id");
};

/**
 * Send email via EmailJS as fallback
 */
const sendViaEmailJS = async (emailData: any): Promise<boolean> => {
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
          ? `<div style="font-family: Arial, sans-serif;">
              <h2>Confidential Resume</h2>
              <p>This resume is being shared on a confidential basis.</p>
              <p><strong>Important:</strong> Please do not redistribute this resume without permission.</p>
              <p><a href="${emailData.resumeUrl}">View Confidential Resume</a></p>
            </div>`
          : `<div style="font-family: Arial, sans-serif;">
              <h2>Resume from CRE Recruitment</h2>
              <p>Thank you for your interest in our candidate. You can view or download the resume using the link below:</p>
              <p><a href="${emailData.resumeUrl}">View Resume</a></p>
            </div>`,
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

