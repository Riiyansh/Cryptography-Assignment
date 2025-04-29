export interface TextEntry {
  id: string;
  originalText: string;
  processedText: string;
  processingType: ProcessingType;
  createdAt: string;
  updatedAt: string;
}

export type ProcessingType =
  | "SHA-256-64"
  | "SHA-256-32"
  | "SHA-256-24"
  | "SHA-256-16"
  | "SHA-256-10"
  | "capitalize"
  | "lowercase"
  | "remove-whitespace"
  | "trim"
  | "none";

export interface ProcessingResult {
  text: string;
  stats: TextStats;
}

export interface TextStats {
  wordCount: number;
  charCount: number;
  charCountNoSpaces: number;
  lineCount: number;
}
