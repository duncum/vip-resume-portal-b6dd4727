
// Type definitions for Google API Client
interface GoogleAuthInstance {
  isSignedIn: {
    get: () => boolean;
    listen: (callback: (isSignedIn: boolean) => void) => void;
  };
  signIn: () => Promise<any>;
  signOut: () => Promise<any>;
  currentUser: {
    get: () => {
      getBasicProfile: () => {
        getId: () => string;
        getName: () => string;
        getGivenName: () => string;
        getFamilyName: () => string;
        getEmail: () => string;
        getImageUrl: () => string;
      };
    };
  };
}

interface GoogleApiClient {
  init: (options: {
    apiKey: string;
    clientId: string;
    discoveryDocs: string[];
    scope: string;
  }) => Promise<void>;
  sheets: {
    spreadsheets: {
      values: {
        get: (options: {
          spreadsheetId: string;
          range: string;
        }) => Promise<{
          result: {
            values: any[][];
          };
        }>;
        append: (options: {
          spreadsheetId: string;
          range: string;
          valueInputOption: string;
          insertDataOption: string;
          resource: {
            values: any[][];
          };
        }) => Promise<any>;
      };
    };
  };
  drive: {
    files: {
      list: (options: {
        q?: string;
        spaces?: string;
        fields?: string;
      }) => Promise<{
        result: {
          files: {
            id: string;
            name: string;
            webViewLink?: string;
            webContentLink?: string;
            [key: string]: any;
          }[];
        };
      }>;
      create: (options: {
        resource: {
          name: string;
          mimeType: string;
          parents?: string[];
          [key: string]: any;
        };
        fields?: string;
        media?: {
          body: any;
        };
      }) => Promise<{
        result: {
          id: string;
          [key: string]: any;
        };
      }>;
      get: (options: {
        fileId: string;
        fields?: string;
      }) => Promise<{
        result: {
          id: string;
          name: string;
          webViewLink?: string;
          webContentLink?: string;
          [key: string]: any;
        };
      }>;
      delete: (options: {
        fileId: string;
      }) => Promise<void>;
    };
    permissions: {
      create: (options: {
        fileId: string;
        resource: {
          role: string;
          type: string;
          [key: string]: any;
        };
      }) => Promise<any>;
    };
  };
}

interface Window {
  gapi: {
    load: (libraries: string, callback: () => void) => void;
    client: GoogleApiClient;
    auth: {
      getToken: () => {
        access_token: string;
      };
    };
    auth2: {
      getAuthInstance: () => GoogleAuthInstance;
      init: (options: {
        client_id: string;
        scope: string;
        [key: string]: any;
      }) => Promise<GoogleAuthInstance>;
    };
  };
}
