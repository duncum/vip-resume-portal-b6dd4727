
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, RefreshCw, Download, Upload } from 'lucide-react';
import { importFromSheets, exportToSheets, isSupabaseAvailable } from '@/utils/supabase';
import { toast } from 'sonner';

const SyncControl = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncDirection, setSyncDirection] = useState<'import'|'export'|null>(null);
  
  const hasSupabase = isSupabaseAvailable();

  const handleImport = async () => {
    if (isSyncing) return;
    
    setIsSyncing(true);
    setSyncDirection('import');
    
    try {
      const success = await importFromSheets();
      if (success) {
        toast.success('Data imported from Google Sheets successfully');
      } else {
        toast.error('Import failed or no data found');
      }
    } catch (error) {
      console.error('Error during import:', error);
      toast.error('Import failed');
    } finally {
      setIsSyncing(false);
      setSyncDirection(null);
    }
  };

  const handleExport = async () => {
    if (isSyncing) return;
    
    setIsSyncing(true);
    setSyncDirection('export');
    
    try {
      const success = await exportToSheets();
      if (success) {
        toast.success('Data exported to Google Sheets successfully');
      } else {
        toast.error('Export failed or no data to export');
      }
    } catch (error) {
      console.error('Error during export:', error);
      toast.error('Export failed');
    } finally {
      setIsSyncing(false);
      setSyncDirection(null);
    }
  };

  if (!hasSupabase) {
    return (
      <Card className="border-dashed shadow-sm">
        <CardHeader className="py-3">
          <CardTitle className="text-sm">Database Synchronization</CardTitle>
        </CardHeader>
        <CardContent className="py-2">
          <div className="bg-amber-50 text-amber-800 border border-amber-200 rounded-md p-3 text-xs">
            Supabase connection not available. Configure Supabase in your project settings.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-dashed shadow-sm">
      <CardHeader className="py-3">
        <CardTitle className="text-sm flex items-center">
          <RefreshCw className="h-3 w-3 mr-2" />
          Database Synchronization
        </CardTitle>
      </CardHeader>
      <CardContent className="py-2">
        <div className="flex flex-col gap-3">
          <div className="bg-blue-50 text-blue-800 border border-blue-200 rounded-md p-3 text-xs">
            <p className="font-medium mb-1">Supabase & Google Sheets Sync</p>
            <p>This allows you to manually sync data between your Supabase database and Google Sheets.</p>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mt-1">
            <Button 
              size="sm"
              variant="outline"
              className="border-blue-200 text-blue-700 hover:bg-blue-50"
              onClick={handleImport}
              disabled={isSyncing}
            >
              {isSyncing && syncDirection === 'import' ? (
                <Loader2 className="h-3 w-3 mr-2 animate-spin" />
              ) : (
                <Download className="h-3 w-3 mr-2" />
              )}
              Import from Sheets
            </Button>
            
            <Button 
              size="sm"
              variant="outline"
              className="border-blue-200 text-blue-700 hover:bg-blue-50"
              onClick={handleExport}
              disabled={isSyncing}
            >
              {isSyncing && syncDirection === 'export' ? (
                <Loader2 className="h-3 w-3 mr-2 animate-spin" />
              ) : (
                <Upload className="h-3 w-3 mr-2" />
              )}
              Export to Sheets
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SyncControl;
