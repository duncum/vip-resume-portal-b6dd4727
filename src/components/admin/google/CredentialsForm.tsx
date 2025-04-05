
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

type CredentialsFormProps = {
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
  onSubmit: (e: React.FormEvent) => void;
};

const CredentialsForm: React.FC<CredentialsFormProps> = ({
  credentials,
  setCredentials,
  onSubmit
}) => {
  return (
    <form onSubmit={onSubmit} className="mt-3 space-y-3 p-3 bg-slate-50 rounded-md">
      <div className="space-y-1">
        <Label htmlFor="clientId" className="text-xs">Client ID</Label>
        <Input 
          id="clientId"
          placeholder="Your OAuth Client ID" 
          value={credentials.clientId}
          onChange={(e) => setCredentials({...credentials, clientId: e.target.value})}
          className="text-xs h-8"
        />
      </div>
      
      <div className="space-y-1">
        <Label htmlFor="apiKey" className="text-xs">API Key</Label>
        <Input 
          id="apiKey"
          placeholder="Your Google API Key" 
          value={credentials.apiKey}
          onChange={(e) => setCredentials({...credentials, apiKey: e.target.value})}
          className="text-xs h-8"
        />
      </div>
      
      <div className="space-y-1">
        <Label htmlFor="spreadsheetId" className="text-xs">
          Spreadsheet ID <span className="text-slate-500">(Optional)</span>
        </Label>
        <Input 
          id="spreadsheetId"
          placeholder="Your Google Spreadsheet ID" 
          value={credentials.spreadsheetId}
          onChange={(e) => setCredentials({...credentials, spreadsheetId: e.target.value})}
          className="text-xs h-8"
        />
      </div>
      
      <div className="pt-1">
        <Button type="submit" size="sm" className="w-full text-xs">Save Credentials</Button>
      </div>
    </form>
  );
};

export default CredentialsForm;
