import React from 'react';
import { Message } from '../types';
import { User, Bot } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div 
      className={`flex w-full animate-fadeIn ${
        isUser ? 'justify-end' : 'justify-start'
      }`}
    >
      <div className={`flex items-start max-w-[80%] md:max-w-[70%] ${
        isUser ? 'flex-row-reverse' : 'flex-row'
      }`}>
        <div className={`flex items-center justify-center h-8 w-8 rounded-full flex-shrink-0 ${
          isUser ? 'bg-blue-600 ml-2 shadow-md' : 'bg-zinc-700 mr-2 shadow-md'
        }`}>
          {isUser ? (
            <User size={16} className="text-white" />
          ) : (
            <Bot size={16} className="text-white" />
          )}
        </div>
        
        <div className={`py-3 px-4 rounded-2xl shadow-sm backdrop-blur-sm ${
          isUser 
            ? 'bg-blue-600 text-white rounded-tr-none bg-opacity-95' 
            : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-tl-none dark:bg-opacity-95'
        }`}>
          <p className="whitespace-pre-wrap break-words leading-relaxed">{message.content}</p>
          <div className={`text-xs mt-1 ${
            isUser ? 'text-blue-200' : 'text-zinc-500 dark:text-zinc-400'
          }`}>
            {new Date(message.timestamp).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;