
// Type definitions for auth operations

/**
 * Options for Google API initialization
 */
export interface GoogleApiInitOptions {
  apiKey: string;
  clientId?: string;
  discoveryDocs: string[];
  scope?: string;
}

/**
 * Result from initialization operations
 */
export interface InitResult {
  success: boolean;
  error?: string;
}
