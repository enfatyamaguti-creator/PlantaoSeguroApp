'use client';
import { useState } from 'react';
import { C } from '@/lib/constants/colors';
import { SAE_SIGNS, SAE_SETORES } from '@/lib/constants/sae';
import Loader from '@/components/shared/Loader';
import ErrorBox from '@/components/shared/ErrorBox';
import { callAI } from '@/lib/api';

interface SAEResult {
  resumoClinico?: string;
  alertasPrioritarios?: string[];
  diagnosticos?: Array<{
    nanda: string;
    codigo: string;
    dominio: string;
    classe: string;
    prioridade: string;
    relacionadoA: string[];
    evidenciadoPor: string[];
    justificativaClinica: string;
  }>;
  intervencoes?: Array<{
    nic: string;
    codigo: string;
    diagRelacionado: string;
    atividades: string[];
  }>;
  resultados?: Array<{
    noc: string;
    codigo: string;
    diagRelacionado: string;
    indicadores: string[];
    metaEsperada: string;
  }>;
  evolucaoSugerida?: string;
  dicaDaSupervisora?: string;
}

const PRIO_CFG: Record<string, { c: string; bg: string; label: string }> = {
  alta:  { c: C.danger, bg: C.dangerGlow, label: 'ALTA' },
  media: { c: C.warn,   bg: C.warnGlow,   label: 'MÉDIA' },
  baixa: { c: C.ok,     bg: C.okGlow,     label: 'BAIXA' },
};

