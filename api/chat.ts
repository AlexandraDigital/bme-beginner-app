// api/chat.ts
//
// ─────────────────────────────────────────────────────────
//  Place this file at the ROOT of your repo: api/chat.ts
//  Add ANTHROPIC_API_KEY to Vercel Environment Variables
// ─────────────────────────────────────────────────────────

import type { VercelRequest, VercelResponse } from '@vercel/node';

const COURSE_CONTEXT = `
You are an expert AI Tutor for a Biomedical Engineering (BME) web course platform called BioMedAI.
Your job is to help students understand BME concepts deeply and clearly.

You have two modes:
1. CURRICULUM MODE: If the question relates to BME topics below, answer using your expert knowledge.
2. WEB SEARCH MODE: If the question is outside the curriculum or needs current info, use the web_search tool to find accurate, up-to-date information. Always condense web results into a clear, student-friendly answer. Never dump raw search results — summarize them.

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
- For web search results: summarize in 3-5 bullet points max, cite the source naturally
- For math topics, show worked examples
- Keep answers concise and student-friendly
`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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
        'anthropic-beta': 'web-search-2025-03-05',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: COURSE_CONTEXT,
        // ✅ Web search tool — Claude auto-decides when to use it
        tools: [
          {
            type: 'web_search_20250305',
            name: 'web_search',
          },
        ],
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

    // Extract all text blocks from the response
    // (Claude may return tool_use + text blocks when searching)
    const textBlocks = data.content
      ?.filter((b: any) => b.type === 'text')
      .map((b: any) => b.text)
      .join('\n');

    if (!textBlocks) {
      return res.status(500).json({ error: 'No text in response.' });
    }

    return res.status(200).json({ reply: textBlocks });
  } catch (err: any) {
    return res.status(500).json({ error: err?.message || 'Internal server error' });
  }
}
