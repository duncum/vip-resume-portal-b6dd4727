
/**
 * Types for email functionality
 */

export interface SendResumeEmailOptions {
  recipientEmail: string;
  candidateId: string;
  resumeUrl: string;
  useConfidential?: boolean;
  templateId?: string;
  customSubject?: string;
}

export interface EmailContent {
  to: string;
  subject: string;
  html: string;
}

export interface EmailData {
  to: string;
  subject: string;
  resumeUrl: string;
  candidateId: string;
  isConfidential: boolean;
}
