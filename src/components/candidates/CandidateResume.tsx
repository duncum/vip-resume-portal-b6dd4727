
import ResumeViewer from "@/components/candidates/ResumeViewer";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { printResume } from "./resume/printUtils";

interface CandidateResumeProps {
  resumeUrl: string;
  candidateId: string;
}

/**
 * Component that displays a candidate's resume with print functionality
 */
const CandidateResume = ({ resumeUrl, candidateId }: CandidateResumeProps) => {
  // Handle printing by using our dedicated print utility
  const handlePrint = () => {
    printResume(resumeUrl, candidateId);
  };

  return (
    <div className="border-t border-grey-700 pt-4 md:pt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg md:text-xl font-semibold">Resume Preview</h2>
        <Button 
          onClick={handlePrint}
          size="sm"
          className="bg-gold text-black hover:bg-gold/90"
        >
          <Printer className="mr-2 h-4 w-4" />
          Print
        </Button>
      </div>
      <ResumeViewer fileUrl={resumeUrl} candidateId={candidateId} />
    </div>
  );
};

export default CandidateResume;
