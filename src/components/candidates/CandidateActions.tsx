
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { trackDownload } from "@/utils/ipTracker";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

interface CandidateActionsProps {
  candidateId: string;
}

const CandidateActions = ({ candidateId }: CandidateActionsProps) => {
  const isMobile = useIsMobile();

  const handlePrintResume = () => {
    trackDownload(candidateId);
    toast.info("Preparing document for printing...");
    
    // Find iframe and print it
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
    <div className="mb-6 md:mb-8 flex flex-wrap gap-3">
      <Button 
        className="bg-gold hover:bg-gold-dark text-black flex items-center gap-2 text-sm md:text-base" 
        onClick={handlePrintResume}
      >
        <Printer size={isMobile ? 14 : 16} />
        Print
      </Button>
    </div>
  );
};

export default CandidateActions;
