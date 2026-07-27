'use client';
import { useState } from 'react';
import { C } from '@/lib/constants/colors';
import { ANOT_TIPOS, ANOT_TURNOS, ANOT_SETORES, ANOT_EXTRAS } from '@/lib/constants/anotacao';
import Loader from '@/components/shared/Loader';
import ErrorBox from '@/components/shared/ErrorBox';
import { callAI } from '@/lib/api';

export default function AnotacaoSection() {
  const [tipo, setTipo] = useState<string | null>(null);
  const [turno, setTurno] = useState('');
  const [setor, setSetor] = useState('UTI Adulto');
  const [paciente, setPaciente] = useState('');
  const [leito, setLeito] = useState('');
  const [extras, setExtras] = useState<Record<string, string>>({});
  const [contexto, setContexto] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editText, setEditText] = useState('');

  const tipoSel = ANOT_TIPOS.find(t => t.id === tipo);
  const camposExtras = tipo ? (ANOT_EXTRAS[tipo] || []) : [];

  const setExtra = (k: string, v: string) => setExtras(p => ({ ...p, [k]: v }));

  const preenchidos = camposExtras.filter(c => (extras[c.key] || '').trim()).length;

  function resetForm() {
    setTipo(null); setExtras({}); setContexto(''); setResult(''); setErr(null);
    setPaciente(''); setLeito(''); setEditText('');
  }

  async function generate() {
    setLoading(true); setResult(''); setErr(null);
    try {
      const camposTexto = camposExtras
        .filter(c => (extras[c.key] || '').trim())
        .map(c => `${c.label}: ${extras[c.key]}`)
        .join('\n');

      const text = await callAI(
        `Gere uma anotação de enfermagem profissional.\n\nTipo: ${tipoSel?.label}\nSetor: ${setor}\nTurno: ${turno || 'não informado'}\n${paciente ? `Identificação: ${paciente}${leito ? `, Leito ${leito}` : ''}` : ''}\n${camposTexto}\n${contexto ? `Contexto adicional: ${contexto}` : ''}\n\nRequisitos:\n- Linguagem técnica de enfermagem hospitalar\n- 3ª pessoa do singular (ex: "Paciente apresentou...", "Realizado...", "Comunicado ao...")\n- Máximo 120 palavras\n- Texto corrido, sem tópicos ou bullets\n- Incluir horário se relevante (usar __HORÁRIO__ como placeholder)\n- Para qualquer valor numérico não informado (sinais vitais, escalas, exames), usar ____ para o enfermeiro preencher\n- Finalizar com assinatura padrão: "Enfermeiro(a) responsável."\n- Seguir normas COFEN de documentação`,
        2000,
        'Você é enfermeira supervisora de UTI com vasta experiência em documentação de enfermagem. Gere anotações de enfermagem profissionais, objetivas, em linguagem técnica, em 3ª pessoa do singular, sem bullet points, texto corrido. Siga as normas do COFEN. REGRA ABSOLUTA: nunca invente valores numéricos (PA, FC, FR, SpO2, temperatura, glicemia, escalas) que não foram fornecidos — use ____ como placeholder.'
      );
      const str = typeof text === 'string' ? text : '';
      setResult(str);
      setEditText(str);
    } catch(e: unknown) { setErr(`Erro: ${e instanceof Error ? e.message : String(e)}`); }
    finally { setLoading(false); }
  }

  function copy() {
    const text = editMode ? editText : result;
    navigator.clipboard.writeText(text);
    setCopied(true); setTimeout(() => setCopied(false), 2200);
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:18 }}>
      <div style={{ background:`rgba(13,45,94,0.05)`, border:`1px solid rgba(13,45,94,0.15)`, borderRadius:10, padding:'10px 15px', display:'flex', alignItems:'flex-start', gap:8 }}>
        <span style={{ fontSize:14, flexShrink:0 }}>⚖️</span>
        <span style={{ fontSize:12, color:C.muted, lineHeight:1.6 }}>
          <strong style={{ color:C.text }}>Anotação assistida por IA.</strong> O texto gerado é uma sugestão baseada nas informações fornecidas. O enfermeiro é responsável por revisar, adaptar e assinar a anotação conforme a Resolução COFEN nº 514/2016 e as normas institucionais.
        </span>
      </div>

      <div className="card">
        <h3 style={{ fontFamily:"'Inter',sans-serif", fontSize:15, fontWeight:700, marginBottom:14, display:'flex', alignItems:'center', gap:8 }}>
          <span style={{ background:`${C.navy}12`, border:`1px solid ${C.navy}20`, borderRadius:6, padding:'3px 9px', fontSize:11, fontWeight:700, color:C.navy }}>01</span>
          Tipo de anotação
        </h3>
        <div className="grid-5col" style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:8 }}>
          {ANOT_TIPOS.map(t => (
            <div
              key={t.id}
              onClick={() => { setTipo(t.id); setExtras({}); setResult(''); setErr(null); }}
              style={{
                padding:'10px 8px', borderRadius:9, cursor:'pointer', textAlign:'center',
                border:`1px solid ${tipo===t.id ? t.color+'55' : C.border}`,
                background: tipo===t.id ? t.color+'0E' : C.surface,
                transition:'all 0.15s',
              }}
            >
              <div style={{ fontSize:20, marginBottom:5 }}>{t.icon}</div>
              <div style={{ fontSize:11, fontWeight:600, color: tipo===t.id ? t.color : C.muted, lineHeight:1.35 }}>{t.label}</div>
            </div>
          ))}
        </div>
      </div>

      {tipo && (
        <>
          <div className="card">
            <h3 style={{ fontFamily:"'Inter',sans-serif", fontSize:15, fontWeight:700, marginBottom:14, display:'flex', alignItems:'center', gap:8 }}>
              <span style={{ background:`${C.navy}12`, border:`1px solid ${C.navy}20`, borderRadius:6, padding:'3px 9px', fontSize:11, fontWeight:700, color:C.navy }}>02</span>
              Dados do contexto
            </h3>
            <div className="grid-2col" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:12 }}>
              <div>
                <span className="label">Setor</span>
                <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                  {ANOT_SETORES.map(s => (
                    <span key={s} className={`chip${setor===s?' sel':''}`} onClick={() => setSetor(s)} style={{ fontSize:11.5 }}>{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <span className="label">Turno</span>
                <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                  {ANOT_TURNOS.map(t => (
                    <span key={t} className={`chip${turno===t?' sel':''}`} onClick={() => setTurno(turno===t?'':t)} style={{ fontSize:11.5 }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid-2col" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
              <div>
                <span className="label">Identificação do paciente (opcional)</span>
                <input placeholder="ex: J.S., 67 anos, masculino" value={paciente} onChange={e => setPaciente(e.target.value)} />
              </div>
              <div>
                <span className="label">Leito (opcional)</span>
                <input placeholder="ex: Leito 07-A" value={leito} onChange={e => setLeito(e.target.value)} />
              </div>
            </div>
          </div>

          <div className="card" style={{ borderColor:`${tipoSel?.color}25` }}>
            <h3 style={{ fontFamily:"'Inter',sans-serif", fontSize:15, fontWeight:700, marginBottom:14, display:'flex', alignItems:'center', gap:8 }}>
              <span style={{ background:`${C.navy}12`, border:`1px solid ${C.navy}20`, borderRadius:6, padding:'3px 9px', fontSize:11, fontWeight:700, color:C.navy }}>03</span>
              <span style={{ fontSize:16 }}>{tipoSel?.icon}</span>
              {tipoSel?.label}
            </h3>
            <div style={{ display:'flex', flexDirection:'column', gap:11 }}>
              {camposExtras.map(campo => (
                <div key={campo.key}>
                  <span className="label">{campo.label}</span>
                  <textarea
                    rows={2}
                    placeholder={campo.placeholder}
                    value={extras[campo.key] || ''}
                    onChange={e => setExtra(campo.key, e.target.value)}
                  />
                </div>
              ))}
              <div>
                <span className="label">Informações adicionais (opcional)</span>
                <input placeholder="Sinais vitais, medicações em curso, observações relevantes..." value={contexto} onChange={e => setContexto(e.target.value)} />
              </div>
            </div>

            <div style={{ display:'flex', flexDirection:'column', gap:8, marginTop:14 }}>
              <div style={{ display:'flex', alignItems:'center', gap:10, flexWrap:'wrap' }}>
                <button className="btn btn-teal" onClick={generate} disabled={loading || (preenchidos === 0 && tipo !== 'livre')}>
                  {loading ? '⏳ Gerando...' : '📝 Gerar Anotação'}
                </button>
                <button className="btn btn-ghost" onClick={resetForm} style={{ fontSize:12 }}>↺ Recomeçar</button>
              </div>
              {!loading && preenchidos === 0 && tipo !== 'livre' && (
                <span style={{ fontSize:12, color:C.dim }}>Preencha ao menos um campo</span>
              )}
            </div>
          </div>

          {err && <ErrorBox msg={err} />}
          {loading && <Loader msg="Gerando anotação de enfermagem..." subMsg="Linguagem técnica · Normas COFEN" />}

          {result && !loading && (
            <div className="card fadeUp" style={{ borderColor:`${tipoSel?.color}30` }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14, flexWrap:'wrap', gap:8 }}>
                <div style={{ display:'flex', alignItems:'center', gap:9 }}>
                  <span style={{ fontSize:18 }}>{tipoSel?.icon}</span>
                  <div>
                    <div style={{ fontFamily:"'Inter',sans-serif", fontSize:14, fontWeight:700, color:tipoSel?.color }}>{tipoSel?.label}</div>
                    <div style={{ fontSize:11, color:C.muted }}>{setor}{turno ? ` · ${turno}` : ''}</div>
                  </div>
                </div>
                <div style={{ display:'flex', gap:7 }}>
                  <button
                    className="btn btn-ghost"
                    onClick={() => { setEditMode(!editMode); if (!editMode) setEditText(result); }}
                    style={{ fontSize:12, padding:'7px 13px' }}
                  >
                    {editMode ? '👁 Visualizar' : '✏️ Editar'}
                  </button>
                  <button className="btn btn-ghost" onClick={copy} style={{ fontSize:12, padding:'7px 13px' }}>
                    {copied ? '✓ Copiado!' : '📋 Copiar'}
                  </button>
                  <button className="btn btn-teal" onClick={generate} disabled={loading} style={{ fontSize:12, padding:'7px 13px' }}>
                    🔄 Regerar
                  </button>
                </div>
              </div>

              <div style={{ borderTop:`1px dashed ${C.border}`, marginBottom:13 }} />

              {editMode ? (
                <textarea
                  value={editText}
                  onChange={e => setEditText(e.target.value)}
                  rows={8}
                  style={{ fontSize:14, lineHeight:1.85, fontFamily:"'Inter',sans-serif" }}
                />
              ) : (
                <div style={{ background:C.bg, borderRadius:9, padding:'16px 18px', fontSize:14, color:C.text, lineHeight:1.9, border:`1px solid ${C.border}`, fontFamily:"'Inter',sans-serif", whiteSpace:'pre-wrap' }}>
                  {result}
                </div>
              )}

              <div style={{ marginTop:12, display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:8 }}>
                <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                  {[
                    { icon:'📋', label:'COFEN 514/2016' },
                    { icon:'✅', label:'Linguagem técnica' },
                    { icon:'🏥', label:setor },
                  ].map(b => (
                    <span key={b.label} style={{ fontSize:11, background:`${C.navy}08`, border:`1px solid ${C.navy}15`, borderRadius:5, padding:'3px 9px', color:C.muted }}>
                      {b.icon} {b.label}
                    </span>
                  ))}
                </div>
                <div style={{ fontSize:11.5, color:C.dim, fontStyle:'italic' }}>
                  Revise antes de registrar no prontuário
                </div>
              </div>
            </div>
          )}

          {result && !loading && (
            <div className="fadeUp" style={{ background:`linear-gradient(135deg,#fff,${C.goldGlow})`, border:`1px solid ${C.gold}35`, borderRadius:12, padding:'16px 20px' }}>
              <div style={{ fontSize:10.5, color:C.gold, fontWeight:700, textTransform:'uppercase', letterSpacing:1, marginBottom:8 }}>⭐ Dica da supervisora</div>
              <p style={{ fontSize:13.5, color:C.text, lineHeight:1.7, fontStyle:'italic' }}>
                &ldquo;Anotação de enfermagem é documento legal. Seja objetivo, use linguagem técnica e nunca deixe rasuras. Se errar no papel: uma linha sobre o erro, &lsquo;erro de escrita&rsquo;, data, hora e assinatura. Em sistema eletrônico: use o recurso de correção previsto pelo sistema. Datas e horários precisos são obrigatórios.&rdquo;
              </p>
              <div style={{ fontSize:11, color:C.muted, marginTop:8 }}>— Equipe PlantãoSeguro</div>
            </div>
          )}
        </>
      )}

      {!tipo && (
        <div className="card" style={{ textAlign:'center', padding:'40px 20px', borderStyle:'dashed' }}>
          <div style={{ fontSize:42, marginBottom:12 }}>📝</div>
          <div style={{ fontFamily:"'Inter',sans-serif", fontSize:15, fontWeight:600, color:C.text, marginBottom:6 }}>Selecione o tipo de anotação</div>
          <div style={{ fontSize:13, color:C.muted, maxWidth:340, margin:'0 auto', lineHeight:1.65 }}>
            Escolha a categoria acima para preencher os campos específicos e gerar sua anotação de enfermagem.
          </div>
        </div>
      )}
    </div>
  );
}
