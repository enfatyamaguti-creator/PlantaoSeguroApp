'use client';
import { useState } from 'react';
import { C } from '@/lib/constants/colors';
import { HMG_FIELDS } from '@/lib/constants/exames';
import { callAI } from '@/lib/api';

interface HemogramaFormProps {
  onResult: (r: unknown) => void;
  onError: (msg: string | null) => void;
  loading: boolean;
  setLoading: (v: boolean) => void;
}

export default function HemogramaForm({ onResult, onError, loading, setLoading }: HemogramaFormProps) {
  const [vals, setVals] = useState<Record<string, string>>({});
  const [sex, setSex] = useState('M');
  const [ctx, setCtx] = useState('');

  const set = (k: string, v: string) => setVals(p => ({ ...p, [k]: v }));

  async function interpret() {
    const filled = Object.entries(vals).filter(([, v]) => v.trim()).map(([k, v]) => {
      const f = HMG_FIELDS.flatMap(g => g.fields).find(f => f.key === k);
      return `${f?.label}: ${v} ${f?.unit}`;
    }).join('\n');
    if (!filled) { onError('Preencha pelo menos um parâmetro do hemograma.'); return; }
    setLoading(true); onResult(null); onError(null);
    try {
      const r = await callAI(
        `Hemograma. Sexo: ${sex === 'M' ? 'M' : 'F'}. Dados: ${filled}.${ctx ? ` Contexto: ${ctx}` : ''}

JSON (sem aspas duplas nos valores, sem quebras de linha):
{"gravidadeGeral":"normal|atencao|critico|emergencia","resumoClinico":"frase clinica","serieVermelha":{"status":"normal|atencao|critico","interpretacao":"frase","achados":["a1","a2"]},"serieBranca":{"status":"normal|atencao|critico","interpretacao":"frase","achados":["a1","a2"]},"plaquetas":{"status":"normal|atencao|critico","interpretacao":"frase","achados":["a1"]},"hipotesesDiagnosticas":["h1","h2","h3"],"sinaisDeAlerta":["s1","s2"],"condutasEnfermagem":["c1","c2","c3","c4"],"quandoComunicarMedico":"orientacao","monitoracao":["m1","m2","m3"],"dicaDaSupervisora":"dica pratica"}`,
        2500
      );
      onResult(r);
    } catch(e: unknown) {
      onError(`Erro ao interpretar hemograma: ${e instanceof Error ? e.message : String(e)}`);
    } finally { setLoading(false); }
  }

  const filledCount = Object.values(vals).filter(v => v.trim()).length;

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
      <div className="card">
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14 }}>
          <h3 style={{ fontFamily:"'Inter',sans-serif", fontSize:15, fontWeight:700 }}>🩸 Hemograma Completo</h3>
          <div style={{ display:'flex', gap:6 }}>
            {[{v:'M',l:'Masculino'},{v:'F',l:'Feminino'}].map(s => (
              <div key={s.v} onClick={() => setSex(s.v)} style={{
                padding:'5px 13px', borderRadius:7, cursor:'pointer', fontSize:12, fontWeight:600, transition:'all 0.15s',
                background: sex===s.v ? C.accentGlow : 'transparent',
                border: `1px solid ${sex===s.v ? C.accent+'55' : C.border}`,
                color: sex===s.v ? C.accent : C.muted,
              }}>{s.l}</div>
            ))}
          </div>
        </div>

        {HMG_FIELDS.map(group => (
          <div key={group.group} style={{ marginBottom:18 }}>
            <div style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:1, color:group.color, marginBottom:10 }}>{group.group}</div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:9 }}>
              {group.fields.map(f => (
                <div key={f.key}>
                  <label style={{ fontSize:11, color:C.muted, display:'block', marginBottom:4 }}>
                    {f.label} <span style={{ color:C.dim }}>({f.unit})</span>
                  </label>
                  <div style={{ position:'relative' }}>
                    <input
                      type="number"
                      placeholder={f.placeholder}
                      value={vals[f.key] || ''}
                      onChange={e => set(f.key, e.target.value)}
                      style={{ paddingRight:52, borderColor: vals[f.key] ? group.color+'55' : undefined }}
                    />
                    <span style={{ position:'absolute', right:8, top:'50%', transform:'translateY(-50%)', fontSize:10, color:C.dim, pointerEvents:'none' }}>{f.unit}</span>
                  </div>
                  <div style={{ fontSize:10, color:C.dim, marginTop:2 }}>
                    Ref: {sex === 'M' ? f.refM : f.refF}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:12, marginTop:4, display:'flex', flexDirection:'column', gap:9 }}>
          <input placeholder="Contexto clínico — diagnóstico, sinais, medicações em uso (opcional)" value={ctx} onChange={e => setCtx(e.target.value)} />
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <button className="btn btn-teal" onClick={interpret} disabled={loading || filledCount === 0}>
              {loading ? '⏳ Interpretando...' : `🔬 Interpretar Hemograma${filledCount ? ` (${filledCount} campos)` : ''}`}
            </button>
            {filledCount > 0 && (
              <button className="btn btn-ghost" onClick={() => { setVals({}); setCtx(''); }} style={{ fontSize:12 }}>↺ Limpar</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
