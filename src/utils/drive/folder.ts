
import { toast } from 'sonner';
import { getResumeFolderId, setResumeFolderId, RESUME_FOLDER_NAME } from './config';
import { ensureAuthorization } from './auth';

/**
 * Get or create a folder for storing resumes
 */
export const getOrCreateResumeFolder = async (): Promise<string> => {
  // Return cached folder ID if available
  const folderId = getResumeFolderId();
  if (folderId) {
    return folderId;
  }
  
  try {
    // Ensure we're authorized before proceeding
    const authorized = await ensureAuthorization();
    if (!authorized) {
      throw new Error('Not authorized to access Google Drive');
    }

    // Check if the folder already exists
    const response = await window.gapi.client.drive.files.list({
      q: `name='${RESUME_FOLDER_NAME}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
      spaces: 'drive',
      fields: 'files(id, name)'
    });
    
    const files = response.result.files;
    
    if (files && files.length > 0) {
      // Folder exists, use its ID
      const id = files[0].id;
      setResumeFolderId(id);
      return id;
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
    
    const newId = folder.result.id;
    setResumeFolderId(newId);
    return newId;
  } catch (error) {
    console.error('Error getting or creating resume folder:', error);
    throw new Error('Failed to access or create resume storage folder');
  }
};
