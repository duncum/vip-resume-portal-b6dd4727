
import { initGoogleApi, isUserAuthorized, signInToGoogle } from './google';
import { toast } from 'sonner';

// Configuration for Google Drive
const RESUME_FOLDER_NAME = "CRE Resume Portal";
let RESUME_FOLDER_ID: string | null = null;

/**
 * Ensure the user is authorized before accessing Google Drive
 */
const ensureAuthorization = async (): Promise<boolean> => {
  try {
    // Initialize the API if needed
    await initGoogleApi();
    
    // Check if the user is authorized
    const authorized = await isUserAuthorized();
    
    if (!authorized) {
      // Prompt for authorization
      const signedIn = await signInToGoogle();
      return signedIn;
    }
    
    return true;
  } catch (error) {
    console.error('Authorization error:', error);
    return false;
  }
};

/**
 * Get or create a folder for storing resumes
 */
const getOrCreateResumeFolder = async (): Promise<string> => {
  // Return cached folder ID if available
  if (RESUME_FOLDER_ID) {
    return RESUME_FOLDER_ID;
  }
  
  try {
    // Check if the folder already exists
    const response = await window.gapi.client.drive.files.list({
      q: `name='${RESUME_FOLDER_NAME}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
      spaces: 'drive',
      fields: 'files(id, name)'
    });
    
    const files = response.result.files;
    
    if (files && files.length > 0) {
      // Folder exists, use its ID
      RESUME_FOLDER_ID = files[0].id;
      return RESUME_FOLDER_ID;
    }
    
    // Create the folder if it doesn't exist
    const folderMetadata = {
      name: RESUME_FOLDER_NAME,
      mimeType: 'application/vnd.google-apps.folder'
    };
    
    const folder = await window.gapi.client.drive.files.create({
      resource: folderMetadata,
      fields: 'id'
    });
    
    RESUME_FOLDER_ID = folder.result.id;
    return RESUME_FOLDER_ID;
  } catch (error) {
    console.error('Error getting or creating resume folder:', error);
    throw new Error('Failed to access or create resume storage folder');
  }
};

/**
 * Upload a resume file to Google Drive
 */
export const uploadResumeToDrive = async (file: File, candidateId: string): Promise<string> => {
  // Ensure the user is authorized
  const authorized = await ensureAuthorization();
  
  if (!authorized) {
    throw new Error('Not authorized to access Google Drive');
  }
  
  try {
    // Get or create the resume folder
    const folderId = await getOrCreateResumeFolder();
    
    // Sanitize the filename
    const filename = `${candidateId}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    
    // Set up the upload
    const metadata = {
      name: filename,
      mimeType: file.type,
      parents: [folderId]
    };
    
    const accessToken = window.gapi.auth.getToken().access_token;
    
    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', file);
    
    // Upload the file
    const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
      method: 'POST',
      headers: new Headers({ 'Authorization': 'Bearer ' + accessToken }),
      body: form
    });
    
    const result = await response.json();
    
    if (!result.id) {
      throw new Error('Failed to upload file to Google Drive');
    }
    
    // Make the file readable by anyone with the link
    await window.gapi.client.drive.permissions.create({
      fileId: result.id,
      resource: {
        role: 'reader',
        type: 'anyone'
      }
    });
    
    // Get the webViewLink for the file
    const fileResponse = await window.gapi.client.drive.files.get({
      fileId: result.id,
      fields: 'webViewLink, webContentLink'
    });
    
    return fileResponse.result.webViewLink || fileResponse.result.webContentLink;
  } catch (error) {
    console.error('Error uploading file to Google Drive:', error);
    throw new Error('Failed to upload resume to Google Drive');
  }
};

/**
 * Download a resume file from Google Drive
 */
export const downloadResumeFromDrive = async (fileUrl: string): Promise<void> => {
  if (!fileUrl) {
    toast.error('No resume URL provided');
    return;
  }
  
  // Open the file URL in a new tab
  window.open(fileUrl, '_blank');
};

/**
 * Get a list of all resumes in the resume folder
 */
export const listAllResumes = async (): Promise<Array<{id: string, name: string, url: string}>> => {
  // Ensure the user is authorized
  const authorized = await ensureAuthorization();
  
  if (!authorized) {
    return [];
  }
  
  try {
    // Get the resume folder
    const folderId = await getOrCreateResumeFolder();
    
    // List files in the folder
    const response = await window.gapi.client.drive.files.list({
      q: `'${folderId}' in parents and trashed=false`,
      spaces: 'drive',
      fields: 'files(id, name, webViewLink, webContentLink)'
    });
    
    const files = response.result.files;
    
    if (!files || files.length === 0) {
      return [];
    }
    
    return files.map((file: any) => ({
      id: file.id,
      name: file.name,
      url: file.webViewLink || file.webContentLink
    }));
  } catch (error) {
    console.error('Error listing resumes:', error);
    return [];
  }
};

/**
 * Delete a resume from Google Drive
 */
export const deleteResumeFromDrive = async (fileId: string): Promise<boolean> => {
  // Ensure the user is authorized
  const authorized = await ensureAuthorization();
  
  if (!authorized) {
    return false;
  }
  
  try {
    await window.gapi.client.drive.files.delete({
      fileId: fileId
    });
    
    return true;
  } catch (error) {
    console.error('Error deleting resume:', error);
    return false;
  }
};
