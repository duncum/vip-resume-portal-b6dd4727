
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
import { toast } from "sonner";
import { addCandidate } from "@/utils/googleSheets";

// Role title options grouped by category
const roleTitles = {
  "Executive": [
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
    "Executive Vice President",
    "Regional Vice President",
    "Family Office Executive",
    "Chief of Staff",
    "Other"
  ],
  "Director": [
    "Director of Development",
    "Director of Construction",
    "Director of Asset Management",
    "Director of Acquisitions",
    "Director of Capital Markets",
    "Director of Finance",
    "Director of Design",
    "Director of Architecture",
    "Project Executive",
    "Portfolio Director",
    "Director of Procurement",
    "Director of Investor Relations",
    "Other"
  ],
  "Mid-Senior level": [
    "Development Manager",
    "Asset Manager",
    "Acquisitions Manager",
    "Investor Relations Manager",
    "Financial Planning Manager",
    "Pre-Development Manager",
    "Entitlements Manager",
    "Procurement Manager",
    "Construction Manager",
    "Project Architect",
    "Regional Property Manager",
    "Facilities Director",
    "FF&E Manager",
    "Assistant Project Manager",
    "Other"
  ],
  "Emerging Executives": [
    "Analyst",
    "Associate",
    "Senior Analyst",
    "Other"
  ],
  "One Man Army": [
    "Independent Consultant",
    "Sole Proprietor",
    "Freelancer",
    "Other"
  ]
};

// Category descriptions
const categoryDescriptions = {
  "Executive": "C-Suite and top-level leadership with P&L, strategy, board exposure, or legacy impact",
  "Director": "Functional department leads, reporting to VP or C-Suite; usually 10–20+ years' experience",
  "Mid-Senior level": "Experienced executional leaders, often managing projects or functions, but not the full department",
  "Emerging Executives": "VP-ready talent or highly promising leaders on an emerging path to leadership",
  "One Man Army": "Independent professionals who can handle multiple aspects of projects independently"
};

const Admin = () => {
  const [isUploading, setIsUploading] = useState(false);
  
  // Form fields
  const [headline, setHeadline] = useState("");
  const [sectors, setSectors] = useState("");
  const [tags, setTags] = useState("");
  const [summary, setSummary] = useState("");
  const [location, setLocation] = useState("");
  
  // Multiple categories and titles support
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTitles, setSelectedTitles] = useState<Record<string, string[]>>({});
  const [customTitles, setCustomTitles] = useState<Record<string, string[]>>({});
  
  const [relocationPreference, setRelocationPreference] = useState("flexible");
  
  // Handle category selection/deselection
  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories(prev => [...prev, category]);
      // Initialize titles array for this category if it doesn't exist
      if (!selectedTitles[category]) {
        setSelectedTitles(prev => ({ ...prev, [category]: [] }));
        setCustomTitles(prev => ({ ...prev, [category]: [] }));
      }
    } else {
      setSelectedCategories(prev => prev.filter(c => c !== category));
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
      
      // Remove the last custom title for this category
      setCustomTitles(prev => {
        const updatedCustomTitles = [...(prev[category] || [])];
        updatedCustomTitles.pop();
        return {
          ...prev,
          [category]: updatedCustomTitles
        };
      });
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
  
  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    
    // Process all titles including custom "Other" titles
    const processedTitles: Record<string, string[]> = {};
    
    selectedCategories.forEach(category => {
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
      sectors: sectors.split(",").map(s => s.trim()),
      tags: tags.split(",").map(t => t.trim()),
      categories: selectedCategories,
      titles: processedTitles,
      summary,
      location,
      relocationPreference
    };
    
    // Simulate upload
    setTimeout(() => {
      console.log("Candidate data:", candidateData);
      toast.success("Resume uploaded successfully");
      setIsUploading(false);
      
      // Optional: Reset form
      // setHeadline("");
      // setSectors("");
      // setTags("");
      // setSummary("");
      // setLocation("");
      // setSelectedCategories([]);
      // setSelectedTitles({});
      // setCustomTitles({});
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
        
        <Tabs defaultValue="upload" className="max-w-3xl mx-auto">
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
                  
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Position Categories & Titles</h3>
                    <p className="text-xs text-grey-600">Select all categories that apply:</p>
                    
                    <div className="space-y-6">
                      {Object.keys(roleTitles).map((category) => (
                        <div key={category} className="border rounded-md p-4">
                          <div className="flex items-start space-x-2 mb-4">
                            <Checkbox 
                              id={`category-${category}`} 
                              checked={selectedCategories.includes(category)}
                              onCheckedChange={(checked) => handleCategoryChange(category, checked === true)}
                            />
                            <div>
                              <label 
                                htmlFor={`category-${category}`} 
                                className="text-sm font-medium cursor-pointer"
                              >
                                {category}
                              </label>
                              <p className="text-xs text-grey-600">{categoryDescriptions[category as keyof typeof categoryDescriptions]}</p>
                            </div>
                          </div>
                          
                          {selectedCategories.includes(category) && (
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
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Candidate Summary</label>
                    <Textarea 
                      placeholder="Brief description of candidate's background and strengths"
                      value={summary}
                      onChange={(e) => setSummary(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Experience Sectors (comma separated)</label>
                      <Input 
                        placeholder="e.g. Marketing, E-commerce, Retail"
                        value={sectors}
                        onChange={(e) => setSectors(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Tags (comma separated)</label>
                      <Input 
                        placeholder="e.g. Leadership, Digital Marketing, Strategic Planning"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                      />
                    </div>
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
                    disabled={isUploading || selectedCategories.length === 0}
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
