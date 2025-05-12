import React, { useRef } from 'react';
import AIChat from './components/AIChat';

function App() {
  // We'll use a ref to trigger clear chat from the header
  const chatRef = useRef<{ clearChat: () => void }>(null);

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100">
      <header className="fixed top-0 left-0 right-0 z-20 bg-zinc-950 border-b border-zinc-800 h-16 flex items-center justify-between px-4 shadow-sm">
        <div className="flex-1 flex justify-center">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-100 select-none">AI Assistant</h1>
        </div>
        <button
          className="absolute right-6 top-1/2 -translate-y-1/2 px-3 py-1 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white text-sm transition"
          onClick={() => chatRef.current?.clearChat()}
        >
          🗑️ Clear chat
        </button>
      </header>
      <main className="pt-16 h-[calc(100vh-4rem)]">
        <AIChat ref={chatRef} />
      </main>
    </div>
  );
}

export default App;