import { useState } from "react";
import { toast } from "sonner";
import { addCandidate } from "@/utils/sheets";

// Helper function to get selected items from a list
const getSelectedItems = (selected: string[], custom: string[]): string[] => {
  return [...selected, ...custom.filter(item => item.trim() !== "")];
};

export const useFormState = (onSuccess?: () => void) => {
  const [isUploading, setIsUploading] = useState(false);
  
  // Basic info
  const [candidateId, setCandidateId] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [resumeText, setResumeText] = useState(""); // Add resume text state
  const [headline, setHeadline] = useState("");
  const [summary, setSummary] = useState("");
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState("");
  const [relocationPreference, setRelocationPreference] = useState("flexible");
  const [notableEmployers, setNotableEmployers] = useState("");
  
  // Levels
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const handleLevelChange = (level: string, checked: boolean) => {
    setSelectedLevels(prev => checked ? [...prev, level] : prev.filter(l => l !== level));
  };
  
  // Titles
  const [selectedTitleCategories, setSelectedTitleCategories] = useState<string[]>([]);
  const handleTitleCategoryChange = (category: string, checked: boolean) => {
    setSelectedTitleCategories(prev => checked ? [...prev, category] : prev.filter(c => c !== category));
  };
  
  const [selectedTitles, setSelectedTitles] = useState<Record<string, string[]>>({});
  const handleTitleChange = (category: string, title: string, checked: boolean) => {
    setSelectedTitles(prev => ({
      ...prev,
      [category]: checked ? [...(prev[category] || []), title] : (prev[category] || []).filter(t => t !== title)
    }));
  };
  
  const [customTitles, setCustomTitles] = useState<Record<string, string[]>>({});
  const handleCustomTitleChange = (category: string, index: number, value: string) => {
    setCustomTitles(prev => {
      const categoryTitles = [...(prev[category] || [])];
      categoryTitles[index] = value;
      return { ...prev, [category]: categoryTitles };
    });
  };
  
  const addAnotherCustomTitle = (category: string) => {
    setCustomTitles(prev => ({
      ...prev,
      [category]: [...(prev[category] || []), ""]
    }));
  };
  
  const removeCustomTitle = (category: string, index: number) => {
    setCustomTitles(prev => {
      const categoryTitles = [...(prev[category] || [])];
      categoryTitles.splice(index, 1);
      return { ...prev, [category]: categoryTitles };
    });
  };
  
  const getTitlesObject = () => {
    const titles: Record<string, string[]> = {};
    selectedTitleCategories.forEach(category => {
      titles[category] = getSelectedItems(selectedTitles[category] || [], customTitles[category] || []);
    });
    return titles;
  };
  
  // Skills
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const handleSkillChange = (item: string, checked: boolean) => {
    setSelectedSkills(prev => checked ? [...prev, item] : prev.filter(i => i !== item));
  };
  
  const [customSkills, setCustomSkills] = useState<string[]>([]);
  const addCustomSkill = () => {
    setCustomSkills(prev => [...prev, ""]);
  };
  
  const handleCustomSkillChange = (index: number, value: string) => {
    setCustomSkills(prev => {
      const newSkills = [...prev];
      newSkills[index] = value;
      return newSkills;
    });
  };
  
  const removeCustomSkill = (index: number) => {
    setCustomSkills(prev => prev.filter((_, i) => i !== index));
  };
  
  // Asset Types
  const [selectedAssetTypes, setSelectedAssetTypes] = useState<string[]>([]);
  const handleAssetTypeChange = (item: string, checked: boolean) => {
    setSelectedAssetTypes(prev => checked ? [...prev, item] : prev.filter(i => i !== item));
  };
  
  const [customAssetTypes, setCustomAssetTypes] = useState<string[]>([]);
  const addCustomAssetType = () => {
    setCustomAssetTypes(prev => [...prev, ""]);
  };
  
  const handleCustomAssetTypeChange = (index: number, value: string) => {
    setCustomAssetTypes(prev => {
      const newAssetTypes = [...prev];
      newAssetTypes[index] = value;
      return newAssetTypes;
    });
  };
  
  const removeCustomAssetType = (index: number) => {
    setCustomAssetTypes(prev => prev.filter((_, i) => i !== index));
  };
  
  // Sectors
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const handleSectorChange = (item: string, checked: boolean) => {
    setSelectedSectors(prev => checked ? [...prev, item] : prev.filter(i => i !== item));
  };
  
  const [customSectors, setCustomSectors] = useState<string[]>([]);
  const addCustomSector = () => {
    setCustomSectors(prev => [...prev, ""]);
  };
  
  const handleCustomSectorChange = (index: number, value: string) => {
    setCustomSectors(prev => {
      const newSectors = [...prev];
      newSectors[index] = value;
      return newSectors;
    });
  };
  
  const removeCustomSector = (index: number) => {
    setCustomSectors(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsUploading(true);
    
    if (!candidateId.trim()) {
      toast.error("Please enter a Candidate ID");
      setIsUploading(false);
      return;
    }
    
    if (!headline.trim()) {
      toast.error("Please enter a Headline");
      setIsUploading(false);
      return;
    }
    
    // Create the candidate object to send to the API
    const candidateData = {
      id: candidateId,
      headline,
      sectors: getSelectedItems(selectedSectors, customSectors),
      tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
      resumeUrl,
      resumeText, // Add resume text to candidate data
      titleCategories: selectedTitleCategories,
      titles: getTitlesObject(),
      summary,
      location,
      relocationPreference,
      notableEmployers,
      // Levels
      levels: selectedLevels
    };
    
    try {
      const success = await addCandidate(candidateData);
      
      if (success) {
        // Reset form
        setCandidateId("");
        setResumeUrl("");
        setResumeText(""); // Reset resume text
        setHeadline("");
        setSummary("");
        setLocation("");
        setTags("");
        setRelocationPreference("flexible");
        setNotableEmployers("");
        
        // Reset levels
        setSelectedLevels([]);
        
        // Reset titles
        setSelectedTitleCategories([]);
        setSelectedTitles({});
        setCustomTitles({});
        
        // Reset skills
        setSelectedSkills([]);
        setCustomSkills([]);
        
        // Reset asset types
        setSelectedAssetTypes([]);
        setCustomAssetTypes([]);
        
        // Reset sectors
        setSelectedSectors([]);
        setCustomSectors([]);
        
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error) {
      console.error("Error adding candidate:", error);
      toast.error("Failed to add candidate");
    } finally {
      setIsUploading(false);
    }
  };
  
  return {
    isUploading,
    candidateId,
    setCandidateId,
    resumeUrl,
    setResumeUrl,
    resumeText,
    setResumeText,
    headline,
    setHeadline,
    summary,
    setSummary,
    location,
    setLocation,
    tags,
    setTags,
    relocationPreference,
    setRelocationPreference,
    notableEmployers,
    setNotableEmployers,
    
    // Levels
    selectedLevels,
    handleLevelChange,
    
    // Titles
    selectedTitleCategories,
    handleTitleCategoryChange,
    selectedTitles,
    handleTitleChange,
    customTitles,
    handleCustomTitleChange,
    addAnotherCustomTitle,
    removeCustomTitle,
    
    // Skills
    selectedSkills,
    handleSkillChange,
    customSkills,
    addCustomSkill,
    handleCustomSkillChange,
    removeCustomSkill,
    
    // Asset Types
    selectedAssetTypes,
    handleAssetTypeChange,
    customAssetTypes,
    addCustomAssetType,
    handleCustomAssetTypeChange,
    removeCustomAssetType,
    
    // Sectors
    selectedSectors,
    handleSectorChange,
    customSectors,
    addCustomSector,
    handleCustomSectorChange,
    removeCustomSector,
    
    handleSubmit
  };
};
