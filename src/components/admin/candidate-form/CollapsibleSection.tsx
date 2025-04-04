
import React from "react";
import { Plus } from "lucide-react";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { CollapsibleSectionProps } from "./types";

const CollapsibleSection = ({ title, children }: CollapsibleSectionProps) => {
  return (
    <Collapsible className="border rounded-md p-4">
      <CollapsibleTrigger className="flex justify-between items-center w-full">
        <h3 className="text-sm font-medium">{title}</h3>
        <Plus className="h-4 w-4" />
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-3">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default CollapsibleSection;
