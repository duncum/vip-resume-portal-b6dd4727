import { Button } from "@/components/ui/button";
import { Printer, Mail } from "lucide-react";
import { useState } from "react";
import { printResume } from "@/utils/print/printResume";
import EmailResumeDialog from "../EmailResumeDialog";

interface ResumeActionsProps {
  resumeUrl: string;
  candidateId: string;
}

const ResumeActions = ({ resumeUrl, candidateId }: ResumeActionsProps) => {
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  
  const handlePrint = () => {
    printResume(resumeUrl, candidateId);
  };

  return (
    <div className="flex gap-2">
      <Button 
        onClick={() => setIsEmailDialogOpen(true)}
        size="sm"
        variant="outline"
        className="bg-white text-gold border-gold hover:bg-gold/10"
      >
        <Mail className="mr-2 h-4 w-4" />
        Email Resume
      </Button>
      <Button 
        onClick={handlePrint}
        size="sm"
        className="bg-gold text-black hover:bg-gold/90"
      >
        <Printer className="mr-2 h-4 w-4" />
        Print
      </Button>
      
      <EmailResumeDialog 
        open={isEmailDialogOpen} 
        onOpenChange={setIsEmailDialogOpen}
        candidateId={candidateId}
        resumeUrl={resumeUrl}
      />
    </div>
  );
};

export default ResumeActions;
