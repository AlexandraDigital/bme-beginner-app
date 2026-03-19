// api/chat.ts
//
// ─────────────────────────────────────────────────────────
//  SETUP INSTRUCTIONS
// ─────────────────────────────────────────────────────────
//  1. Place this file at the ROOT of your repo:
//       api/chat.ts   ← same level as src/, public/
//
//  2. Add your Anthropic API key on Vercel:
//       Vercel Dashboard → your project → Settings
//       → Environment Variables → Add:
//         Name:  ANTHROPIC_API_KEY
//         Value: sk-ant-...
//
//  3. Deploy — Vercel auto-detects files in /api as
//     serverless functions. No extra config needed.
// ─────────────────────────────────────────────────────────

import type { VercelRequest, VercelResponse } from '@vercel/node';

const COURSE_CONTEXT = `
You are an expert AI Tutor for a Biomedical Engineering (BME) web course platform called BioMedAI.
Your job is to help students understand BME concepts deeply and clearly.

Core topics you cover:
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
- Suggest follow-up questions to deepen understanding
- For math topics, show worked examples
- Cite real devices, papers, or companies where relevant
- If a question is outside BME scope, gently redirect
`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // CORS headers so your frontend can call this
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: 'ANTHROPIC_API_KEY is not set in Vercel Environment Variables.',
    });
  }

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array is required.' });
  }

  try {
    const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: COURSE_CONTEXT,
        messages,
      }),
    });

    if (!anthropicRes.ok) {
      const errData = await anthropicRes.json().catch(() => ({}));
      return res.status(anthropicRes.status).json({
        error: (errData as any)?.error?.message || 'Anthropic API error',
      });
    }

    const data = await anthropicRes.json();
    const textBlock = data.content?.find((b: any) => b.type === 'text');

    if (!textBlock?.text) {
      return res.status(500).json({ error: 'No text in response.' });
    }

    return res.status(200).json({ reply: textBlock.text });
  } catch (err: any) {
    return res.status(500).json({ error: err?.message || 'Internal server error' });
  }
}
