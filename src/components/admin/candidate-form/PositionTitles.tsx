
import React from "react";
import { Plus } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { roleTitles } from "./form-data";
import { PositionTitlesProps } from "./types";
import { X } from "lucide-react";

const PositionTitles = ({
  selectedTitleCategories,
  onTitleCategoryChange,
  selectedTitles,
  onTitleChange,
  customTitles,
  onCustomTitleChange,
  onAddCustomTitle,
  onRemoveCustomTitle
}: PositionTitlesProps) => {
  return (
    <>
      <p className="text-xs text-grey-600 mb-2">Select all title categories that apply:</p>
      
      <div className="space-y-4">
        {Object.keys(roleTitles).map((category) => (
          <div key={category} className="border rounded-md p-4">
            <div className="flex items-start space-x-2 mb-3">
              <Checkbox 
                id={`category-${category}`} 
                checked={selectedTitleCategories.includes(category)}
                onCheckedChange={(checked) => onTitleCategoryChange(category, checked === true)}
              />
              <label 
                htmlFor={`category-${category}`} 
                className="text-sm font-medium cursor-pointer"
              >
                {category}
              </label>
            </div>
            
            {selectedTitleCategories.includes(category) && (
              <div className="pl-6">
                <p className="text-xs text-grey-600 mb-2">Select all titles that apply:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                  {roleTitles[category].map((title) => (
                    <div key={title} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`${category}-title-${title}`}
                        checked={(selectedTitles[category] || []).includes(title)}
                        onCheckedChange={(checked) => onTitleChange(category, title, checked === true)}
                      />
                      <label 
                        htmlFor={`${category}-title-${title}`}
                        className="text-sm cursor-pointer"
                      >
                        {title}
                      </label>
                    </div>
                  ))}
                </div>
                
                {(selectedTitles[category] || []).includes("Other") && (
                  <div className="space-y-2">
                    {(customTitles[category] || []).map((customTitle, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input 
                          placeholder="Enter custom title" 
                          value={customTitle}
                          onChange={(e) => onCustomTitleChange(category, index, e.target.value)}
                          className="flex-1"
                        />
                        <Button 
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => onRemoveCustomTitle(category, index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => onAddCustomTitle(category)}
                      className="flex items-center mt-1 border-dashed border-gray-300 text-gray-500"
                    >
                      <Plus className="h-3 w-3 mr-1" /> Add Another Custom Title
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default PositionTitles;
