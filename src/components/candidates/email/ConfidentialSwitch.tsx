
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ConfidentialSwitchProps {
  isConfidential: boolean;
  setIsConfidential: (value: boolean) => void;
  isLoading: boolean;
}

const ConfidentialSwitch = ({ 
  isConfidential, 
  setIsConfidential, 
  isLoading 
}: ConfidentialSwitchProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="confidential"
        checked={isConfidential}
        onCheckedChange={setIsConfidential}
        disabled={isLoading}
      />
      <Label htmlFor="confidential">Mark as confidential</Label>
    </div>
  );
};

export default ConfidentialSwitch;
