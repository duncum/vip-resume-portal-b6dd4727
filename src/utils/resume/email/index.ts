
import { toast } from "sonner";
import { prepareEmailContent, sendEmailViaAPI } from "./sender";
import { trackResumeShare } from "./tracking";
import { SendResumeEmailData } from "./types";

/**
 * Sends the resume to the specified email address
 * 
 * @param data Email data including recipient, candidate ID, and resume URL
 * @returns Promise resolving to success or error
 */
export const sendResumeEmail = async (data: SendResumeEmailData): Promise<boolean> => {
  const { recipientEmail, candidateId, resumeUrl } = data;
  
  try {
    // Track this share in our tracking systems
    await trackResumeShare(candidateId, recipientEmail);
    
    // Prepare the email content
    const emailContent = prepareEmailContent(recipientEmail, resumeUrl, candidateId);
    
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

// Re-export types
export * from "./types";
