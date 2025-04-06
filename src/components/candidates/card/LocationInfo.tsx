
import { MapPin } from "lucide-react";

interface LocationInfoProps {
  location?: string;
}

const LocationInfo = ({ location }: LocationInfoProps) => {
  if (!location) return null;
  
  return (
    <div className="flex items-center text-grey-400 text-xs mb-3">
      <MapPin size={14} className="mr-1 text-gold/70" />
      <span>{location}</span>
    </div>
  );
};

export default LocationInfo;
