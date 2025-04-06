
import { Briefcase } from "lucide-react";

interface NotableEmployersProps {
  employers?: string;
}

const NotableEmployers = ({ employers }: NotableEmployersProps) => {
  if (!employers) return null;
  
  return (
    <div className="flex items-start mb-3.5 group">
      <Briefcase size={14} className="mr-1.5 mt-0.5 text-gold/80 group-hover:text-gold transition-colors duration-300 flex-shrink-0" />
      <div>
        <span className="text-xs text-grey-400 group-hover:text-grey-300 transition-colors duration-300">Notable employers: </span>
        <span className="text-xs text-grey-200 group-hover:text-white transition-colors duration-300 font-medium">{employers}</span>
      </div>
    </div>
  );
};

export default NotableEmployers;
