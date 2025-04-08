
import { useEffect, useState } from 'react';
import { TextEntry as TextEntryType } from '@/types';
import { getAllEntries } from '@/services/textService';
import TextEntry from './TextEntry';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TextEntryListProps {
  triggerRefresh: number;
}

const TextEntryList = ({ triggerRefresh }: TextEntryListProps) => {
  const [entries, setEntries] = useState<TextEntryType[]>([]);
  
  const loadEntries = () => {
    const loadedEntries = getAllEntries();
    setEntries(loadedEntries);
  };
  
  useEffect(() => {
    loadEntries();
  }, [triggerRefresh]);
  
  if (entries.length === 0) {
    return (
      <div className="text-center p-8 bg-muted/30 rounded-lg border border-dashed border-muted">
        <p className="text-muted-foreground">No entries saved yet.</p>
        <p className="text-sm text-muted-foreground mt-1">
          Your saved text entries will appear here.
        </p>
      </div>
    );
  }
  
  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4 text-vault-primary">Your Text Vault</h2>
      <ScrollArea className="h-[600px] pr-4">
        {entries.map((entry) => (
          <TextEntry 
            key={entry.id} 
            entry={entry} 
            onUpdate={loadEntries}
          />
        ))}
      </ScrollArea>
    </div>
  );
};

export default TextEntryList;
