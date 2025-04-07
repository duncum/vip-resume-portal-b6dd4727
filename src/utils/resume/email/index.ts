
import { toast } from "sonner";
import { SendResumeEmailOptions, EmailData } from './types';
import { trackEmailInSheets } from './tracking';
import { sendEmailWithService } from './sender';

/**
 * Main function to send a resume via email
 */
export const sendResumeEmail = async (options: SendResumeEmailOptions): Promise<boolean> => {
  const { recipientEmail, candidateId, resumeUrl, useConfidential = false } = options;
  
  try {
    // 1. Track this email send in Google Sheets
    await trackEmailInSheets(candidateId, recipientEmail);
    
    // 2. Send the email using Google Workspace or fallback
    const emailData: EmailData = {
      to: recipientEmail,
      subject: useConfidential ? "Confidential Resume from CRE Recruitment" : "Resume from CRE Recruitment",
      resumeUrl,
      candidateId,
      isConfidential: useConfidential
    };
    
    const success = await sendEmailWithService(emailData);
    
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
