import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

interface Message {
    role: 'user' | 'ai';
    content: string;
    timestamp: string;
}

export interface AIChatHandle {
    clearChat: () => void;
}

const AIChat = forwardRef<AIChatHandle, {}>((props, ref) => {
    const initialMessage: Message = {
        role: 'ai',
        content: 'Hello! How can I assist you today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([initialMessage]);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useImperativeHandle(ref, () => ({
        clearChat: () => setMessages([initialMessage])
    }));

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        const userMessage: Message = {
            role: 'user',
            content: input,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, userMessage]);
        setLoading(true);
        setInput('');

        const payload = {
            input_value: input,
            output_type: "chat",
            input_type: "chat",
            session_id: "user_1"
        };

        const token = import.meta.env.VITE_ASTRA_TOKEN;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        };

        try {
            const response = await fetch('https://api.langflow.astra.datastax.com/lf/3c7b9d17-5d7b-4bea-ad5c-8c882e9c38ca/api/v1/run/0afb5651-ea9c-4ad1-a848-b583055b8a1f', options);
            const data = await response.json();
            let aiContent = data?.output ?? 'Sorry, I did not understand that.';
            if (typeof aiContent !== 'string') aiContent = JSON.stringify(aiContent, null, 2);
            const aiMessage: Message = {
                role: 'ai',
                content: aiContent,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            setMessages(prev => [...prev, {
                role: 'ai',
                content: 'Error: ' + (error as Error).message,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-zinc-900 text-zinc-100">
            <div className="flex-1 overflow-y-auto px-0 sm:px-0 py-6" style={{ scrollbarWidth: 'thin' }}>
                <div className="max-w-2xl mx-auto space-y-4">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.role === 'ai' && (
                                <div className="flex items-end mr-2">
                                    <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-xl">
                                        <span role="img" aria-label="AI">🤖</span>
                                    </div>
                                </div>
                            )}
                            <div className={`rounded-2xl px-4 py-2 shadow ${msg.role === 'ai' ? 'bg-zinc-800 text-zinc-100' : 'bg-blue-600 text-white'} max-w-[70%] break-words relative`}>
                                <div>{msg.content}</div>
                                <div className="text-xs text-zinc-400 mt-1 text-right">{msg.timestamp}</div>
                            </div>
                            {msg.role === 'user' && (
                                <div className="flex items-end ml-2">
                                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xl">
                                        <span role="img" aria-label="User">🧑</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    {loading && (
                        <div className="flex justify-start">
                            <div className="rounded-2xl px-4 py-2 bg-zinc-800 text-zinc-100 shadow max-w-[70%] flex items-center">
                                <span className="animate-pulse">Thinking...</span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            <form onSubmit={handleSubmit} className="w-full bg-zinc-950 border-t border-zinc-800 p-4 flex items-center fixed bottom-0 left-0 right-0 z-10" style={{maxWidth:'100vw'}}>
                <div className="flex-1 max-w-2xl mx-auto flex items-center">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 p-3 rounded-xl bg-zinc-800 text-zinc-100 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={loading}
                        autoFocus
                    />
                    <button
                        type="submit"
                        disabled={loading || !input.trim()}
                        className="ml-2 px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:bg-zinc-700 disabled:cursor-not-allowed font-semibold"
                    >
                        <span role="img" aria-label="Send">➤</span>
                    </button>
                </div>
            </form>
        </div>
    );
});

export default AIChat; 