import { toast } from 'sonner';
import { getOrCreateResumeFolder } from './folder';
import { ensureAuthorization } from './auth';

// Keep track of locally stored resumes (this will reset on page refresh)
const localResumeStorage = new Map<string, { url: string, filename: string }>();

/**
 * Upload a resume file to Google Drive
 */
export const uploadResumeToDrive = async (file: File, candidateId: string): Promise<string> => {
  // Ensure the API is initialized
  const authorized = await ensureAuthorization();
  
  // If we don't have Drive access, use local storage as fallback
  if (!authorized) {
    return storeResumeLocally(file, candidateId);
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
    
    // If Drive upload fails, fall back to local storage
    toast.warning('Google Drive upload failed. Using local storage fallback.');
    return storeResumeLocally(file, candidateId);
  }
};

/**
 * Store resume locally as fallback when Drive isn't available
 */
const storeResumeLocally = async (file: File, candidateId: string): Promise<string> => {
  try {
    // Create a local URL for the file
    const localUrl = URL.createObjectURL(file);
    const filename = `${candidateId}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    
    // Store in our local map
    localResumeStorage.set(candidateId, {
      url: localUrl,
      filename: filename
    });
    
    console.log('Resume stored locally:', { candidateId, filename });
    return localUrl;
  } catch (error) {
    console.error('Error storing resume locally:', error);
    toast.error('Failed to store resume. Please try again.');
    throw new Error('Failed to store resume');
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
  
  // First, include any locally stored resumes
  const localResumes = Array.from(localResumeStorage.entries()).map(([id, data]) => ({
    id,
    name: data.filename,
    url: data.url
  }));
  
  if (!authorized) {
    toast.warning('No access to Google Drive. Showing locally stored resumes only.');
    return localResumes;
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
      return localResumes; // Return only local resumes if no Drive files
    }
    
    // Combine Drive files with local files
    return [
      ...files.map((file: any) => ({
        id: file.id,
        name: file.name,
        url: file.webViewLink || file.webContentLink
      })),
      ...localResumes
    ];
  } catch (error) {
    console.error('Error listing resumes:', error);
    return localResumes; // Fall back to local resumes
  }
};

/**
 * Delete a resume from Google Drive
 */
export const deleteResumeFromDrive = async (fileId: string): Promise<boolean> => {
  // Check if it's a local file first
  for (const [id, data] of localResumeStorage.entries()) {
    if (data.url === fileId) {
      localResumeStorage.delete(id);
      return true;
    }
  }
  
  // If not local, try Drive
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
