
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
  // Default to showing "Open to Relocation" unless specified as remote-only
  if (relocationPreference === "remote-only") {
    return (
      <Badge className="flex items-center gap-1 bg-grey-800 text-white/80 border-grey-700">
        <Globe size={10} className="opacity-80" />
        Remote Only
      </Badge>
    );
  }
  
  // For willing, flexible, or unspecified - show appropriate badge
  const showRelocationBadge = !relocationPreference || relocationPreference === "willing" || relocationPreference === "flexible";
  
  if (!showRelocationBadge) return null;
  
  // Default text and color when no preference is specified
  const relocationText = relocationPreference ? 
    relocationBadge[relocationPreference as keyof typeof relocationBadge]?.text || relocationPreference :
    "Open to Relocation";
  
  const relocationColor = relocationPreference ?
    relocationBadge[relocationPreference as keyof typeof relocationBadge]?.color || "bg-gold/20 text-gold border-gold/40" :
    "bg-gold/20 text-gold border-gold/40";
    
  return (
    <Badge className={`flex items-center gap-1 ${relocationColor}`}>
      <Globe size={10} className="opacity-80" />
      {relocationText}
    </Badge>
  );
};

export default RelocationBadge;
