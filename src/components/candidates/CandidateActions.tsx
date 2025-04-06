
import { Button } from "@/components/ui/button";
import { trackDownload } from "@/utils/ipTracker";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

interface CandidateActionsProps {
  candidateId: string;
}

const CandidateActions = ({ candidateId }: CandidateActionsProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="mb-6 md:mb-8 flex flex-wrap gap-3">
      {/* All action buttons removed */}
    </div>
  );
};

export default CandidateActions;
