import React from 'react';
import { Trash2 } from 'lucide-react';
import { useChatContext } from '../context/ChatContext';

const Header: React.FC = () => {
  const { clearMessages, messages } = useChatContext();
  
  const handleClearChat = () => {
    if (window.confirm('Are you sure you want to clear the entire conversation?')) {
      clearMessages();
    }
  };
  
  return (
    <header className="border-b dark:border-zinc-700 bg-white dark:bg-zinc-900 py-4 px-6 sticky top-0 z-10">
      <div className="max-w-3xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-semibold text-zinc-900 dark:text-white">AI Assistant</h1>
        
        {messages.length > 1 && (
          <button
            onClick={handleClearChat}
            className="flex items-center text-sm text-zinc-500 hover:text-red-500 focus:outline-none focus:text-red-500 transition-colors"
            aria-label="Clear conversation"
          >
            <Trash2 size={16} className="mr-1" />
            <span>Clear chat</span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;