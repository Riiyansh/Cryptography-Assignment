import { ProcessingResult, ProcessingType, TextStats } from "@/types";
import { SHA256 } from "crypto-js";
export const processText = (
  text: string,
  type: ProcessingType
): ProcessingResult => {
  let processedText = text;

  switch (type) {
    case "SHA-256":
      processedText = SHA256(text).toString();
      break;
    case "capitalize":
      processedText = text
        .split(" ")
        .map((word) =>
          word.length > 0 ? word[0].toUpperCase() + word.slice(1) : ""
        )
        .join(" ");
      break;
    case "lowercase":
      processedText = text.toLowerCase();
      break;
    case "remove-whitespace":
      processedText = text.replace(/\s+/g, "");
      break;
    case "trim":
      processedText = text.trim();
      break;
    case "none":
    default:
      processedText = text;
      break;
  }

  return {
    text: processedText,
    stats: calculateTextStats(processedText),
  };
};

export const calculateTextStats = (text: string): TextStats => {
  return {
    wordCount: text.split(/\s+/).filter((word) => word.length > 0).length,
    charCount: text.length,
    charCountNoSpaces: text.replace(/\s+/g, "").length,
    lineCount: text.split("\n").length,
  };
};

export const getProcessingLabel = (type: ProcessingType): string => {
  switch (type) {
    case "SHA-256":
      return "SHA-256";
    case "capitalize":
      return "Capitalize Words";
    case "lowercase":
      return "Convert to Lowercase";
    case "remove-whitespace":
      return "Remove Whitespace";
    case "trim":
      return "Trim";
    case "none":
      return "No Processing";
    default:
      return "Unknown";
  }
};
