
import React, { useState } from "react";
import { toast } from "sonner";
import { CandidateUploadFormProps } from "./types";
import CollapsibleSection from "./CollapsibleSection";
import CandidateLevels from "./CandidateLevels";
import PositionTitles from "./PositionTitles";
import SkillsSection from "./SkillsSection";
import AssetTypesSection from "./AssetTypesSection";
import SectorsSection from "./SectorsSection";
import ResumeUploader from "./ResumeUploader";
import FormHeader from "./FormHeader";
import HeadlineInput from "./HeadlineInput";
import SummaryInput from "./SummaryInput";
import TagsInput from "./TagsInput";
import LocationSection from "./LocationSection";
import SubmitButton from "./SubmitButton";

const CandidateUploadForm = ({ onSuccess, candidateCount = 0 }: CandidateUploadFormProps) => {
  const [isUploading, setIsUploading] = useState(false);
  
  // Generate a unique candidate ID combining timestamp and random string
  const [candidateId] = useState(
    `C${Date.now().toString().slice(-6)}${Math.random().toString(36).substring(2, 5).toUpperCase()}`
  );
  
  // Form fields
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
  
  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
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
      tags: tags.split(",").map(t => t.trim()).filter(t => t !== "")
    };
    
    console.log("Candidate data:", candidateData);
    
    setTimeout(() => {
      toast.success("Resume uploaded successfully");
      setIsUploading(false);
      
      if (onSuccess) {
        onSuccess();
      }
      
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
    }, 2000);
  };

  return (
    <form onSubmit={handleUpload} className="space-y-6">
      <FormHeader candidateId={candidateId} candidateCount={candidateCount} />
      
      <HeadlineInput headline={headline} onHeadlineChange={setHeadline} />
      
      <CollapsibleSection title="Candidate Level / Hierarchy">
        <CandidateLevels 
          selectedLevels={selectedLevels}
          onLevelChange={handleLevelChange}
        />
      </CollapsibleSection>
      
      <CollapsibleSection title="Position Titles">
        <PositionTitles 
          selectedTitleCategories={selectedTitleCategories}
          onTitleCategoryChange={handleTitleCategoryChange}
          selectedTitles={selectedTitles}
          onTitleChange={handleTitleChange}
          customTitles={customTitles}
          onCustomTitleChange={handleCustomTitleChange}
          onAddCustomTitle={addAnotherCustomTitle}
          onRemoveCustomTitle={removeCustomTitle}
        />
      </CollapsibleSection>
      
      <CollapsibleSection title="High-Level Skills">
        <SkillsSection 
          selectedSkills={selectedSkills}
          onSkillChange={handleSkillChange}
          customSkills={customSkills}
          onAddCustomSkill={addCustomSkill}
          onCustomSkillChange={handleCustomSkillChange}
          onRemoveCustomSkill={removeCustomSkill}
        />
      </CollapsibleSection>
      
      <CollapsibleSection title="Asset Type Experience">
        <AssetTypesSection 
          selectedAssetTypes={selectedAssetTypes}
          onAssetTypeChange={handleAssetTypeChange}
          customAssetTypes={customAssetTypes}
          onAddCustomAssetType={addCustomAssetType}
          onCustomAssetTypeChange={handleCustomAssetTypeChange}
          onRemoveCustomAssetType={removeCustomAssetType}
        />
      </CollapsibleSection>
      
      <CollapsibleSection title="Sector / Ownership Experience">
        <SectorsSection 
          selectedSectors={selectedSectors}
          onSectorChange={handleSectorChange}
          customSectors={customSectors}
          onAddCustomSector={addCustomSector}
          onCustomSectorChange={handleCustomSectorChange}
          onRemoveCustomSector={removeCustomSector}
        />
      </CollapsibleSection>
      
      <SummaryInput summary={summary} onSummaryChange={setSummary} />
      
      <TagsInput tags={tags} onTagsChange={setTags} />
      
      <LocationSection
        location={location}
        onLocationChange={setLocation}
        relocationPreference={relocationPreference}
        onRelocationChange={setRelocationPreference}
      />
      
      <ResumeUploader candidateId={candidateId} />
      
      <SubmitButton isUploading={isUploading} />
    </form>
  );
};

export default CandidateUploadForm;
