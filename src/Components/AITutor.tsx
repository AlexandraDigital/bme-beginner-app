import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AITutorProps {
  initialTopic?: string;
}

const MODEL = "llama-3.3-70b-versatile";
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

const SYSTEM_PROMPT = `You are BioMedAI Tutor, an expert biomedical engineering educator. 
You help students understand biomedical engineering concepts from beginner through graduate level.
Topics include: biophysics, biomechanics, bioelectronics, medical imaging, biomaterials, 
tissue engineering, CRISPR/gene therapy, neural engineering, nanomedicine, computational modeling, 
and clinical applications.

Guidelines:
- Give clear, structured answers with explanations that build intuition
- Use analogies to make complex topics accessible
- For advanced topics, include relevant equations, research context, and clinical relevance
- Keep responses concise but thorough (3-5 paragraphs max unless more detail is needed)
- Use bullet points and numbered lists where helpful
- If a concept connects to other BME topics, briefly mention those connections
- Always encourage curiosity and further exploration`;

const SUGGESTED_QUESTIONS = [
  "How does MRI use magnetic fields to create images?",
  "Explain the Hodgkin-Huxley model of action potentials",
  "What is the EPR effect in nanomedicine?",
  "How does CRISPR-Cas9 edit genes?",
  "What are the key principles of finite element analysis in biomechanics?",
  "How do brain-computer interfaces decode neural signals?",
];

