
import { Briefcase } from "lucide-react";

interface NotableEmployersProps {
  employers?: string;
}

const NotableEmployers = ({ employers }: NotableEmployersProps) => {
  if (!employers) return null;
  
  return (
    <div className="flex items-start mb-3">
      <Briefcase size={14} className="mr-1 mt-0.5 text-gold/70 flex-shrink-0" />
      <div>
        <span className="text-xs text-grey-400">Notable employers: </span>
        <span className="text-xs text-grey-200">{employers}</span>
      </div>
    </div>
  );
};

export default NotableEmployers;
