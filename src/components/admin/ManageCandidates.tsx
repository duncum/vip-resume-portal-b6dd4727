
import { useState, useEffect, useCallback } from "react";
import { Edit, Search, Trash2, UserPlus, Upload, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { fetchCandidates, type Candidate } from "@/utils/sheets"; // Updated import with type
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface ManageCandidatesProps {
  initialCandidates?: Candidate[];
  isInitialLoading?: boolean;
}

const ManageCandidates = ({ initialCandidates = [], isInitialLoading = false }: ManageCandidatesProps) => {
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);
  const [loading, setLoading] = useState(isInitialLoading);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast: uiToast } = useToast();
  const navigate = useNavigate();

  const loadCandidates = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchCandidates();
      setCandidates(data);
      console.log(`Loaded ${data.length} candidates successfully`);
    } catch (error) {
      console.error("Error loading candidates:", error);
      uiToast({
        title: "Error loading candidates",
        description: "There was a problem fetching the candidates data.",
        variant: "destructive",
      });
      toast.error("Failed to load candidates. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [uiToast]);

  useEffect(() => {
    if (initialCandidates.length > 0) {
      setCandidates(initialCandidates);
      return;
    }

    loadCandidates();
  }, [initialCandidates, loadCandidates]);

  const filteredCandidates = candidates.filter(candidate => {
    if (!searchTerm.trim()) return true;
    
    const searchLower = searchTerm.toLowerCase();
    
    return (
      (candidate.headline?.toLowerCase().includes(searchLower) || false) || 
      (candidate.category?.toLowerCase().includes(searchLower) || false) ||
      (Array.isArray(candidate.sectors) && candidate.sectors.some(
        (sector: string) => sector.toLowerCase().includes(searchLower)
      )) ||
      (candidate.id?.toString().includes(searchLower) || false) ||
      (candidate.title?.toLowerCase().includes(searchLower) || false)
    );
  });

  const handleDelete = (id: string) => {
    // In a real implementation, this would call an API to delete the candidate
    uiToast({
      title: "Delete functionality",
      description: "Delete functionality will be implemented with actual API integration",
    });
    
    // For demonstration purposes, remove from local state
    setCandidates(candidates.filter(candidate => candidate.id !== id));
    toast.success(`Candidate ${id} removed`);
  };

  const handleEdit = (id: string) => {
    // Navigate to the edit page for this candidate
    navigate(`/admin?tab=upload&edit=${id}`);
    
    toast.info(`Editing candidate ${id}`);
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="bg-gray-50/5 rounded-t-lg">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl">Manage Candidates</CardTitle>
            <CardDescription>
              View, edit, or remove candidates from the portal.
            </CardDescription>
          </div>
          <Badge variant="outline" className="text-gold border-gold">
            {candidates.length} Candidates
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gold"></div>
          </div>
        ) : candidates.length > 0 ? (
          <>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-3">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search candidates..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button 
                variant="outline" 
                className="border-gold text-gold hover:bg-gold hover:text-white"
                onClick={() => document.querySelector('[value="upload"]')?.dispatchEvent(new MouseEvent('click'))}
              >
                <Upload className="mr-2 h-4 w-4" /> Upload Resume
              </Button>
            </div>
            
            {filteredCandidates.length > 0 ? (
              <div className="border rounded-md overflow-x-auto shadow-sm">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="text-left p-3 text-sm font-medium text-gray-600">ID</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-600">Headline</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-600">Position</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-600">Category</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCandidates.map((candidate) => (
                      <tr key={candidate.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 text-sm font-mono">{candidate.id}</td>
                        <td className="p-3 text-sm line-clamp-1">{candidate.headline}</td>
                        <td className="p-3 text-sm">{candidate.title || "N/A"}</td>
                        <td className="p-3 text-sm">{candidate.category || "N/A"}</td>
                        <td className="p-3 text-sm space-x-2 whitespace-nowrap">
                          <Link to={`/candidate/${candidate.id}`}>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0"
                            onClick={() => handleEdit(candidate.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 text-red-500" 
                            onClick={() => handleDelete(candidate.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 border rounded-md">
                <p className="text-grey-500">No candidates found matching your search.</p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <UserPlus className="mx-auto h-12 w-12 text-grey-400 mb-3" />
            <h3 className="text-lg font-medium mb-2">No Candidates Yet</h3>
            <p className="text-grey-500 mb-4">Upload your first resume to get started.</p>
            <Button 
              variant="outline" 
              className="border-gold text-gold hover:bg-gold hover:text-white"
              onClick={() => document.querySelector('[value="upload"]')?.dispatchEvent(new MouseEvent('click'))}
            >
              <Upload className="mr-2 h-4 w-4" /> Upload Resume
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ManageCandidates;
