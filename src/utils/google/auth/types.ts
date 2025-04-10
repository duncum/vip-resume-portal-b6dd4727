
/**
 * Google API initialization options
 */
export interface GoogleApiInitOptions {
  apiKey: string;
  clientId?: string;
  discoveryDocs: string[];
  scope?: string;
}

/**
 * Authentication mode
 */
export type AuthMode = 'api_key' | 'oauth';
