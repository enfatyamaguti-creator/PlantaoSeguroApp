export interface DrogaCat {
  id: string;
  label: string;
  color: string;
}

export interface Droga {
  id: string;
  cat: string;
  name: string;
  generic: string;
  class: string;
  mec: string;
  dilution: string;
  dose: string;
  via: string;
  monitoring: string[];
  adverse: string[];
  dica: string;
}

export const DROGAS_CATS: DrogaCat[] = [
  {id:'vasoativas', label:'Drogas Vasoativas', color:'#FF3B5C'},
  {id:'sedativos',  label:'Sedativos',          color:'#A78BFA'},
  {id:'analgesicos',label:'Analgésicos',         color:'#FFB020'},
  {id:'bnm',        label:'Bloqueadores NM',     color:'#00C9A7'},
];

export const DROGAS: Droga[] = [
  {id:'norad', cat:'vasoativas', name:'Noradrenalina', generic:'Norepinefrina', class:'Vasopressor · Catecolamina',
   mec:'Agonista α1 (vasoconstrição periférica) + β1 (inotropismo). Aumenta PAM com discreto efeito na FC. Droga de primeira escolha no choque séptico.',
   dilution:'4 amp (4mg) + 246 mL SG5% = 16 mcg/mL\n2 amp (2mg) + 248 mL SG5% = 8 mcg/mL',
   dose:'0,01–3 mcg/kg/min IV contínuo. Titular pela PAM (meta ≥65 mmHg).',
   via:'CVC preferencialmente. AVP: emergência temporária apenas.',
   monitoring:['PAM a cada 15–30 min (meta ≥65 mmHg)','FC e ritmo cardíaco','Diurese horária (meta >0,5 ml/kg/h)','Perfusão periférica e coloração das extremidades','Sinal de extravasamento no acesso'],
   adverse:['Vasoconstrição excessiva — isquemia de extremidades','Bradicardia reflexa','Necrose tissular por extravasamento','Hipertensão grave em altas doses'],
   dica:'Noradrenalina em acesso periférico = emergência temporária — providencie CVC imediatamente. NUNCA interrompa abruptamente: desmame gradual 0,05 mcg/kg/min a cada 30–60 min. Extravasamento: fentolamina 5 mg + 10 mL SF SC no local.'},

  {id:'adren', cat:'vasoativas', name:'Adrenalina', generic:'Epinefrina', class:'Vasopressor/Inotrópico · Catecolamina',
   mec:'Agonista α e β. β1 (cronotro/inotropismo), β2 (broncodilatação), α (vasoconstrição). Primeira escolha no PCR e anafilaxia.',
   dilution:'PCR: 1mg/10mL direto EV\nInfusão: 4 amp (4mg) + 246 mL SF0,9% = 16 mcg/mL',
   dose:'PCR: 1mg EV a cada 3–5 min. Anafilaxia: 0,3–0,5 mg IM lateral coxa. Infusão: 0,01–1 mcg/kg/min.',
   via:'PCR: EV periférico ou IO. Infusão contínua: CVC ou periférico calibroso.',
   monitoring:['FC e ritmo (arritmias frequentes)','PA a cada 5–15 min','ECG (isquemia miocárdica)','Glicemia (hiperglicemia)','Lactato'],
   adverse:['Taquicardia e arritmias ventriculares','Hipertensão grave','Isquemia miocárdica','Hiperglicemia','Hipocalemia'],
   dica:'No PCR: adrenalina 1mg EV a partir do 2° ciclo de RCP, a cada 3–5 min. Nunca interrompa as compressões para administrar — infundir durante ou imediatamente após. FV/TVSP: choque PRIMEIRO, depois adrenalina.'},

  {id:'dobut', cat:'vasoativas', name:'Dobutamina', generic:'Dobutamina', class:'Inotrópico · Catecolamina',
   mec:'Agonista β1 predominante. Aumenta contratilidade e débito cardíaco. Pode reduzir a PA (vasodilatação periférica). Não é vasopressor.',
   dilution:'250 mg + 250 mL SG5% = 1.000 mcg/mL\n250 mg + 500 mL SG5% = 500 mcg/mL',
   dose:'2,5–20 mcg/kg/min IV contínuo. Iniciar em 2,5 e titular pelo DC/PA.',
   via:'CVC preferencial. Periférico calibroso se necessário.',
   monitoring:['FC (taquicardia é dose-dependente — limita a dose)','PA (pode causar hipotensão)','Débito cardíaco (se Swan-Ganz)','Ritmo cardíaco','Diurese'],
   adverse:['Taquicardia — limitante da dose (FC >120 = reduzir)','Hipotensão','Arritmias','Isquemia miocárdica em altas doses'],
   dica:'Dobutamina aumenta DC mas NÃO a PA — se hipotenso, associe noradrenalina primeiro. FC >120 = reduzir dose. Não use dobutamina em paciente com FA rápida — piora a FC. Ideal no choque cardiogênico com DC baixo.'},

  {id:'vasop', cat:'vasoativas', name:'Vasopressina', generic:'Vasopressina / ADH', class:'Vasopressor · Não catecolamínico',
   mec:'Agonista V1 (vasoconstrição por vias independentes de catecolaminas). Na sepse grave, há depleção de vasopressina endógena. Não é titulada — dose fixa.',
   dilution:'20 UI + 80 mL SF0,9% = 0,2 UI/mL\n40 UI + 240 mL SF = 0,1 UI/mL',
   dose:'0,03–0,04 UI/min (dose FIXA na sepse). Não ultrapassar 0,04 UI/min. Não titular.',
   via:'CVC exclusivamente.',
   monitoring:['PAM','Perfusão periférica e extremidades','Diurese (pode causar oligúria)','Sódio sérico','Sinais de isquemia intestinal (dor abdominal, distensão)'],
   adverse:['Isquemia mesentérica (grave)','Isquemia miocárdica','Necrose de extremidades','Hiponatremia em altas doses'],
   dica:'Vasopressina é adjuvante da noradrenalina na sepse — permite reduzir a dose do vasopressor principal (poupar catecolaminas). Dose FIXA: 0,03 UI/min — não titular. CVC obrigatório. Atenção a sinais de isquemia intestinal.'},

  {id:'dopam', cat:'vasoativas', name:'Dopamina', generic:'Dopamina', class:'Catecolamina · Uso restrito na UTI',
   mec:'Dose-dependente: baixa (dopaminérgica), média (β1-inotrópica), alta (α-vasoconstrictora). "Dose renal" não tem evidência — NÃO usar com esse objetivo.',
   dilution:'200 mg + 200 mL SG5% = 1.000 mcg/mL\n200 mg + 300 mL SG5% = 667 mcg/mL',
   dose:'5–20 mcg/kg/min. (Doses >20 = sem benefício adicional).',
   via:'CVC preferencial. Periférico calibroso em emergência.',
   monitoring:['FC e ritmo (mais arritmogênica que noradrenalina)','PA','Perfusão periférica','Extravasamento'],
   adverse:['Taquicardia e arritmias (maior risco que noradrenalina)','Vasoconstrição isquêmica em altas doses','Necrose por extravasamento'],
   dica:'"Dose renal" de dopamina: sem evidência para proteção renal — não use com esse objetivo. Para choque séptico, noradrenalina é superior. Dopamina ainda tem indicação em bradicardia sintomática sem marca-passo disponível.'},

  {id:'midaz', cat:'sedativos', name:'Midazolam', generic:'Midazolam', class:'Benzodiazepínico · Sedativo',
   mec:'Potencializa ação do GABA-A. Ansiolítico, amnésico, anticonvulsivante e sedativo. Meia-vida longa em infusão contínua — acumula.',
   dilution:'50 mg + 200 mL SF0,9% = 0,2 mg/mL\n15 mg + 235 mL SF = 0,06 mg/mL',
   dose:'Bolus: 1–5 mg EV lento (2–3 min). Infusão: 0,02–0,1 mg/kg/h. Titular pelo RASS.',
   via:'EV exclusivo. Bolus sempre em 2–3 minutos (nunca em push).',
   monitoring:['RASS a cada 4h','FR e padrão respiratório','SpO2','PA (hipotensão comum)','Acúmulo — sedação progressiva'],
   adverse:['Depressão respiratória','Hipotensão','Acúmulo com infusão prolongada (meia-vida >24h)','Delirium na suspensão abrupta','Amnésia prolongada'],
   dica:'Midazolam acumula muito em infusão prolongada — associa-se a mais delirium e VM mais longa que propofol e dexmedetomidina. Priorize interrupção diária (SAT). Antagonista: Flumazenil 0,2 mg EV (atenção: meia-vida curta, pode ressedatar em 30–60 min).'},

  {id:'propofol', cat:'sedativos', name:'Propofol 1%', generic:'Propofol', class:'Anestésico IV · Sedativo ultracurto',
   mec:'Potencializa GABA-A. Ação ultrarrápida e meia-vida muito curta — ideal para sedação com despertar rápido. Permite SAT sem ressedação.',
   dilution:'Pronto para uso (1% = 10 mg/mL). NÃO diluir.',
   dose:'Sedação leve UTI: 5–50 mcg/kg/min (0,3–3 mg/kg/h). Titular pelo RASS.',
   via:'Acesso venoso EXCLUSIVO. Nunca misturar com outras drogas na mesma via.',
   monitoring:['RASS','Triglicerídeos (2×/semana se dose alta)','Urina (pode ficar verde/azulada — normal)','Sinal de PRIS','Calorias (1 mL propofol 1% = 0,1 g gordura = ~1 kcal)'],
   adverse:['Hipotensão na indução','Síndrome da infusão do propofol (PRIS) — rara mas fatal','Hipertrigliceridemia','Dor na injeção','Infecção (meio de cultura — troca equipo 12/12h)'],
   dica:'PRIS: triglicerídeos >400 + acidose metabólica + disfunção cardíaca = descontinuar IMEDIATAMENTE. Propofol é emulsão lipídica: conte as calorias no plano nutricional. Troca o equipo a cada 12h obrigatoriamente (alto risco de contaminação).'},

  {id:'dexmed', cat:'sedativos', name:'Dexmedetomidina', generic:'Precedex', class:'Agonista α2 · Sedativo-analgésico',
   mec:'Agonista α2 central — sedação sem depressão respiratória significativa. Analgésico adjuvante. Mantém responsividade à voz (sedação cooperativa). Ideal no desmame de VM.',
   dilution:'200 mcg (2 mL) + 48 mL SF0,9% = 4 mcg/mL (concentração padrão UTI)',
   dose:'Ataque (opcional): 0,5–1 mcg/kg em 10–20 min. Manutenção: 0,2–1,4 mcg/kg/h.',
   via:'EV exclusivo, bomba de seringa.',
   monitoring:['FC (bradicardia é efeito classe — principal limitante)','PA (hipotensão e hipertensão transitória na ataque)','RASS','FR (menor risco de depressão respiratória)'],
   adverse:['Bradicardia — principal efeito adverso','Hipotensão','Hipertensão transitória no bolus de ataque','Boca seca'],
   dica:'Dexmedetomidina é o sedativo mais alinhado com sedação leve (RASS 0 a -2). Não deprime respiração — ideal para desmame ventilatório e pacientes que precisam cooperar com fisioterapia. Bradicardia sintomática: reduzir taxa ou descontinuar. Não use isoladamente em agitação severa.'},

  {id:'fentanil', cat:'analgesicos', name:'Fentanil', generic:'Citrato de Fentanil', class:'Opioide · Analgésico',
   mec:'Agonista μ-opioide. 100× mais potente que morfina. Lipossolúvel — início rápido (<2 min EV). Menor liberação de histamina que morfina.',
   dilution:'0,5 mg (10 mL) + 240 mL SF0,9% = 2 mcg/mL\n1 mg (20 mL) + 230 mL SF = 4 mcg/mL',
   dose:'Bolus: 25–100 mcg EV lento (3–5 min). Infusão: 25–200 mcg/h (0,5–2 mcg/kg/h).',
   via:'EV exclusivo. Bolus sempre em 3–5 minutos.',
   monitoring:['CPOT (meta <3)','FR e padrão respiratório','SpO2','RASS','Peristaltismo (constipação)'],
   adverse:['Depressão respiratória','Rigidez de caixa torácica (bolus rápido)','Constipação','Náusea e vômitos','Retenção urinária'],
   dica:'Bolus rápido de fentanil pode causar rigidez de tórax ("tórax de madeira") — sempre infundir em 3–5 min, nunca em push. Preferível à morfina em insuficiência renal (sem metabólito ativo acumulável). Antagonista: Naloxona 0,4 mg EV — atenção à dor de rebote.'},

  {id:'morfina', cat:'analgesicos', name:'Morfina', generic:'Sulfato de Morfina', class:'Opioide · Analgésico',
   mec:'Agonista μ-opioide. Libera histamina — pode causar broncoespasmo e hipotensão. Metabólito ativo (M6G) acumula em insuficiência renal.',
   dilution:'10 mg + 90 mL SF0,9% = 0,1 mg/mL\n50 mg + 200 mL SF = 0,25 mg/mL',
   dose:'Bolus: 2–4 mg EV lento (3–5 min). Infusão: 1–10 mg/h. Titular pelo CPOT.',
   via:'EV exclusivo. Bolus em 3–5 min. IM ou SC se sem acesso venoso.',
   monitoring:['CPOT e escala de dor','FR e SpO2','PA (hipotensão por vasodilatação)','Função renal (acúmulo de M6G em IRA/IRC)','Peristaltismo'],
   adverse:['Depressão respiratória','Hipotensão e bradicardia','Broncoespasmo (histamina)','Constipação grave','Prurido','Retenção urinária'],
   dica:'Em insuficiência renal, morfina acumula morfina-6-glucuronídeo (M6G) — pode causar sedação prolongada e apneia. Prefira fentanil nesses casos. Antagonista: Naloxona 0,4 mg EV — pode precipitar síndrome de abstinência em dependentes.'},

  {id:'cetamina', cat:'analgesicos', name:'Cetamina', generic:'Cetamina (Ketamina)', class:'Anestésico dissociativo · NMDA',
   mec:'Antagonista NMDA. Produz analgesia + sedação superficial + broncodilatação. Mantém reflexos protetores. Aumenta PA e FC. Útil em pacientes hipotensos e broncoespásticos.',
   dilution:'Bolus: 500 mg/10 mL — usar concentrado ou diluir. Infusão: 500 mg + 250 mL SF = 2 mg/mL',
   dose:'Analgesia subanestésica: 0,1–0,5 mg/kg/h. Sedação procedimento: 1–2 mg/kg EV lento.',
   via:'EV exclusivo, administrar lentamente.',
   monitoring:['PA e FC (aumenta ambos)','Estado mental e alucinações','Secreções (aumenta produção)','SpO2','Pressão intracraniana (contraindicada em HIC)'],
   adverse:['Alucinações e emergência dissociativa','Taquicardia e hipertensão','Hipersalivação e aumento de secreções','Nistagmo','Laringoespasmo (raro)'],
   dica:'Cetamina é o analgésico/sedativo de escolha quando o paciente está broncoespástico OU hipotenso — única droga que mantém broncodilatação e PA. Associe midazolam para reduzir alucinações. Contraindicada em HIC (aumenta PIC) e hipertensão não controlada.'},

  {id:'atrac', cat:'bnm', name:'Atracúrio', generic:'Besilato de Atracúrio', class:'Bloqueador NM não despolarizante',
   mec:'Antagoniza acetilcolina na junção neuromuscular. Metabolismo de Hofmann (independente de função renal e hepática — temperatura e pH dependente). Libera histamina.',
   dilution:'500 mg + 250 mL SF0,9% = 2 mg/mL. Manter REFRIGERADO (2–8°C).',
   dose:'Intubação: 0,5 mg/kg EV bolus. Infusão: 5–15 mcg/kg/min. Titular pelo TOF.',
   via:'EV exclusivo. NÃO misturar com propofol (precipita imediatamente).',
   monitoring:['TOF (Trem-de-quatro) — meta 1–2 twitch em 4','SpO2 e capnografia','Parâmetros ventilatórios','RASS (sedação OBRIGATÓRIA durante BNM)','Reflexo corneal','Sinais de consciência (lacrimejamento, sudorese, midríase)'],
   adverse:['Liberação de histamina — hipotensão e broncoespasmo','Paralisia residual pós-bloqueio','Consciência sem sedação (ERRO GRAVE)','Fraqueza prolongada pós-UTI'],
   dica:'REGRA DE OURO: NUNCA inicie BNM sem sedação ADEQUADA confirmada. Paciente paralisado sem sedação está consciente e incapaz de comunicar — é uma das piores situações da UTI. Verifique RASS antes, monitore sedação durante TODO o bloqueio. TOF: meta 1–2 respostas de 4.'},

  {id:'cisatrac', cat:'bnm', name:'Cisatracúrio', generic:'Besilato de Cisatracúrio', class:'Bloqueador NM não despolarizante',
   mec:'Isômero do atracúrio. Mesmo metabolismo de Hofmann — independente de IR/IH. Libera MENOS histamina que atracúrio. Preferido na UTI por maior estabilidade hemodinâmica.',
   dilution:'200 mg + 200 mL SF0,9% = 1 mg/mL. Refrigerado e proteger da luz.',
   dose:'Intubação: 0,15–0,2 mg/kg EV. Infusão: 1–3 mcg/kg/min. Titular pelo TOF.',
   via:'EV exclusivo. Proteger da luz.',
   monitoring:['TOF — meta 1–2 de 4','Sedação contínua e profunda','SpO2 e VM','Reflexo corneal e sinais de consciência'],
   adverse:['Paralisia residual','Consciência sem sedação (ERRO GRAVE)','Bradicardia leve transitória'],
   dica:'Cisatracúrio é preferido ao atracúrio na UTI: menos histamina, menos broncoespasmo/hipotensão, metabolismo estável mesmo em IR. Monitore TOF a cada 4h para titular a dose mínima eficaz. Nunca esqueça: BNM sem sedação = consciência sem comunicação.'},

  {id:'rocur', cat:'bnm', name:'Rocurônio', generic:'Brometo de Rocurônio', class:'Bloqueador NM não despolarizante',
   mec:'Antagonista competitivo da acetilcolina. Início rápido (60–90s em dose plena). Indicado para Intubação em Sequência Rápida (ISR) quando succinilcolina é contraindicada.',
   dilution:'Intubação: pronto para uso (10 mg/mL). Infusão: 200 mg + 200 mL SF = 1 mg/mL.',
   dose:'ISR: 1,2 mg/kg EV bolus rápido. Manutenção: 0,3–0,6 mg/kg/h. Titular pelo TOF.',
   via:'EV exclusivo. Bolus rápido para ISR.',
   monitoring:['TOF durante infusão','Sedação adequada e contínua','SpO2 e VM','Função hepática (metabolismo hepático — acumula em insuficiência hepática)'],
   adverse:['Paralisia residual','Anafilaxia (rara mas grave — incidência maior que outros BNM)','Acúmulo em insuficiência hepática grave'],
   dica:'Rocurônio 1,2 mg/kg = condições de intubação equivalentes à succinilcolina em 60s — ideal para ISR quando succinilcolina é contraindicada (queimaduras, hipercalemia, rabdomiólise). Antagonista TOTAL: Sugammadex 16 mg/kg para reversão imediata de emergência.'},
];
