
import { useEffect } from 'react';
import { type Candidate } from '@/utils/sheets/types';

type UseCandidateEditProps = {
  candidateToEdit?: Candidate;
  setCandidateId: (id: string) => void;
  setResumeUrl: (url: string) => void;
  setResumeText: (text: string) => void;
  setHeadline: (headline: string) => void;
  setSummary: (summary: string) => void;
  setLocation: (location: string) => void;
  setTags: (tags: string) => void;
  setRelocationPreference: (preference: string) => void;
  setNotableEmployers: (employers: string) => void;
  handleLevelChange: (level: string, checked: boolean) => void;
  handleTitleCategoryChange: (category: string, checked: boolean) => void;
  handleSkillChange: (skill: string, checked: boolean) => void;
  handleAssetTypeChange: (assetType: string, checked: boolean) => void;
  handleSectorChange: (sector: string, checked: boolean) => void;
};

export const useCandidateEdit = ({
  candidateToEdit,
  setCandidateId,
  setResumeUrl,
  setResumeText,
  setHeadline,
  setSummary,
  setLocation,
  setTags,
  setRelocationPreference,
  setNotableEmployers,
  handleLevelChange,
  handleTitleCategoryChange,
  handleSkillChange,
  handleAssetTypeChange,
  handleSectorChange,
}: UseCandidateEditProps) => {
  // Effect to populate form with candidate data when editing
  useEffect(() => {
    if (candidateToEdit) {
      // Set basic info
      setCandidateId(candidateToEdit.id || '');
      setResumeUrl(candidateToEdit.resumeUrl || '');
      if (candidateToEdit.resumeText) {
        setResumeText(candidateToEdit.resumeText);
      }
      setHeadline(candidateToEdit.headline || '');
      setSummary(candidateToEdit.summary || '');
      setLocation(candidateToEdit.location || '');
      setTags(candidateToEdit.tags ? candidateToEdit.tags.join(', ') : '');
      setRelocationPreference(candidateToEdit.relocationPreference || 'flexible');
      setNotableEmployers(candidateToEdit.notableEmployers || '');

      // Handle levels
      if (candidateToEdit.levels && Array.isArray(candidateToEdit.levels)) {
        candidateToEdit.levels.forEach(level => {
          handleLevelChange(level, true);
        });
      }

      // For title categories and titles, this would require more complex mapping
      // This is just an example, you may need to adjust based on your data structure
      if (candidateToEdit.category) {
        handleTitleCategoryChange(candidateToEdit.category, true);
      }
      
      // For skills
      if (candidateToEdit.skills && Array.isArray(candidateToEdit.skills)) {
        candidateToEdit.skills.forEach(skill => {
          handleSkillChange(skill, true);
        });
      }
      
      // For asset types
      if (candidateToEdit.assetTypes && Array.isArray(candidateToEdit.assetTypes)) {
        candidateToEdit.assetTypes.forEach(assetType => {
          handleAssetTypeChange(assetType, true);
        });
      }
      
      // For sectors
      if (candidateToEdit.sectors && Array.isArray(candidateToEdit.sectors)) {
        candidateToEdit.sectors.forEach(sector => {
          handleSectorChange(sector, true);
        });
      }
    }
  }, [candidateToEdit]);
};
