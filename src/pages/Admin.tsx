
import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, UserPlus, FileText, Tag, MapPin, Plus, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { toast } from "sonner";
import { addCandidate } from "@/utils/googleSheets";
import { cn } from "@/lib/utils";

// Candidate Hierarchy/Level
const candidateLevels = [
  "Executive",
  "Director",
  "Mid-Senior Level",
  "Emerging Executive",
  "One Man Army",
  "Confidential Executive",
  "C-Suite Ready",
  "VP-Ready",
  "Actively Seeking",
  "Passive / Open to Opportunity",
  "Founder-Level",
  "Under-the-Radar Talent"
];

// Category descriptions
const categoryDescriptions = {
  "Executive": "C-Suite and top-level leadership with P&L, strategy, board exposure, or legacy impact",
  "Director": "Strategic leaders managing regions, portfolios or departments; usually reporting to VP or C-Suite",
  "Mid-Senior Level": "Experienced operators managing functions or teams, but not the full department",
  "Emerging Executive": "Rising talent with high potential for leadership roles; VP-ready talent",
  "One Man Army": "Independent professionals who can handle multiple aspects of projects independently",
  "Confidential Executive": "Currently employed leaders conducting a confidential search",
  "C-Suite Ready": "Ready to step into C-Suite roles immediately",
  "VP-Ready": "Ready to step into VP-level leadership roles",
  "Actively Seeking": "Currently looking for new opportunities",
  "Passive / Open to Opportunity": "Not actively looking but open to the right opportunity",
  "Founder-Level": "Experience as founder or co-founder of a business",
  "Under-the-Radar Talent": "Exceptional talent that hasn't received due recognition"
};

// Role titles organized by category
const roleTitles = {
  "C-SUITE / EXECUTIVE": [
    "CEO",
    "President",
    "Founder",
    "Managing Partner",
    "Principal",
    "COO – Operations",
    "CIO – Investments",
    "CDO – Development",
    "CFO – Accounting & Compliance",
    "CFO – Capital Markets & Strategy",
    "CHRO – Chief Human Resources Officer",
    "CPO – Chief People Officer",
    "Chief of Staff",
    "Executive Vice President",
    "General Manager",
    "Regional Vice President",
    "Family Office Executive",
    "Other"
  ],
  "SENIOR LEADERSHIP / DIVISION HEADS": [
    "Head of Development",
    "Head of Acquisitions",
    "Head of Asset Management",
    "Head of Capital Markets",
    "Head of Construction",
    "Head of Investor Relations",
    "Head of HR",
    "Head of People & Culture",
    "Managing Director",
    "SVP – Development",
    "SVP – Investments",
    "SVP – Finance",
    "SVP – Human Resources",
    "VP – Development",
    "VP – Construction",
    "VP – Asset Management",
    "VP – Investor Relations",
    "VP – Finance",
    "VP – Capital Markets",
    "VP – Property Management",
    "VP – Design & Architecture",
    "VP – Human Resources",
    "Studio Director",
    "Other"
  ],
  "DIRECTOR-LEVEL": [
    "Director of Development",
    "Director of Construction",
    "Director of Investments",
    "Director of Acquisitions",
    "Director of Capital Markets",
    "Director of Finance",
    "Director of FP&A",
    "Director of Architecture",
    "Director of Design",
    "Director of Investor Relations",
    "Director of Procurement",
    "Director of HR",
    "Portfolio Director",
    "Project Executive",
    "Controller",
    "Other"
  ],
  "MANAGER / SENIOR INDIVIDUAL CONTRIBUTOR": [
    "Development Manager",
    "Construction Manager",
    "Acquisitions Manager",
    "Asset Manager",
    "Procurement Manager",
    "Entitlements Manager",
    "Pre-Development Manager",
    "Investor Relations Manager",
    "Financial Planning Manager",
    "Project Architect",
    "Facilities Director",
    "Property Manager",
    "Regional Property Manager",
    "FF&E Manager",
    "Assistant Project Manager",
    "Analyst – Investment",
    "Analyst – Acquisitions",
    "Analyst – Asset Management",
    "Analyst – Financial",
    "Analyst – FP&A",
    "Other"
  ]
};

