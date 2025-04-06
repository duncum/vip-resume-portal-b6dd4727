
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { useState } from "react";
import SimpleEmailDialog from "../SimpleEmailDialog";

interface ResumeActionsProps {
  resumeUrl: string;
  candidateId: string;
}

const ResumeActions = ({ resumeUrl, candidateId }: ResumeActionsProps) => {
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  
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
      
      <SimpleEmailDialog 
        open={isEmailDialogOpen} 
        onOpenChange={setIsEmailDialogOpen}
        candidateId={candidateId}
        resumeUrl={resumeUrl}
      />
    </div>
  );
};

export default ResumeActions;
