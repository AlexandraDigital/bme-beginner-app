export async function onRequestPost(context) {
  const { request, env } = context;

  if (!env.GROQ_API_KEY) {
    return new Response(
      JSON.stringify({ error: { message: "API key not configured. Please add GROQ_API_KEY to Cloudflare Pages environment variables." } }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const body = await request.json();

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${env.GROQ_API_KEY}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Groq API request failed:", err);
    return new Response(
      JSON.stringify({ error: { message: "API request failed. Please try again." } }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
