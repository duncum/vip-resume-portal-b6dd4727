
import { MapPin } from "lucide-react";
import { RelocationBadge } from "./";

interface LocationInfoProps {
  location?: string;
  relocationPreference?: string;
}

const LocationInfo = ({ location, relocationPreference }: LocationInfoProps) => {
  if (!location && !relocationPreference) return null;
  
  return (
    <div className="flex items-center gap-2 text-grey-400 text-xs mb-3">
      {location && (
        <div className="flex items-center group">
          <MapPin size={14} className="mr-1 text-gold/70 group-hover:text-gold transition-colors" />
          <span className="group-hover:text-grey-300 transition-colors">{location}</span>
        </div>
      )}
      {relocationPreference && (
        <RelocationBadge relocationPreference={relocationPreference} />
      )}
    </div>
  );
};

export default LocationInfo;
