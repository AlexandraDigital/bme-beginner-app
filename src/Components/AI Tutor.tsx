import React, { useState } from "react";

interface Props {
  lessonTitle: string;
}

const AITutor = ({ lessonTitle }: Props) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const askAI = async () => {
    if (!question) return;
    setLoading(true);
    setAnswer("");

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer YOUR_OPENAI_API_KEY"
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            { role: "system", content: "You are a friendly BME tutor for beginners. Keep answers short and clear." },
            { role: "user", content: `About ${lessonTitle}: ${question}` }
          ],
          max_tokens: 200
        })
      });
      const data = await res.json();
      setAnswer(data.choices[0].message.content);
    } catch {
      setAnswer("Error connecting to AI. Please check your API key.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl overflow-hidden" style={{border: '1px solid rgba(255,255,255,0.08)'}}>
      <button
        className="w-full px-4 py-3 flex items-center justify-between text-sm font-semibold"
        style={{background: 'rgba(255,255,255,0.05)'}}
        onClick={() => setOpen(!open)}
      >
        <span>🤖 Ask AI Tutor</span>
        <span style={{color: 'rgba(255,255,255,0.4)'}}>{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className="p-4" style={{background: 'rgba(255,255,255,0.03)'}}>
          <div className="flex gap-2">
            <input
              className="ai-input flex-1 px-3 py-2 rounded-xl text-sm"
              type="text"
              value={question}
              onChange={e => setQuestion(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && askAI()}
              placeholder={`Ask about ${lessonTitle}...`}
            />
            <button
              className="glow-btn-green px-4 py-2 rounded-xl text-sm font-semibold text-white"
              onClick={askAI}
              disabled={loading}
            >
              {loading ? '...' : 'Ask'}
            </button>
          </div>
          {answer && (
            <div className="mt-3 p-3 rounded-xl text-sm leading-relaxed" style={{background: 'rgba(102,126,234,0.1)', border: '1px solid rgba(102,126,234,0.2)', color: 'rgba(255,255,255,0.85)'}}>
              {answer}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AITutor;
