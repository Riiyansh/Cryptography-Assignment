import { useState } from "react";
import TextEditor from "@/components/TextEditor";
import TextEntryList from "@/components/TextEntryList";

const Index = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleSave = () => {
    // Increment to trigger refresh in the TextEntryList
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-vault-pattern">
      <div className="container py-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-vault-gradient">
            TextHasher
          </h1>
          <p className="text-muted-foreground mt-2">
            Hash and store your text securely
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="animate-fade-in">
            <TextEditor onSave={handleSave} />
          </div>

          <div className="animate-fade-in">
            <TextEntryList triggerRefresh={refreshTrigger} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
