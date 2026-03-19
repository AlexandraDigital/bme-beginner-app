import { NextRequest, NextResponse } from 'next/server';

const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';

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

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;

    // Guard: make sure API key is configured
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            'ANTHROPIC_API_KEY is not set. Add it to .env.local (dev) or Vercel Environment Variables (production).',
        },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { messages } = body;

    // Basic validation
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Request must include a non-empty messages array.' },
        { status: 400 }
      );
    }

    // Forward to Anthropic
    const anthropicRes = await fetch(ANTHROPIC_API_URL, {
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
      console.error('Anthropic API error:', errData);
      return NextResponse.json(
        { error: (errData as any)?.error?.message || 'Anthropic API error' },
        { status: anthropicRes.status }
      );
    }

    const data = await anthropicRes.json();
    const textBlock = data.content?.find((b: any) => b.type === 'text');

    if (!textBlock?.text) {
      return NextResponse.json(
        { error: 'No text content in Anthropic response.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ reply: textBlock.text });
  } catch (err: any) {
    console.error('Chat API route error:', err);
    return NextResponse.json(
      { error: err?.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
