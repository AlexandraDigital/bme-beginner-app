export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: { message: "Method not allowed" } });
  }

  if (!process.env.GROQ_API_KEY) {
    return res.status(500).json({ error: { message: "API key not configured. Please add GROQ_API_KEY to your environment variables." } });
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    console.error("Groq API request failed:", err);
    res.status(500).json({ error: { message: "API request failed. Please try again." } });
  }
}
