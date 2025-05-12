import React, { useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import { useChatContext } from '../context/ChatContext';
import { RotateCw, Bot } from 'lucide-react';

const ChatBox: React.FC = () => {
  const { messages, isLoading } = useChatContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to the bottom when new messages come in
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);
  
  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 scrollbar-hide">
      <div className="max-w-3xl mx-auto space-y-6">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        
        {isLoading && (
          <div className="flex items-start animate-fadeIn">
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-zinc-700 mr-2">
              <Bot size={16} className="text-white" />
            </div>
            <div className="py-3 px-4 rounded-2xl bg-zinc-200 dark:bg-zinc-800 rounded-tl-none shadow-sm">
              <div className="flex items-center space-x-2">
                <RotateCw size={14} className="text-zinc-500 animate-spin" />
                <span className="text-zinc-500 dark:text-zinc-400">Thinking...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatBox;