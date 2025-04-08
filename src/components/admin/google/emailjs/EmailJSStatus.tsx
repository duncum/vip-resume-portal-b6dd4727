
import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmailJSStatusProps {
  isConfigured: boolean;
  onClick: () => void;
}

const EmailJSStatus: React.FC<EmailJSStatusProps> = ({ isConfigured, onClick }) => {
  return (
    <Button
      size="sm"
      variant={isConfigured ? "outline" : "secondary"}
      onClick={onClick}
      className={`text-xs h-6 ${isConfigured ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' : ''}`}
    >
      {isConfigured ? (
        <>
          <CheckCircle className="h-3 w-3 mr-1" />
          EmailJS Ready
        </>
      ) : (
        <>
          <AlertCircle className="h-3 w-3 mr-1" />
          Setup Backup
        </>
      )}
    </Button>
  );
};

export default EmailJSStatus;
