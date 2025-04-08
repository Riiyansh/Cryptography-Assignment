
import { ProcessingType, TextEntry } from "@/types";
import { processText } from "@/lib/textProcessing";
import { toast } from "@/components/ui/use-toast";

// Simulate backend storage with localStorage
const STORAGE_KEY = 'text-vault-entries';

// Get all text entries
export const getAllEntries = (): TextEntry[] => {
  try {
    const entriesJson = localStorage.getItem(STORAGE_KEY);
    return entriesJson ? JSON.parse(entriesJson) : [];
  } catch (error) {
    console.error('Failed to get entries:', error);
    toast({
      title: "Error",
      description: "Failed to load your saved entries",
      variant: "destructive"
    });
    return [];
  }
};

// Save a new text entry
export const saveEntry = (originalText: string, processingType: ProcessingType): TextEntry => {
  try {
    const entries = getAllEntries();
    const { text: processedText, stats } = processText(originalText, processingType);
    
    const newEntry: TextEntry = {
      id: generateId(),
      originalText,
      processedText,
      processingType,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Add to beginning of array to show newest first
    const updatedEntries = [newEntry, ...entries];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries));
    
    toast({
      title: "Success",
      description: "Your text has been saved"
    });
    
    return newEntry;
  } catch (error) {
    console.error('Failed to save entry:', error);
    toast({
      title: "Error",
      description: "Failed to save your text",
      variant: "destructive"
    });
    throw error;
  }
};

// Delete a text entry
export const deleteEntry = (id: string): void => {
  try {
    const entries = getAllEntries();
    const updatedEntries = entries.filter(entry => entry.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries));
    
    toast({
      title: "Deleted",
      description: "Entry has been removed"
    });
  } catch (error) {
    console.error('Failed to delete entry:', error);
    toast({
      title: "Error",
      description: "Failed to delete the entry",
      variant: "destructive"
    });
  }
};

// Update an existing text entry
export const updateEntry = (
  id: string, 
  originalText: string, 
  processingType: ProcessingType
): TextEntry | null => {
  try {
    const entries = getAllEntries();
    const { text: processedText } = processText(originalText, processingType);
    
    const updatedEntries = entries.map(entry => {
      if (entry.id === id) {
        return {
          ...entry,
          originalText,
          processedText,
          processingType,
          updatedAt: new Date().toISOString()
        };
      }
      return entry;
    });
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries));
    
    toast({
      title: "Updated",
      description: "Your changes have been saved"
    });
    
    return updatedEntries.find(entry => entry.id === id) || null;
  } catch (error) {
    console.error('Failed to update entry:', error);
    toast({
      title: "Error",
      description: "Failed to update the entry",
      variant: "destructive"
    });
    return null;
  }
};

// Generate a unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
