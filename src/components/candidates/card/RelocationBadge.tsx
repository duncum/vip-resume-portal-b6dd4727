
import { Badge } from "@/components/ui/badge";
import { Globe } from "lucide-react";

interface RelocationBadgeProps {
  relocationPreference?: string;
}

// Relocation badge color and text mapping
const relocationBadge = {
  "willing": { color: "bg-gold/20 text-gold border-gold/40", text: "Open to Relocation" },
  "remote-only": { color: "bg-grey-800 text-white/80 border-grey-700", text: "Remote Only" },
  "flexible": { color: "bg-gold/10 text-gold/90 border-gold/30", text: "Flexible Location" }
};

const RelocationBadge = ({ relocationPreference }: RelocationBadgeProps) => {
  if (!relocationPreference) return null;
  
  // For remote-only
  if (relocationPreference === "remote-only") {
    return (
      <Badge className="flex items-center gap-1 bg-grey-800 text-white/80 border-grey-700">
        <Globe size={10} className="opacity-80" />
        Remote Only
      </Badge>
    );
  }
  
  // For willing, flexible, or other values
  const badgeInfo = relocationBadge[relocationPreference as keyof typeof relocationBadge] || {
    color: "bg-gold/20 text-gold border-gold/40",
    text: relocationPreference
  };
    
  return (
    <Badge className={`flex items-center gap-1 ${badgeInfo.color}`}>
      <Globe size={10} className="opacity-80" />
      {badgeInfo.text}
    </Badge>
  );
};

export default RelocationBadge;
