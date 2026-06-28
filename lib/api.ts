export async function callAI(
  prompt: string,
  maxTokens = 2000,
  system?: string
): Promise<unknown> {
  const r = await fetch('/api/claude', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, maxTokens, ...(system !== undefined ? { system } : {}) }),
  });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const d = await r.json();
  if (d.error) throw new Error(d.error);
  return d.result;
}
