export interface AnotTipo {
  id: string;
  label: string;
  icon: string;
  color: string;
}

export interface AnotCampo {
  key: string;
  label: string;
  placeholder: string;
}

export const ANOT_TIPOS: AnotTipo[] = [
  { id:'intercorrencia', label:'Intercorrência clínica',  icon:'🚨', color:'#E53E3E' },
  { id:'procedimento',   label:'Procedimento realizado',  icon:'🩺', color:'#00A896' },
  { id:'medicacao',      label:'Administração de medicação', icon:'💊', color:'#553C9A' },
  { id:'avaliacao',      label:'Avaliação clínica',       icon:'👁',  color:'#0D2D5E' },
  { id:'pele',           label:'Avaliação de pele',       icon:'🩹', color:'#C9A84C' },
  { id:'comunicacao',    label:'Comunicação à equipe',    icon:'📞', color:'#DD6B20' },
  { id:'admissao',       label:'Admissão do paciente',    icon:'🏥', color:'#276749' },
  { id:'alta',           label:'Preparo de alta',         icon:'🚪', color:'#276749' },
  { id:'recusa',         label:'Recusa de tratamento',    icon:'⚠️', color:'#DD6B20' },
  { id:'queda',          label:'Queda / evento adverso',  icon:'⛔', color:'#E53E3E' },
  { id:'livre',          label:'Anotação livre',          icon:'📋', color:'#718096' },
];

export const ANOT_TURNOS = ['Manhã (07h–13h)', 'Tarde (13h–19h)', 'Noite (19h–07h)', 'Plantonista 12h'];
export const ANOT_SETORES = ['UTI Adulto', 'Pronto-Socorro', 'Clínica Médica', 'Clínica Cirúrgica', 'Oncologia', 'Neurocirurgia', 'Outro'];

export const ANOT_EXTRAS: Record<string, AnotCampo[]> = {
  intercorrencia: [
    { key:'sinal', label:'Sinal/sintoma principal', placeholder:'ex: dessaturação súbita, hipotensão, agitação...' },
    { key:'conduta', label:'Conduta realizada', placeholder:'ex: oxigenoterapia iniciada, médico acionado...' },
    { key:'desfecho', label:'Desfecho/resposta', placeholder:'ex: paciente estabilizou, SpO2 retornou a 96%...' },
  ],
  procedimento: [
    { key:'proc', label:'Procedimento', placeholder:'ex: passagem de SVD, CVC, SNE, curativo...' },
    { key:'tecnica', label:'Técnica e materiais', placeholder:'ex: técnica asséptica, calibre utilizado, local...' },
    { key:'resposta', label:'Resposta do paciente', placeholder:'ex: tolerou bem, sem intercorrências...' },
  ],
  medicacao: [
    { key:'med', label:'Medicação', placeholder:'ex: Noradrenalina 0,1 mcg/kg/min EV contínuo' },
    { key:'horario', label:'Horário de administração', placeholder:'ex: 14h32' },
    { key:'reacao', label:'Reação / observação', placeholder:'ex: sem reações adversas, PA mantida...' },
  ],
  avaliacao: [
    { key:'sistema', label:'Sistema avaliado', placeholder:'ex: neurológico, respiratório, hemodinâmico...' },
    { key:'achados', label:'Achados da avaliação', placeholder:'ex: Glasgow 14, MRC simétrico, sem focalização...' },
  ],
  comunicacao: [
    { key:'profissional', label:'Profissional comunicado', placeholder:'ex: Dr. Carlos — Médico plantonista' },
    { key:'motivo', label:'Motivo da comunicação', placeholder:'ex: piora hemodinâmica, resultado crítico de K+...' },
    { key:'retorno', label:'Retorno / conduta prescrita', placeholder:'ex: prescrito aumento de noradrenalina para 0,2...' },
  ],
  admissao: [
    { key:'origem', label:'Origem do paciente', placeholder:'ex: PS, CC, transferência de outro hospital...' },
    { key:'motivo', label:'Motivo da internação', placeholder:'ex: sepse de foco pulmonar, pós-op de...' },
    { key:'estado', label:'Estado na admissão', placeholder:'ex: Glasgow 12, PA 90/60, SpO2 88%...' },
  ],
  alta: [
    { key:'destino', label:'Destino do paciente', placeholder:'ex: UTI Step Down, domicílio, outro hospital...' },
    { key:'orientacoes', label:'Orientações fornecidas', placeholder:'ex: orientado sobre medicações, retorno em 7 dias...' },
  ],
  recusa: [
    { key:'tratamento', label:'Tratamento recusado', placeholder:'ex: recusou passagem de SVD, recusou transfusão...' },
    { key:'justificativa', label:'Justificativa do paciente', placeholder:'ex: crença religiosa, medo, desconhecimento...' },
  ],
  queda: [
    { key:'local', label:'Local da queda', placeholder:'ex: ao pé do leito, no banheiro, tentativa de saída...' },
    { key:'avaliacao', label:'Avaliação pós-queda', placeholder:'ex: sem lesões visíveis, Glasgow mantido, Rx solicitado...' },
    { key:'medidas', label:'Medidas adotadas', placeholder:'ex: médico comunicado, grades elevadas, familiar avisado...' },
  ],
  pele: [
    { key:'regioes', label:'Regiões avaliadas', placeholder:'ex: sacro, calcâneos, occipital, maléolos, cotovelos...' },
    { key:'achados', label:'Achados da avaliação', placeholder:'ex: pele íntegra, hidratada; eritema não branqueável em sacro 2x2cm...' },
    { key:'lpp', label:'LPP identificada (se houver)', placeholder:'ex: LPP estágio 2 em sacro, bordas definidas, leito com exsudato seroso, 3x4cm.' },
    { key:'cobertura', label:'Cobertura/conduta realizada', placeholder:'ex: aplicado AGE em sacro, espuma protetora em calcâneos...' },
    { key:'braden', label:'Escore de Braden', placeholder:'ex: Braden 12 — alto risco. Reposicionamento 2/2h iniciado.' },
    { key:'pele_extra', label:'Observações adicionais', placeholder:'ex: familiar orientado, médico comunicado, foto registrada...' },
  ],
  livre: [
    { key:'texto', label:'Descrição da anotação', placeholder:'Descreva livremente a situação clínica ou observação...' },
  ],
};
