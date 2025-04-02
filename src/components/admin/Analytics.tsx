
import { FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Analytics = () => {
  return (
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
  );
};

export default Analytics;
