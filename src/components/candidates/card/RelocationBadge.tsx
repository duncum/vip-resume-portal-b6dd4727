
import { Badge } from "@/components/ui/badge";
import { Globe } from "lucide-react";

interface RelocationBadgeProps {
  relocationPreference?: string;
}

// Enhanced relocation badge color and text mapping
const relocationBadge = {
  "willing": { 
    color: "bg-gold/20 text-gold border-gold/40 hover:bg-gold/30", 
    text: "Open to Relocate" 
  },
  "remote-only": { 
    color: "bg-grey-800/70 text-white/80 border-grey-700/70 hover:bg-grey-700/70", 
    text: "Remote Only" 
  },
  "flexible": { 
    color: "bg-gold/15 text-gold/90 border-gold/30 hover:bg-gold/25", 
    text: "Flexible Location" 
  }
};

const RelocationBadge = ({ relocationPreference }: RelocationBadgeProps) => {
  if (!relocationPreference || relocationPreference === "no") return null;
  
  // For remote-only
  if (relocationPreference === "remote-only") {
    return (
      <Badge className="flex items-center gap-1 px-2 py-1 rounded-full bg-grey-800/70 text-white/80 border border-grey-700/70 transition-all duration-300 hover:bg-grey-700/70 shadow-sm">
        <Globe size={10} className="opacity-80" />
        Remote Only
      </Badge>
    );
  }
  
  // For willing, flexible, or other values
  const badgeInfo = relocationBadge[relocationPreference as keyof typeof relocationBadge] || {
    color: "bg-gold/20 text-gold border-gold/40 hover:bg-gold/30",
    text: relocationPreference
  };
    
  return (
    <Badge className={`flex items-center gap-1 px-2 py-1 rounded-full border transition-all duration-300 shadow-sm ${badgeInfo.color}`}>
      <Globe size={10} className="opacity-80" />
      {badgeInfo.text}
    </Badge>
  );
};

export default RelocationBadge;