// High-level skills
const highLevelSkills = [
  "Capital Stack Strategy",
  "Fund Management",
  "JV Structuring",
  "Investor Relations",
  "Financial Modeling",
  "Proforma Development",
  "Site Selection",
  "Development Lifecycle Management",
  "Ground-Up Development",
  "Construction Oversight",
  "Asset Management",
  "Acquisitions",
  "Underwriting",
  "Entitlements",
  "Budget & Forecasting",
  "Debt Sourcing",
  "Equity Sourcing",
  "Portfolio Management",
  "Public-Private Partnerships",
  "ESG Strategy",
  "Strategic Planning",
  "Organizational Scaling",
  "Vertical Integration Strategy",
  "Exit Strategy",
  "Disposition Strategy"
];

// Asset type experience
const assetTypes = [
  "Multifamily",
  "Build-to-Rent (BTR)",
  "Affordable Housing",
  "Senior Living",
  "Student Housing",
  "Mixed-Use",
  "Office",
  "Industrial",
  "Retail",
  "Hospitality",
  "Medical Office",
  "Self-Storage",
  "Land Development",
  "Data Centers",
  "Manufactured Housing",
  "Single-Family Rental (SFR)",
  "Specialty Assets"
];

// Sector/ownership experience
const sectorExperience = [
  "Institutional",
  "Private Equity",
  "Family Office",
  "REIT",
  "Owner/Operator",
  "Developer",
  "Syndicator",
  "Merchant Builder",
  "Nonprofit",
  "Public-Sector",
  "Interior Design Firm",
  "Architecture Firm",
  "Construction Firm"
];

