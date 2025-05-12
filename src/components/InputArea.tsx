import React, { useState, useRef, useEffect } from 'react';
import { Send, X } from 'lucide-react';
import { useChatContext } from '../context/ChatContext';

const InputArea: React.FC = () => {
  const [input, setInput] = useState('');
  const { addMessage, isLoading } = useChatContext();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Resize textarea as content grows
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        200 // Max height in pixels
      )}px`;
    }
  }, [input]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (input.trim() && !isLoading) {
      addMessage(input.trim(), 'user');
      setInput('');
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };
  
  const handleClearInput = () => {
    setInput('');
    textareaRef.current?.focus();
  };
  
  return (
    <div className="border-t dark:border-zinc-700 bg-white dark:bg-zinc-900 p-4">
      <form 
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto relative"
      >
        <div className="relative flex items-center">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="w-full p-4 pr-24 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white resize-none min-h-[56px] max-h-[200px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent scrollbar-hide"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          
          {input && (
            <button
              type="button"
              onClick={handleClearInput}
              className="absolute right-16 text-zinc-400 hover:text-zinc-500 dark:hover:text-zinc-300 focus:outline-none p-2"
              aria-label="Clear input"
            >
              <X size={18} />
            </button>
          )}
          
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={`absolute right-2 p-2 rounded-lg ${
              input.trim() && !isLoading
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-zinc-200 text-zinc-400 dark:bg-zinc-700 cursor-not-allowed'
            } transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500`}
            aria-label="Send message"
          >
            <Send size={20} />
          </button>
        </div>
        
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 ml-2">
          Press Enter to send, Shift+Enter for new line
        </p>
      </form>
    </div>
  );
};

export default InputArea;