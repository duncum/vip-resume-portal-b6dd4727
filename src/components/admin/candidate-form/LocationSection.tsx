
import React from "react";
import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface LocationSectionProps {
  location: string;
  onLocationChange: (value: string) => void;
  relocationPreference: string;
  onRelocationChange: (value: string) => void;
}

const LocationSection = ({
  location,
  onLocationChange,
  relocationPreference,
  onRelocationChange
}: LocationSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Current Location</label>
        <div className="flex items-center">
          <MapPin className="mr-2 h-4 w-4 text-grey-400" />
          <Input 
            placeholder="e.g. New York, NY"
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Relocation Preference</label>
        <RadioGroup 
          value={relocationPreference} 
          onValueChange={onRelocationChange}
          className="flex flex-col space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="willing" id="r1" />
            <label htmlFor="r1" className="text-sm">Open to relocation</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="remote-only" id="r2" />
            <label htmlFor="r2" className="text-sm">Remote only</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="flexible" id="r3" />
            <label htmlFor="r3" className="text-sm">Flexible</label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default LocationSection;
