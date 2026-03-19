// api/chat.ts
//
// ─────────────────────────────────────────────────────────
//  Using Groq — 100% FREE, no credit card ever needed
//
//  SETUP:
//  1. Go to console.groq.com → sign up free
//  2. Click "API Keys" → "Create API Key" → copy it
//  3. Add to Vercel Environment Variables:
//       Name:  GROQ_API_KEY
//       Value: your-key-here
// ─────────────────────────────────────────────────────────

import type { VercelRequest, VercelResponse } from '@vercel/node';

const COURSE_CONTEXT = `
You are an expert AI Tutor for a Biomedical Engineering (BME) web course platform called BioMedAI.
Your job is to help students understand BME concepts deeply and clearly.

If the question is within the BME curriculum, answer using your expert knowledge.
If the question is outside the curriculum, answer it helpfully using your general knowledge and condense it into a clear, student-friendly response.

Core BME curriculum topics:
- Bioinstrumentation (MRI, ultrasound, ECG, EEG, sensors)
- Biomaterials (implants, scaffolds, hydrogels, biocompatibility)
- Biomechanics (bone, joint, gait, stress/strain, FEA)
- Tissue Engineering (scaffolds, vascularization, 3D bioprinting)
- Neural Engineering & BCIs (electrodes, EEG, Neuralink, DBS)
- Biosensors (glucose sensors, wearables, lab-on-chip)
- Genomics & Synthetic Biology (CRISPR, gene therapy, CAR-T)
- Clinical Engineering (device regulations, FDA, hospital systems)
- Math & Fundamentals (calculus, ODEs, linear algebra, Fourier, statistics)

PASTE YOUR COURSE CONTENT BELOW THIS LINE:
---
[Video transcript excerpts, quiz Q&A, lecture notes go here]
---

Guidelines:
- Always use markdown formatting: **bold**, bullet points, numbered lists
- Give practical, clinical examples to ground abstract concepts
- If a student seems stuck, break it down further
- For math topics, show worked examples
- Keep answers concise and student-friendly
`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: 'GROQ_API_KEY is not set in Vercel Environment Variables.',
    });
  }

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array is required.' });
  }

  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile', // Free, fast, very capable
        max_tokens: 1000,
        messages: [
          { role: 'system', content: COURSE_CONTEXT },
          ...messages.map((m: any) => ({
            role: m.role,
            content: m.content,
          })),
        ],
      }),
    });

    if (!groqRes.ok) {
      const errData = await groqRes.json().catch(() => ({}));
      return res.status(groqRes.status).json({
        error: (errData as any)?.error?.message || 'Groq API error',
      });
    }

    const data = await groqRes.json();
    const reply = data?.choices?.[0]?.message?.content;

    if (!reply) {
      return res.status(500).json({ error: 'No text in Groq response.' });
    }

    return res.status(200).json({ reply });
  } catch (err: any) {
    return res.status(500).json({ error: err?.message || 'Internal server error' });
  }
}
