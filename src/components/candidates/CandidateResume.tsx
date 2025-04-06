
import ResumeViewer from "@/components/candidates/ResumeViewer";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { toast } from "sonner";
import { trackDownload } from "@/utils/ipTracker";

interface CandidateResumeProps {
  resumeUrl: string;
  candidateId: string;
}

const CandidateResume = ({ resumeUrl, candidateId }: CandidateResumeProps) => {
  const handlePrint = () => {
    // Track the print action
    trackDownload(candidateId);
    toast.info("Preparing document for printing...");
    
    // Find iframe and print it (this will include the watermark)
    const iframe = document.querySelector('iframe');
    if (iframe) {
      iframe.focus();
      iframe.contentWindow?.print();
      toast.success("Print dialog opened");
    } else {
      window.print();
      toast.error("Could not focus on document", {
        description: "Using fallback print method",
      });
    }
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
