
/**
 * Interface for the email data needed to send a resume
 */
export interface SendResumeEmailData {
  recipientEmail: string;
  candidateId: string;
  resumeUrl: string;
  templateId?: string;      // Optional template ID to use
  customSubject?: string;   // Optional custom subject line
}

/**
 * Response interface for email sending operations
 */
export interface EmailSendResponse {
  success: boolean;
  message?: string;
}
