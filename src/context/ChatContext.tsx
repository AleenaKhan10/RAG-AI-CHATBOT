import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Message, ChatContextType } from '../types';

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Function to add a new message to the chat
  const addMessage = (content: string, role: 'user' | 'assistant') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      role,
      timestamp: new Date(),
    };
    
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    
    // If this is a user message, simulate loading state for AI response
    // This will be replaced with actual API call by the user
    if (role === 'user') {
      setIsLoading(true);
      
      // This timeout simulates the waiting time for AI response
      // This will be removed when actual API integration is done
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };
  
  // Function to clear all messages
  const clearMessages = () => {
    setMessages([]);
  };
  
  // Initialize with a welcome message
  useEffect(() => {
    if (messages.length === 0) {
      addMessage('Hello! How can I assist you today?', 'assistant');
    }
  }, []);
  
  return (
    <ChatContext.Provider value={{ messages, isLoading, addMessage, clearMessages }}>
      {children}
    </ChatContext.Provider>
  );
};