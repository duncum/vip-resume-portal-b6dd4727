
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import EmailInputField from "./email/EmailInputField";
import ConfidentialSwitch from "./email/ConfidentialSwitch";
import DialogActions from "./email/DialogActions";
import { useSimpleEmailForm } from "./email/useSimpleEmailForm";

interface SimpleEmailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  candidateId: string;
  resumeUrl: string;
}

const SimpleEmailDialog = ({ 
  open, 
  onOpenChange,
  candidateId,
  resumeUrl
}: SimpleEmailDialogProps) => {
  const {
    isLoading,
    email,
    setEmail,
    isConfidential,
    setIsConfidential,
    handleSubmit
  } = useSimpleEmailForm({ open, onOpenChange, candidateId, resumeUrl });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Email Resume</DialogTitle>
          <DialogDescription>
            Enter your email address to receive this candidate's resume.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <EmailInputField 
            email={email}
            setEmail={setEmail}
            isLoading={isLoading}
          />
          
          <ConfidentialSwitch
            isConfidential={isConfidential}
            setIsConfidential={setIsConfidential}
            isLoading={isLoading}
          />
          
          <DialogActions 
            isLoading={isLoading}
            onClose={() => onOpenChange(false)}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SimpleEmailDialog;
