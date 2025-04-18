
import { useState } from "react";
import { toast } from "sonner";
import { sendResumeEmail } from "@/utils/resume/email";
import { isUserAuthorized } from "@/utils/google";

interface UseSimpleEmailFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  candidateId: string;
  resumeUrl: string;
}

export const useSimpleEmailForm = ({ open, onOpenChange, candidateId, resumeUrl }: UseSimpleEmailFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [isConfidential, setIsConfidential] = useState(false);
  const [showGmailHelp, setShowGmailHelp] = useState(false);
  
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter an email address");
      return;
    }
    
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Check if we're in API key only mode
      const clientId = localStorage.getItem('google_client_id');
      
      // Only check Gmail integration if not in API key only mode
      if (clientId) {
        const isAuthorized = await isUserAuthorized();
        if (isAuthorized && !showGmailHelp) {
          setShowGmailHelp(true);
        }
      }
      
      const success = await sendResumeEmail({
        recipientEmail: email,
        candidateId,
        resumeUrl,
        useConfidential: isConfidential
      });
      
      if (success) {
        onOpenChange(false);
        setEmail("");
        setIsConfidential(false);
      }
    } catch (error) {
      console.error("Error sending email:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    email,
    setEmail,
    isConfidential,
    setIsConfidential,
    showGmailHelp,
    handleSubmit
  };
};
