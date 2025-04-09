
import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CandidateUploadForm } from "@/components/admin/candidate-form";
import ManageCandidates from "@/components/admin/ManageCandidates";
import AdminControls from "@/components/admin/AdminControls";
import { useToast } from "@/components/ui/use-toast";
import { fetchCandidates, fetchCandidateById, type Candidate } from "@/utils/sheets";
import { useSearchParams } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const Admin = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");
  const editParam = searchParams.get("edit");
  
  const [activeTab, setActiveTab] = useState(tabParam || "upload");
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [editCandidate, setEditCandidate] = useState<Candidate | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    searchParams.set("tab", value);
    // If we're not going to upload tab, clear the edit parameter
    if (value !== "upload" && searchParams.has("edit")) {
      searchParams.delete("edit");
      setEditCandidate(null);
    }
    setSearchParams(searchParams);
  };
  
  useEffect(() => {
    const loadCandidates = async () => {
      try {
        setLoading(true);
        setApiError(null);
        const data = await fetchCandidates();
        setCandidates(data);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        setApiError(`Failed to load candidates: ${errorMessage}`);
        toast({
          title: "Error loading candidates",
          description: "There was a problem fetching the candidates data.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadCandidates();
  }, [toast]);
  
  // Effect for handling edit parameter
  useEffect(() => {
    if (editParam) {
      const loadCandidate = async () => {
        try {
          setApiError(null);
          const candidate = await fetchCandidateById(editParam);
          if (candidate) {
            setEditCandidate(candidate);
            // Ensure we're on the upload tab
            setActiveTab("upload");
            searchParams.set("tab", "upload");
            setSearchParams(searchParams);
          } else {
            const errorMsg = `Could not find candidate with ID ${editParam}`;
            setApiError(errorMsg);
            toast({
              title: "Candidate not found",
              description: errorMsg,
              variant: "destructive",
            });
            searchParams.delete("edit");
            setSearchParams(searchParams);
          }
        } catch (error) {
          console.error("Error fetching candidate for edit:", error);
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          setApiError(`Failed to load candidate: ${errorMessage}`);
          toast({
            title: "Error loading candidate",
            description: "There was a problem fetching the candidate data for editing.",
            variant: "destructive",
          });
          searchParams.delete("edit");
          setSearchParams(searchParams);
        }
      };
      
      loadCandidate();
    } else {
      setEditCandidate(null);
    }
  }, [editParam, searchParams, setSearchParams, toast]);
  
  const candidateCount = candidates.length;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold font-display mb-2">
            Admin <span className="text-gold">Dashboard</span>
          </h1>
          <p className="text-grey-600 max-w-2xl mx-auto">
            Manage your candidates and resumes from this central admin panel.
          </p>
        </div>
        
        {/* Display any API errors prominently */}
        {apiError && (
          <Alert variant="destructive" className="max-w-4xl mx-auto mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">{apiError}</AlertDescription>
          </Alert>
        )}
        
        {/* Admin Controls Section */}
        <div className="max-w-5xl mx-auto mb-8">
          <AdminControls />
        </div>
        
        {/* Main Tabs Section */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="upload" className="text-base py-2.5 data-[state=active]:bg-gold data-[state=active]:text-white">
              {editCandidate ? "Edit Resume" : "Upload Resume"}
            </TabsTrigger>
            <TabsTrigger value="manage" className="text-base py-2.5 data-[state=active]:bg-gold data-[state=active]:text-white">
              Manage Candidates
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-base py-2.5 data-[state=active]:bg-gold data-[state=active]:text-white">
              View Analytics
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="mt-0">
            <Card className="p-6">
              <CandidateUploadForm 
                candidateCount={candidateCount}
                candidateToEdit={editCandidate}
                onSuccess={() => {
                  if (editCandidate) {
                    toast({
                      title: "Candidate updated successfully",
                      description: "The candidate has been updated in the database.",
                    });
                    // Clear the edit parameter
                    searchParams.delete("edit");
                    setSearchParams(searchParams);
                  } else {
                    toast({
                      title: "Candidate added successfully",
                      description: "The candidate has been added to the database.",
                    });
                  }
                  handleTabChange("manage");
                }} 
              />
            </Card>
          </TabsContent>
          
          <TabsContent value="manage">
            <ManageCandidates initialCandidates={candidates} isInitialLoading={loading} />
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card className="p-6">
              <AdminControls activeTab="analytics" />
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
