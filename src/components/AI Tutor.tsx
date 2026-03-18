import React, { useState } from "react";

interface Props {
  lessonTitle: string;
}

const AITutor = ({ lessonTitle }: Props) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const askAI = async () => {
    if (!question) return;
    setAnswer("Thinking...");

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
            { role: "user", content: `Explain to a beginner about ${lessonTitle}: ${question}` }
          ],
          max_tokens: 200
        })
      });
      const data = await res.json();
      setAnswer(data.choices[0].message.content);
    } catch {
      setAnswer("Error connecting to AI.");
    }
  };

  return (
    <div className="mt-3">
      <h4 className="font-semibold">🤖 Ask the AI Tutor</h4>
      <input
        className="mt-1 p-1 border rounded w-full"
        type="text"
        value={question}
        onChange={e => setQuestion(e.target.value)}
        placeholder="Ask a question..."
      />
      <button className="mt-1 px-3 py-1 bg-green-600 text-white rounded" onClick={askAI}>Ask AI</button>
      {answer && <div className="ai-response mt-1 p-2 bg-blue-50 rounded">{answer}</div>}
    </div>
  );
};

export default AITutor;
