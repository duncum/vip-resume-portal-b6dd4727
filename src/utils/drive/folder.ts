
import { toast } from 'sonner';
import { getResumeFolderId, setResumeFolderId, RESUME_FOLDER_NAME, RESUME_FOLDER_ID_DEFAULT } from './config';
import { ensureAuthorization } from './auth';

// Fallback folder ID for when we can't create one (using user's folder)
const FALLBACK_FOLDER_ID = RESUME_FOLDER_ID_DEFAULT || 'root';

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
      console.warn('Not authorized to access Google Drive, using fallback folder');
      return FALLBACK_FOLDER_ID;
    }

    // If we have a default folder ID, check if it exists and is accessible
    if (RESUME_FOLDER_ID_DEFAULT) {
      try {
        // Try to access the folder using the ID
        const response = await window.gapi.client.drive.files.get({
          fileId: RESUME_FOLDER_ID_DEFAULT,
          fields: 'id,name'
        });
        
        if (response.result.id) {
          // Folder exists and is accessible
          console.log(`Using existing folder: ${response.result.name} (${response.result.id})`);
          setResumeFolderId(response.result.id);
          return response.result.id;
        }
      } catch (error) {
        console.warn('Could not access the default folder, will fall back to searching by name:', error);
      }
    }

    // Check if the folder already exists by name
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
    // If we can't create or access a folder, use the fallback folder ID
    return FALLBACK_FOLDER_ID;
  }
};
