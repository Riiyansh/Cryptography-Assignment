import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProcessingType } from "@/types";
import ProcessingOptions from "./ProcessingOptions";
import { processText } from "@/lib/textProcessing";
import { saveEntry } from "@/services/textService";
import { Badge } from "@/components/ui/badge";

const TextEditor = ({ onSave }: { onSave: () => void }) => {
  const [text, setText] = useState<string>("");
  const [processingType, setProcessingType] = useState<ProcessingType>("none");
  const [preview, setPreview] = useState<string>("");
  const [stats, setStats] = useState({
    wordCount: 0,
    charCount: 0,
    charCountNoSpaces: 0,
    lineCount: 0,
  });

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    updatePreview(newText, processingType);
  };

  const handleProcessingChange = (type: ProcessingType) => {
    setProcessingType(type);
    updatePreview(text, type);
  };

  const updatePreview = (text: string, type: ProcessingType) => {
    const { text: processed, stats } = processText(text, type);
    setPreview(processed);
    setStats(stats);
  };

  const handleSave = () => {
    if (!text.trim()) return;
    saveEntry(text, processingType);
    setText("");
    setPreview("");
    setStats({
      wordCount: 0,
      charCount: 0,
      charCountNoSpaces: 0,
      lineCount: 0,
    });
    onSave();
  };

  return (
    <div className="w-full">
      <Card className="shadow-md border-2 border-muted mb-6">
        <CardHeader>
          <CardTitle className="text-xl text-vault-primary font-semibold flex justify-between">
            <span>Text </span>
            <Badge
              variant="outline"
              className="bg-vault-accent/10 text-vault-accent"
            >
              New Entry
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="text-input"
                className="block mb-2 text-sm font-medium"
              >
                Enter your text
              </label>
              <Textarea
                id="text-input"
                placeholder="Type or paste your text here..."
                className="min-h-[100px] bg-white"
                value={text}
                onChange={handleTextChange}
              />
            </div>

            <ProcessingOptions
              selectedType={processingType}
              onChange={handleProcessingChange}
            />

            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium">Preview</label>
              <div className="rounded-md overflow-x-scroll bg-muted p-4 min-h-[100px] whitespace-pre-wrap">
                {preview || (
                  <span className="text-muted-foreground italic">
                    Processing preview will appear here
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              <span className="px-2 py-1 rounded bg-muted">
                Words: {stats.wordCount}
              </span>
              <span className="px-2 py-1 rounded bg-muted">
                Characters: {stats.charCount}
              </span>
              <span className="px-2 py-1 rounded bg-muted">
                Characters (no spaces): {stats.charCountNoSpaces}
              </span>
              <span className="px-2 py-1 rounded bg-muted">
                Lines: {stats.lineCount}
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleSave}
            className="bg-vault-primary hover:bg-vault-secondary w-full"
            disabled={!text.trim()}
          >
            Save
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TextEditor;
