
import { toast } from "sonner";
import { SendResumeEmailOptions, EmailData } from './types';
import { trackEmailInSheets } from './tracking';
import { sendEmailWithService } from './sender';

/**
 * Email template definitions
 */
export const EMAIL_TEMPLATES = [
  {
    id: 'standard',
    name: 'Standard Template',
    description: 'Basic resume email with download link'
  },
  {
    id: 'confidential',
    name: 'Confidential',
    description: 'Secure resume viewing with confidentiality notice'
  }
];

/**
 * Main function to send a resume via email
 */
export const sendResumeEmail = async (options: SendResumeEmailOptions): Promise<boolean> => {
  const { 
    recipientEmail, 
    candidateId, 
    resumeUrl, 
    useConfidential = false,
    templateId,
    customSubject
  } = options;
  
  try {
    // Display sending toast
    toast.loading("Sending email...");
    
    // 1. Track this email send in Google Sheets
    try {
      await trackEmailInSheets(candidateId, recipientEmail);
    } catch (trackError) {
      console.warn("Couldn't track email in sheets, but continuing:", trackError);
    }
    
    // 2. Send the email using Google Workspace or fallback
    const emailData: EmailData = {
      to: recipientEmail,
      subject: customSubject || 
              (useConfidential ? "Confidential Resume from CRE Recruitment" : "Resume from CRE Recruitment"),
      resumeUrl,
      candidateId,
      isConfidential: useConfidential || templateId === 'confidential'
    };
    
    // Log the email being sent
    console.log("Sending email from michelle@creconfidential.org to:", recipientEmail);
    
    const success = await sendEmailWithService(emailData);
    
    if (success) {
      toast.success("Resume sent to email", {
        description: `Sent to ${recipientEmail}`
      });
      return true;
    } else {
      throw new Error("Email service reported delivery failure");
    }
  } catch (error) {
    console.error("Error sending resume email:", error);
    toast.error("Failed to send resume", {
      description: "Please check your connection and try again"
    });
    return false;
  }
};
