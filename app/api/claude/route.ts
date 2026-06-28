import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt, system, maxTokens } = await req.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Campo "prompt" é obrigatório.' }, { status: 400 });
    }

    const safeTokens = Math.min(typeof maxTokens === 'number' ? maxTokens : 2000, 8000);
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'GEMINI_API_KEY não configurada no servidor.' }, { status: 500 });
    }

    const body: Record<string, unknown> = {
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { maxOutputTokens: safeTokens },
    };

    if (system) {
      body.system_instruction = { parts: [{ text: system }] };
    }

    const resp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }
    );

    if (!resp.ok) {
      let message = `Gemini HTTP ${resp.status}`;
      try {
        const err = await resp.json();
        message = err.error?.message || message;
      } catch {
        // corpo não era JSON (comum em 503 da Gemini)
      }
      console.error('[/api/claude] Gemini error', resp.status, message);
      return NextResponse.json({ error: message }, { status: resp.status });
    }

    const data = await resp.json();
    const text = (data.candidates?.[0]?.content?.parts?.[0]?.text || '').trim();

    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    if (start !== -1 && end !== -1) {
      try {
        const jsonStr = text.slice(start, end + 1)
          .replace(/:\s*"([^"]*)"/g, (_m: string, v: string) =>
            `: "${v.replace(/[\n\r\t]/g, ' ').replace(/\s{2,}/g, ' ')}"`
          );
        return NextResponse.json({ result: JSON.parse(jsonStr) });
      } catch (_e) {
        // não era JSON válido — devolve como texto
      }
    }

    return NextResponse.json({ result: text });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : String(e) },
      { status: 500 }
    );
  }
}
