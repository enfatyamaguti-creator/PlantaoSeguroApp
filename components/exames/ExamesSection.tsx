'use client';
import { useState } from 'react';
import { C } from '@/lib/constants/colors';
import { SEV } from '@/lib/constants/exames';
import Loader from '@/components/shared/Loader';
import ErrorBox from '@/components/shared/ErrorBox';
import HemogramaForm from './HemogramaForm';
import HemogramaResult from './HemogramaResult';
import { callAI } from '@/lib/api';

const COMMON = ['Potássio (K+)', 'Sódio (Na+)', 'Hemoglobina', 'Gasometria arterial', 'Creatinina', 'Lactato', 'Glicemia', 'Plaquetas', 'PCR', 'INR', 'Ureia', 'TGO/TGP'];

export default function ExamesSection() {
  const [mode, setMode] = useState<'avulso' | 'hemograma'>('avulso');
  const [exam, setExam] = useState('');
  const [val, setVal] = useState('');
  const [ctx, setCtx] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [hmgResult, setHmgResult] = useState<Record<string, unknown> | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function interpret() {
    setLoading(true); setResult(null); setErr(null);
    try {
      const r = await callAI(
        `Exame: ${exam}${val ? `. Valor: ${val}` : ''}${ctx ? `. Contexto: ${ctx}` : ''}

Retorne JSON com estes campos (sem aspas duplas dentro dos valores, sem quebras de linha):
{"exame":"nome","valorEncontrado":"${val || '____'}","valorReferencia":"referencia","gravidade":"normal|atencao|critico|emergencia","interpretacao":"frase clinica pratica","riscos":["r1","r2"],"causasProvaveis":["c1","c2"],"sinaisClinicosEsperados":["s1","s2"],"condutasEnfermagem":["cond1","cond2","cond3","cond4"],"quandoComunicarMedico":"orientacao","prioridade":"baixa|media|alta|emergencia","monitoracao":["m1","m2","m3"],"dicaDaSupervisora":"dica pratica"}

REGRA: se o valor do exame não foi informado, mantenha '____' no campo valorEncontrado. Nunca invente ou estime valores numéricos não fornecidos.`,
        2000
      );
      setResult(r as Record<string, unknown>);
    } catch(e: unknown) {
      setErr(`Erro ao interpretar: ${e instanceof Error ? e.message : String(e)}. Tente novamente.`);
    } finally { setLoading(false); }
  }

  const s = result ? (SEV[result.gravidade as keyof typeof SEV] || SEV.atencao) : null;

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:18 }}>
      <div style={{ display:'flex', gap:8 }}>
        {[
          { id:'avulso',    label:'🧪 Exame avulso',        desc:'Qualquer exame isolado' },
          { id:'hemograma', label:'🩸 Hemograma Completo',   desc:'CBC com todas as séries' },
        ].map(m => (
          <div key={m.id} onClick={() => { setMode(m.id as 'avulso' | 'hemograma'); setResult(null); setHmgResult(null); setErr(null); }} style={{
            flex:1, padding:'12px 18px', borderRadius:12, cursor:'pointer', transition:'all 0.18s',
            background: mode===m.id ? C.accentGlow : C.card,
            border: `1px solid ${mode===m.id ? C.accent+'55' : C.border}`,
          }}>
            <div style={{ fontSize:14, fontWeight:700, color: mode===m.id ? C.accent : C.text }}>{m.label}</div>
            <div style={{ fontSize:11.5, color:C.muted, marginTop:2 }}>{m.desc}</div>
          </div>
        ))}
      </div>

      {mode === 'avulso' && (
        <div className="card">
          <h3 style={{ fontFamily:"'Inter',sans-serif", fontSize:16, fontWeight:700, marginBottom:15 }}>Qual exame deseja interpretar?</h3>
          <div style={{ display:'flex', flexWrap:'wrap', gap:7, marginBottom:16 }}>
            {COMMON.map(e => <span key={e} className={`chip${exam===e?' sel':''}`} onClick={() => setExam(e)}>{e}</span>)}
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
            <input placeholder="Nome do exame (ex: Potássio, Gasometria arterial, INR...)" value={exam} onChange={e => setExam(e.target.value)} />
            <input placeholder="Valor encontrado (ex: 6.8 mEq/L, pH 7.18, Hb 6.2...)" value={val} onChange={e => setVal(e.target.value)} required />
            <input placeholder="Contexto clínico (ex: paciente em oligúria, DRC, uso de iECA — opcional)" value={ctx} onChange={e => setCtx(e.target.value)} />
            <button className="btn btn-teal" onClick={interpret} disabled={loading || !exam.trim() || !val.trim()} style={{ alignSelf:'flex-start' }}>
              {loading ? '⏳ Interpretando...' : '🔍 Interpretar Resultado'}
            </button>
          </div>
        </div>
      )}

      {mode === 'hemograma' && (
        <HemogramaForm
          onResult={v => setHmgResult(v as Record<string, unknown>)}
          onError={setErr}
          loading={loading}
          setLoading={setLoading}
        />
      )}

      {err && <ErrorBox msg={err} />}
      {loading && <Loader msg={mode==='hemograma' ? 'Interpretando hemograma completo com raciocínio hematológico...' : 'Analisando resultado clínico com raciocínio de UTI...'} />}

      {mode === 'avulso' && result && s && (
        <div className="fadeUp" style={{ display:'flex', flexDirection:'column', gap:12 }}>
          <div style={{ background:s.bg, border:`1px solid ${s.c}40`, borderRadius:14, padding:'18px 22px', display:'flex', alignItems:'center', gap:18 }}>
            <div style={{ width:52, height:52, borderRadius:13, background:s.c+'25', border:`2px solid ${s.c}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, fontWeight:900, color:s.c, flexShrink:0 }}>{s.icon}</div>
            <div>
              <div style={{ fontSize:10.5, color:C.muted, textTransform:'uppercase', letterSpacing:1 }}>Gravidade</div>
              <div style={{ fontFamily:"'Inter',sans-serif", fontSize:24, fontWeight:800, color:s.c }}>{s.label}</div>
            </div>
            <div style={{ marginLeft:'auto', textAlign:'right' }}>
              <div style={{ fontSize:11, color:C.muted }}>Valor encontrado</div>
              <div className="num" style={{ fontSize:20, fontWeight:500, color:C.text }}>{String(result.valorEncontrado)}</div>
              <div style={{ fontSize:11.5, color:C.muted }}>Ref: {String(result.valorReferencia)}</div>
            </div>
          </div>
          <div className="card">
            <span className="section-label" style={{ color:C.accent }}>📋 Interpretação clínica</span>
            <p style={{ fontSize:14, lineHeight:1.75, color:C.text }}>{String(result.interpretacao)}</p>
          </div>
          <div className="grid-2col" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            <div className="card">
              <span className="section-label" style={{ color:C.danger }}>⚠ Riscos</span>
              {(result.riscos as string[])?.map((r, i) => <div key={i} style={{ fontSize:13, color:C.muted, marginBottom:6, paddingLeft:10, borderLeft:`2px solid ${C.danger}35` }}>{r}</div>)}
            </div>
            <div className="card">
              <span className="section-label" style={{ color:C.warn }}>🔍 Causas prováveis</span>
              {(result.causasProvaveis as string[])?.map((c, i) => <div key={i} style={{ fontSize:13, color:C.muted, marginBottom:6, paddingLeft:10, borderLeft:`2px solid ${C.warn}35` }}>{c}</div>)}
            </div>
          </div>
          <div className="card" style={{ borderColor:`${C.accent}30` }}>
            <span className="section-label" style={{ color:C.accent }}>✅ Condutas de enfermagem</span>
            {(result.condutasEnfermagem as string[])?.map((c, i) => (
              <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:10, marginBottom:9 }}>
                <div style={{ width:24, height:24, borderRadius:7, background:C.accentGlow, border:`1px solid ${C.accent}35`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700, color:C.accent, flexShrink:0 }}>{i+1}</div>
                <div style={{ fontSize:13.5, color:C.text, lineHeight:1.6, paddingTop:3 }}>{c}</div>
              </div>
            ))}
          </div>
          <div className="grid-2col" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            <div className="card">
              <span className="section-label" style={{ color:C.purple }}>📞 Quando acionar médico</span>
              <p style={{ fontSize:13, color:C.muted, lineHeight:1.65 }}>{String(result.quandoComunicarMedico)}</p>
            </div>
            <div className="card">
              <span className="section-label" style={{ color:C.warn }}>👁 Monitorização</span>
              {(result.monitoracao as string[])?.map((m, i) => <div key={i} style={{ fontSize:13, color:C.muted, marginBottom:5 }}>• {m}</div>)}
            </div>
          </div>
          <div style={{ background:`linear-gradient(135deg,${C.card},${C.goldGlow})`, border:`1px solid ${C.gold}35`, borderRadius:14, padding:'18px 22px' }}>
            <div style={{ fontSize:11, color:C.gold, fontWeight:700, textTransform:'uppercase', letterSpacing:1, marginBottom:9 }}>⭐ Dica da Equipe PlantãoSeguro</div>
            <p style={{ fontSize:14, color:C.text, lineHeight:1.7, fontStyle:'italic' }}>&ldquo;{String(result.dicaDaSupervisora)}&rdquo;</p>
            <div style={{ fontSize:11.5, color:C.muted, marginTop:9 }}>— Equipe PlantãoSeguro</div>
          </div>
        </div>
      )}

      {mode === 'hemograma' && hmgResult && <HemogramaResult result={hmgResult as unknown as Parameters<typeof HemogramaResult>[0]['result']} />}
    </div>
  );
}
