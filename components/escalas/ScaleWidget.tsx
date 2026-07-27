'use client';
import { useState } from 'react';
import { C } from '@/lib/constants/colors';
import { ECAT_COLOR, ScaleData } from '@/lib/constants/escalas';

interface ScaleWidgetProps {
  scale: ScaleData;
}

export default function ScaleWidget({ scale }: ScaleWidgetProps) {
  const [sel, setSel] = useState<Record<string, number | boolean>>({});
  const cc = ECAT_COLOR[scale.cat] || C.accent;

  let result: { score?: number; interp: { label: string; color: string } | null } | null = null;

  if (scale.type === 'calculator' && scale.groups) {
    if (scale.groups.every(g => sel[g.key] !== undefined)) {
      const score = scale.groups.reduce((s, g) => {
        const idx = sel[g.key] as number;
        return s + (g.options[idx]?.score ?? 0);
      }, 0);
      const interpretFn = scale.interpret as (s: number) => { label: string; color: string };
      result = { score, interp: interpretFn(score) };
    }
  } else if (scale.type === 'single') {
    if (sel['value'] !== undefined) {
      const idx = sel['value'] as number;
      const score = scale.options?.[idx]?.score ?? 0;
      const interpretFn = scale.interpret as (s: number) => { label: string; color: string };
      result = { score, interp: interpretFn(score) };
    }
  } else if (scale.type === 'checklist') {
    const interpretFn = scale.interpret as (s: Record<string, boolean>) => { label: string; color: string } | null;
    const interp = interpretFn(sel as Record<string, boolean>);
    if (interp) result = { interp };
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div className="card"><p style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.75 }}>{scale.desc}</p></div>

      {scale.type === 'calculator' && scale.groups?.map(g => (
        <div key={g.key} className="card">
          <span className="section-label" style={{ color: cc }}>{g.label}</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {g.options.map((opt, idx) => (
              <div key={idx} onClick={() => setSel(p => ({ ...p, [g.key]: idx }))} style={{
                padding: '10px 14px', borderRadius: 9, cursor: 'pointer', transition: 'all 0.15s',
                border: `1px solid ${sel[g.key] === idx ? cc + '60' : C.border}`,
                background: sel[g.key] === idx ? cc + '14' : C.surface,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <span style={{ fontSize: 13, color: sel[g.key] === idx ? C.text : C.muted }}>{opt.label}</span>
                <span className="num" style={{ fontSize: 13, fontWeight: 600, color: sel[g.key] === idx ? cc : C.dim }}>{opt.score}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      {scale.type === 'single' && scale.options && (
        <div className="card">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {scale.options.map((opt, idx) => (
              <div key={idx} onClick={() => setSel({ value: idx })} style={{
                padding: '11px 14px', borderRadius: 9, cursor: 'pointer', transition: 'all 0.15s',
                border: `1px solid ${sel['value'] === idx ? (opt.c || cc) + '65' : C.border}`,
                background: sel['value'] === idx ? (opt.c || cc) + '14' : C.surface,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span className="num" style={{ fontSize: 14, fontWeight: 700, color: opt.c || cc, minWidth: 36, textAlign: 'center' }}>{(opt.score > 0) ? '+' : ''}{opt.score}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: sel['value'] === idx ? C.text : C.muted }}>{opt.label}</div>
                    {opt.desc && <div style={{ fontSize: 11.5, color: C.muted, marginTop: 2 }}>{opt.desc}</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {scale.type === 'checklist' && scale.items && (
        <div className="card">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {scale.items.map(item => (
              <div key={item.key} style={{ padding: '12px 14px', background: C.surface, borderRadius: 9, border: `1px solid ${C.border}` }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ display: 'flex', gap: 6, flexShrink: 0, marginTop: 2 }}>
                    {[{v:true,l:'Sim'},{v:false,l:'Não'}].map(btn => (
                      <div key={btn.l} onClick={() => setSel(p => ({ ...p, [item.key]: btn.v }))} style={{
                        padding: '4px 11px', borderRadius: 6, cursor: 'pointer', fontSize: 12, fontWeight: 600, transition: 'all 0.15s',
                        border: `1px solid ${sel[item.key] === btn.v ? (btn.v ? C.danger : C.ok) + '60' : C.border}`,
                        background: sel[item.key] === btn.v ? (btn.v ? C.danger : C.ok) + '15' : 'transparent',
                        color: sel[item.key] === btn.v ? (btn.v ? C.danger : C.ok) : C.muted,
                      }}>{btn.l}</div>
                    ))}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{item.label}</div>
                    <div style={{ fontSize: 12, color: C.muted, marginTop: 3, lineHeight: 1.55 }}>{item.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {result && result.interp && (
        <div className="fadeUp" style={{
          background: result.interp.color + '16', border: `1px solid ${result.interp.color}45`,
          borderRadius: 14, padding: '16px 22px', display: 'flex', alignItems: 'center', gap: 18,
        }}>
          {result.score !== undefined && (
            <div style={{ textAlign: 'center', flexShrink: 0 }}>
              <div style={{ fontSize: 10, color: C.muted, textTransform: 'uppercase', letterSpacing: 1 }}>{scale.scoreLabel}</div>
              <div className="num" style={{ fontSize: 40, fontWeight: 700, color: result.interp.color, lineHeight: 1 }}>
                {result.score > 0 && scale.type === 'single' ? '+' : ''}{result.score}
              </div>
            </div>
          )}
          <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 18, fontWeight: 800, color: result.interp.color }}>{result.interp.label}</div>
        </div>
      )}

      {Object.keys(sel).length > 0 && (
        <button className="btn btn-ghost" onClick={() => setSel({})} style={{ alignSelf: 'flex-start' }}>↺ Limpar calculadora</button>
      )}

      <div style={{ background:`linear-gradient(135deg,${C.card},${C.goldGlow})`, border:`1px solid ${C.gold}35`, borderRadius:14, padding:'16px 22px' }}>
        <div style={{ fontSize:11, color:C.gold, fontWeight:700, textTransform:'uppercase', letterSpacing:1, marginBottom:8 }}>⭐ Dica da supervisora</div>
        <p style={{ fontSize:13.5, color:C.text, lineHeight:1.75, fontStyle:'italic' }}>&ldquo;{scale.dica}&rdquo;</p>
        <div style={{ fontSize:11, color:C.muted, marginTop:8 }}>— Equipe PlantãoSeguro</div>
      </div>
    </div>
  );
}
