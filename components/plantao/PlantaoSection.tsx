'use client';
import { useState } from 'react';
import { C } from '@/lib/constants/colors';
import Loader from '@/components/shared/Loader';
import ErrorBox from '@/components/shared/ErrorBox';

async function callClaude(prompt: string, maxTokens = 2000) {
  const r = await fetch('/api/claude', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, maxTokens }),
  });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const d = await r.json();
  if (d.error) throw new Error(d.error);
  return d.result;
}

const SITS = [
  '🧠 Rebaixamento do nível de consciência',
  '📉 Hipotensão',
  '📈 Hipertensão grave',
  '💗 Taquicardia',
  '💔 Bradicardia',
  '🌡️ Febre alta',
  '💧 Oligúria / Anúria',
  '🫁 Dessaturação',
  '🩸 Hipoglicemia',
  '😤 Agitação / Delirium',
  '🩺 Piora respiratória',
  '💊 Reação a medicamento',
];

export default function PlantaoSection() {
  const [sit, setSit] = useState('');
  const [ctx, setCtx] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function assess() {
    setLoading(true); setResult(null); setErr(null);
    try {
      const r = await callClaude(
        `Situacao clinica: ${sit}${ctx ? `. Contexto: ${ctx}` : ''}

JSON (sem aspas duplas nos valores, sem quebras de linha):
{"situacao":"descricao","prioridade":"imediata|alta|media","riscoIminente":true,"mensagemRapida":"frase direta","primeirosPasso":["p1","p2","p3","p4"],"oQueAvaliar":["a1","a2","a3"],"oQueMonitorar":["m1","m2","m3"],"sinaisDeAlerta":["s1","s2","s3"],"quandoEscalar":"orientacao"}`,
        2000
      );
      setResult(r);
    } catch(e: unknown) { setErr(`Erro: ${e instanceof Error ? e.message : String(e)}`); }
    finally { setLoading(false); }
  }

  const isEmergency = result?.riscoIminente;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ background: C.dangerGlow, border: `1px solid ${C.danger}40`, borderRadius: 12, padding: '11px 16px', fontSize: 13, color: C.danger, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span>🚨</span>
        <span>Modo Plantão: suporte ao raciocínio clínico. <strong>Em emergência real, acione o médico imediatamente.</strong></span>
      </div>

      <div className="card">
        <h3 style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 15 }}>Qual é a situação clínica?</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 16 }}>
          {SITS.map(s => (
            <span key={s} className={`chip danger${sit === s ? ' sel' : ''}`} onClick={() => setSit(s)} style={{ fontSize: 12 }}>{s}</span>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          <input placeholder="Ou descreva a situação..." value={sit} onChange={e => setSit(e.target.value)} />
          <textarea placeholder="Contexto: sinais vitais, tempo de início, medicações, histórico relevante..." value={ctx} onChange={e => setCtx(e.target.value)} rows={3} />
          <button className="btn btn-red" onClick={assess} disabled={loading || !sit} style={{ alignSelf: 'flex-start' }}>
            {loading ? '⏳ Avaliando...' : '🚨 Avaliar Situação'}
          </button>
        </div>
      </div>

      {err && <ErrorBox msg={err} />}
      {loading && <Loader color={C.danger} msg="Avaliando situação clínica com raciocínio de UTI..." />}

      {result && (
        <div className="fadeUp" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ background: isEmergency ? C.dangerGlow : C.warnGlow, border: `1px solid ${isEmergency ? C.danger : C.warn}45`, borderRadius: 14, padding: '18px 22px' }}>
            <div style={{ fontSize: 11, color: C.muted, marginBottom: 5 }}>{String(result.situacao)}</div>
            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 22, fontWeight: 800, color: isEmergency ? C.danger : C.warn }}>
              {isEmergency ? '🚨 RISCO IMINENTE' : `⚠ Prioridade: ${String(result.prioridade)?.toUpperCase()}`}
            </div>
            <div style={{ fontSize: 14.5, color: C.text, marginTop: 10, borderTop: `1px solid ${C.border}`, paddingTop: 10, fontWeight: 500 }}>
              {String(result.mensagemRapida)}
            </div>
          </div>

          <div className="card" style={{ borderColor: `${C.danger}30` }}>
            <span className="section-label" style={{ color: C.danger }}>⚡ Primeiros passos — AGORA</span>
            {(result.primeirosPasso as string[])?.map((p, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 9 }}>
                <div style={{ width: 26, height: 26, borderRadius: 7, background: C.dangerGlow, border: `1px solid ${C.danger}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: C.danger, flexShrink: 0 }}>{i + 1}</div>
                <div style={{ fontSize: 13.5, color: C.text, lineHeight: 1.6, paddingTop: 4 }}>{p}</div>
              </div>
            ))}
          </div>

          <div className="grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div className="card">
              <span className="section-label" style={{ color: C.accent }}>🔍 O que avaliar</span>
              {(result.oQueAvaliar as string[])?.map((a, i) => <div key={i} style={{ fontSize: 13, color: C.muted, marginBottom: 6, paddingLeft: 10, borderLeft: `2px solid ${C.accent}35` }}>{a}</div>)}
            </div>
            <div className="card">
              <span className="section-label" style={{ color: C.warn }}>👁 O que monitorar</span>
              {(result.oQueMonitorar as string[])?.map((m, i) => <div key={i} style={{ fontSize: 13, color: C.muted, marginBottom: 6, paddingLeft: 10, borderLeft: `2px solid ${C.warn}35` }}>{m}</div>)}
            </div>
          </div>

          <div className="card" style={{ borderColor: `${C.danger}30` }}>
            <span className="section-label" style={{ color: C.danger }}>🔴 Sinais de alerta — escalar imediatamente se:</span>
            {(result.sinaisDeAlerta as string[])?.map((s, i) => <div key={i} style={{ fontSize: 13, color: C.text, marginBottom: 5 }}>• {s}</div>)}
          </div>

          <div className="card" style={{ borderColor: `${C.purple}30` }}>
            <span className="section-label" style={{ color: C.purple }}>📞 Quando acionar médico / equipe</span>
            <p style={{ fontSize: 13.5, color: C.text, lineHeight: 1.65 }}>{String(result.quandoEscalar)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
