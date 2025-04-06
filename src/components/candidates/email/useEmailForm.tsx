
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { sendResumeEmail, EMAIL_TEMPLATES } from "@/utils/resume/email";

interface EmailFormValues {
  email: string;
  templateId: string;
  customSubject?: string;
}

interface UseEmailFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  candidateId: string;
  resumeUrl: string;
}

export const useEmailForm = ({ open, onOpenChange, candidateId, resumeUrl }: UseEmailFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showCustomSubject, setShowCustomSubject] = useState(false);
  
  const form = useForm<EmailFormValues>({
    defaultValues: {
      email: "",
      templateId: EMAIL_TEMPLATES[0].id,
      customSubject: ""
    }
  });
  
  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      form.reset({
        email: "",
        templateId: EMAIL_TEMPLATES[0].id,
        customSubject: ""
      });
      setShowCustomSubject(false);
    }
  }, [open, form]);
  
  const onTemplateChange = (value: string) => {
    form.setValue("templateId", value);
  };
  
  const handleToggleCustomSubject = () => {
    setShowCustomSubject(!showCustomSubject);
    if (!showCustomSubject) {
      // Focus the subject input when enabled
      setTimeout(() => {
        const subjectInput = document.getElementById("custom-subject");
        if (subjectInput) subjectInput.focus();
      }, 100);
    } else {
      // Clear the custom subject when disabled
      form.setValue("customSubject", "");
    }
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (values: EmailFormValues) => {
    const { email, templateId, customSubject } = values;
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Use our email utility to send the resume
      const success = await sendResumeEmail({
        recipientEmail: email,
        candidateId,
        resumeUrl,
        templateId,
        customSubject: showCustomSubject ? customSubject : undefined
      });
      
      if (success) {
        // Close the dialog and reset form
        onOpenChange(false);
        form.reset();
      }
    } catch (error) {
      console.error("Error in email submission handler:", error);
      toast.error("Failed to send resume", {
        description: "Please try again later"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    isLoading,
    showCustomSubject,
    handleToggleCustomSubject,
    onTemplateChange,
    handleSubmit: form.handleSubmit(handleSubmit)
  };
};
