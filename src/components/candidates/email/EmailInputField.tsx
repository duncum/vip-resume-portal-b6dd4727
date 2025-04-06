
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EmailInputFieldProps {
  email: string;
  setEmail: (email: string) => void;
  isLoading: boolean;
}

const EmailInputField = ({ email, setEmail, isLoading }: EmailInputFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="email">Email address</Label>
      <Input
        id="email"
        type="email"
        placeholder="your.email@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading}
        required
      />
    </div>
  );
};

export default EmailInputField;
