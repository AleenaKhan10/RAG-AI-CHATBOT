import React from 'react';
import Header from './Header';
import ChatBox from './ChatBox';
import InputArea from './InputArea';
import { ChatProvider } from '../context/ChatContext';

const ChatContainer: React.FC = () => {
  return (
    <ChatProvider>
      <div className="flex flex-col h-screen bg-zinc-50 dark:bg-zinc-950">
        <Header />
        <ChatBox />
        <InputArea />
      </div>
    </ChatProvider>
  );
};

export default ChatContainer;