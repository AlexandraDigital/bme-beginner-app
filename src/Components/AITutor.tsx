import React, { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface Props {
  initialTopic?: string;
  onClose?: () => void;
}

const SUGGESTED_QUESTIONS = [
  'What is biomedical engineering?',
  'How does an MRI machine work?',
  'What is tissue engineering?',
  'Explain neural interfaces (BCIs)',
  'How are biosensors used in medicine?',
  'What math do I need for BME?',
  'What is biomechanics?',
  'How does CRISPR work?',
];

// ─────────────────────────────────────────────
// 🔒 Calls YOUR secure Next.js API route
//    The Anthropic API key stays server-side.
//    Never exposed to the browser.
// ─────────────────────────────────────────────
async function callChatAPI(
  userMessage: string,
  history: Message[]
): Promise<string> {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: [
        ...history.map((m) => ({ role: m.role, content: m.content })),
        { role: 'user', content: userMessage },
      ],
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error((err as any)?.error || `Server error: ${response.status}`);
  }

  const data = await response.json();
  if (!data.reply) throw new Error('Empty reply from server.');
  return data.reply;
}

// ─────────────────────────────────────────────
// 📝 Markdown-to-JSX renderer
// ─────────────────────────────────────────────
function formatMessage(content: string) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let listBuffer: string[] = [];
  let listType: 'ul' | 'ol' | null = null;

  const flushList = (key: string) => {
    if (!listBuffer.length) return;
    const items = listBuffer.map((item, i) => (
      <li key={i} className="ml-1 text-[#c8d8e8] text-sm leading-relaxed">
        {renderInline(item)}
      </li>
    ));
    elements.push(
      listType === 'ol' ? (
        <ol key={key} className="list-decimal ml-5 space-y-1 my-1">{items}</ol>
      ) : (
        <ul key={key} className="list-disc ml-5 space-y-1 my-1">{items}</ul>
      )
    );
    listBuffer = [];
    listType = null;
  };

  lines.forEach((line, i) => {
    const ulMatch = line.match(/^[-•]\s+(.*)/);
    const olMatch = line.match(/^\d+\.\s+(.*)/);

    if (ulMatch) {
      if (listType === 'ol') flushList(`flush-${i}`);
      listType = 'ul';
      listBuffer.push(ulMatch[1]);
    } else if (olMatch) {
      if (listType === 'ul') flushList(`flush-${i}`);
      listType = 'ol';
      listBuffer.push(olMatch[1]);
    } else {
      flushList(`flush-${i}`);
      if (!line.trim()) {
        elements.push(<div key={i} className="h-2" />);
      } else if (line.startsWith('### ')) {
        elements.push(
          <p key={i} className="text-[#7dd4fc] font-semibold text-sm mt-2">
            {renderInline(line.slice(4))}
          </p>
        );
      } else if (line.startsWith('## ')) {
        elements.push(
          <p key={i} className="text-[#38bdf8] font-bold text-base mt-3">
            {renderInline(line.slice(3))}
          </p>
        );
      } else if (line.startsWith('**') && line.endsWith('**') && line.length > 4) {
        elements.push(
          <p key={i} className="text-white font-bold text-sm mt-2">
            {line.slice(2, -2)}
          </p>
        );
      } else {
        elements.push(
          <p key={i} className="text-[#c8d8e8] text-sm leading-relaxed">
            {renderInline(line)}
          </p>
        );
      }
    }
  });
  flushList('final');
  return elements;
}

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**'))
      return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
    if (part.startsWith('`') && part.endsWith('`'))
      return <code key={i} className="bg-white/10 text-[#7dd4fc] px-1.5 py-0.5 rounded text-xs font-mono">{part.slice(1, -1)}</code>;
    return part;
  });
}

// ─────────────────────────────────────────────
// 🎨 Main Component
// ─────────────────────────────────────────────
export default function AITutor({ initialTopic = '', onClose }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: initialTopic
        ? `Hi! I'm your BME AI Tutor 🤖\n\nYou want to learn about **${initialTopic}** — great choice! Ask me anything specific and I'll explain it in depth.`
        : `Hi! I'm your BME AI Tutor 🤖\n\nI can explain any biomedical engineering concept — from MRI physics to neural interfaces, tissue engineering, biosensors, biomechanics, and more.\n\nWhat would you like to learn today?`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMsg: Message = { role: 'user', content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    setError(null);

    try {
      const reply = await callChatAPI(text.trim(), [...messages, userMsg]);
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (err: any) {
      const msg = err?.message || 'Unknown error';
      setError(`Connection error: ${msg}`);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `⚠️ Something went wrong. Please try again.\n\n_${msg}_`,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-2xl shadow-lg shadow-cyan-500/30">
          🤖
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">AI Tutor</h1>
          <p className="text-gray-400 text-sm">
            Ask anything about biomedical engineering
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-auto text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
          >
            ✕ Back to Courses
          </button>
        )}
      </div>

      {/* Chat window */}
      <div className="flex-1 rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-5 space-y-4 min-h-[400px] max-h-[60vh]">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm flex-shrink-0 ${
                  msg.role === 'assistant'
                    ? 'bg-gradient-to-br from-cyan-400 to-blue-600'
                    : 'bg-gradient-to-br from-purple-500 to-violet-600'
                }`}
              >
                {msg.role === 'assistant' ? '🤖' : '👤'}
              </div>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  msg.role === 'assistant'
                    ? 'bg-white/[0.05] border border-white/10 rounded-tl-none'
                    : 'bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/20 rounded-tr-none'
                }`}
              >
                <div className="space-y-1 leading-relaxed">
                  {formatMessage(msg.content)}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-sm">
                🤖
              </div>
              <div className="bg-white/[0.05] border border-white/10 rounded-2xl rounded-tl-none px-4 py-3">
                <div className="flex gap-1.5 items-center">
                  {[0, 1, 2].map((j) => (
                    <div
                      key={j}
                      className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce"
                      style={{ animationDelay: `${j * 0.15}s` }}
                    />
                  ))}
                  <span className="text-gray-500 text-xs ml-2">Thinking…</span>
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {error && (
          <div className="mx-4 mb-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
            {error}
          </div>
        )}

        {messages.length <= 1 && (
          <div className="px-5 py-3 border-t border-white/5 flex flex-wrap gap-2">
            {SUGGESTED_QUESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="px-3 py-1.5 rounded-full text-xs bg-white/[0.05] border border-white/10 text-gray-300 hover:bg-white/[0.08] hover:text-white transition-all"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        <div className="p-4 border-t border-white/10">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === 'Enter' && !e.shiftKey && sendMessage(input)
              }
              placeholder="Ask about MRI physics, neural interfaces, biosensors…"
              className="flex-1 bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.07] transition-all"
              disabled={isTyping}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isTyping}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/20"
            >
              {isTyping ? '…' : 'Send →'}
            </button>
          </div>
          <p className="text-gray-600 text-xs mt-2 text-center">
            Powered by Claude AI · Secure server-side API
          </p>
        </div>
      </div>
    </div>
  );
}
