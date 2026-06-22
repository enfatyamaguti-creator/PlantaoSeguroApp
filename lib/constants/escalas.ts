export const ECAT_COLOR: Record<string, string> = {
  Neurologia: '#A78BFA',
  Sedação:    '#00C9A7',
  Segurança:  '#FF5A7A',
  Dor:        '#FFB020',
  Urgência:   '#FF3B5C',
  Quedas:     '#6B5CA5',
};

export interface ScaleOption {
  label: string;
  score: number;
  desc?: string;
  c?: string;
}

export interface ScaleGroup {
  label: string;
  key: string;
  options: ScaleOption[];
}

export interface ChecklistItem {
  key: string;
  label: string;
  desc: string;
}

export interface ScaleData {
  id: string;
  name: string;
  cat: string;
  type: 'calculator' | 'single' | 'checklist';
  scoreLabel: string;
  desc: string;
  minScore?: number;
  maxScore?: number;
  interpret?: ((s: number) => { label: string; color: string }) | ((s: Record<string, boolean>) => { label: string; color: string } | null);
  groups?: ScaleGroup[];
  options?: ScaleOption[];
  items?: ChecklistItem[];
  dica: string;
}

export const SCALES_DATA: ScaleData[] = [
  { id:'glasgow', name:'Glasgow (ECG)', cat:'Neurologia', type:'calculator', scoreLabel:'ECG',
    desc:'Avalia nível de consciência. Score 3–15. Aplicar em todos os pacientes neurológicos e críticos. Documente como: O_V_M = total (ex: O2V3M4 = 9).',
    minScore:3, maxScore:15,
    interpret: (s: number) => s>=14?{label:'Normal / leve',color:'#00D084'}:s>=9?{label:'Moderado — vigilância',color:'#FFB020'}:{label:'Grave / coma — VIA AÉREA EM RISCO',color:'#FF3B5C'},
    groups:[
      {label:'Abertura Ocular (O)', key:'O', options:[{label:'Espontânea',score:4},{label:'À voz',score:3},{label:'À dor',score:2},{label:'Ausente',score:1}]},
      {label:'Resposta Verbal (V)', key:'V', options:[{label:'Orientada',score:5},{label:'Confusa',score:4},{label:'Palavras inapropriadas',score:3},{label:'Sons incompreensíveis',score:2},{label:'Ausente',score:1}]},
      {label:'Resposta Motora (M)', key:'M', options:[{label:'Obedece comandos',score:6},{label:'Localiza dor',score:5},{label:'Retirada à dor',score:4},{label:'Flexão anormal — decorticação',score:3},{label:'Extensão anormal — decerebração',score:2},{label:'Ausente',score:1}]},
    ],
    dica:'Glasgow ≤8 = via aérea em risco — comunicar médico imediatamente e preparar material de intubação. Posição decorticação (flexão) = lesão acima do tronco. Posição decerebração (extensão) = lesão de tronco = pior prognóstico.',
  },
  { id:'rass', name:'RASS', cat:'Sedação', type:'single', scoreLabel:'RASS',
    desc:'Richmond Agitation-Sedation Scale. Meta habitual na UTI: RASS 0 a -2. Avalie antes de cada dose de sedativo.',
    interpret: (s: number) => s>0?{label:'Agitação — avaliar causa e sedação',color:'#FF3B5C'}:s===0?{label:'Alerta e calmo — estado ideal',color:'#00D084'}:s>=-2?{label:'Sedação leve — meta habitual UTI',color:'#00C9A7'}:s>=-3?{label:'Sedação moderada',color:'#FFB020'}:{label:'Sedação profunda / não responsivo',color:'#FF3B5C'},
    options:[
      {score:4,label:'+4 Combativo',desc:'Violento, risco imediato para a equipe',c:'#FF0030'},
      {score:3,label:'+3 Muito agitado',desc:'Puxa/remove tubos e cateteres; agressivo',c:'#FF3B5C'},
      {score:2,label:'+2 Agitado',desc:'Movimentos frequentes sem propósito; luta com ventilador',c:'#FF6B35'},
      {score:1,label:'+1 Inquieto',desc:'Ansioso; movimentos não agressivos ou vigorosos',c:'#FFB020'},
      {score:0,label:'0 Alerta e calmo',desc:'Alerta, calmo — estado ideal para o paciente de UTI',c:'#00D084'},
      {score:-1,label:'-1 Sonolento',desc:'Não totalmente alerta; abre olhos >10s à voz',c:'#00C9A7'},
      {score:-2,label:'-2 Sedação leve',desc:'Abre olhos brevemente <10s à voz',c:'#00B4D8'},
      {score:-3,label:'-3 Sedação moderada',desc:'Movimento ou abertura dos olhos à voz (sem contato visual)',c:'#0096C7'},
      {score:-4,label:'-4 Sedação profunda',desc:'Sem resposta à voz; movimento/abertura apenas à estimulação física',c:'#0077B6'},
      {score:-5,label:'-5 Não responsivo',desc:'Sem resposta à voz ou estimulação física',c:'#023E8A'},
    ],
    dica:'RASS ≤ -3 sem indicação clínica = sedação excessiva. Considere interrupção diária (SAT) se RASS ≤ -2 por >24h. Agitação (RASS >0): primeiro exclua dor, retenção urinária, hipóxia, delirium — trate a causa antes de sedar.',
  },
  { id:'braden', name:'Braden (LPP)', cat:'Segurança', type:'calculator', scoreLabel:'Braden',
    desc:'Avalia risco de Lesão por Pressão. Score 6–23. Aplicar na admissão e a cada 24h. Score ≤18 = ativar protocolo de prevenção.',
    minScore:6, maxScore:23,
    interpret: (s: number) => s<=9?{label:'Risco muito alto — protocolo máximo',color:'#FF0030'}:s<=12?{label:'Risco alto',color:'#FF3B5C'}:s<=14?{label:'Risco moderado',color:'#FF6B35'}:s<=18?{label:'Risco baixo',color:'#FFB020'}:{label:'Sem risco aparente',color:'#00D084'},
    groups:[
      {label:'Percepção Sensorial', key:'A', options:[{label:'Completamente limitada',score:1},{label:'Muito limitada',score:2},{label:'Levemente limitada',score:3},{label:'Sem limitação',score:4}]},
      {label:'Umidade', key:'B', options:[{label:'Completamente úmida',score:1},{label:'Muito úmida',score:2},{label:'Ocasionalmente úmida',score:3},{label:'Raramente úmida',score:4}]},
      {label:'Atividade', key:'C', options:[{label:'Acamado',score:1},{label:'Cadeirante',score:2},{label:'Deambula ocasionalmente',score:3},{label:'Deambula frequentemente',score:4}]},
      {label:'Mobilidade', key:'D', options:[{label:'Completamente imóvel',score:1},{label:'Muito limitada',score:2},{label:'Levemente limitada',score:3},{label:'Não limitada',score:4}]},
      {label:'Nutrição', key:'E', options:[{label:'Muito pobre',score:1},{label:'Inadequada',score:2},{label:'Adequada',score:3},{label:'Excelente',score:4}]},
      {label:'Fricção e Cisalhamento', key:'F', options:[{label:'Problema',score:1},{label:'Problema em potencial',score:2},{label:'Sem problema aparente',score:3}]},
    ],
    dica:'Score ≤18: mudança de decúbito 2/2h documentada, superfície de redistribuição de pressão, nutrição adequada e hidratação da pele. Score ≤9: cuidados máximos + foto e registro diário. Braden é rastreio — use seus olhos na avaliação diária.',
  },
  { id:'cpot', name:'CPOT (Dor)', cat:'Dor', type:'calculator', scoreLabel:'CPOT',
    desc:'Critical Pain Observation Tool. Para pacientes não comunicativos em VM. Score 0–8. Score ≥3 = dor presente — analgesia indicada.',
    minScore:0, maxScore:8,
    interpret: (s: number) => s===0?{label:'Sem dor aparente',color:'#00D084'}:s<=2?{label:'Dor leve — monitorar',color:'#00C9A7'}:s<=5?{label:'Dor moderada — analgesia indicada',color:'#FFB020'}:{label:'Dor intensa — analgesia URGENTE',color:'#FF3B5C'},
    groups:[
      {label:'Expressão Facial', key:'A', options:[{label:'Relaxada — sem tensão muscular',score:0},{label:'Tensa — franzido sobrancelhas/órbitas',score:1},{label:'Careta — todos os movimentos faciais',score:2}]},
      {label:'Movimentos Corporais', key:'B', options:[{label:'Ausentes / posição normal',score:0},{label:'Proteção — movimentos cautelosos',score:1},{label:'Agitação / resistência ao ventilador',score:2}]},
      {label:'Tônus Muscular (flexão/extensão passiva)', key:'C', options:[{label:'Relaxado',score:0},{label:'Tenso e rígido',score:1},{label:'Muito tenso e rígido',score:2}]},
      {label:'Adaptação ao VM / Vocalização (extubado)', key:'D', options:[{label:'Tolerando ventilador / fala normal',score:0},{label:'Tossindo mas tolerando / gemidos ocasionais',score:1},{label:'Luta com ventilador / choro',score:2}]},
    ],
    dica:'CPOT ≥3 = intervir. Comunique ao médico e reavalie 30 min após analgesia. RASS ≤ -3 pode mascarar a dor — não interprete sedação profunda como ausência de dor. A dor não tratada prolonga VM e delirium.',
  },
  { id:'camicu', name:'CAM-ICU (Delirium)', cat:'Neurologia', type:'checklist', scoreLabel:'CAM-ICU',
    desc:'Confusion Assessment Method for ICU. Positivo = Critério 1 + Critério 2 + (Critério 3 OU Critério 4). Avaliar 1× por turno.',
    items:[
      {key:'A',label:'1. Início agudo ou flutuação do estado mental',desc:'Houve mudança aguda do estado mental em relação ao basal? O estado mental flutua ao longo do dia?'},
      {key:'B',label:'2. Desatenção',desc:'O paciente tem dificuldade em focar atenção? Dificuldade em seguir comandos? (ex: apertar mão só na letra A: S-A-V-E-A-H-A-A-R-T)'},
      {key:'C',label:'3. Pensamento desorganizado',desc:'Pensamento incoerente, divagante ou ilógico? Muda de assunto abruptamente? Respostas que não fazem sentido?'},
      {key:'D',label:'4. Nível de consciência alterado',desc:'RASS diferente de zero — qualquer grau de agitação (>0) ou sedação (<0)'},
    ],
    interpret: (sel: Record<string, boolean>) => {
      if (sel.A && sel.B && (sel.C || sel.D)) return {label:'POSITIVO — Delirium presente', color:'#FF3B5C'};
      if (Object.keys(sel).length === 0) return null;
      if (!sel.A) return {label:'Negativo — critério 1 ausente', color:'#00D084'};
      if (!sel.B) return {label:'Negativo — critério 2 ausente', color:'#00D084'};
      return {label:'Negativo — sem critérios suficientes', color:'#00D084'};
    },
    dica:'Delirium positivo: investigar causas (dor, retenção urinária, hipóxia, hipoglicemia, infecção, drogas). Pilares não farmacológicos: reorientação ambiental, luz natural, mobilização precoce, sono. Delirium hipoativo é o mais perigoso — muitas vezes não é reconhecido.',
  },
  { id:'news2', name:'NEWS2 (Deterioração)', cat:'Urgência', type:'calculator', scoreLabel:'NEWS2',
    desc:'National Early Warning Score 2. Detecta deterioração clínica precoce. Score ≥5 num único parâmetro OU ≥7 total = acionar resposta de emergência.',
    minScore:0, maxScore:20,
    interpret: (s: number) => s===0?{label:'Baixo risco — monitorar 12h',color:'#00D084'}:s<=4?{label:'Baixo risco — monitorar 4–6h',color:'#00C9A7'}:s<=6?{label:'Médio risco — avaliação médica urgente',color:'#FFB020'}:{label:'ALTO RISCO — Resposta de emergência',color:'#FF3B5C'},
    groups:[
      {label:'Frequência Respiratória (irpm)', key:'A', options:[{label:'≤8',score:3},{label:'9–11',score:1},{label:'12–20',score:0},{label:'21–24',score:2},{label:'≥25',score:3}]},
      {label:'Saturação O2 (%)', key:'B', options:[{label:'≤91%',score:3},{label:'92–93%',score:2},{label:'94–95%',score:1},{label:'≥96%',score:0}]},
      {label:'Suporte de Oxigênio', key:'C', options:[{label:'Ar ambiente',score:0},{label:'Em uso de O2 suplementar',score:2}]},
      {label:'Pressão Arterial Sistólica (mmHg)', key:'D', options:[{label:'≤90',score:3},{label:'91–100',score:2},{label:'101–110',score:1},{label:'111–219',score:0},{label:'≥220',score:3}]},
      {label:'Frequência Cardíaca (bpm)', key:'E', options:[{label:'≤40',score:3},{label:'41–50',score:1},{label:'51–90',score:0},{label:'91–110',score:1},{label:'111–130',score:2},{label:'≥131',score:3}]},
      {label:'Nível de Consciência', key:'F', options:[{label:'Alerta (A)',score:0},{label:'Confuso / delirium / resposta à voz, dor ou irresponsivo',score:3}]},
      {label:'Temperatura (°C)', key:'G', options:[{label:'≤35.0',score:3},{label:'35.1–36.0',score:1},{label:'36.1–38.0',score:0},{label:'38.1–39.0',score:1},{label:'≥39.1',score:2}]},
    ],
    dica:'NEWS2 ≥7 OU qualquer parâmetro com score 3 = TIME de resposta rápida ou UTI. Use na admissão, a cada 4–6h em pacientes de risco e SEMPRE que houver mudança clínica. É uma ferramenta de rastreio — confie no seu olho clínico também.',
  },
  { id:'morse', name:'Morse (Quedas)', cat:'Quedas', type:'calculator', scoreLabel:'Morse',
    desc:'Escala de Morse para risco de queda. Score 0–125. Aplicar na admissão, a cada 24h e após qualquer queda ou mudança clínica significativa. Score ≥45 = risco alto — ativar protocolo de prevenção de quedas.',
    minScore:0, maxScore:125,
    interpret: (s: number) => s<25?{label:'Sem risco / Baixo risco',color:'#2E7D55'}:s<=50?{label:'Risco moderado — medidas preventivas',color:'#B5780A'}:{label:'Risco alto — protocolo máximo de prevenção',color:'#C0392B'},
    groups:[
      { label:'1. Histórico de quedas nos últimos 3 meses ou no internamento atual', key:'A',
        options:[{label:'Não',score:0},{label:'Sim',score:25}]
      },
      { label:'2. Diagnóstico secundário (mais de um diagnóstico médico no prontuário)', key:'B',
        options:[{label:'Não',score:0},{label:'Sim',score:15}]
      },
      { label:'3. Auxílio para deambulação / transferência', key:'C',
        options:[
          {label:'Nenhum (acamado, cadeira de rodas, enfermeira assiste)',score:0},
          {label:'Muletas, bengala, andador',score:15},
          {label:'Apoia-se nos móveis, paredes ou pessoas',score:30},
        ]
      },
      { label:'4. Terapia intravenosa (acesso venoso periférico, heparina, soro)', key:'D',
        options:[{label:'Não',score:0},{label:'Sim',score:20}]
      },
      { label:'5. Marcha / transferência', key:'E',
        options:[
          {label:'Normal / acamado / imóvel — sem transferência independente',score:0},
          {label:'Membros inferiores fracos — marcha comprometida',score:10},
          {label:'Comprometida — marcha instável, dificuldade de equilíbrio',score:20},
        ]
      },
      { label:'6. Estado mental', key:'F',
        options:[
          {label:'Orientado quanto às próprias limitações / acamado',score:0},
          {label:'Superestima capacidade / esquece limitações — confuso',score:15},
        ]
      },
    ],
    dica:'Morse ≥45: pulseira de identificação de risco, cama na posição mais baixa, grades laterais elevadas, campainha ao alcance, iluminação noturna e calçado antiderrapante. Registre no prontuário e no quadro do leito. Não basta avaliar — a equipe toda precisa saber. Reavalie após qualquer queda, mudança de estado mental ou início de nova medicação sedativa.',
  },
];
