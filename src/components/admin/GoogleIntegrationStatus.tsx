
import { useState, useEffect } from 'react';
import { initGoogleApi, isUserAuthorized, signInToGoogle, signOutFromGoogle, getCurrentUserEmail } from '@/utils/google';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, RefreshCw, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from 'sonner';
import { CLIENT_ID, API_KEY } from '@/utils/google';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SPREADSHEET_ID } from '@/utils/sheets';

// Create a custom Google icon since lucide-react doesn't have one
const GoogleIcon = ({ className = "", size = 24, ...props }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      {...props}
    >
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
      <path d="M17.4 12H12V14H15.1C14.8 15.3 13.5 16.2 12 16.2C10.1 16.2 8.6 14.7 8.6 12.8C8.6 11 10.1 9.4 12 9.4C12.8 9.4 13.6 9.7 14.2 10.2L15.7 8.6C14.6 7.6 13.3 7 12 7C8.7 7 6 9.7 6 13C6 16.3 8.7 19 12 19C15.3 19 17.6 16.8 17.6 13.2C17.6 12.8 17.5 12.4 17.4 12Z" />
    </svg>
  );
};

const GoogleIntegrationStatus = () => {
  const [status, setStatus] = useState({
    isInitialized: false,
    isAuthorized: false,
    isLoading: true,
    userEmail: null as string | null
  });

  const [showCredentialsForm, setShowCredentialsForm] = useState(false);
  const [credentials, setCredentials] = useState({
    clientId: CLIENT_ID || '',
    apiKey: API_KEY || '',
    spreadsheetId: SPREADSHEET_ID || ''
  });

  const [missingCredentials, setMissingCredentials] = useState({
    clientId: !CLIENT_ID,
    apiKey: !API_KEY
  });

  // Store credentials in localStorage
  useEffect(() => {
    // Load saved credentials from localStorage
    const savedClientId = localStorage.getItem('google_client_id');
    const savedApiKey = localStorage.getItem('google_api_key');
    const savedSpreadsheetId = localStorage.getItem('google_spreadsheet_id');
    
    if (savedClientId || savedApiKey || savedSpreadsheetId) {
      setCredentials({
        clientId: savedClientId || credentials.clientId,
        apiKey: savedApiKey || credentials.apiKey,
        spreadsheetId: savedSpreadsheetId || credentials.spreadsheetId
      });
    }
  }, []);

  const checkStatus = async () => {
    setStatus(prev => ({ ...prev, isLoading: true }));
    
    try {
      // Check if credentials are missing
      if (!credentials.clientId || !credentials.apiKey) {
        setMissingCredentials({
          clientId: !credentials.clientId,
          apiKey: !credentials.apiKey
        });
        setStatus({
          isInitialized: false,
          isAuthorized: false,
          isLoading: false,
          userEmail: null
        });
        return;
      }

      // Use credentials from state
      window.localStorage.setItem('google_client_id', credentials.clientId);
      window.localStorage.setItem('google_api_key', credentials.apiKey);
      if (credentials.spreadsheetId) {
        window.localStorage.setItem('google_spreadsheet_id', credentials.spreadsheetId);
      }

      await initGoogleApi();
      const authorized = await isUserAuthorized();
      const email = authorized ? getCurrentUserEmail() : null;
      
      setStatus({
        isInitialized: true,
        isAuthorized: authorized,
        isLoading: false,
        userEmail: email
      });
    } catch (error) {
      console.error('Error checking Google API status:', error);
      toast.error('Failed to initialize Google API');
      setStatus({
        isInitialized: false,
        isAuthorized: false,
        isLoading: false,
        userEmail: null
      });
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  const handleSignIn = async () => {
    if (missingCredentials.clientId || missingCredentials.apiKey) {
      toast.error('Google API credentials are missing. Please set them up first.');
      return;
    }

    setStatus(prev => ({ ...prev, isLoading: true }));
    try {
      const success = await signInToGoogle();
      if (success) {
        checkStatus();
        toast.success('Successfully signed in to Google');
      } else {
        setStatus(prev => ({ ...prev, isLoading: false }));
      }
    } catch (error) {
      console.error('Error signing in:', error);
      toast.error('Failed to sign in to Google');
      setStatus(prev => ({ ...prev, isLoading: false }));
    }
  };

  const handleSignOut = async () => {
    setStatus(prev => ({ ...prev, isLoading: true }));
    try {
      await signOutFromGoogle();
      checkStatus();
      toast.success('Successfully signed out from Google');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out from Google');
      setStatus(prev => ({ ...prev, isLoading: false }));
    }
  };

  const handleCredentialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    checkStatus();
    setShowCredentialsForm(false);
    toast.success('Credentials saved');
  };

  const showSetupInstructions = () => {
    toast.info(
      'You need to set up your Google API credentials. Open the browser console (F12) to see detailed instructions.',
      { duration: 8000 }
    );
    // This will trigger the detailed instructions to be printed in the console
    import('@/utils/google/config').then(module => {
      module.printOAuthSetupInstructions();
    });
  };

  return (
    <Card className="border-dashed">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center">
          <GoogleIcon className="h-4 w-4 mr-2" />
          Google Integration
          {(missingCredentials.clientId || missingCredentials.apiKey) && (
            <Info 
              className="h-4 w-4 ml-2 text-amber-500 cursor-pointer" 
              onClick={showSetupInstructions}
              aria-label="API credentials missing. Click for setup instructions."
            />
          )}
        </CardTitle>
        <CardDescription className="text-xs">
          Required for sheet access and resume storage
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2 pt-0">
        {status.isLoading ? (
          <div className="flex items-center justify-center p-2">
            <RefreshCw className="h-4 w-4 animate-spin text-grey-400" />
            <span className="ml-2 text-sm text-grey-400">Checking status...</span>
          </div>
        ) : missingCredentials.clientId || missingCredentials.apiKey ? (
          <div className="flex items-center text-sm">
            <XCircle className="h-4 w-4 mr-2 text-amber-500" />
            <div>
              <div className="font-medium">Setup required</div>
              <div className="text-xs text-grey-500">
                {missingCredentials.clientId && missingCredentials.apiKey 
                  ? 'Client ID and API Key missing' 
                  : missingCredentials.clientId 
                    ? 'Client ID missing' 
                    : 'API Key missing'}
              </div>
            </div>
          </div>
        ) : status.isAuthorized ? (
          <div className="flex items-center text-sm">
            <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
            <div>
              <div className="font-medium">Connected</div>
              {status.userEmail && (
                <div className="text-xs text-grey-500">{status.userEmail}</div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center text-sm">
            <XCircle className="h-4 w-4 mr-2 text-amber-500" />
            <div>
              <div className="font-medium">Not connected</div>
              <div className="text-xs text-grey-500">Google connection required</div>
            </div>
          </div>
        )}
        
        {/* Collapsible credentials form */}
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
            <form onSubmit={handleCredentialSubmit} className="mt-3 space-y-3 p-3 bg-slate-50 rounded-md">
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
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        {missingCredentials.clientId || missingCredentials.apiKey ? (
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => setShowCredentialsForm(true)}
            className="w-full text-xs"
          >
            Enter API Credentials
          </Button>
        ) : status.isAuthorized ? (
          <Button size="sm" variant="outline" onClick={handleSignOut} className="w-full text-xs">
            Disconnect
          </Button>
        ) : (
          <Button size="sm" onClick={handleSignIn} className="w-full text-xs bg-white border-grey-200 text-grey-800 hover:bg-grey-100">
            <GoogleIcon className="h-3 w-3 mr-2" />
            Connect Google Account
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default GoogleIntegrationStatus;
