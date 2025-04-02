
import { Edit, Search, Trash2, UserPlus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const ManageCandidates = () => {
  // Mock data for candidates
  const hasCandidates = false; // Set to true to show the table view

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Manage Candidates</CardTitle>
        <CardDescription>
          View, edit, or remove candidates from the portal.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {hasCandidates ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search candidates..."
                  className="pl-9"
                />
              </div>
              <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-white">
                <Upload className="mr-2 h-4 w-4" /> Upload Resume
              </Button>
            </div>
            <div className="border rounded-md">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="text-left p-3 text-sm font-medium text-gray-600">Name</th>
                    <th className="text-left p-3 text-sm font-medium text-gray-600">Position</th>
                    <th className="text-left p-3 text-sm font-medium text-gray-600">Location</th>
                    <th className="text-left p-3 text-sm font-medium text-gray-600">Views</th>
                    <th className="text-left p-3 text-sm font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-3 text-sm">John Smith</td>
                    <td className="p-3 text-sm">Development Director</td>
                    <td className="p-3 text-sm">New York, NY</td>
                    <td className="p-3 text-sm">24</td>
                    <td className="p-3 text-sm space-x-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <UserPlus className="mx-auto h-12 w-12 text-grey-400 mb-3" />
            <h3 className="text-lg font-medium mb-2">No Candidates Yet</h3>
            <p className="text-grey-500 mb-4">Upload your first resume to get started.</p>
            <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-white">
              <Upload className="mr-2 h-4 w-4" /> Upload Resume
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ManageCandidates;
