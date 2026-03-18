import React, { useState, useRef, useEffect } from "react";

interface Props {
  lessonTitle: string;
  onClose: () => void;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

const AITutor = ({ lessonTitle, onClose }: Props) => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: `Hi! 👋 I'm your AI tutor. Ask me anything about **${lessonTitle}**!` },
  ]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const askAI = async () => {
    if (!question.trim() || loading) return;
    const userMsg = question.trim();
    setQuestion("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer YOUR_OPENAI_API_KEY",
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: `You are a friendly, encouraging BME tutor for first-year biomedical engineering students. Keep answers concise (2-4 sentences), clear, and engaging. Use emojis occasionally. Current lesson: ${lessonTitle}`,
            },
            ...messages
              .slice(1)
              .map(m => ({ role: m.role as "user" | "assistant", content: m.content })),
            { role: "user", content: userMsg },
          ],
          max_tokens: 300,
        }),
      });
      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content ?? "Sorry, no response generated.";
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: "⚠️ Connection error. Please check the API key configuration." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0"
        style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
        onClick={onClose}
      />
      <div
        className="relative flex flex-col w-full max-w-sm h-full shadow-2xl slide-in-right"
        style={{
          background: "linear-gradient(180deg, #141037 0%, #0f0c29 100%)",
          borderLeft: "1px solid rgba(102,126,234,0.3)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 flex-shrink-0"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", background: "rgba(102,126,234,0.1)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
              style={{ background: "linear-gradient(135deg, #667eea, #764ba2)" }}
            >
              🤖
            </div>
            <div>
              <p className="font-bold text-sm text-white">AI Tutor</p>
              <p className="text-xs truncate max-w-[180px]" style={{ color: "rgba(255,255,255,0.45)" }}>
                {lessonTitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-opacity hover:opacity-70"
            style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)" }}
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 min-h-0">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex items-end gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #667eea, #764ba2)" }}
                >
                  🤖
                </div>
              )}
              <div
                className="max-w-[80%] px-3 py-2.5 text-sm leading-relaxed"
                style={
                  msg.role === "user"
                    ? {
                        background: "linear-gradient(135deg, #667eea, #764ba2)",
                        color: "#fff",
                        borderRadius: "18px 18px 4px 18px",
                      }
                    : {
                        background: "rgba(255,255,255,0.07)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "rgba(255,255,255,0.85)",
                        borderRadius: "18px 18px 18px 4px",
                      }
                }
              >
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-end gap-2 justify-start">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #667eea, #764ba2)" }}
              >
                🤖
              </div>
              <div
                className="px-4 py-3 text-sm"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.4)",
                  borderRadius: "18px 18px 18px 4px",
                }}
              >
                Thinking...
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="p-4 flex-shrink-0" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="flex gap-2">
            <input
              className="ai-input flex-1 px-3 py-2.5 rounded-xl text-sm"
              type="text"
              value={question}
              onChange={e => setQuestion(e.target.value)}
              onKeyDown={e => e.key === "Enter" && askAI()}
              placeholder="Ask a question..."
              disabled={loading}
            />
            <button
              className="glow-btn px-4 py-2.5 rounded-xl text-sm font-bold text-white"
              onClick={askAI}
              disabled={loading || !question.trim()}
            >
              →
            </button>
          </div>
          <p className="text-xs mt-2 text-center" style={{ color: "rgba(255,255,255,0.15)" }}>
            Powered by GPT-4 · Responses may vary
          </p>
        </div>
      </div>
    </div>
  );
};

export default AITutor;
