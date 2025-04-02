
import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, UserPlus, FileText, Tag } from "lucide-react";

const Admin = () => {
  const [isUploading, setIsUploading] = useState(false);
  
  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    
    // Simulate upload
    setTimeout(() => {
      setIsUploading(false);
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
                    <Input placeholder="e.g. Senior Marketing Executive with 10+ years experience" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Experience Sectors (comma separated)</label>
                    <Input placeholder="e.g. Marketing, E-commerce, Retail" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tags (comma separated)</label>
                    <Input placeholder="e.g. Leadership, Digital Marketing, Strategic Planning" />
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
