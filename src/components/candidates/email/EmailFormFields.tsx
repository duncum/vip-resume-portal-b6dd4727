
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EMAIL_TEMPLATES } from "@/utils/resume/email";
import { Control } from "react-hook-form";

interface EmailFormFieldsProps {
  control: Control<{
    email: string;
    templateId: string;
    customSubject?: string;
  }>;
  isLoading: boolean;
  onTemplateChange: (value: string) => void;
}

const EmailFormFields = ({ control, isLoading, onTemplateChange }: EmailFormFieldsProps) => {
  return (
    <>
      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel>Email address</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="your.email@example.com"
                disabled={isLoading}
                required
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="templateId"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel>Email template</FormLabel>
            <Select 
              onValueChange={onTemplateChange} 
              defaultValue={field.value}
              disabled={isLoading}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a template" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {EMAIL_TEMPLATES.map((template) => (
                  <SelectItem 
                    key={template.id} 
                    value={template.id}
                  >
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
    </>
  );
};

export default EmailFormFields;
