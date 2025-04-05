
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown } from 'lucide-react';
import CredentialsForm from './CredentialsForm';

type CredentialsToggleProps = {
  showCredentialsForm: boolean;
  setShowCredentialsForm: React.Dispatch<React.SetStateAction<boolean>>;
  credentials: {
    clientId: string;
    apiKey: string;
    spreadsheetId: string;
  };
  setCredentials: React.Dispatch<React.SetStateAction<{
    clientId: string;
    apiKey: string;
    spreadsheetId: string;
  }>>;
  handleCredentialSubmit: (e: React.FormEvent) => void;
};

const CredentialsToggle: React.FC<CredentialsToggleProps> = ({
  showCredentialsForm,
  setShowCredentialsForm,
  credentials,
  setCredentials,
  handleCredentialSubmit
}) => {
  return (
    <div className="mt-3">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => setShowCredentialsForm(!showCredentialsForm)}
        className="w-full flex items-center justify-between text-xs"
      >
        <span>API Credentials</span>
        {showCredentialsForm ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
      </Button>
      
      {showCredentialsForm && (
        <CredentialsForm 
          credentials={credentials}
          setCredentials={setCredentials}
          onSubmit={handleCredentialSubmit}
        />
      )}
    </div>
  );
};

export default CredentialsToggle;
