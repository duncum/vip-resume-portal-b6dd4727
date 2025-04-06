
import { Button } from "@/components/ui/button";
import { Printer, ExternalLink } from "lucide-react";
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
    toast.info("Preparing watermarked PDF for printing...");
    
    // Find iframe and print it with watermarks
    const iframe = document.querySelector('iframe');
    if (iframe) {
      iframe.focus();
      iframe.contentWindow?.print();
      toast.success("Print dialog opened", {
        description: "The watermarked PDF is ready to print",
      });
    } else {
      window.print();
      toast.error("Could not focus on document", {
        description: "Using fallback print method, watermarks may not be preserved",
      });
    }
  };

  const handleOpenInNewTab = () => {
    trackDownload(candidateId);
    // Open the current page in a new tab to view with watermarks
    window.open(window.location.href, '_blank');
    toast.info("Opening resume in new tab", {
      description: "Watermarks will be preserved when printing from the new tab",
    });
  };

  return (
    <div className="mb-6 md:mb-8 flex flex-wrap gap-3">
      <Button 
        className="bg-gold hover:bg-gold-dark text-black flex items-center gap-2 text-sm md:text-base" 
        onClick={handlePrintResume}
      >
        <Printer size={isMobile ? 14 : 16} />
        Print with Watermark
      </Button>
      
      <Button 
        variant="outline" 
        className="border-grey-700 text-grey-300 flex items-center gap-2 text-sm md:text-base"
        onClick={handleOpenInNewTab}
      >
        <ExternalLink size={isMobile ? 14 : 16} />
        Open in New Tab
      </Button>
    </div>
  );
};

export default CandidateActions;
