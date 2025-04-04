
import { useState, useEffect } from 'react';
import { initGoogleApi, isUserAuthorized, signInToGoogle, signOutFromGoogle, getCurrentUserEmail } from '@/utils/google';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, RefreshCw } from 'lucide-react';

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

  const checkStatus = async () => {
    setStatus(prev => ({ ...prev, isLoading: true }));
    
    try {
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
    setStatus(prev => ({ ...prev, isLoading: true }));
    try {
      const success = await signInToGoogle();
      if (success) {
        checkStatus();
      } else {
        setStatus(prev => ({ ...prev, isLoading: false }));
      }
    } catch (error) {
      console.error('Error signing in:', error);
      setStatus(prev => ({ ...prev, isLoading: false }));
    }
  };

  const handleSignOut = async () => {
    setStatus(prev => ({ ...prev, isLoading: true }));
    try {
      await signOutFromGoogle();
      checkStatus();
    } catch (error) {
      console.error('Error signing out:', error);
      setStatus(prev => ({ ...prev, isLoading: false }));
    }
  };

  return (
    <Card className="border-dashed">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center">
          <GoogleIcon className="h-4 w-4 mr-2" />
          Google Integration
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
      </CardContent>
      <CardFooter className="pt-2">
        {status.isAuthorized ? (
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
