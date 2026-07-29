import { C } from '@/lib/constants/colors';
import { SEV } from '@/lib/constants/exames';

interface HmgResultData {
  gravidadeGeral: string;
  resumoClinico: string;
  serieVermelha?: { status: string; interpretacao: string; achados?: string[] };
  serieBranca?: { status: string; interpretacao: string; achados?: string[] };
  plaquetas?: { status: string; interpretacao: string; achados?: string[] };
  hipotesesDiagnosticas?: string[];
  sinaisDeAlerta?: string[];
  condutasEnfermagem?: string[];
  quandoComunicarMedico?: string;
  monitoracao?: string[];
  dicaDaSupervisora?: string;
}

interface HemogramaResultProps {
  result: HmgResultData;
}

export default function HemogramaResult({ result }: HemogramaResultProps) {
  const s = SEV[result.gravidadeGeral as keyof typeof SEV] || SEV.atencao;
  const serieColor: Record<string, string> = { normal: C.ok, atencao: C.warn, critico: C.danger };

  return (
    <div className="fadeUp" style={{ display:'flex', flexDirection:'column', gap:12 }}>
      <div style={{ background:s.bg, border:`1px solid ${s.c}40`, borderRadius:14, padding:'18px 22px', display:'flex', alignItems:'center', gap:18 }}>
        <div style={{ width:52, height:52, borderRadius:13, background:s.c+'25', border:`2px solid ${s.c}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, fontWeight:900, color:s.c, flexShrink:0 }}>{s.icon}</div>
        <div>
          <div style={{ fontSize:10.5, color:C.muted, textTransform:'uppercase', letterSpacing:1 }}>Avaliação geral</div>
          <div style={{ fontFamily:"'Inter',sans-serif", fontSize:22, fontWeight:800, color:s.c }}>{s.label}</div>
        </div>
      </div>

      <div className="card">
        <span className="section-label" style={{ color:C.accent }}>📋 Resumo clínico</span>
        <p style={{ fontSize:14, lineHeight:1.75, color:C.text }}>{result.resumoClinico}</p>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12 }}>
        {[
          { key:'serieVermelha', label:'🩸 Série Vermelha', c:'#FF5A7A' },
          { key:'serieBranca',   label:'🔵 Série Branca',   c:'#00C9A7' },
          { key:'plaquetas',     label:'🟣 Plaquetas',      c:'#A78BFA' },
        ].map(serie => {
          const d = result[serie.key as keyof HmgResultData] as { status: string; interpretacao: string; achados?: string[] } | undefined;
          if (!d) return null;
          const sc = serieColor[d.status] || C.warn;
          return (
            <div key={serie.key} style={{ background:sc+'0D', border:`1px solid ${sc}35`, borderRadius:12, padding:'14px 16px' }}>
              <div style={{ fontSize:11, color:serie.c, fontWeight:700, textTransform:'uppercase', letterSpacing:0.8, marginBottom:6 }}>{serie.label}</div>
              <div style={{ fontSize:11.5, fontWeight:700, color:sc, marginBottom:8, background:sc+'15', borderRadius:6, padding:'3px 8px', display:'inline-block' }}>{d.status?.toUpperCase()}</div>
              <p style={{ fontSize:12.5, color:C.text, lineHeight:1.65, marginBottom:8 }}>{d.interpretacao}</p>
              {d.achados?.map((a, i) => <div key={i} style={{ fontSize:11.5, color:C.muted, marginBottom:4, paddingLeft:8, borderLeft:`2px solid ${sc}30` }}>{a}</div>)}
            </div>
          );
        })}
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
        <div className="card">
          <span className="section-label" style={{ color:C.purple }}>🔎 Hipóteses diagnósticas</span>
          {result.hipotesesDiagnosticas?.map((h, i) => (
            <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:9, marginBottom:7 }}>
              <div style={{ width:20, height:20, borderRadius:5, background:C.purpleGlow, border:`1px solid ${C.purple}35`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:700, color:C.purple, flexShrink:0, marginTop:1 }}>{i+1}</div>
              <div style={{ fontSize:13, color:C.text, lineHeight:1.6 }}>{h}</div>
            </div>
          ))}
        </div>
        <div className="card" style={{ borderColor:`${C.danger}25` }}>
          <span className="section-label" style={{ color:C.danger }}>🚨 Sinais de alerta</span>
          {result.sinaisDeAlerta?.map((a, i) => <div key={i} style={{ fontSize:13, color:C.text, marginBottom:6, paddingLeft:10, borderLeft:`2px solid ${C.danger}40` }}>{a}</div>)}
        </div>
      </div>

      <div className="card" style={{ borderColor:`${C.accent}30` }}>
        <span className="section-label" style={{ color:C.accent }}>✅ Condutas de enfermagem</span>
        {result.condutasEnfermagem?.map((c, i) => (
          <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:10, marginBottom:9 }}>
            <div style={{ width:24, height:24, borderRadius:7, background:C.accentGlow, border:`1px solid ${C.accent}35`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700, color:C.accent, flexShrink:0 }}>{i+1}</div>
            <div style={{ fontSize:13.5, color:C.text, lineHeight:1.6, paddingTop:3 }}>{c}</div>
          </div>
        ))}
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
        <div className="card">
          <span className="section-label" style={{ color:C.purple }}>📞 Quando acionar médico</span>
          <p style={{ fontSize:13, color:C.muted, lineHeight:1.65 }}>{result.quandoComunicarMedico}</p>
        </div>
        <div className="card">
          <span className="section-label" style={{ color:C.warn }}>👁 Monitorização</span>
          {result.monitoracao?.map((m, i) => <div key={i} style={{ fontSize:13, color:C.muted, marginBottom:5 }}>• {m}</div>)}
        </div>
      </div>

      <div style={{ background:`linear-gradient(135deg,${C.card},${C.goldGlow})`, border:`1px solid ${C.gold}35`, borderRadius:14, padding:'18px 22px' }}>
        <div style={{ fontSize:11, color:C.gold, fontWeight:700, textTransform:'uppercase', letterSpacing:1, marginBottom:9 }}>⭐ Dica da Equipe PlantãoSeguro</div>
        <p style={{ fontSize:14, color:C.text, lineHeight:1.7, fontStyle:'italic' }}>&ldquo;{result.dicaDaSupervisora}&rdquo;</p>
        <div style={{ fontSize:11.5, color:C.muted, marginTop:9 }}>— Equipe PlantãoSeguro</div>
      </div>
    </div>
  );
}
