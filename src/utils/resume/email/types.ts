
/**
 * Interface for the email data needed to send a resume
 */
export interface SendResumeEmailData {
  recipientEmail: string;
  candidateId: string;
  resumeUrl: string;
}

/**
 * Response interface for email sending operations
 */
export interface EmailSendResponse {
  success: boolean;
  message?: string;
}
