import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ProcessingType } from "@/types";
import { getProcessingLabel } from "@/lib/textProcessing";

interface ProcessingOptionsProps {
  selectedType: ProcessingType;
  onChange: (type: ProcessingType) => void;
}

const ProcessingOptions = ({
  selectedType,
  onChange,
}: ProcessingOptionsProps) => {
  const options: ProcessingType[] = [
    "none",
    "SHA-256-64",
    "SHA-256-32",
    "SHA-256-24",
    "SHA-256-16",
    "SHA-256-10",
  ];

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Processing Options</h3>
      <RadioGroup
        value={selectedType}
        onValueChange={(value) => onChange(value as ProcessingType)}
        className="flex flex-wrap gap-2"
      >
        {options.map((option) => (
          <div key={option} className="flex items-center space-x-2">
            <RadioGroupItem
              value={option}
              id={`option-${option}`}
              className="sr-only"
            />
            <Label
              htmlFor={`option-${option}`}
              className={`px-3 py-1.5 rounded-md text-sm cursor-pointer transition-colors ${
                selectedType === option
                  ? "bg-vault-primary text-white"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              {getProcessingLabel(option)}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default ProcessingOptions;
