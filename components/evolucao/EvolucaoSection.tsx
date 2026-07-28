'use client';
import { useState } from 'react';
import { C } from '@/lib/constants/colors';
import Loader from '@/components/shared/Loader';
import ErrorBox from '@/components/shared/ErrorBox';
import { callAI } from '@/lib/api';

const SECTORS = ['UTI Adulto', 'Pronto-Socorro', 'Clínica Médica', 'Clínica Cirúrgica', 'Oncologia'];
const NEUROS = ['Sedado profundo / RASS -3 a -4', 'Sedação leve / RASS -1 a -2', 'Acordado e orientado (A+O3)', 'Rebaixado / desorientado', 'Agitado psicomotor'];
const VENTS = ['VM Controlado (VCI/PCV)', 'VM Pressão de Suporte (PSV)', 'VNI (CPAP/BiPAP)', 'Cateter nasal O2', 'Máscara simples O2', 'Máscara não-reinalante', 'Ar ambiente'];
const DEVS = ['TOT', 'TQT', 'CVC', 'SNE', 'SVD', 'PAI', 'PICC', 'Dreno torácico', 'Dreno abdominal'];

export default function EvolucaoSection() {
  const [sector, setSector] = useState('');
  const [neuro, setNeuro] = useState('');
  const [vent, setVent] = useState('');
  const [devices, setDevices] = useState<string[]>([]);
  const [extra, setExtra] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const toggle = (d: string) => setDevices(p => p.includes(d) ? p.filter(x => x !== d) : [...p, d]);

  async function generate() {
    setLoading(true); setResult(''); setErr(null);
    try {
      const text = await callAI(
        `Gere uma evolução de enfermagem profissional para SAE. Linguagem técnica de UTI. 1ª pessoa do plural. Máximo 200 palavras. Texto corrido sem tópicos.

Setor: ${sector || 'UTI Adulto'}
Estado neurológico: ${neuro || 'não informado'}
Suporte ventilatório: ${vent || 'não informado'}
Dispositivos: ${devices.length ? devices.join(', ') : 'nenhum'}
${extra ? `Dados adicionais: ${extra}` : ''}

IMPORTANTE: Para qualquer valor numérico (sinais vitais, escalas, exames) não informado acima, escreva ____ no texto para o enfermeiro preencher.`,
        2000,
        'Você é um especialista em enfermagem clínica de UTI. Gere evoluções de enfermagem profissionais, técnicas e objetivas. REGRA ABSOLUTA: nunca invente ou estime valores numéricos (PA, FC, FR, SpO2, temperatura, glicemia, escalas, etc.) que não foram fornecidos. Quando um dado não foi informado, use ____ como placeholder para o enfermeiro preencher.'
      );
      setResult(typeof text === 'string' ? text : '');
    } catch (e: unknown) { setErr(`Erro: ${e instanceof Error ? e.message : String(e)}`); }
    finally { setLoading(false); }
  }

  function copy() {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div className="card">
        <h3 style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 18 }}>Configurar evolução</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
          {[
            { label: 'Setor', items: SECTORS, state: sector, set: setSector },
            { label: 'Estado neurológico', items: NEUROS, state: neuro, set: setNeuro },
            { label: 'Suporte ventilatório', items: VENTS, state: vent, set: setVent },
          ].map(g => (
            <div key={g.label}>
              <span className="label">{g.label}</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {g.items.map(i => (
                  <span key={i} className={`chip${g.state === i ? ' sel' : ''}`} onClick={() => g.set(g.state === i ? '' : i)}>{i}</span>
                ))}
              </div>
            </div>
          ))}
          <div>
            <span className="label">Dispositivos invasivos (múltiplos)</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
              {DEVS.map(d => <span key={d} className={`chip${devices.includes(d) ? ' sel' : ''}`} onClick={() => toggle(d)}>{d}</span>)}
            </div>
          </div>
          <div>
            <span className="label">Informações adicionais (opcional)</span>
            <textarea placeholder="Ex: paciente em pós-op de laparotomia, em uso de noradrenalina 0.2mcg/kg/min, balanço hídrico negativo..." value={extra} onChange={e => setExtra(e.target.value)} rows={2} />
          </div>
          <button className="btn btn-teal" onClick={generate} disabled={loading || !sector} style={{ alignSelf: 'flex-start' }}>
            {loading ? '⏳ Gerando...' : '✍️ Gerar Evolução'}
          </button>
        </div>
      </div>

      {err && <ErrorBox msg={err} />}
      {loading && <Loader msg="Gerando evolução de enfermagem profissional..." />}

      {result && (
        <div className="card fadeUp" style={{ borderColor: `${C.accent}30` }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <span className="section-label" style={{ color: C.accent }}>✅ Evolução gerada</span>
            <button className="btn btn-ghost" onClick={copy} style={{ padding: '7px 14px', fontSize: 12 }}>
              {copied ? '✓ Copiado!' : '📋 Copiar texto'}
            </button>
          </div>
          <div style={{ background: C.surface, borderRadius: 9, padding: 18, fontSize: 14, color: C.text, lineHeight: 1.85, border: `1px solid ${C.border}` }}>
            {result}
          </div>
          <div style={{ fontSize: 11.5, color: C.dim, marginTop: 10 }}>
            ⚠ Revise e adapte ao paciente real antes de registrar no prontuário.
          </div>
        </div>
      )}
    </div>
  );
}
