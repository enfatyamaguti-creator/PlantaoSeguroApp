'use client';
import { useState } from 'react';
import { C } from '@/lib/constants/colors';
import { CATS, WOUNDS } from '@/lib/constants/lesoes';

export default function LesoesSection() {
  const [cat, setCat] = useState('LPP');
  const [sel, setSel] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const catCfg = CATS.find(c => c.id === cat) || CATS[0];
  const filtered = WOUNDS.filter(w =>
    w.cat === cat && (
      !search ||
      w.title.toLowerCase().includes(search.toLowerCase()) ||
      w.sub.toLowerCase().includes(search.toLowerCase()) ||
      w.cobertura.toLowerCase().includes(search.toLowerCase())
    )
  );
  const wound = WOUNDS.find(w => w.id === sel);

  return (
    <div className="section-split" style={{ display: 'flex', flexDirection: 'column', gap: 16, height: '100%' }}>
      <div className="chips-scroll" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {CATS.map(c => (
          <div
            key={c.id}
            onClick={() => { setCat(c.id); setSel(null); }}
            style={{
              padding: '8px 18px', borderRadius: 22, cursor: 'pointer',
              fontSize: 13, fontWeight: 600, transition: 'all 0.15s',
              background: cat === c.id ? c.color + '20' : C.card,
              border: `1px solid ${cat === c.id ? c.color + '60' : C.border}`,
              color: cat === c.id ? c.color : C.muted,
            }}
          >
            {c.label}
          </div>
        ))}
      </div>
      <input
        placeholder="Buscar tipo de ferida ou cobertura..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ padding: '8px 14px', fontSize: 13 }}
      />

      <div className="two-col-layout" style={{ display: 'flex', gap: 16, flex: 1, overflow: 'hidden' }}>
        <div className="sidebar-panel" style={{ width: 260, minWidth: 260, display: 'flex', flexDirection: 'column', gap: 7, overflowY: 'auto' }}>
          {filtered.map(w => (
            <div
              key={w.id}
              onClick={() => setSel(w.id)}
              style={{
                background: sel === w.id ? catCfg.color + '14' : C.card,
                border: `1px solid ${sel === w.id ? catCfg.color + '55' : C.border}`,
                borderRadius: 11, padding: '13px 15px', cursor: 'pointer', transition: 'all 0.15s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <span style={{ fontSize: 18, lineHeight: 1, marginTop: 2 }}>{w.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: sel === w.id ? catCfg.color : C.text, lineHeight: 1.3 }}>{w.title}</div>
                  <div style={{ fontSize: 11, color: C.muted, marginTop: 3, lineHeight: 1.4 }}>{w.sub}</div>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', color: C.dim, fontSize: 13, padding: 24 }}>Nenhuma ferida encontrada.</div>
          )}
        </div>

        <div className="content-panel" style={{ flex: 1, overflowY: 'auto' }}>
          {wound ? (
            <div className="fadeUp" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{
                background: catCfg.color + '12',
                border: `1px solid ${catCfg.color}35`,
                borderRadius: 14, padding: '18px 22px',
                display: 'flex', alignItems: 'center', gap: 14,
              }}>
                <span style={{ fontSize: 36 }}>{wound.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 10.5, color: C.muted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Tipo de lesão · {wound.cat}</div>
                  <h2 style={{ fontFamily: "'Inter',sans-serif", fontSize: 20, fontWeight: 800, color: catCfg.color, lineHeight: 1.2 }}>{wound.title}</h2>
                  <div style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>{wound.sub}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 11, color: C.muted, marginBottom: 3 }}>Exsudato</div>
                  <div style={{
                    background: catCfg.color + '18', border: `1px solid ${catCfg.color}40`,
                    borderRadius: 8, padding: '5px 12px', fontSize: 12, color: catCfg.color, fontWeight: 600, whiteSpace: 'nowrap',
                  }}>{wound.exsudato}</div>
                </div>
              </div>

              <div className="card">
                <span className="section-label" style={{ color: C.muted }}>📋 Descrição clínica</span>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: C.text }}>{wound.desc}</p>
              </div>

              <div className="card" style={{ borderColor: catCfg.color + '35' }}>
                <span className="section-label" style={{ color: catCfg.color }}>✅ Cobertura indicada</span>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: C.text, marginBottom: 12 }}>{wound.cobertura}</p>
                {wound.alternativas?.length > 0 && (
                  <>
                    <span style={{ fontSize: 11, color: C.muted, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700 }}>Alternativas</span>
                    {wound.alternativas.map((a, i) => (
                      <div key={i} style={{ fontSize: 13, color: C.muted, marginTop: 5, paddingLeft: 10, borderLeft: `2px solid ${catCfg.color}30` }}>{a}</div>
                    ))}
                  </>
                )}
              </div>

              <div className="grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="card">
                  <span className="section-label" style={{ color: C.accent }}>👩‍⚕️ Como aplicar</span>
                  <p style={{ fontSize: 13, color: C.text, lineHeight: 1.7 }}>{wound.aplicar}</p>
                </div>
                <div className="card">
                  <span className="section-label" style={{ color: C.purple }}>🔄 Periodicidade da troca</span>
                  <p style={{ fontSize: 13, color: C.text, lineHeight: 1.7 }}>{wound.troca}</p>
                </div>
              </div>

              <div className="card" style={{ borderColor: `${C.danger}30` }}>
                <span className="section-label" style={{ color: C.danger }}>🚫 O que NÃO fazer</span>
                {wound.naoFazer?.map((n, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, marginBottom: 8 }}>
                    <div style={{ width: 20, height: 20, borderRadius: 5, background: C.dangerGlow, border: `1px solid ${C.danger}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: C.danger, flexShrink: 0, marginTop: 1 }}>✕</div>
                    <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6 }}>{n}</div>
                  </div>
                ))}
              </div>

              <div style={{
                background: `linear-gradient(135deg, ${C.card}, ${C.goldGlow})`,
                border: `1px solid ${C.gold}35`, borderRadius: 14, padding: '18px 22px',
              }}>
                <div style={{ fontSize: 11, color: C.gold, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 9 }}>⭐ Dica da supervisora</div>
                <p style={{ fontSize: 14, color: C.text, lineHeight: 1.75, fontStyle: 'italic' }}>&ldquo;{wound.dica}&rdquo;</p>
                <div style={{ fontSize: 11.5, color: C.muted, marginTop: 9 }}>— Andreia Yamaguti · Supervisora UTI · Especialista em LPP e Feridas</div>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: C.dim, gap: 14 }}>
              <div style={{ fontSize: 52 }}>🩹</div>
              <div style={{ fontSize: 14, textAlign: 'center', maxWidth: 240, lineHeight: 1.6 }}>Selecione um tipo de lesão para ver a cobertura adequada e orientações clínicas.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