const Admin = () => {
  const [isUploading, setIsUploading] = useState(false);
  
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
      // Initialize titles array for this category if it doesn't exist
      if (!selectedTitles[category]) {
        setSelectedTitles(prev => ({ ...prev, [category]: [] }));
        setCustomTitles(prev => ({ ...prev, [category]: [] }));
      }
    } else {
      setSelectedTitleCategories(prev => prev.filter(c => c !== category));
      // Remove titles for this category
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
      
      // If it's not "Other", we don't need to add a custom title
      if (title !== "Other") return;
      
      // Add an empty string for the custom title
      setCustomTitles(prev => ({
        ...prev,
        [category]: [...(prev[category] || []), ""]
      }));
    } else {
      // Remove the title
      setSelectedTitles(prev => ({
        ...prev,
        [category]: (prev[category] || []).filter(t => t !== title)
      }));
      
      // If it's not "Other", we don't need to remove a custom title
      if (title !== "Other") return;
      
      // If we're unchecking "Other", remove all custom titles for this category
      if (!prev[category]?.includes("Other")) {
        setCustomTitles(prev => ({
          ...prev,
          [category]: []
        }));
      }
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
    // First make sure "Other" is selected for this category
    if (!selectedTitles[category]?.includes("Other")) {
      setSelectedTitles(prev => ({
        ...prev,
        [category]: [...(prev[category] || []), "Other"]
      }));
    }
    
    // Add another empty custom title field
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
      
      // If no more custom titles, unselect "Other"
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
    
    // Process all titles including custom "Other" titles
    const processedTitles: Record<string, string[]> = {};
    
    selectedTitleCategories.forEach(category => {
      processedTitles[category] = [];
      
      // Add all non-"Other" titles
      selectedTitles[category]?.forEach(title => {
        if (title !== "Other") {
          processedTitles[category].push(title);
        }
      });
      
      // Add all custom titles
      if (customTitles[category]) {
        customTitles[category].forEach(customTitle => {
          if (customTitle.trim()) {
            processedTitles[category].push(customTitle);
          }
        });
      }
    });
    
    // Prepare candidate data
    const candidateData = {
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
    
    // Simulate upload
    console.log("Candidate data:", candidateData);
    
    setTimeout(() => {
      toast.success("Resume uploaded successfully");
      setIsUploading(false);
      
      // Optional: Reset form
      // setHeadline("");
      // setSummary("");
      // setLocation("");
      // setSelectedLevels([]);
      // setSelectedTitleCategories([]);
      // setSelectedTitles({});
      // setCustomTitles({});
      // setSelectedSkills([]);
      // setCustomSkills([]);
      // setSelectedAssetTypes([]);
      // setCustomAssetTypes([]);
      // setSelectedSectors([]);
      // setCustomSectors([]);
      // setTags("");
      // setRelocationPreference("flexible");
    }, 2000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold font-display mb-2">
            Admin <span className="text-gold">Dashboard</span>
          </h1>
          <p className="text-grey-600 max-w-2xl mx-auto">
            Manage your candidates and resumes from this central admin panel.
          </p>
        </div>
        
        <Tabs defaultValue="upload" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="upload" className="data-[state=active]:bg-gold data-[state=active]:text-white">
              Upload Resume
            </TabsTrigger>
            <TabsTrigger value="manage" className="data-[state=active]:bg-gold data-[state=active]:text-white">
              Manage Candidates
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-gold data-[state=active]:text-white">
              View Analytics
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Upload New Resume</CardTitle>
                <CardDescription>
                  Upload a PDF resume and add candidate information to the portal.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpload} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Candidate Headline</label>
                    <Input 
                      placeholder="e.g. Senior Marketing Executive with 10+ years experience" 
                      value={headline}
                      onChange={(e) => setHeadline(e.target.value)}
                    />
                  </div>
                  
                  {/* Candidate Levels / Hierarchy */}
                  <Collapsible className="border rounded-md p-4">
                    <CollapsibleTrigger className="flex justify-between items-center w-full">
                      <h3 className="text-sm font-medium">Candidate Level / Hierarchy</h3>
                      <Plus className="h-4 w-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-3">
                      <p className="text-xs text-grey-600 mb-2">Select all levels that apply:</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                        {candidateLevels.map((level) => (
                          <div key={level} className="flex items-start space-x-2">
                            <Checkbox 
                              id={`level-${level}`} 
                              checked={selectedLevels.includes(level)}
                              onCheckedChange={(checked) => handleLevelChange(level, checked === true)}
                            />
                            <div>
                              <label 
                                htmlFor={`level-${level}`} 
                                className="text-sm cursor-pointer"
                              >
                                {level}
                              </label>
                              <p className="text-xs text-grey-500">
                                {categoryDescriptions[level as keyof typeof categoryDescriptions]}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                  
                  {/* Titles by Category */}
                  <Collapsible className="border rounded-md p-4">
                    <CollapsibleTrigger className="flex justify-between items-center w-full">
                      <h3 className="text-sm font-medium">Position Titles</h3>
                      <Plus className="h-4 w-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-3">
                      <p className="text-xs text-grey-600 mb-2">Select all title categories that apply:</p>
                      
                      <div className="space-y-4">
                        {Object.keys(roleTitles).map((category) => (
                          <div key={category} className="border rounded-md p-4">
                            <div className="flex items-start space-x-2 mb-3">
                              <Checkbox 
                                id={`category-${category}`} 
                                checked={selectedTitleCategories.includes(category)}
                                onCheckedChange={(checked) => handleTitleCategoryChange(category, checked === true)}
                              />
                              <label 
                                htmlFor={`category-${category}`} 
                                className="text-sm font-medium cursor-pointer"
                              >
                                {category}
                              </label>
                            </div>
                            
                            {selectedTitleCategories.includes(category) && (
                              <div className="pl-6">
                                <p className="text-xs text-grey-600 mb-2">Select all titles that apply:</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                                  {roleTitles[category as keyof typeof roleTitles].map((title) => (
                                    <div key={title} className="flex items-center space-x-2">
                                      <Checkbox 
                                        id={`${category}-title-${title}`}
                                        checked={(selectedTitles[category] || []).includes(title)}
                                        onCheckedChange={(checked) => handleTitleChange(category, title, checked === true)}
                                      />
                                      <label 
                                        htmlFor={`${category}-title-${title}`}
                                        className="text-sm cursor-pointer"
                                      >
                                        {title}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                                
                                {(selectedTitles[category] || []).includes("Other") && (
                                  <div className="space-y-2">
                                    {(customTitles[category] || []).map((customTitle, index) => (
                                      <div key={index} className="flex items-center space-x-2">
                                        <Input 
                                          placeholder="Enter custom title" 
                                          value={customTitle}
                                          onChange={(e) => handleCustomTitleChange(category, index, e.target.value)}
                                          className="flex-1"
                                        />
                                        <Button 
                                          type="button"
                                          variant="ghost"
                                          size="icon"
                                          onClick={() => removeCustomTitle(category, index)}
                                        >
                                          <X className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    ))}
                                    
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="sm"
                                      onClick={() => addAnotherCustomTitle(category)}
                                      className="flex items-center mt-1 border-dashed border-gray-300 text-gray-500"
                                    >
                                      <Plus className="h-3 w-3 mr-1" /> Add Another Custom Title
                                    </Button>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                  
                  {/* Skills */}
                  <Collapsible className="border rounded-md p-4">
                    <CollapsibleTrigger className="flex justify-between items-center w-full">
                      <h3 className="text-sm font-medium">High-Level Skills</h3>
                      <Plus className="h-4 w-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-3">
                      <p className="text-xs text-grey-600 mb-2">Select relevant skills:</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
                        {highLevelSkills.map((skill) => (
                          <div key={skill} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`skill-${skill}`}
                              checked={selectedSkills.includes(skill)}
                              onCheckedChange={(checked) => handleSkillChange(skill, checked === true)}
                            />
                            <label 
                              htmlFor={`skill-${skill}`}
                              className="text-sm cursor-pointer"
                            >
                              {skill}
                            </label>
                          </div>
                        ))}
                      </div>
                      
                      {/* Custom skills */}
                      {customSkills.length > 0 && (
                        <div className="mt-3 space-y-2">
                          <p className="text-xs text-grey-600">Custom skills:</p>
                          {customSkills.map((skill, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <Input 
                                placeholder="Enter custom skill" 
                                value={skill}
                                onChange={(e) => handleCustomSkillChange(index, e.target.value)}
                                className="flex-1"
                              />
                              <Button 
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => removeCustomSkill(index)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addCustomSkill}
                        className="flex items-center mt-3 border-dashed border-gray-300 text-gray-500"
                      >
                        <Plus className="h-3 w-3 mr-1" /> Add Custom Skill
                      </Button>
                    </CollapsibleContent>
                  </Collapsible>
                  
                  {/* Asset Types */}
                  <Collapsible className="border rounded-md p-4">
                    <CollapsibleTrigger className="flex justify-between items-center w-full">
                      <h3 className="text-sm font-medium">Asset Type Experience</h3>
                      <Plus className="h-4 w-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-3">
                      <p className="text-xs text-grey-600 mb-2">Select relevant asset types:</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
                        {assetTypes.map((assetType) => (
                          <div key={assetType} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`asset-${assetType}`}
                              checked={selectedAssetTypes.includes(assetType)}
                              onCheckedChange={(checked) => handleAssetTypeChange(assetType, checked === true)}
                            />
                            <label 
                              htmlFor={`asset-${assetType}`}
                              className="text-sm cursor-pointer"
                            >
                              {assetType}
                            </label>
                          </div>
                        ))}
                      </div>
                      
                      {/* Custom asset types */}
                      {customAssetTypes.length > 0 && (
                        <div className="mt-3 space-y-2">
                          <p className="text-xs text-grey-600">Custom asset types:</p>
                          {customAssetTypes.map((type, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <Input 
                                placeholder="Enter custom asset type" 
                                value={type}
                                onChange={(e) => handleCustomAssetTypeChange(index, e.target.value)}
                                className="flex-1"
                              />
                              <Button 
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => removeCustomAssetType(index)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addCustomAssetType}
                        className="flex items-center mt-3 border-dashed border-gray-300 text-gray-500"
                      >
                        <Plus className="h-3 w-3 mr-1" /> Add Custom Asset Type
                      </Button>
                    </CollapsibleContent>
                  </Collapsible>
                  
                  {/* Sector Experience */}
                  <Collapsible className="border rounded-md p-4">
                    <CollapsibleTrigger className="flex justify-between items-center w-full">
                      <h3 className="text-sm font-medium">Sector / Ownership Experience</h3>
                      <Plus className="h-4 w-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-3">
                      <p className="text-xs text-grey-600 mb-2">Select relevant sectors:</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
                        {sectorExperience.map((sector) => (
                          <div key={sector} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`sector-${sector}`}
                              checked={selectedSectors.includes(sector)}
                              onCheckedChange={(checked) => handleSectorChange(sector, checked === true)}
                            />
                            <label 
                              htmlFor={`sector-${sector}`}
                              className="text-sm cursor-pointer"
                            >
                              {sector}
                            </label>
                          </div>
                        ))}
                      </div>
                      
                      {/* Custom sectors */}
                      {customSectors.length > 0 && (
                        <div className="mt-3 space-y-2">
                          <p className="text-xs text-grey-600">Custom sectors:</p>
                          {customSectors.map((sector, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <Input 
                                placeholder="Enter custom sector" 
                                value={sector}
                                onChange={(e) => handleCustomSectorChange(index, e.target.value)}
                                className="flex-1"
                              />
                              <Button 
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => removeCustomSector(index)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addCustomSector}
                        className="flex items-center mt-3 border-dashed border-gray-300 text-gray-500"
                      >
                        <Plus className="h-3 w-3 mr-1" /> Add Custom Sector
                      </Button>
                    </CollapsibleContent>
                  </Collapsible>
                  
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
                  
                  <div className="border-2 border-dashed border-grey-300 rounded-md p-6 flex flex-col items-center justify-center">
                    <Upload className="h-10 w-10 text-grey-400 mb-2" />
                    <p className="text-sm text-grey-600 mb-4">Drag and drop or click to upload PDF resume</p>
                    <Input 
                      type="file"
                      accept=".pdf"
                      className="max-w-xs"
                    />
                  </div>
                  
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
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="manage">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Manage Candidates</CardTitle>
                <CardDescription>
                  View, edit, or remove candidates from the portal.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <UserPlus className="mx-auto h-12 w-12 text-grey-400 mb-3" />
                  <h3 className="text-lg font-medium mb-2">No Candidates Yet</h3>
                  <p className="text-grey-500 mb-4">Upload your first resume to get started.</p>
                  <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-white">
                    <Upload className="mr-2 h-4 w-4" /> Upload Resume
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">View Analytics</CardTitle>
                <CardDescription>
                  Track resume views and engagement statistics.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-grey-100 p-4 rounded-md text-center">
                    <div className="text-3xl font-bold mb-1 text-gold">0</div>
                    <div className="text-sm text-grey-600">Total Views</div>
                  </div>
                  <div className="bg-grey-100 p-4 rounded-md text-center">
                    <div className="text-3xl font-bold mb-1 text-gold">0</div>
                    <div className="text-sm text-grey-600">Unique Visitors</div>
                  </div>
                  <div className="bg-grey-100 p-4 rounded-md text-center">
                    <div className="text-3xl font-bold mb-1 text-gold">0</div>
                    <div className="text-sm text-grey-600">Downloads</div>
                  </div>
                </div>
                
                <div className="text-center py-6">
                  <FileText className="mx-auto h-12 w-12 text-grey-400 mb-3" />
                  <h3 className="text-lg font-medium mb-2">No View Data Available</h3>
                  <p className="text-grey-500">Analytics will appear once resumes are viewed.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
