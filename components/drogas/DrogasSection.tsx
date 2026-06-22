'use client';
import { useState } from 'react';
import { C } from '@/lib/constants/colors';
import { DROGAS_CATS, DROGAS } from '@/lib/constants/drogas';

export default function DrogasSection() {
  const [cat, setCat] = useState('vasoativas');
  const [sel, setSel] = useState<string | null>(null);
  const catCfg = DROGAS_CATS.find(c => c.id === cat)!;
  const drugs = DROGAS.filter(d => d.cat === cat);
  const drug = DROGAS.find(d => d.id === sel);

  return (
    <div className="section-split" style={{ display:'flex', flexDirection:'column', gap:14, height:'100%' }}>
      <div className="chips-scroll" style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
        {DROGAS_CATS.map(c => (
          <div key={c.id} onClick={() => { setCat(c.id); setSel(null); }} style={{
            padding:'8px 18px', borderRadius:22, cursor:'pointer', fontSize:13, fontWeight:600, transition:'all 0.15s',
            background: cat===c.id ? c.color+'20' : C.card,
            border: `1px solid ${cat===c.id ? c.color+'60' : C.border}`,
            color: cat===c.id ? c.color : C.muted,
          }}>{c.label}</div>
        ))}
      </div>

      <div className="two-col-layout" style={{ display:'flex', gap:14, flex:1, overflow:'hidden' }}>
        <div className="sidebar-panel" style={{ width:210, minWidth:210, display:'flex', flexDirection:'column', gap:7, overflowY:'auto' }}>
          {drugs.map(d => (
            <div key={d.id} onClick={() => setSel(d.id)} style={{
              background: sel===d.id ? catCfg.color+'12' : C.card,
              border: `1px solid ${sel===d.id ? catCfg.color+'50' : C.border}`,
              borderRadius:11, padding:'13px 15px', cursor:'pointer', transition:'all 0.15s',
            }}>
              <div style={{ fontSize:14, fontWeight:700, color: sel===d.id ? catCfg.color : C.text }}>{d.name}</div>
              <div style={{ fontSize:11.5, color:C.muted, marginTop:2 }}>{d.class}</div>
            </div>
          ))}
        </div>

        <div className="content-panel" style={{ flex:1, overflowY:'auto' }}>
          {drug ? (
            <div className="fadeUp" style={{ display:'flex', flexDirection:'column', gap:12 }}>
              <div style={{ background: catCfg.color+'12', border:`1px solid ${catCfg.color}35`, borderRadius:14, padding:'18px 22px' }}>
                <div style={{ fontSize:10.5, color:C.muted, textTransform:'uppercase', letterSpacing:1, marginBottom:4 }}>{drug.class}</div>
                <h2 style={{ fontFamily:"'Inter',sans-serif", fontSize:22, fontWeight:800, color:catCfg.color }}>{drug.name}</h2>
                <div style={{ fontSize:13, color:C.muted, marginTop:2 }}>{drug.generic}</div>
                <p style={{ fontSize:13.5, color:C.text, marginTop:10, lineHeight:1.7, borderTop:`1px solid ${C.border}`, paddingTop:10 }}>{drug.mec}</p>
              </div>

              <div className="grid-2col" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                <div className="card" style={{ borderColor: catCfg.color+'30' }}>
                  <span className="section-label" style={{ color:catCfg.color }}>💉 Diluição padrão</span>
                  <pre style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:12.5, color:C.text, lineHeight:1.9, whiteSpace:'pre-wrap', margin:0 }}>{drug.dilution}</pre>
                </div>
                <div className="card">
                  <span className="section-label" style={{ color:C.accent }}>📊 Dose e via</span>
                  <p style={{ fontSize:13.5, color:C.text, lineHeight:1.7, marginBottom:8 }}>{drug.dose}</p>
                  <div style={{ fontSize:12.5, color:C.muted, borderTop:`1px solid ${C.border}`, paddingTop:8 }}><strong style={{ color:C.text }}>Via: </strong>{drug.via}</div>
                </div>
              </div>

              <div className="grid-2col" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                <div className="card">
                  <span className="section-label" style={{ color:C.warn }}>👁 Monitorização</span>
                  {drug.monitoring.map((m,i) => <div key={i} style={{ fontSize:13, color:C.muted, marginBottom:6, paddingLeft:10, borderLeft:`2px solid ${C.warn}35` }}>{m}</div>)}
                </div>
                <div className="card" style={{ borderColor:`${C.danger}25` }}>
                  <span className="section-label" style={{ color:C.danger }}>⚠ Efeitos adversos</span>
                  {drug.adverse.map((a,i) => <div key={i} style={{ fontSize:13, color:C.muted, marginBottom:6, paddingLeft:10, borderLeft:`2px solid ${C.danger}35` }}>{a}</div>)}
                </div>
              </div>

              <div style={{ background:`linear-gradient(135deg,${C.card},${C.goldGlow})`, border:`1px solid ${C.gold}35`, borderRadius:14, padding:'18px 22px' }}>
                <div style={{ fontSize:11, color:C.gold, fontWeight:700, textTransform:'uppercase', letterSpacing:1, marginBottom:9 }}>⭐ Dica da supervisora</div>
                <p style={{ fontSize:14, color:C.text, lineHeight:1.75, fontStyle:'italic' }}>&ldquo;{drug.dica}&rdquo;</p>
                <div style={{ fontSize:11.5, color:C.muted, marginTop:9 }}>— Andreia Yamaguti · Supervisora UTI</div>
              </div>
            </div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100%', color:C.dim, gap:14 }}>
              <div style={{ fontSize:52 }}>💊</div>
              <div style={{ fontSize:14, textAlign:'center', maxWidth:240, lineHeight:1.6 }}>Selecione uma droga para ver diluição, dose, monitorização e dicas clínicas.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
