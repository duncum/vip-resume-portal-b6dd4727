
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
  load: (api: string, version: string) => Promise<void>;
  request: (options: {
    path: string;
    method: string;
    params?: Record<string, any>;
    body?: any;
  }) => Promise<any>;
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
    about: {
      get: (options: {
        fields?: string;
      }) => Promise<{
        result: {
          user?: {
            displayName?: string;
            emailAddress?: string;
            kind?: string;
            me?: boolean;
            permissionId?: string;
            photoLink?: string;
          };
          storageQuota?: {
            limit?: string;
            usage?: string;
            usageInDrive?: string;
            usageInDriveTrash?: string;
          };
          [key: string]: any;
        };
      }>;
    };
    files: {
      list: (options: {
        q?: string;
        spaces?: string;
        fields?: string;
        pageSize?: number;
        orderBy?: string;
        pageToken?: string;
      }) => Promise<{
        result: {
          files: {
            id: string;
            name: string;
            webViewLink?: string;
            webContentLink?: string;
            [key: string]: any;
          }[];
          nextPageToken?: string;
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
  gmail: {
    users: {
      messages: {
        send: (options: {
          userId: string;
          resource: {
            raw: string;
            [key: string]: any;
          };
        }) => Promise<any>;
      };
      drafts?: {
        create: (options: {
          userId: string;
          resource: {
            message: {
              raw: string;
              [key: string]: any;
            };
          };
        }) => Promise<any>;
      };
      labels?: {
        list: (options: {
          userId: string;
        }) => Promise<any>;
      };
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
