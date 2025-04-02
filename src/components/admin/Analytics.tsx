
import { BarChart, ChartConfig, FileText, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="sources">Traffic Sources</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
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
          </TabsContent>
          
          <TabsContent value="engagement" className="space-y-4">
            <div className="text-center py-6">
              <Users className="mx-auto h-12 w-12 text-grey-400 mb-3" />
              <h3 className="text-lg font-medium mb-2">No Engagement Data Yet</h3>
              <p className="text-grey-500">Engagement metrics will show interactions with your candidate profiles.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="sources" className="space-y-4">
            <div className="text-center py-6">
              <BarChart className="mx-auto h-12 w-12 text-grey-400 mb-3" />
              <h3 className="text-lg font-medium mb-2">No Traffic Sources Data</h3>
              <p className="text-grey-500">Traffic source data will help you understand where your visitors are coming from.</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default Analytics;
