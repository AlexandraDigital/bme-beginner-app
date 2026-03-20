export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 1000,
        messages: [
          {
            role: "system",
            content: "You are an expert Biomedical Engineering tutor. Explain concepts clearly using analogies and clinical context. Be concise but thorough."
          },
          ...req.body.messages,
        ],
      }),
    });

    const data = await response.json();
    // Return in Anthropic-compatible shape so App.jsx needs no changes
    const text = data.choices?.[0]?.message?.content ?? "Error retrieving response.";
    res.status(response.status).json({ content: [{ type: "text", text }] });
  } catch (err) {
    res.status(500).json({ error: "API request failed" });
  }
}
