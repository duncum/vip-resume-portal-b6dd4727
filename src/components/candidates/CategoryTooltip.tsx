
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface CategoryTooltipProps {
  description: string;
}

const CategoryTooltip = ({ description }: CategoryTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="cursor-help ml-1">
            <Info size={14} className="text-grey-400 hover:text-gold transition-colors" />
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs bg-grey-900 text-white border border-gold/20">
          <p>{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CategoryTooltip;
