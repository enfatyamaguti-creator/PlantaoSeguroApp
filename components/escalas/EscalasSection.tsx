'use client';
import { useState } from 'react';
import { C } from '@/lib/constants/colors';
import { SCALES_DATA, ECAT_COLOR } from '@/lib/constants/escalas';
import ScaleWidget from './ScaleWidget';

export default function EscalasSection() {
  const [sel, setSel] = useState('glasgow');
  const scale = SCALES_DATA.find(s => s.id === sel);

  return (
    <div className="two-col-layout" style={{ display:'flex', gap:16, height:'100%' }}>
      <div className="sidebar-panel" style={{ width:210, minWidth:210, display:'flex', flexDirection:'column', gap:7, overflowY:'auto' }}>
        {SCALES_DATA.map(s => {
          const c = ECAT_COLOR[s.cat] || C.accent;
          return (
            <div key={s.id} onClick={() => setSel(s.id)} style={{
              background: sel === s.id ? c + '12' : C.card,
              border: `1px solid ${sel === s.id ? c + '50' : C.border}`,
              borderRadius:11, padding:'13px 14px', cursor:'pointer', transition:'all 0.15s',
            }}>
              <div style={{ fontSize:13.5, fontWeight:600, color: sel === s.id ? c : C.text, marginBottom:4 }}>{s.name}</div>
              <span style={{ background: c+'20', color:c, borderRadius:5, padding:'2px 7px', fontSize:10.5, fontWeight:700 }}>{s.cat}</span>
            </div>
          );
        })}
      </div>
      <div className="content-panel" style={{ flex:1, overflowY:'auto' }}>
        {scale && (
          <div className="fadeUp">
            <h2 style={{ fontFamily:"'Inter',sans-serif", fontSize:20, fontWeight:800, color: ECAT_COLOR[scale.cat]||C.accent, marginBottom:14 }}>{scale.name}</h2>
            <ScaleWidget key={scale.id} scale={scale} />
          </div>
        )}
      </div>
    </div>
  );
}
