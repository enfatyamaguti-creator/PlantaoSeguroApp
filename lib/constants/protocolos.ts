import { C } from './colors';

export interface Protocolo {
  id: string;
  icon: string;
  title: string;
  cat: string;
  c: string;
  steps: string[];
}

export const PROTS: Protocolo[] = [
  { id: 'sepse', icon: '🦠', title: 'Sepse / Choque Séptico', cat: 'Emergência', c: C.danger,
    steps: [
      'Identificar critérios: suspeita de infecção + disfunção orgânica (NEWS2 ou qSOFA ≥2)',
      'Coletar 2 pares de hemoculturas antes de iniciar antibiótico (não atrasar >45 min)',
      'Antibiótico de amplo espectro em até 1 hora do diagnóstico',
      'Lactato arterial imediato — se >4 mmol/L: emergência',
      'Reposição volêmica: 30 ml/kg SF 0,9% em 3h se hipotensão ou lactato >4',
      'Meta: PAM ≥65 mmHg, diurese >0,5 ml/kg/h',
      'Se sem resposta a volume → iniciar Noradrenalina (acesso central ou femoral)',
      'Monitorar: lactato serial, diurese, SOFA',
    ]},
  { id: 'pcr', icon: '💔', title: 'PCR — Parada Cardiorrespiratória', cat: 'Emergência', c: '#FF0030',
    steps: [
      'Verificar responsividade + pulso central (máx 10 seg)',
      'Acionar código azul / chamar help IMEDIATAMENTE',
      'RCP de alta qualidade: 100-120 compressões/min, profundidade 5-6 cm',
      'Relação 30:2 (sem via aérea avançada) | contínuo com via aérea',
      'Conectar monitor/DEA assim que disponível',
      'FV/TVSP → Desfibrilação 200J bifásica + RCP imediata 2 min',
      'Adrenalina 1mg EV/IO a cada 3-5 min (a partir do 2° choque)',
      'Identificar e tratar 5H/5T: hipóxia, hipovolemia, H+, hipo/hipercalemia, hipotermia | TEP, tamponamento, tóxicos, tensão pneumotórax, trombose coronária',
    ]},
  { id: 'avc', icon: '🧠', title: 'AVC Isquêmico Agudo', cat: 'Neurologia', c: C.warn,
    steps: [
      'FAST: Face (assimetria?), Arms (fraqueza?), Speech (alteração?), Time (anotar horário!)',
      'Glicemia capilar imediata — excluir hipoglicemia como causa',
      'TC crânio sem contraste urgente + AVR neurológica',
      'Janela trombolítica: até 4h30 do início (sintomas <3h = prioridade máxima)',
      'PA: tratar SOMENTE se >220/120 (ou >185/110 se candidato a rTPA)',
      'Decúbito: 0° (isquêmico) / 30° (hemorrágico)',
      'NPO até avaliação de deglutição',
      'Monitorar: PA, FC, SatO2, glicemia, temperatura — hipotermia prejudica recuperação neuronal',
    ]},
  { id: 'pav', icon: '🫁', title: 'Bundle PAV (Pneumonia Associada à VM)', cat: 'UTI', c: C.accent,
    steps: [
      'Higiene oral com clorexidina 0,12% a cada 8h (escovação + bochechos)',
      'Cabeceira 30-45° — exceto contraindicação (instabilidade hemodinâmica)',
      'Pressão do cuff 20-30 cmH2O — verificar 3x/dia com cufômetro',
      'RASS meta: 0 a -2 (evitar sedação profunda desnecessária)',
      'CAM-ICU (delirium) a cada turno',
      'Interrupção diária da sedação + TRE (teste respiração espontânea)',
      'Profilaxia TVP: heparina + meia elástica / compressão pneumática',
      'Higiene das mãos: momento 1 e 2 rigorosos',
    ]},
  { id: 'hipoglicemia', icon: '🩸', title: 'Hipoglicemia (<70 mg/dL)', cat: 'Metabólico', c: '#FF8C00',
    steps: [
      'Confirmar com glicosímetro calibrado',
      'Paciente consciente e colaborativo: 15g carboidrato (suco, dextrosol, mel)',
      'Paciente inconsciente / sem via oral: Glicose 50% 20-40ml EV — acesso exclusivo, correr lento',
      'Repetir glicemia em 15 min após intervenção',
      'Se <70 persistente: repetir glicose 50%; comunicar médico',
      'Investigar causa: jejum prolongado, dose insulina, dieta, sepse, insuficiência hepática',
      'Meta UTI: glicemia 140-180 mg/dL (evitar hipoglicemia e hiperglicemia)',
      'Documentar valor, horário, conduta e desfecho',
    ]},
  { id: 'lpp', icon: '🩹', title: 'Prevenção de LPP', cat: 'Segurança', c: C.ok,
    steps: [
      'Escala de Braden na admissão e a cada 24h (escore ≤18 = risco)',
      'Reposicionamento a cada 2h (documentar no prontuário)',
      'Inspeção da pele: sacro, calcâneos, occipital, maléolos, cotovelos',
      'Manter pele seca: incontinência → troca imediata + proteção cutânea',
      'Superfície de redistribuição de pressão para Braden ≤12',
      'Calcâneos flutuando com coxim sob panturrilhas (nunca sob o calcanhar)',
      'Nutrir: proteína 1,2-1,5g/kg/dia + zinco + vitamina C + vitamina E',
      'Curativo de espuma no sacro para pacientes de alto risco (internação ≥3d)',
    ]},
];
