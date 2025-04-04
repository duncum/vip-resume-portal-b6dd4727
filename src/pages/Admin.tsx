
import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CandidateUploadForm from "@/components/admin/CandidateUploadForm";
import ManageCandidates from "@/components/admin/ManageCandidates";
import Analytics from "@/components/admin/Analytics";
import { useToast } from "@/components/ui/use-toast";
import { fetchCandidates } from "@/utils/googleSheets";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("upload");
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  useEffect(() => {
    const loadCandidates = async () => {
      try {
        setLoading(true);
        const data = await fetchCandidates();
        setCandidates(data);
      } catch (error) {
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
  
  const candidateCount = candidates.length;

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
        
        <Tabs value={activeTab} onValueChange={handleTabChange} className="max-w-4xl mx-auto">
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
              <CandidateUploadForm 
                candidateCount={candidateCount}
                onSuccess={() => {
                  toast({
                    title: "Candidate added successfully",
                    description: "The candidate has been added to the database.",
                  });
                  // Switch to manage tab after successful upload
                  handleTabChange("manage");
                }} 
              />
            </Card>
          </TabsContent>
          
          <TabsContent value="manage">
            <ManageCandidates initialCandidates={candidates} isInitialLoading={loading} />
          </TabsContent>
          
          <TabsContent value="analytics">
            <Analytics />
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
