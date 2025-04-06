
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import EmailFormFields from "./email/EmailFormFields";
import CustomSubjectField from "./email/CustomSubjectField";
import DialogActions from "./email/DialogActions";
import { useEmailForm } from "./email/useEmailForm";

interface EmailResumeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  candidateId: string;
  resumeUrl: string;
}

const EmailResumeDialog = ({ 
  open, 
  onOpenChange,
  candidateId,
  resumeUrl
}: EmailResumeDialogProps) => {
  const {
    form,
    isLoading,
    showCustomSubject,
    handleToggleCustomSubject,
    onTemplateChange,
    handleSubmit
  } = useEmailForm({ open, onOpenChange, candidateId, resumeUrl });

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
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <EmailFormFields 
              control={form.control}
              isLoading={isLoading}
              onTemplateChange={onTemplateChange}
            />
            
            <CustomSubjectField
              control={form.control}
              showCustomSubject={showCustomSubject}
              handleToggleCustomSubject={handleToggleCustomSubject}
              isLoading={isLoading}
            />
            
            <DialogActions 
              isLoading={isLoading}
              onClose={() => onOpenChange(false)}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EmailResumeDialog;
