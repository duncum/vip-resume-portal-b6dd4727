
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";

interface CustomSubjectFieldProps {
  control: Control<{
    email: string;
    templateId: string;
    customSubject?: string;
  }>;
  showCustomSubject: boolean;
  handleToggleCustomSubject: () => void;
  isLoading: boolean;
}

const CustomSubjectField = ({ 
  control, 
  showCustomSubject, 
  handleToggleCustomSubject, 
  isLoading 
}: CustomSubjectFieldProps) => {
  return (
    <>
      <div className="flex items-center space-x-2">
        <Button
          type="button" 
          variant="outline" 
          size="sm"
          onClick={handleToggleCustomSubject}
          disabled={isLoading}
        >
          {showCustomSubject ? "Use default subject" : "Customize subject"}
        </Button>
      </div>
      
      {showCustomSubject && (
        <FormField
          control={control}
          name="customSubject"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Custom subject line</FormLabel>
              <FormControl>
                <Input
                  id="custom-subject"
                  placeholder="Enter custom email subject"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
      )}
    </>
  );
};

export default CustomSubjectField;
