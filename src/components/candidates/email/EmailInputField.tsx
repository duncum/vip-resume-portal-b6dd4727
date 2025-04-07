
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";

interface EmailInputFieldProps {
  email: string;
  setEmail: (email: string) => void;
  isLoading: boolean;
}

const EmailInputField = ({ email, setEmail, isLoading }: EmailInputFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="email" className="text-sm font-medium">
        Your Email Address
      </Label>
      <div className="relative">
        <Mail className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          className="pl-10"
          disabled={isLoading}
          required
        />
      </div>
      <p className="text-xs text-muted-foreground">
        We'll send the resume to this email address using Google Workspace.
      </p>
    </div>
  );
};

export default EmailInputField;
