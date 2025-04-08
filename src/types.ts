
export interface TextEntry {
  id: string;
  originalText: string;
  processedText: string;
  processingType: ProcessingType;
  createdAt: string;
  updatedAt: string;
}

export type ProcessingType = 'capitalize' | 'lowercase' | 'remove-whitespace' | 'trim' | 'none';

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
