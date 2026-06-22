import { C } from './colors';

export const SEV = {
  normal:    { c: C.ok,     bg: C.okGlow,      label: 'NORMAL',     icon: '✓'  },
  atencao:   { c: C.warn,   bg: C.warnGlow,    label: 'ATENÇÃO',    icon: '⚠'  },
  critico:   { c: C.danger, bg: C.dangerGlow,  label: 'CRÍTICO',    icon: '!'  },
  emergencia:{ c: '#FF0030',bg: 'rgba(255,0,48,0.12)', label: 'EMERGÊNCIA', icon: '🚨' },
} as const;

export type SevKey = keyof typeof SEV;

export interface HmgField {
  key: string;
  label: string;
  unit: string;
  refM: string;
  refF: string;
  placeholder: string;
}

export interface HmgGroup {
  group: string;
  color: string;
  fields: HmgField[];
}

export const HMG_FIELDS: HmgGroup[] = [
  { group:'Série Vermelha', color:'#FF5A7A', fields:[
    { key:'hb',   label:'Hemoglobina (Hb)',    unit:'g/dL',  refM:'13.5–17.5', refF:'12.0–16.0', placeholder:'ex: 8.4' },
    { key:'ht',   label:'Hematócrito (Ht)',     unit:'%',     refM:'41–53',     refF:'36–46',      placeholder:'ex: 28' },
    { key:'hem',  label:'Hemácias',             unit:'x10⁶/µL', refM:'4.5–5.9', refF:'4.0–5.2',  placeholder:'ex: 3.1' },
    { key:'vcm',  label:'VCM',                  unit:'fL',    refM:'80–100',    refF:'80–100',     placeholder:'ex: 72' },
    { key:'hcm',  label:'HCM',                  unit:'pg',    refM:'27–33',     refF:'27–33',      placeholder:'ex: 25' },
    { key:'chcm', label:'CHCM',                 unit:'g/dL',  refM:'32–36',     refF:'32–36',      placeholder:'ex: 31' },
    { key:'rdw',  label:'RDW',                  unit:'%',     refM:'11.5–14.5', refF:'11.5–14.5',  placeholder:'ex: 16.2' },
  ]},
  { group:'Série Branca — Total e Diferencial', color:'#00C9A7', fields:[
    { key:'leuco', label:'Leucócitos',           unit:'/µL',  refM:'4.000–11.000', refF:'4.000–11.000', placeholder:'ex: 18500' },
    { key:'neut',  label:'Neutrófilos',          unit:'%',    refM:'50–70',     refF:'50–70',      placeholder:'ex: 82' },
    { key:'bast',  label:'Bastões (Banda)',       unit:'%',    refM:'0–5',       refF:'0–5',        placeholder:'ex: 12' },
    { key:'linf',  label:'Linfócitos',           unit:'%',    refM:'20–40',     refF:'20–40',      placeholder:'ex: 8' },
    { key:'mono',  label:'Monócitos',            unit:'%',    refM:'2–8',       refF:'2–8',        placeholder:'ex: 5' },
    { key:'eosi',  label:'Eosinófilos',          unit:'%',    refM:'1–4',       refF:'1–4',        placeholder:'ex: 1' },
    { key:'baso',  label:'Basófilos',            unit:'%',    refM:'0–1',       refF:'0–1',        placeholder:'ex: 0' },
  ]},
  { group:'Plaquetas', color:'#A78BFA', fields:[
    { key:'plaq',  label:'Plaquetas',            unit:'/µL',  refM:'150.000–400.000', refF:'150.000–400.000', placeholder:'ex: 48000' },
    { key:'vpm',   label:'VPM (Volume Plaquetário Médio)', unit:'fL', refM:'7.5–12.5', refF:'7.5–12.5', placeholder:'ex: 11.2' },
  ]},
];
