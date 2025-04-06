
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Send, Mail } from "lucide-react";
import { toast } from "sonner";
import { sendResumeEmail, EMAIL_TEMPLATES } from "@/utils/resume/email";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";

interface EmailResumeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  candidateId: string;
  resumeUrl: string;
}

interface EmailFormValues {
  email: string;
  templateId: string;
  customSubject?: string;
}

const EmailResumeDialog = ({ 
  open, 
  onOpenChange,
  candidateId,
  resumeUrl
}: EmailResumeDialogProps) => {
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
  
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Email Resume</DialogTitle>
          <DialogDescription>
            Enter your email address to receive this candidate's resume.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      disabled={isLoading}
                      required
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="templateId"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Email template</FormLabel>
                  <Select 
                    onValueChange={onTemplateChange} 
                    defaultValue={field.value}
                    disabled={isLoading}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a template" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {EMAIL_TEMPLATES.map((template) => (
                        <SelectItem 
                          key={template.id} 
                          value={template.id}
                        >
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            
            <div className="flex items-center space-x-2">
              <Button
                type="button" 
                variant="outline" 
                size="sm"
                onClick={handleToggleCustomSubject}
                disabled={isLoading}
              >
                {showCustomSubject ? "Use default subject" : "Customize subject"}
              </Button>
            </div>
            
            {showCustomSubject && (
              <FormField
                control={form.control}
                name="customSubject"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Custom subject line</FormLabel>
                    <FormControl>
                      <Input
                        id="custom-subject"
                        placeholder="Enter custom email subject"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
            
            <DialogFooter className="pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isLoading} 
                className="bg-gold text-black hover:bg-gold/90"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Resume
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EmailResumeDialog;
