
import React from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface DeleteButtonProps {
  onDelete: () => void;
  disabled?: boolean;
  isDeleting?: boolean;
}

const DeleteButton = ({ 
  onDelete, 
  disabled = false, 
  isDeleting = false 
}: DeleteButtonProps) => {
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={onDelete}
      disabled={disabled || isDeleting}
      className="text-red-500 hover:text-red-700 hover:bg-red-50 border-red-200"
    >
      <Trash2 className="h-4 w-4 mr-1" />
      {isDeleting ? "Removing..." : "Remove"}
    </Button>
  );
};

export default DeleteButton;