export default function AITutor({ initialTopic }: AITutorProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState(initialTopic ? `Tell me about: ${initialTopic}` : "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (initialTopic && messages.length === 0) {
      sendMessage(`Tell me about: ${initialTopic}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialTopic]);

  const sendMessage = async (text?: string) => {
    const userText = (text ?? input).trim();
    if (!userText) return;

    const newMessages: Message[] = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;
      if (!apiKey) throw new Error("API key not configured.");

      const response = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...newMessages.map((m) => ({ role: m.role, content: m.content })),
          ],
          max_tokens: 1024,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData?.error?.message ?? `API error: ${response.status}`);
      }

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content ?? "No response received.";

      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatMessage = (content: string) => {
    return content
      .split("\n")
      .map((line, i) => {
        if (line.startsWith("### ")) return <h3 key={i} style={{ color: "#67e8f9", fontWeight: 700, marginTop: "0.75rem", fontSize: "1.05rem" }}>{line.slice(4)}</h3>;
        if (line.startsWith("## ")) return <h2 key={i} style={{ color: "#67e8f9", fontWeight: 700, marginTop: "1rem", fontSize: "1.15rem" }}>{line.slice(3)}</h2>;
        const boldFormatted = line.replace(/\*\*(.+?)\*\*/g, '<strong style="color:#f0f9ff">$1</strong>');
        if (boldFormatted !== line) return <p key={i} style={{ margin: "0.2rem 0" }} dangerouslySetInnerHTML={{ __html: boldFormatted }} />;
        if (line.startsWith("- ") || line.startsWith("\u2022 ")) return (
          <div key={i} style={{ display: "flex", gap: "0.5rem", marginTop: "0.25rem" }}>
            <span style={{ color: "#06b6d4", flexShrink: 0 }}>•</span>
            <span>{line.slice(2)}</span>
          </div>
        );
        if (/^\d+\. /.test(line)) {
          const [num, ...rest] = line.split(". ");
          return (
            <div key={i} style={{ display: "flex", gap: "0.5rem", marginTop: "0.25rem" }}>
              <span style={{ color: "#06b6d4", flexShrink: 0 }}>{num}.</span>
              <span>{rest.join(". ")}</span>
            </div>
          );
        }
        if (line === "") return <div key={i} style={{ height: "0.5rem" }} />;
        return <p key={i} style={{ margin: "0.2rem 0" }}>{line}</p>;
      });
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
      background: "linear-gradient(135deg, #060b18 0%, #0a1628 50%, #060b18 100%)",
      fontFamily: "'Inter', sans-serif",
      color: "#e2e8f0",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Grid background */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.04,
        backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
        backgroundSize: "40px 40px", pointerEvents: "none",
      }} />

      {/* Header */}
      <div style={{
        padding: "1.25rem 1.5rem",
        borderBottom: "1px solid rgba(6,182,212,0.2)",
        background: "rgba(6,11,24,0.8)",
        backdropFilter: "blur(10px)",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        position: "relative", zIndex: 2,
      }}>
        <div style={{
          width: 40, height: 40, borderRadius: "50%",
          background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "1.2rem", flexShrink: 0,
        }}>🧬</div>
        <div>
          <div style={{ fontWeight: 700, fontSize: "1.1rem", color: "#f0f9ff" }}>BioMedAI Tutor</div>
          <div style={{ fontSize: "0.78rem", color: "#67e8f9", opacity: 0.8 }}>
            Powered by Groq · LLaMA 3.3 70B
          </div>
        </div>
        <div style={{
          marginLeft: "auto",
          width: 10, height: 10, borderRadius: "50%",
          background: "#10b981",
          boxShadow: "0 0 8px #10b981",
        }} title="Connected" />
      </div>

      {/* Messages */}
      <div style={{
        flex: 1, overflowY: "auto", padding: "1.5rem",
        display: "flex", flexDirection: "column", gap: "1rem",
        position: "relative", zIndex: 1,
      }}>
        {messages.length === 0 && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: "1.5rem" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>🧬</div>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#f0f9ff", margin: 0 }}>Ask me anything about BME</h2>
              <p style={{ color: "#94a3b8", marginTop: "0.5rem", fontSize: "0.9rem" }}>From cell biology to neural decoding — I've got you covered.</p>
            </div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "0.75rem",
              width: "100%",
              maxWidth: 680,
            }}>
              {SUGGESTED_QUESTIONS.map((q, i) => (
                <button key={i} onClick={() => sendMessage(q)} style={{
                  background: "rgba(6,182,212,0.08)",
                  border: "1px solid rgba(6,182,212,0.25)",
                  borderRadius: 12,
                  padding: "0.75rem 1rem",
                  color: "#cbd5e1",
                  fontSize: "0.82rem",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.2s",
                  lineHeight: 1.4,
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(6,182,212,0.18)"; (e.currentTarget as HTMLButtonElement).style.color = "#f0f9ff"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(6,182,212,0.08)"; (e.currentTarget as HTMLButtonElement).style.color = "#cbd5e1"; }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} style={{
            display: "flex",
            flexDirection: msg.role === "user" ? "row-reverse" : "row",
            gap: "0.75rem",
            alignItems: "flex-start",
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
              background: msg.role === "user"
                ? "linear-gradient(135deg, #8b5cf6, #6366f1)"
                : "linear-gradient(135deg, #06b6d4, #3b82f6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1rem",
            }}>
              {msg.role === "user" ? "👤" : "🧬"}
            </div>
            <div style={{
              maxWidth: "75%",
              background: msg.role === "user"
                ? "linear-gradient(135deg, rgba(139,92,246,0.25), rgba(99,102,241,0.2))"
                : "rgba(255,255,255,0.05)",
              border: msg.role === "user"
                ? "1px solid rgba(139,92,246,0.35)"
                : "1px solid rgba(6,182,212,0.2)",
              borderRadius: msg.role === "user" ? "18px 4px 18px 18px" : "4px 18px 18px 18px",
              padding: "0.85rem 1.1rem",
              fontSize: "0.9rem",
              lineHeight: 1.65,
              color: "#e2e8f0",
            }}>
              {msg.role === "assistant" ? formatMessage(msg.content) : msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem",
            }}>🧬</div>
            <div style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(6,182,212,0.2)",
              borderRadius: "4px 18px 18px 18px",
              padding: "0.85rem 1.1rem",
              display: "flex", gap: "0.3rem", alignItems: "center",
            }}>
              {[0, 1, 2].map(j => (
                <div key={j} style={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: "#06b6d4",
                  animation: `bounce 1s ease-in-out ${j * 0.15}s infinite`,
                }} />
              ))}
            </div>
          </div>
        )}

        {error && (
          <div style={{
            background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.35)",
            borderRadius: 12,
            padding: "0.85rem 1.1rem",
            color: "#fca5a5",
            fontSize: "0.88rem",
          }}>
            ⚠️ {error}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div style={{
        padding: "1rem 1.5rem",
        borderTop: "1px solid rgba(6,182,212,0.15)",
        background: "rgba(6,11,24,0.9)",
        backdropFilter: "blur(10px)",
        position: "relative", zIndex: 2,
      }}>
        <div style={{
          display: "flex", gap: "0.75rem", alignItems: "flex-end",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(6,182,212,0.3)",
          borderRadius: 16,
          padding: "0.5rem 0.5rem 0.5rem 1rem",
          transition: "border-color 0.2s",
        }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about any BME concept… (Enter to send, Shift+Enter for newline)"
            rows={1}
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#e2e8f0",
              fontSize: "0.9rem",
              resize: "none",
              lineHeight: 1.5,
              maxHeight: 120,
              overflowY: "auto",
              padding: "0.35rem 0",
            }}
            onInput={e => {
              const t = e.currentTarget;
              t.style.height = "auto";
              t.style.height = Math.min(t.scrollHeight, 120) + "px";
            }}
          />
          <button
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
            style={{
              width: 40, height: 40, borderRadius: 12, flexShrink: 0,
              background: loading || !input.trim()
                ? "rgba(6,182,212,0.2)"
                : "linear-gradient(135deg, #06b6d4, #3b82f6)",
              border: "none",
              cursor: loading || !input.trim() ? "not-allowed" : "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.1rem",
              transition: "all 0.2s",
              opacity: loading || !input.trim() ? 0.5 : 1,
            }}
          >
            ➤
          </button>
        </div>
        <div style={{ fontSize: "0.72rem", color: "#475569", textAlign: "center", marginTop: "0.5rem" }}>
          BioMedAI Tutor uses Groq · LLaMA 3.3 70B — answers may not always be perfectly accurate
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}
