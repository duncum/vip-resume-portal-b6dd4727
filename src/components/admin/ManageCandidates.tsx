
import { UserPlus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ManageCandidates = () => {
  return (
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
  );
};

export default ManageCandidates;
