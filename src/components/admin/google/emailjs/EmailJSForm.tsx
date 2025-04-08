
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import EmailJSInstructions from './EmailJSInstructions';
import { AlertCircle } from 'lucide-react';

interface EmailJSCredentials {
  serviceId: string;
  templateId: string;
  userId: string;
}

interface EmailJSFormProps {
  credentials: EmailJSCredentials;
  setCredentials: React.Dispatch<React.SetStateAction<EmailJSCredentials>>;
  onSubmit: (e: React.FormEvent) => void;
  onTestConnection: () => Promise<void>;
  isConfigured: boolean;
  isTestingConnection: boolean;
  onClose: () => void;
}

const EmailJSForm: React.FC<EmailJSFormProps> = ({
  credentials,
  setCredentials,
  onSubmit,
  onTestConnection,
  isConfigured,
  isTestingConnection,
  onClose
}) => {
  const [setupInstructionsOpen, setSetupInstructionsOpen] = React.useState(false);

  return (
    <form onSubmit={onSubmit} className="mt-3 space-y-3 p-3 border border-gray-200 rounded-md bg-gray-50">
      <div className="flex items-start mb-3">
        <AlertCircle className="h-3 w-3 text-amber-500 mr-1 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-gray-600">
          Gmail API requires additional scopes for sending emails. Configure EmailJS as a reliable alternative.
        </p>
      </div>
      
      <EmailJSInstructions 
        open={setupInstructionsOpen} 
        onOpenChange={setSetupInstructionsOpen} 
      />
      
      <div className="space-y-1">
        <Label htmlFor="serviceId" className="text-xs">
          Service ID
        </Label>
        <Input
          id="serviceId"
          value={credentials.serviceId}
          onChange={(e) => setCredentials({ ...credentials, serviceId: e.target.value })}
          className="h-7 text-xs"
          placeholder="e.g., service_xxxxxxx"
        />
      </div>
      
      <div className="space-y-1">
        <Label htmlFor="templateId" className="text-xs">
          Template ID
        </Label>
        <Input
          id="templateId"
          value={credentials.templateId}
          onChange={(e) => setCredentials({ ...credentials, templateId: e.target.value })}
          className="h-7 text-xs"
          placeholder="e.g., template_xxxxxxx"
        />
      </div>
      
      <div className="space-y-1">
        <Label htmlFor="userId" className="text-xs">
          User ID (Public Key)
        </Label>
        <Input
          id="userId"
          value={credentials.userId}
          onChange={(e) => setCredentials({ ...credentials, userId: e.target.value })}
          className="h-7 text-xs"
          placeholder="e.g., user_xxxxxxxxxx"
        />
      </div>
      
      <div className="flex gap-2 pt-2">
        <Button 
          type="submit" 
          size="sm" 
          className="text-xs"
        >
          Save Config
        </Button>
        
        {isConfigured && (
          <Button 
            type="button" 
            size="sm" 
            variant="outline" 
            className="text-xs"
            onClick={onTestConnection}
            disabled={isTestingConnection}
          >
            {isTestingConnection ? "Testing..." : "Test Connection"}
          </Button>
        )}
        
        <Button 
          type="button" 
          size="sm" 
          variant="outline" 
          className="text-xs ml-auto"
          onClick={onClose}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default EmailJSForm;
