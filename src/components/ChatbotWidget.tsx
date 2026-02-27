import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { chatMessages, quickReplies } from '../data/dummyData';

interface Message {
  id: number;
  sender: 'bot' | 'user';
  message: string;
}

const botResponses: Record<string, string> = {
  'admission process': 'Our admission process involves: 1) Online application 2) Merit-based selection 3) Document verification 4) Fee payment. Apply at qiscet.edu.in/admission',
  'fee structure': 'B.Tech fees: ₹85,000/year. M.Tech fees: ₹95,000/year. Scholarship available for merit students. EMI options also available.',
  'placement stats': 'We have 94% placement rate! Highest package: 42 LPA (Google). Average: 8.5 LPA. 200+ companies visit our campus.',
  'contact info': 'Phone: +91 80 2345 6789 | Email: info@qiscet.edu.in | Address: Ongole, Prakasam District, AP - 523272',
};

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(chatMessages);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), sender: 'user', message: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const key = text.toLowerCase();
      const found = Object.entries(botResponses).find(([k]) => key.includes(k));
      const reply = found
        ? found[1]
        : "Thanks for your message! Our team will get back to you shortly. You can also call us at +91 80 2345 6789.";

      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', message: reply }]);
      setTyping(false);
    }, 1200);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl bg-gradient-primary shadow-glow flex items-center justify-center transition-all duration-300 hover:scale-110 animate-pulse-glow"
        aria-label="Open chatbot"
      >
        {open ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 glass-card rounded-3xl shadow-lg overflow-hidden animate-scale-in border border-border">
          {/* Header */}
          <div className="bg-gradient-primary p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-grotesk font-semibold text-white text-sm">QISCET Assistant</p>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <p className="text-white/80 text-xs">Online</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-72 overflow-y-auto p-4 space-y-3 bg-background">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-primary text-white rounded-br-sm'
                      : 'bg-muted text-foreground rounded-bl-sm'
                  }`}
                >
                  {msg.message}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-muted px-4 py-2.5 rounded-2xl rounded-bl-sm">
                  <div className="flex gap-1">
                    {[0, 1, 2].map(i => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick Replies */}
          <div className="px-4 py-2 flex gap-2 overflow-x-auto border-t border-border bg-background">
            {quickReplies.map(reply => (
              <button
                key={reply}
                onClick={() => sendMessage(reply)}
                className="flex-shrink-0 px-3 py-1.5 text-xs rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
              >
                {reply}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border bg-background flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
              placeholder="Type a message..."
              className="flex-1 bg-muted rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary border-transparent placeholder:text-muted-foreground"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim()}
              className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center disabled:opacity-40 transition-all hover:scale-105"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
