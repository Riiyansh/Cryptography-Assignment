import { ProcessingResult, ProcessingType, TextStats } from "@/types";
import { sha256 } from "js-sha256";

export const processText = (
  text: string,
  type: ProcessingType
): ProcessingResult => {
  let processedText = text;

  switch (type) {
    case "SHA-256-64":
      processedText = simulatedReducedSHA256(text, 64);
      break;
    case "SHA-256-32":
      processedText = simulatedReducedSHA256(text, 32);
      break;
    case "SHA-256-24":
      processedText = simulatedReducedSHA256(text, 24);
      break;
    case "SHA-256-16":
      processedText = simulatedReducedSHA256(text, 16);
      break;
    case "SHA-256-10":
      processedText = simulatedReducedSHA256(text, 10);
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

// Simulated round reduction by truncating hash output
const simulatedReducedSHA256 = (text: string, rounds: number): string => {
  const fullHash = sha256(text);
  const lengthMap: Record<number, number> = {
    64: 64, // Full hash
    32: 32, // Half length
    24: 24,
    16: 16,
    10: 10,
  };
  return fullHash.substring(0, lengthMap[rounds] || 64);
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
    case "SHA-256-64":
      return "SHA-256 (64 rounds)";
    case "SHA-256-32":
      return "SHA-256 (32 rounds)";
    case "SHA-256-24":
      return "SHA-256 (24 rounds)";
    case "SHA-256-16":
      return "SHA-256 (16 rounds)";
    case "SHA-256-10":
      return "SHA-256 (10 rounds)";
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
