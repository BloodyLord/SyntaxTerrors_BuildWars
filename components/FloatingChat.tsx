'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-4 z-50">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full shadow-lg bg-[#2e7d32] hover:bg-[#1b5e20]"
          size="icon"
        >
          💬
        </Button>
      ) : (
        <Card className="w-96 h-[500px] flex flex-col shadow-xl">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="font-semibold">Chat Assistant</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </Button>
          </div>
          
          <ScrollArea className="flex-1 p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  message.role === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                <div
                  className={`inline-block p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-[#2e7d32] text-white'
                      : 'bg-gray-100'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="text-left">
                <div className="inline-block p-3 rounded-lg bg-gray-100">
                  Thinking...
                </div>
              </div>
            )}
          </ScrollArea>

          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
} 