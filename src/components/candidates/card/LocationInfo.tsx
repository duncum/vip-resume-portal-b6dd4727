
import { MapPin } from "lucide-react";
import { RelocationBadge } from "./";

interface LocationInfoProps {
  location?: string;
  relocationPreference?: string;
}

const LocationInfo = ({ location, relocationPreference }: LocationInfoProps) => {
  if (!location && !relocationPreference) return null;
  
  return (
    <div className="flex flex-wrap items-center gap-2 text-grey-400 text-xs mb-3">
      <div className="flex items-center">
        {location && (
          <>
            <MapPin size={14} className="mr-1 text-gold/70" />
            <span>{location}</span>
          </>
        )}
      </div>
      {relocationPreference && (
        <RelocationBadge relocationPreference={relocationPreference} />
      )}
    </div>
  );
};

export default LocationInfo;
