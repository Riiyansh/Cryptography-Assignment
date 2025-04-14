import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { TextEntry as TextEntryType, ProcessingType } from "@/types";
import { deleteEntry, updateEntry } from "@/services/textService";
import ProcessingOptions from "./ProcessingOptions";
import { Badge } from "@/components/ui/badge";
import { processText, getProcessingLabel } from "@/lib/textProcessing";
import { Trash, Edit } from "lucide-react";

interface TextEntryProps {
  entry: TextEntryType;
  onUpdate: () => void;
}

const TextEntry = ({ entry, onUpdate }: TextEntryProps) => {
  const [editMode, setEditMode] = useState(false);
  const [editText, setEditText] = useState(entry.originalText);
  const [editProcessingType, setEditProcessingType] = useState<ProcessingType>(
    entry.processingType
  );
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM d, yyyy h:mm a");
  };

  const handleSaveEdit = () => {
    updateEntry(entry.id, editText, editProcessingType);
    setEditMode(false);
    onUpdate();
  };

  const handleDelete = () => {
    deleteEntry(entry.id);
    setConfirmDelete(false);
    onUpdate();
  };

  const handleProcessingChange = (type: ProcessingType) => {
    setEditProcessingType(type);
  };

  const getPreviewText = () => {
    if (editMode) {
      const { text } = processText(editText, editProcessingType);
      return text;
    }
    return showOriginal ? entry.originalText : entry.processedText;
  };

  return (
    <Card className="shadow-sm border-muted mb-4 hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-vault-primary font-semibold flex items-center justify-between">
          <span className="truncate">
            {entry.originalText.substring(0, 30)}
            {entry.originalText.length > 30 ? "..." : ""}
          </span>
          <Badge variant="outline" className="ml-2 text-xs">
            {getProcessingLabel(entry.processingType)}
          </Badge>
        </CardTitle>
        <div className="text-muted-foreground text-xs">
          {formatDate(entry.createdAt)}
          {entry.createdAt !== entry.updatedAt && (
            <span className="ml-2">
              (Edited: {formatDate(entry.updatedAt)})
            </span>
          )}
        </div>
      </CardHeader>

      {editMode ? (
        <CardContent className="pt-0">
          <div className="space-y-4">
            <Textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="min-h-[120px]"
            />

            <ProcessingOptions
              selectedType={editProcessingType}
              onChange={handleProcessingChange}
            />

            <div>
              <h4 className="text-sm font-medium mb-2">Preview</h4>
              <div className="bg-muted p-3 rounded-md min-h-[60px] text-sm whitespace-pre-wrap">
                {getPreviewText()}
              </div>
            </div>
          </div>
        </CardContent>
      ) : (
        <CardContent className="pt-0">
          <div className="bg-muted/50 p-3 overflow-x-scroll rounded-md min-h-[60px] text-sm whitespace-pre-wrap">
            {getPreviewText()}
          </div>
          <div className="mt-2 text-right">
            <Button
              variant="ghost"
              size="sm"
              className="h-6 text-xs"
              onClick={() => setShowOriginal(!showOriginal)}
            >
              Show {showOriginal ? "Processed" : "Original"}
            </Button>
          </div>
        </CardContent>
      )}

      <CardFooter className="pt-0 flex justify-between">
        {editMode ? (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setEditMode(false);
                setEditText(entry.originalText);
                setEditProcessingType(entry.processingType);
              }}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              className="bg-vault-primary hover:bg-vault-secondary"
              onClick={handleSaveEdit}
              disabled={!editText.trim()}
            >
              Save Changes
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="ghost"
              size="sm"
              className="text-vault-primary hover:text-vault-primary hover:bg-vault-primary/10"
              onClick={() => {
                setEditMode(true);
                setEditText(entry.originalText);
              }}
            >
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>

            <Dialog open={confirmDelete} onOpenChange={setConfirmDelete}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    Are you sure you want to delete this entry?
                  </DialogTitle>
                </DialogHeader>
                <p className="py-4">
                  This action cannot be undone. This will permanently delete
                  your text entry.
                </p>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button variant="destructive" onClick={handleDelete}>
                    Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default TextEntry;
