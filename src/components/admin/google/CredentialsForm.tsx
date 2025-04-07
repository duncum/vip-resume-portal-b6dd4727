
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Info, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

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
    <form onSubmit={onSubmit} className="mt-3 space-y-4 p-4 bg-slate-50 rounded-md">
      <div className="pb-2">
        <Alert variant="default" className="bg-blue-50 text-blue-800 border-blue-200">
          <AlertCircle className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-xs">
            <span className="font-semibold">API Key Only Mode:</span>
            <ul className="mt-1 pl-4 list-disc">
              <li>Read-only access to view existing candidates</li>
              <li>No OAuth required - simpler configuration</li>
            </ul>
          </AlertDescription>
        </Alert>
      </div>
      
      <div className="space-y-1">
        <Label htmlFor="apiKey" className="text-xs">
          API Key <span className="text-red-500">*</span>
        </Label>
        <Input 
          id="apiKey"
          placeholder="Your Google API Key" 
          value={credentials.apiKey}
          onChange={(e) => setCredentials({...credentials, apiKey: e.target.value})}
          className="text-xs h-8"
          required
        />
        <p className="text-xs text-slate-500 mt-1">
          Required for all Google Sheet operations. Enable the Google Sheets API in Google Cloud Console.
        </p>
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
        <p className="text-xs text-slate-500 mt-1">
          Found in your Google Sheet URL: docs.google.com/spreadsheets/d/<span className="font-bold">spreadsheet-id</span>/edit
        </p>
      </div>
      
      <div className="pt-1">
        <Button type="submit" size="sm" className="w-full text-xs">Save Credentials</Button>
      </div>
    </form>
  );
};

export default CredentialsForm;
