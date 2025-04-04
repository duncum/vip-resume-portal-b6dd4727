import React, { useState, useEffect } from "react";
import { MapPin, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { CandidateUploadFormProps } from "./types";
import CollapsibleSection from "./CollapsibleSection";
import CandidateLevels from "./CandidateLevels";
import PositionTitles from "./PositionTitles";
import SkillsSection from "./SkillsSection";
import AssetTypesSection from "./AssetTypesSection";
import SectorsSection from "./SectorsSection";
import ResumeUploader from "./ResumeUploader";

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
      <div className="flex justify-between items-center pb-4 mb-4 border-b">
        <div>
          <h3 className="text-xl font-medium">Upload New Resume</h3>
          <p className="text-sm text-gray-500">Candidate ID: <span className="font-mono text-gold">{candidateId}</span></p>
        </div>
        <Badge variant="outline" className="text-gold border-gold">
          {candidateCount} Candidates
        </Badge>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Candidate Headline</label>
        <Input 
          placeholder="e.g. Senior Marketing Executive with 10+ years experience" 
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
        />
      </div>
      
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
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Candidate Summary</label>
        <Textarea 
          placeholder="Brief description of candidate's background and strengths"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="min-h-[100px]"
        />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Additional Tags (comma separated)</label>
        <Input 
          placeholder="e.g. Leadership, Digital Marketing, Strategic Planning"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <p className="text-xs text-grey-500">Use tags for additional searchable keywords</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Current Location</label>
          <div className="flex items-center">
            <MapPin className="mr-2 h-4 w-4 text-grey-400" />
            <Input 
              placeholder="e.g. New York, NY"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Relocation Preference</label>
          <RadioGroup 
            value={relocationPreference} 
            onValueChange={setRelocationPreference}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="willing" id="r1" />
              <label htmlFor="r1" className="text-sm">Open to relocation</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="remote-only" id="r2" />
              <label htmlFor="r2" className="text-sm">Remote only</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="flexible" id="r3" />
              <label htmlFor="r3" className="text-sm">Flexible</label>
            </div>
          </RadioGroup>
        </div>
      </div>
      
      <ResumeUploader candidateId={candidateId} />
      
      <Button 
        type="submit" 
        className="w-full bg-gold hover:bg-gold-dark text-white"
        disabled={isUploading}
      >
        {isUploading ? (
          <>
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
            Uploading...
          </>
        ) : (
          "Upload Resume"
        )}
      </Button>
    </form>
  );
};

export default CandidateUploadForm;
