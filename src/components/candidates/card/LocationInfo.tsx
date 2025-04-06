
import { MapPin } from "lucide-react";
import { RelocationBadge } from "./";

interface LocationInfoProps {
  location?: string;
  relocationPreference?: string;
}

const LocationInfo = ({ location, relocationPreference }: LocationInfoProps) => {
  if (!location && !relocationPreference) return null;
  
  return (
    <div className="flex items-center gap-2.5 text-grey-400 text-xs mb-3">
      {location && (
        <div className="flex items-center group">
          <MapPin size={14} className="mr-1.5 text-gold/80 group-hover:text-gold transition-colors duration-300" />
          <span className="group-hover:text-grey-200 transition-colors duration-300">{location}</span>
        </div>
      )}
      {relocationPreference && (
        <RelocationBadge relocationPreference={relocationPreference} />
      )}
    </div>
  );
};

export default LocationInfo;
