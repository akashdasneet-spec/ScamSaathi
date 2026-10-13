import { NextRequest, NextResponse } from 'next/server';
import { analyzeTextMessage, AnalysisResult } from '@/lib/detector';
import { analyzeUrlSafety } from '@/lib/url-analyzer';

// Helper to mask PII (phone numbers, account numbers, Aadhaar)
function redactPii(input: string): string {
  return input
    .replace(/\b[6-9]\d{9}\b/g, '[REDACTED_PHONE]')
    .replace(/\b\d{4}[ -]?\d{4}[ -]?\d{4}\b/g, '[REDACTED_AADHAAR]')
    .replace(/\b\d{4}[ -]?\d{4}[ -]?\d{4}[ -]?\d{4}\b/g, '[REDACTED_CARD]');
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text, type = 'message', language = 'en' } = body;

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return NextResponse.json(
        { error: 'Please enter a message or URL to analyze.' },
        { status: 400 }
      );
    }

    const cleanedText = text.trim();
    const sanitizedText = redactPii(cleanedText);

    // 1. Deterministic Security Analysis
    let result: AnalysisResult;
    if (type === 'url') {
      result = analyzeUrlSafety(sanitizedText);
    } else {
      result = analyzeTextMessage(sanitizedText);
    }

    // 2. Optional AI Explanation Layer (Gemini or OpenAI)
    let aiExplanation: string | null = null;
    const geminiKey = process.env.GEMINI_API_KEY;
    const openAiKey = process.env.OPENAI_API_KEY;

    if (geminiKey) {
      try {
        const langName = language === 'hi' ? 'Hindi' : language === 'bn' ? 'Bengali' : 'English';
        const prompt = `You are "ScamSaathi", a kind, patient, and protective digital safety assistant explaining a suspicious message to an elderly grandparent in India.
Language to respond in: ${langName}.
Analyzed text: "${sanitizedText}"
Risk Level: ${result.riskLevel} (${result.score}/100)
Detected Category: ${result.categoryName}
Flagged Indicators: ${result.indicators.map(i => i.title).join(', ')}

Explain to the elder in 2-3 warm, simple sentences without using technical jargon:
1. What the caller or sender is actually trying to do (the trick).
2. Why they should NOT panic.
3. The immediate safe action they should take (e.g. tell family, do not click, never share OTP).
Do NOT invent new threat data. Keep it reassuring, respectful, and direct.`;

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
            }),
            signal: AbortSignal.timeout(5000), // 5 sec timeout
          }
        );

        if (geminiRes.ok) {
          const data = await geminiRes.json();
          aiExplanation = data?.candidates?.[0]?.content?.parts?.[0]?.text || null;
        }
      } catch (e) {
        console.warn('AI explanation fallback engaged:', e);
      }
    } else if (openAiKey) {
      try {
        const langName = language === 'hi' ? 'Hindi' : language === 'bn' ? 'Bengali' : 'English';
        const prompt = `You are ScamSaathi, a calm digital companion for Indian elders. Explain this suspicious message in simple ${langName} in 3 gentle sentences: "${sanitizedText}". Risk: ${result.riskLevel}. Category: ${result.categoryName}. Tell them what trick is being played and to stay calm.`;

        const openAiRes = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${openAiKey}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 200,
          }),
          signal: AbortSignal.timeout(5000),
        });

        if (openAiRes.ok) {
          const data = await openAiRes.json();
          aiExplanation = data?.choices?.[0]?.message?.content || null;
        }
      } catch (e) {
        console.warn('AI explanation fallback engaged:', e);
      }
    }

    return NextResponse.json({
      success: true,
      result,
      aiExplanation,
      redactedText: sanitizedText,
      language,
    });
  } catch (error) {
    console.error('Error analyzing content:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while analyzing the content. Please try again.' },
      { status: 500 }
    );
  }
}
