
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Loader2, Send } from "lucide-react";

interface DialogActionsProps {
  isLoading: boolean;
  onClose: () => void;
}

const DialogActions = ({ isLoading, onClose }: DialogActionsProps) => {
  return (
    <DialogFooter className="pt-4">
      <Button 
        type="button" 
        variant="outline" 
        onClick={onClose}
        disabled={isLoading}
      >
        Cancel
      </Button>
      <Button 
        type="submit" 
        disabled={isLoading} 
        className="bg-gold text-black hover:bg-gold/90"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Send Resume
          </>
        )}
      </Button>
    </DialogFooter>
  );
};

export default DialogActions;
