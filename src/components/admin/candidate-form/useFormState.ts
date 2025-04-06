
import { useState } from "react";
import { toast } from "sonner";
import { ensureAuthorization } from "@/utils/sheets/auth-helper";
import { SPREADSHEET_ID, CANDIDATES_RANGE } from "@/utils/sheets/config";

export const useFormState = (onSuccess?: () => void) => {
  const [isUploading, setIsUploading] = useState(false);
  const [candidateId, setCandidateId] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [headline, setHeadline] = useState("");
  const [summary, setSummary] = useState("");
  const [location, setLocation] = useState("");
  
  // Multiple selections
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedTitleCategories, setSelectedTitleCategories] = useState<string[]>([]);
  const [selectedTitles, setSelectedTitles] = useState<Record<string, string[]>>({});
  const [customTitles, setCustomTitles] = useState<Record<string, string[]>>({});
  
  // Skills and experiences
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [customSkills, setCustomSkills] = useState<string[]>([]);
  
  const [selectedAssetTypes, setSelectedAssetTypes] = useState<string[]>([]);
  const [customAssetTypes, setCustomAssetTypes] = useState<string[]>([]);
  
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [customSectors, setCustomSectors] = useState<string[]>([]);
  
  // Tags (used for searchable keywords)
  const [tags, setTags] = useState("");
  
  const [relocationPreference, setRelocationPreference] = useState("flexible");

  // Handle candidate level selection/deselection
  const handleLevelChange = (level: string, checked: boolean) => {
    if (checked) {
      setSelectedLevels(prev => [...prev, level]);
    } else {
      setSelectedLevels(prev => prev.filter(l => l !== level));
    }
  };
  
  // Handle title category selection/deselection
  const handleTitleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedTitleCategories(prev => [...prev, category]);
      if (!selectedTitles[category]) {
        setSelectedTitles(prev => ({ ...prev, [category]: [] }));
        setCustomTitles(prev => ({ ...prev, [category]: [] }));
      }
    } else {
      setSelectedTitleCategories(prev => prev.filter(c => c !== category));
      const newSelectedTitles = { ...selectedTitles };
      delete newSelectedTitles[category];
      setSelectedTitles(newSelectedTitles);
      
      const newCustomTitles = { ...customTitles };
      delete newCustomTitles[category];
      setCustomTitles(newCustomTitles);
    }
  };
  
  // Handle title selection/deselection
  const handleTitleChange = (category: string, title: string, checked: boolean) => {
    if (checked) {
      setSelectedTitles(prev => ({
        ...prev,
        [category]: [...(prev[category] || []), title]
      }));
      
      if (title !== "Other") return;
      
      setCustomTitles(prev => ({
        ...prev,
        [category]: [...(prev[category] || []), ""]
      }));
    } else {
      setSelectedTitles(prev => ({
        ...prev,
        [category]: (prev[category] || []).filter(t => t !== title)
      }));
      
      if (title !== "Other") return;
      
      setCustomTitles(prev => ({
        ...prev,
        [category]: []
      }));
    }
  };
  
  // Update custom title
  const handleCustomTitleChange = (category: string, index: number, value: string) => {
    setCustomTitles(prev => {
      const updatedCustomTitles = [...(prev[category] || [])];
      updatedCustomTitles[index] = value;
      return {
        ...prev,
        [category]: updatedCustomTitles
      };
    });
  };
  
  // Add another "Other" option
  const addAnotherCustomTitle = (category: string) => {
    if (!selectedTitles[category]?.includes("Other")) {
      setSelectedTitles(prev => ({
        ...prev,
        [category]: [...(prev[category] || []), "Other"]
      }));
    }
    
    setCustomTitles(prev => ({
      ...prev,
      [category]: [...(prev[category] || []), ""]
    }));
  };
  
  // Remove a specific custom title
  const removeCustomTitle = (category: string, index: number) => {
    setCustomTitles(prev => {
      const updatedCustomTitles = [...(prev[category] || [])];
      updatedCustomTitles.splice(index, 1);
      
      if (updatedCustomTitles.length === 0) {
        setSelectedTitles(prev => ({
          ...prev,
          [category]: (prev[category] || []).filter(t => t !== "Other")
        }));
      }
      
      return {
        ...prev,
        [category]: updatedCustomTitles
      };
    });
  };
  
  // Handle skill selection
  const handleSkillChange = (skill: string, checked: boolean) => {
    if (checked) {
      setSelectedSkills(prev => [...prev, skill]);
    } else {
      setSelectedSkills(prev => prev.filter(s => s !== skill));
    }
  };
  
  // Add custom skill
  const addCustomSkill = () => {
    setCustomSkills(prev => [...prev, ""]);
  };
  
  // Update custom skill
  const handleCustomSkillChange = (index: number, value: string) => {
    setCustomSkills(prev => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };
  
  // Remove custom skill
  const removeCustomSkill = (index: number) => {
    setCustomSkills(prev => prev.filter((_, i) => i !== index));
  };
  
  // Handle asset type selection
  const handleAssetTypeChange = (assetType: string, checked: boolean) => {
    if (checked) {
      setSelectedAssetTypes(prev => [...prev, assetType]);
    } else {
      setSelectedAssetTypes(prev => prev.filter(a => a !== assetType));
    }
  };
  
  // Add custom asset type
  const addCustomAssetType = () => {
    setCustomAssetTypes(prev => [...prev, ""]);
  };
  
  // Update custom asset type
  const handleCustomAssetTypeChange = (index: number, value: string) => {
    setCustomAssetTypes(prev => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };
  
  // Remove custom asset type
  const removeCustomAssetType = (index: number) => {
    setCustomAssetTypes(prev => prev.filter((_, i) => i !== index));
  };
  
  // Handle sector selection
  const handleSectorChange = (sector: string, checked: boolean) => {
    if (checked) {
      setSelectedSectors(prev => [...prev, sector]);
    } else {
      setSelectedSectors(prev => prev.filter(s => s !== sector));
    }
  };
  
  // Add custom sector
  const addCustomSector = () => {
    setCustomSectors(prev => [...prev, ""]);
  };
  
  // Update custom sector
  const handleCustomSectorChange = (index: number, value: string) => {
    setCustomSectors(prev => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };
  
  // Remove custom sector
  const removeCustomSector = (index: number) => {
    setCustomSectors(prev => prev.filter((_, i) => i !== index));
  };

  const saveToGoogleSheets = async (candidateData: any) => {
    try {
      // Check if we're authorized to use Google Sheets
      const authorized = await ensureAuthorization();
      
      if (!authorized) {
        toast.error("Please connect to Google first");
        return false;
      }
      
      // Format the data for Google Sheets
      // This structure should match the expected column order in your sheet
      const rowData = [
        candidateData.id,                                               // ID
        candidateData.headline,                                         // Headline
        candidateData.sectors.join(', '),                                // Sectors
        candidateData.tags.join(', '),                                   // Tags
        candidateData.resumeUrl,                                         // Resume URL
        candidateData.titleCategories[0] || '',                          // Primary Category
        candidateData.titles[candidateData.titleCategories[0]]?.[0] || '', // Primary Title
        candidateData.summary,                                           // Summary
        candidateData.location,                                          // Location
        candidateData.relocationPreference                               // Relocation Preference
      ];
      
      // Append the data to the Google Sheet
      await window.gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: CANDIDATES_RANGE,
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
        resource: {
          values: [rowData]
        }
      });
      
      return true;
    } catch (error) {
      console.error('Error saving to Google Sheets:', error);
      toast.error('Failed to save to Google Sheets');
      return false;
    }
  };

  const resetForm = () => {
    setCandidateId("");
    setHeadline("");
    setSummary("");
    setLocation("");
    setSelectedLevels([]);
    setSelectedTitleCategories([]);
    setSelectedTitles({});
    setCustomTitles({});
    setSelectedSkills([]);
    setCustomSkills([]);
    setSelectedAssetTypes([]);
    setCustomAssetTypes([]);
    setSelectedSectors([]);
    setCustomSectors([]);
    setTags("");
    setRelocationPreference("flexible");
    setResumeUrl("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate candidateId exists
    if (!candidateId.trim()) {
      toast.error("Please enter a Candidate ID");
      return;
    }
    
    // Validate that a resume URL exists
    if (!resumeUrl) {
      toast.error("Please upload a resume first");
      return;
    }
    
    setIsUploading(true);
    
    const processedTitles: Record<string, string[]> = {};
    
    selectedTitleCategories.forEach(category => {
      processedTitles[category] = [];
      
      selectedTitles[category]?.forEach(title => {
        if (title !== "Other") {
          processedTitles[category].push(title);
        }
      });
      
      if (customTitles[category]) {
        customTitles[category].forEach(customTitle => {
          if (customTitle.trim()) {
            processedTitles[category].push(customTitle);
          }
        });
      }
    });
    
    const candidateData = {
      id: candidateId,
      headline,
      levels: selectedLevels,
      titleCategories: selectedTitleCategories,
      titles: processedTitles,
      summary,
      location,
      relocationPreference,
      skills: [
        ...selectedSkills,
        ...customSkills.filter(skill => skill.trim() !== "")
      ],
      assetTypes: [
        ...selectedAssetTypes,
        ...customAssetTypes.filter(type => type.trim() !== "")
      ],
      sectors: [
        ...selectedSectors,
        ...customSectors.filter(sector => sector.trim() !== "")
      ],
      tags: tags.split(",").map(t => t.trim()).filter(t => t !== ""),
      resumeUrl
    };
    
    console.log("Candidate data:", candidateData);
    
    try {
      // Attempt to save to Google Sheets
      const saved = await saveToGoogleSheets(candidateData);
      
      if (saved) {
        toast.success("Resume uploaded and data saved to Google Sheets");
        
        if (onSuccess) {
          onSuccess();
        }
        
        // Reset form fields
        resetForm();
      }
    } catch (error) {
      console.error("Error in form submission:", error);
      toast.error("There was an error saving your data");
    } finally {
      setIsUploading(false);
    }
  };

  return {
    // Form states
    isUploading,
    candidateId,
    setCandidateId,
    resumeUrl,
    setResumeUrl,
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
    
    // Form submission
    handleSubmit
  };
};
