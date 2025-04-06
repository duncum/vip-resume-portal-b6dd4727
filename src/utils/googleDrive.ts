
import { initGoogleApi, isUserAuthorized } from './google';
import { toast } from 'sonner';

// Configuration for Google Drive
const RESUME_FOLDER_NAME = "CRE Resume Portal";
let RESUME_FOLDER_ID: string | null = null;

/**
 * Ensure API is initialized before accessing Google Drive
 */
const ensureAuthorization = async (): Promise<boolean> => {
  try {
    // Initialize the API with credentials
    return await initGoogleApi();
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
  // Ensure the API is initialized
  const authorized = await ensureAuthorization();
  
  if (!authorized) {
    toast.error('Not connected to Google API. Please enter your credentials first.');
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
    
    // Use a different approach for uploading since we don't have OAuth token
    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', file);
    
    // Create the file using the Drive API
    const result = await window.gapi.client.drive.files.create({
      resource: metadata,
      media: {
        body: file
      },
      fields: 'id,webViewLink,webContentLink'
    });
    
    if (!result.result.id) {
      throw new Error('Failed to upload file to Google Drive');
    }
    
    // Make the file readable by anyone with the link
    await window.gapi.client.drive.permissions.create({
      fileId: result.result.id,
      resource: {
        role: 'reader',
        type: 'anyone'
      }
    });
    
    console.log("File uploaded successfully:", result.result);
    return result.result.webViewLink || result.result.webContentLink;
  } catch (error) {
    console.error('Error uploading file to Google Drive:', error);
    toast.error('Failed to upload resume to Google Drive. Please try again.');
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
  // Ensure the API is initialized
  const authorized = await ensureAuthorization();
  
  if (!authorized) {
    toast.error('Not connected to Google API');
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
  // Ensure the API is initialized
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
