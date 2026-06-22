'use client';
import { useState } from 'react';
import { C } from '@/lib/constants/colors';
import { PROTS } from '@/lib/constants/protocolos';

export default function ProtocolosSection() {
  const [sel, setSel] = useState<string | null>(null);
  const p = PROTS.find(x => x.id === sel);

  return (
    <div className="two-col-layout" style={{ display: 'flex', gap: 18, height: '100%' }}>
      <div className="sidebar-panel" style={{ width: 270, minWidth: 270, display: 'flex', flexDirection: 'column', gap: 8, overflowY: 'auto' }}>
        {PROTS.map(x => (
          <div key={x.id} onClick={() => setSel(x.id)} style={{
            background: sel === x.id ? x.c + '12' : C.card,
            border: `1px solid ${sel === x.id ? x.c + '50' : C.border}`,
            borderRadius: 11, padding: '13px 15px', cursor: 'pointer', transition: 'all 0.15s',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 20 }}>{x.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: sel === x.id ? x.c : C.text }}>{x.title}</div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{x.cat}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="content-panel" style={{ flex: 1, overflowY: 'auto' }}>
        {p ? (
          <div className="card fadeUp" style={{ borderColor: `${p.c}30` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <span style={{ fontSize: 34 }}>{p.icon}</span>
              <div>
                <div style={{ fontSize: 10.5, color: C.muted, textTransform: 'uppercase', letterSpacing: 1 }}>Protocolo rápido</div>
                <h2 style={{ fontFamily: "'Inter',sans-serif", fontSize: 20, fontWeight: 800, color: p.c }}>{p.title}</h2>
              </div>
            </div>
            <div style={{ background: p.c + '10', border: `1px solid ${p.c}30`, borderRadius: 8, padding: '9px 13px', fontSize: 13, color: p.c, fontWeight: 600, marginBottom: 18 }}>
              ⏱ O que fazer nos primeiros minutos
            </div>
            {p.steps.map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 13, paddingBottom: 13, borderBottom: i < p.steps.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                <div className="num" style={{ width: 30, height: 30, borderRadius: 8, background: p.c + '18', border: `1px solid ${p.c}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 500, color: p.c, flexShrink: 0 }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div style={{ fontSize: 13.5, color: C.text, lineHeight: 1.65, paddingTop: 5 }}>{step}</div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: C.dim, gap: 12 }}>
            <div style={{ fontSize: 48 }}>📋</div>
            <div style={{ fontSize: 14 }}>Selecione um protocolo para visualizar</div>
          </div>
        )}
      </div>
    </div>
  );
}