export default function SAESection() {
  const [signs, setSigns] = useState<string[]>([]);
  const [setor, setSetor] = useState('UTI Adulto');
  const [ctx, setCtx] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SAEResult | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  const toggle = (s: string) => setSigns(p => p.includes(s) ? p.filter(x => x !== s) : [...p, s]);

  async function generateSAE() {
    setLoading(true); setResult(null); setErr(null);
    try {
      const data = await callAI(
        `Setor: ${setor}\nDados clínicos: ${signs.join('; ')}\n${ctx ? `Contexto: ${ctx}` : ''}\n\nRetorne JSON com esta estrutura exata. Máximo 2 diagnósticos, 3 intervenções, 2 resultados. Todos os valores de string sem aspas duplas internas e sem quebras de linha:\n\n{"resumoClinico":"frase1. frase2","alertasPrioritarios":["alerta1","alerta2","alerta3"],"diagnosticos":[{"nanda":"nome NANDA","codigo":"00XXX","dominio":"nome dominio","classe":"nome classe","prioridade":"alta","relacionadoA":["fator1","fator2"],"evidenciadoPor":["evidencia1","evidencia2"],"justificativaClinica":"justificativa em uma frase"}],"intervencoes":[{"nic":"nome NIC","codigo":"XXXX","diagRelacionado":"nome do diagnostico relacionado","atividades":["atividade1","atividade2","atividade3"]}],"resultados":[{"noc":"nome NOC","codigo":"XXXX","diagRelacionado":"nome do diagnostico","indicadores":["indicador1","indicador2"],"metaEsperada":"meta em uma frase"}],"evolucaoSugerida":"texto de evolucao em uma frase longa sem quebras de linha","dicaDaSupervisora":"dica pratica em uma frase"}`,
        8000,
        'Você é especialista em SAE de enfermagem (NANDA/NIC/NOC) com foco em UTI adulto. REGRA ABSOLUTA: responda APENAS com JSON puro e válido. Nunca use aspas duplas dentro de valores de string — use aspas simples ou reescreva. Nunca insira quebras de linha dentro de valores de string. Zero markdown. Zero texto fora do JSON. NUNCA invente valores numéricos de escalas (RASS, Braden, CPOT, CAM-ICU, Glasgow, etc.) ou exames laboratoriais que não foram fornecidos — use ____ como placeholder.'
      );
      if (typeof data !== 'object' || !data) throw new Error('Formato inválido. Tente novamente.');

      setResult(data as SAEResult);
    } catch(e: unknown) {
      setErr(`Erro: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setLoading(false);
    }
  }

  function copyEvolucao() {
    if (result?.evolucaoSugerida) {
      navigator.clipboard.writeText(result.evolucaoSugerida);
      setCopied(true); setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:18 }}>
      <div style={{ background:`rgba(107,92,165,0.07)`, border:`1px solid rgba(107,92,165,0.25)`, borderRadius:11, padding:'11px 16px', display:'flex', alignItems:'flex-start', gap:9 }}>
        <span style={{ fontSize:16, flexShrink:0 }}>⚖️</span>
        <span style={{ fontSize:12.5, color:C.muted, lineHeight:1.65 }}>
          <strong style={{ color:C.text }}>Ferramenta de apoio ao raciocínio clínico.</strong> Os diagnósticos, intervenções e resultados sugeridos são baseados nas taxonomias NANDA/NIC/NOC e devem ser validados pelo enfermeiro. A avaliação clínica, decisão e responsabilidade final são <strong style={{ color:C.text }}>privativas do enfermeiro</strong> conforme Resolução COFEN nº 358/2009.
        </span>
      </div>

      <div className="card">
        <h3 style={{ fontFamily:"'Inter',sans-serif", fontSize:16, fontWeight:700, marginBottom:16 }}>Configure o quadro clínico</h3>

        <div style={{ marginBottom:16 }}>
          <span className="label">Setor</span>
          <div style={{ display:'flex', flexWrap:'wrap', gap:7 }}>
            {SAE_SETORES.map(s => (
              <span key={s} className={`chip${setor===s?' sel':''}`} onClick={() => setSetor(s)}>{s}</span>
            ))}
          </div>
        </div>

        <span className="label">Sinais, sintomas e dados clínicos ({signs.length} selecionados)</span>
        <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:14 }}>
          {SAE_SIGNS.map(group => (
            <div key={group.sys} style={{ border:`1px solid ${C.border}`, borderRadius:11, overflow:'hidden' }}>
              <div
                onClick={() => setActiveGroup(activeGroup === group.sys ? null : group.sys)}
                style={{
                  padding:'11px 15px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'space-between',
                  background: activeGroup === group.sys ? group.color+'0D' : C.surface,
                  transition:'background 0.15s',
                }}
              >
                <div style={{ display:'flex', alignItems:'center', gap:9 }}>
                  <span style={{ fontSize:15 }}>{group.sys.split(' ')[0]}</span>
                  <span style={{ fontSize:13, fontWeight:600, color: activeGroup === group.sys ? group.color : C.text }}>
                    {group.sys.split(' ').slice(1).join(' ')}
                  </span>
                  {group.signs.filter(s => signs.includes(s)).length > 0 && (
                    <span style={{ background:group.color+'20', color:group.color, borderRadius:10, padding:'2px 8px', fontSize:11, fontWeight:700 }}>
                      {group.signs.filter(s => signs.includes(s)).length}
                    </span>
                  )}
                </div>
                <span style={{ color:C.dim, fontSize:14, transform: activeGroup===group.sys?'rotate(90deg)':'none', transition:'transform 0.2s' }}>›</span>
              </div>
              {activeGroup === group.sys && (
                <div style={{ padding:'12px 15px', display:'flex', flexWrap:'wrap', gap:7, borderTop:`1px solid ${C.border}`, background:C.card }}>
                  {group.signs.map(s => (
                    <span
                      key={s}
                      onClick={() => toggle(s)}
                      style={{
                        padding:'6px 12px', borderRadius:18, border:`1px solid ${signs.includes(s) ? group.color+'60' : C.border}`,
                        background: signs.includes(s) ? group.color+'12' : C.surface,
                        color: signs.includes(s) ? group.color : C.muted,
                        cursor:'pointer', fontSize:12.5, fontWeight: signs.includes(s) ? 600 : 400,
                        transition:'all 0.14s', userSelect:'none',
                      }}
                    >{signs.includes(s) ? '✓ ' : ''}{s}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {signs.length > 0 && (
          <div style={{ background:C.bg, borderRadius:9, padding:'10px 13px', marginBottom:12, display:'flex', alignItems:'flex-start', gap:8 }}>
            <span style={{ fontSize:12, color:C.muted, flexShrink:0, marginTop:1 }}>Selecionados:</span>
            <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
              {signs.map(s => (
                <span key={s} onClick={() => toggle(s)} style={{ fontSize:11.5, background:C.accent+'15', color:C.accent, borderRadius:6, padding:'2px 8px', cursor:'pointer', fontWeight:500 }}>
                  {s} ×
                </span>
              ))}
            </div>
          </div>
        )}

        <input placeholder="Informações adicionais — diagnóstico médico, medicações, dados laboratoriais relevantes (opcional)" value={ctx} onChange={e => setCtx(e.target.value)} style={{ marginBottom:12 }} />

        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <button className="btn btn-teal" onClick={generateSAE} disabled={loading || signs.length < 2}>
            {loading ? '⏳ Gerando SAE...' : `🧬 Gerar SAE Completa${signs.length ? ` (${signs.length} dados)` : ''}`}
          </button>
          {signs.length > 0 && (
            <button className="btn btn-ghost" onClick={() => { setSigns([]); setResult(null); setErr(null); }} style={{ fontSize:12 }}>↺ Limpar</button>
          )}
          {signs.length < 2 && <span style={{ fontSize:12, color:C.dim }}>Selecione ao menos 2 sinais/sintomas</span>}
        </div>
      </div>

      {err && <ErrorBox msg={err} />}
      {loading && <Loader msg="Analisando quadro clínico com NANDA · NIC · NOC" subMsg="Cruzando sinais com taxonomias de enfermagem..." />}

      {result && (
        <div className="fadeUp" style={{ display:'flex', flexDirection:'column', gap:14 }}>
          <div className="card" style={{ borderLeft:`4px solid ${C.accent}`, borderRadius:'0 14px 14px 0' }}>
            <span className="section-label" style={{ color:C.accent }}>📋 Resumo clínico gerado</span>
            <p style={{ fontSize:14, color:C.text, lineHeight:1.75 }}>{result.resumoClinico}</p>
          </div>

          {result.alertasPrioritarios && result.alertasPrioritarios.length > 0 && (
            <div className="card" style={{ borderColor:`${C.danger}30`, background:C.dangerGlow }}>
              <span className="section-label" style={{ color:C.danger }}>🚨 Alertas prioritários</span>
              <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                {result.alertasPrioritarios.map((a, i) => (
                  <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:9 }}>
                    <div style={{ width:6, height:6, borderRadius:'50%', background:C.danger, flexShrink:0, marginTop:6 }} />
                    <span style={{ fontSize:13.5, color:C.text, lineHeight:1.6 }}>{a}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <div style={{ fontFamily:"'Inter',sans-serif", fontSize:16, fontWeight:800, color:C.text, marginBottom:12, display:'flex', alignItems:'center', gap:8 }}>
              <span style={{ background:'rgba(107,92,165,0.12)', border:'1px solid rgba(107,92,165,0.3)', borderRadius:8, padding:'4px 10px', fontSize:12, color:C.purple, fontWeight:700 }}>NANDA</span>
              Diagnósticos de Enfermagem
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {result.diagnosticos?.map((d, i) => {
                const pc = PRIO_CFG[d.prioridade] || PRIO_CFG.media;
                return (
                  <div key={i} style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:14, overflow:'hidden', boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}>
                    <div style={{ padding:'14px 18px', borderBottom:`1px solid ${C.border}`, display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:14 }}>
                      <div style={{ flex:1 }}>
                        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:5, flexWrap:'wrap' }}>
                          <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:C.muted, background:C.bg, borderRadius:5, padding:'2px 7px', border:`1px solid ${C.border}` }}>{d.codigo}</span>
                          <span style={{ background:pc.bg, color:pc.c, borderRadius:6, padding:'2px 9px', fontSize:10.5, fontWeight:700, border:`1px solid ${pc.c}30` }}>Prioridade {pc.label}</span>
                        </div>
                        <h4 style={{ fontFamily:"'Inter',sans-serif", fontSize:15, fontWeight:700, color:C.text, marginBottom:3 }}>{d.nanda}</h4>
                        <div style={{ fontSize:11.5, color:C.muted }}>Domínio: {d.dominio} · Classe: {d.classe}</div>
                      </div>
                      <div style={{ width:34, height:34, borderRadius:10, background:C.purple+'15', border:`1px solid ${C.purple}25`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, flexShrink:0 }}>{i+1 <= 3 ? ['🥇','🥈','🥉'][i] : '🔹'}</div>
                    </div>
                    <div className="grid-2col" style={{ padding:'13px 18px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                      <div>
                        <div style={{ fontSize:10.5, color:C.muted, fontWeight:700, textTransform:'uppercase', letterSpacing:0.9, marginBottom:6 }}>Relacionado a</div>
                        {d.relacionadoA?.map((r, j) => <div key={j} style={{ fontSize:12.5, color:C.text, marginBottom:4, paddingLeft:9, borderLeft:`2px solid ${C.purple}30` }}>{r}</div>)}
                      </div>
                      <div>
                        <div style={{ fontSize:10.5, color:C.muted, fontWeight:700, textTransform:'uppercase', letterSpacing:0.9, marginBottom:6 }}>Evidenciado por</div>
                        {d.evidenciadoPor?.map((e, j) => <div key={j} style={{ fontSize:12.5, color:C.text, marginBottom:4, paddingLeft:9, borderLeft:`2px solid ${C.accent}30` }}>{e}</div>)}
                      </div>
                    </div>
                    <div style={{ padding:'0 18px 14px' }}>
                      <div style={{ background:C.bg, borderRadius:8, padding:'9px 12px', fontSize:12.5, color:C.muted, lineHeight:1.6, fontStyle:'italic' }}>
                        💡 {d.justificativaClinica}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <div style={{ fontFamily:"'Inter',sans-serif", fontSize:16, fontWeight:800, color:C.text, marginBottom:12, display:'flex', alignItems:'center', gap:8 }}>
              <span style={{ background:`${C.accent}15`, border:`1px solid ${C.accent}30`, borderRadius:8, padding:'4px 10px', fontSize:12, color:C.accent, fontWeight:700 }}>NIC</span>
              Intervenções de Enfermagem
            </div>
            <div className="grid-2col" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
              {result.intervencoes?.map((n, i) => (
                <div key={i} style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:13, padding:'15px 17px', boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}>
                  <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:10 }}>
                    <div style={{ flex:1 }}>
                      <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10.5, color:C.muted, background:C.bg, borderRadius:5, padding:'2px 7px', border:`1px solid ${C.border}`, display:'inline-block', marginBottom:6 }}>{n.codigo}</span>
                      <h5 style={{ fontFamily:"'Inter',sans-serif", fontSize:13.5, fontWeight:700, color:C.accent, lineHeight:1.3 }}>{n.nic}</h5>
                      <div style={{ fontSize:11, color:C.muted, marginTop:3 }}>→ {n.diagRelacionado}</div>
                    </div>
                  </div>
                  <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
                    {n.atividades?.map((a, j) => (
                      <div key={j} style={{ display:'flex', alignItems:'flex-start', gap:7 }}>
                        <div style={{ width:5, height:5, borderRadius:'50%', background:C.accent, flexShrink:0, marginTop:6 }} />
                        <span style={{ fontSize:12, color:C.text, lineHeight:1.55 }}>{a}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontFamily:"'Inter',sans-serif", fontSize:16, fontWeight:800, color:C.text, marginBottom:12, display:'flex', alignItems:'center', gap:8 }}>
              <span style={{ background:`${C.ok}15`, border:`1px solid ${C.ok}30`, borderRadius:8, padding:'4px 10px', fontSize:12, color:C.ok, fontWeight:700 }}>NOC</span>
              Resultados Esperados
            </div>
            <div className="grid-2col" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
              {result.resultados?.map((r, i) => (
                <div key={i} style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:13, padding:'15px 17px', boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}>
                  <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10.5, color:C.muted, background:C.bg, borderRadius:5, padding:'2px 7px', border:`1px solid ${C.border}`, display:'inline-block', marginBottom:6 }}>{r.codigo}</span>
                  <h5 style={{ fontFamily:"'Inter',sans-serif", fontSize:13.5, fontWeight:700, color:C.ok, lineHeight:1.3, marginBottom:4 }}>{r.noc}</h5>
                  <div style={{ fontSize:11, color:C.muted, marginBottom:10 }}>→ {r.diagRelacionado}</div>
                  <div style={{ display:'flex', flexDirection:'column', gap:4, marginBottom:10 }}>
                    {r.indicadores?.map((ind, j) => (
                      <div key={j} style={{ display:'flex', alignItems:'flex-start', gap:7 }}>
                        <div style={{ width:5, height:5, borderRadius:'50%', background:C.ok, flexShrink:0, marginTop:6 }} />
                        <span style={{ fontSize:12, color:C.text, lineHeight:1.55 }}>{ind}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ background:`${C.ok}0D`, border:`1px solid ${C.ok}25`, borderRadius:8, padding:'8px 11px', fontSize:12, color:C.text, lineHeight:1.6 }}>
                    <strong style={{ color:C.ok, fontSize:10.5, textTransform:'uppercase', letterSpacing:0.5 }}>Meta 24–48h: </strong>
                    {r.metaEsperada}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ borderColor:`${C.purple}30` }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:13 }}>
              <span className="section-label" style={{ color:C.purple }}>✍️ Evolução sugerida baseada na SAE</span>
              <button className="btn btn-ghost" onClick={copyEvolucao} style={{ padding:'6px 13px', fontSize:12 }}>
                {copied ? '✓ Copiado!' : '📋 Copiar'}
              </button>
            </div>
            <div style={{ background:C.bg, borderRadius:10, padding:'16px 18px', fontSize:14, color:C.text, lineHeight:1.9, border:`1px solid ${C.border}` }}>
              {result.evolucaoSugerida}
            </div>
            <div style={{ fontSize:11.5, color:C.dim, marginTop:10 }}>
              ⚠ Revise e adapte ao paciente real antes de registrar no prontuário. Esta é uma sugestão de apoio — a documentação é responsabilidade do enfermeiro.
            </div>
          </div>

          <div style={{ background:`linear-gradient(135deg,${C.card},${C.goldGlow})`, border:`1px solid ${C.gold}35`, borderRadius:14, padding:'18px 22px' }}>
            <div style={{ fontSize:11, color:C.gold, fontWeight:700, textTransform:'uppercase', letterSpacing:1, marginBottom:9 }}>⭐ Dica da supervisora</div>
            <p style={{ fontSize:14, color:C.text, lineHeight:1.75, fontStyle:'italic' }}>&ldquo;{result.dicaDaSupervisora}&rdquo;</p>
            <div style={{ fontSize:11.5, color:C.muted, marginTop:9 }}>— Andreia Yamaguti · Supervisora UTI</div>
          </div>
        </div>
      )}
    </div>
  );
}
