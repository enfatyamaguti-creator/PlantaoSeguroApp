export interface WoundCat {
  id: string;
  label: string;
  color: string;
}

export interface Wound {
  id: string;
  cat: string;
  icon: string;
  title: string;
  sub: string;
  desc: string;
  exsudato: string;
  cobertura: string;
  alternativas: string[];
  aplicar: string;
  troca: string;
  naoFazer: string[];
  dica: string;
}

export const CATS: WoundCat[] = [
  { id: 'LPP',       label: 'LPP',        color: '#FF5A7A' },
  { id: 'Cirúrgica', label: 'Cirúrgica',  color: '#A78BFA' },
  { id: 'Queimadura',label: 'Queimadura', color: '#FFB020' },
  { id: 'Vascular',  label: 'Vascular',   color: '#00C9A7' },
  { id: 'Complexa',  label: 'Complexa',   color: '#C8963E' },
];

export const WOUNDS: Wound[] = [
  { id:'lpp1', cat:'LPP', icon:'🔴', title:'LPP Estágio 1', sub:'Eritema não branqueável — pele íntegra',
    desc:'Pele íntegra com eritema não branqueável em proeminência óssea. Pode haver alteração de temperatura, consistência ou sensação.',
    exsudato:'Nenhum',
    cobertura:'Ácidos Graxos Essenciais (AGE) spray ou creme + espuma de poliuretano fina como proteção.',
    alternativas:['Película semipermeável transparente','Hidrocoloide extrafino'],
    aplicar:'Limpar com SF 0,9°, secar suavemente. Aplicar AGE em movimentos circulares SEM massagear o eritema. Se espuma: cobrir com margem de 2 cm.',
    troca:'AGE: 1× ao dia. Espuma protetora: a cada 3–5 dias ou se deslocada.',
    naoFazer:['Massagear o eritema — piora a hipóxia tecidual','Usar anel de rosquinha — comprime as bordas','Hidrocoloide espesso sobre eritema ativo'],
    dica:'LPP 1 é reversível — diagnóstico precoce é tudo. Vermelho que não embranquece ao dígito-pressão = alarme imediato. Documente com foto, registre e comunique.' },

  { id:'lpp2', cat:'LPP', icon:'🟠', title:'LPP Estágio 2', sub:'Flictena ou úlcera rasa — perda parcial da derme',
    desc:'Perda parcial da derme. Flictena íntegra com líquido seroso, ou úlcera rasa com leito rosado sem esfacelo.',
    exsudato:'Leve a moderado — seroso ou sero-sanguinolento',
    cobertura:'Flictena ÍNTEGRA: espuma hidrocelular por cima (não romper). Flictena ROTA / úlcera rasa: hidrocoloide (pouco exsudato) ou espuma fina (exsudato moderado).',
    alternativas:['Alginato de cálcio se exsudato alto após rotura','Película semipermeável em feridas rasas e secas'],
    aplicar:'Limpar com SF 0,9°. Flictena íntegra: não romper — proteger com espuma. Flictena rota: desbridar bordas frouxas com tesoura estéril, limpar o leito, aplicar cobertura.',
    troca:'Hidrocoloide: 3–7 dias. Espuma: 3–5 dias. Trocar se saturado ou deslocado.',
    naoFazer:['Romper flictena íntegra sem indicação','Usar PVP-I no leito — citotóxico para granulação','Deixar curativo molhado por mais de 24h'],
    dica:'Flictena íntegra é uma bolha de proteção que o corpo criou — respeita ela. Se rota, trata como ferida aberta mas com muita delicadeza no leito frágil. Analgesia antes do curativo sempre.' },

  { id:'lpp3', cat:'LPP', icon:'🔴', title:'LPP Estágio 3', sub:'Perda total da pele — gordura visível, sem osso exposto',
    desc:'Perda total da espessura da pele com gordura subcutânea visível. Pode haver esfacelo, cavidades e solapamentos. Osso, tendão e músculo não expostos.',
    exsudato:'Moderado a abundante',
    cobertura:'Alginato de cálcio em fitas (cavidade) + espuma de poliuretano como cobertura secundária. Se infecção: alginato de prata.',
    alternativas:['Hidrocoloide em pó dentro da cavidade rasa','PHMB se colonização crítica','TPN (VAC) se cavidade extensa'],
    aplicar:'Irrigação com SF 0,9° sob pressão (seringa 20 ml + agulha 18G). Preencher cavidade com alginato em fita — nunca compactar. Deixar a ponta da fita para fora. Cobertura secundária de espuma fixada com fita adesiva.',
    troca:'Alginato: 24–48h conforme saturação. Espuma secundária: conforme exsudato.',
    naoFazer:['Deixar cavidade sem preenchimento — favorece abscesso','Compactar o alginato na cavidade','Usar gaze seca no leito — adere e traumatiza na retirada'],
    dica:'Conte quantas fitas de alginato entrou — você tem que tirar o mesmo número. Deixa sempre a ponta de fora da cavidade para facilitar a retirada. Esse cuidado simples evita muito problema.' },

  { id:'lpp4', cat:'LPP', icon:'⚫', title:'LPP Estágio 4', sub:'Osso, tendão ou músculo exposto',
    desc:'Perda total com estruturas expostas (osso, tendão, cápsula articular). Esfacelo e escara frequentes. Cavidades e solapamentos extensos.',
    exsudato:'Abundante — pode ser seropurulento',
    cobertura:'Alginato de prata (Silvercel) ou espuma com PHMB. Após desbridamento: hidrogel + espuma. Avaliar TPN/VAC com médico.',
    alternativas:['Prata nanocristalina (Acticoat)','Matriz de colágeno pós-limpeza para estimular granulação'],
    aplicar:'Irrigação abundante com SF 0,9° sob pressão. Desbridamento autolítico com hidrogel ou enzimático (colagenase — prescrição médica). Acionar EMTN / equipe de curativos avançados.',
    troca:'Diário até estabilização. Prata: 24–48h. TPN: conforme protocolo institucional.',
    naoFazer:['Tentar desbridar cortante sem capacitação','Usar álcool ou água oxigenada no leito','Ignorar febre + leucocitose + osso exposto = osteomielite — acionar médico URGENTE'],
    dica:'LPP 4 com osso exposto é evento sentinela. Aciona médico, EMTN, fotografa e registra tudo. O papel da enfermagem aqui é manter o leito limpo, documentar evolução e nunca deixar a ferida secar.' },

  { id:'lppnc', cat:'LPP', icon:'🟤', title:'LPP Não Classificável', sub:'Profundidade indeterminada — escara cobre o leito',
    desc:'Leito totalmente coberto por esfacelo e/ou escara — não é possível estadiar sem visualizar o fundo. Pode ser qualquer estágio embaixo.',
    exsudato:'Variável — escara seca não tem exsudato',
    cobertura:'Escara ESTÁVEL e SECA (calcanhar sem sinais de infecção): NÃO desbridar — proteger com espuma sem pressão. Escara/esfacelo MOLE: hidrogel + cobertura secundária para desbridamento autolítico.',
    alternativas:['Colagenase para desbridamento enzimático (prescrição médica)','PHMB se colonização crítica'],
    aplicar:'Escara seca aderida: limpar bordas, proteger com espuma sem comprimir. Esfacelo/escara mole: hidrogel amorfo direto no leito, cobrir com filme ou espuma. Aguardar amolecimento.',
    troca:'Escara seca: 3–5 dias. Hidrogel: 24–48h.',
    naoFazer:['Desbridar escara seca de calcanhar — risco de gangrena','Usar hidrogel em escara com sinais de infecção sistêmica','Classificar estágio sem ver o leito'],
    dica:'Escara seca e estável no calcanhar com bordas fixas = deixa quieta. Qualquer flutuação, odor ou eritema perilesional = comunicar médico. O erro é desbridar o que deveria ser protegido.' },

  { id:'fclimpa', cat:'Cirúrgica', icon:'🟢', title:'Ferida Cirúrgica Limpa', sub:'Cicatrização por 1ª intenção — sem sinais de infecção',
    desc:'Ferida operatória fechada por sutura, grampos ou cola cirúrgica. Bordas aproximadas, sem sinais flogísticos. Mínima secreção sero-sanguinolenta nas primeiras 24h é normal.',
    exsudato:'Nenhum a mínimo',
    cobertura:'Curativo seco estéril (gaze + micropore) ou curativo não aderente (Mepore, Cosmopor). Pode usar película semipermeável transparente para visualização.',
    alternativas:['Espuma fina não aderente','Curativo bacteriostático com PHMB (pós-op contaminado)'],
    aplicar:'Limpar com clorexidina aquosa 0,5% ou SF 0,9°. Secar. Cobrir com margem de 2 cm. Em muitos protocolos: manter fechado 24–48h e depois expor.',
    troca:'24–48h após cirurgia. Depois: manter exposta se limpa e seca. Trocar se saturada ou deslocada.',
    naoFazer:['Usar álcool na ferida cicatrizada — resseca e agride','Trocar desnecessariamente — cada troca é risco de contaminação','Molhar antes de 48h sem orientação do cirurgião'],
    dica:'Ferida cirúrgica limpa quer paz para cicatrizar. Menos manipulação, menos troca. O curativo protege — quem cura é o organismo do paciente. Desnecessário não é cuidado, é risco.' },

  { id:'finfect', cat:'Cirúrgica', icon:'🟡', title:'Ferida Cirúrgica Infectada', sub:'ISC — Infecção de Sítio Cirúrgico',
    desc:'Calor, rubor, edema, dor e secreção purulenta. Pode haver deiscência parcial. ISC superficial (até 30 dias) ou profunda (envolve fascia/músculo).',
    exsudato:'Moderado a abundante — purulento ou seropurulento',
    cobertura:'PHMB (polibiguanida) ou alginato de prata (Silvercel) para ferida aberta. Espuma de prata como secundária. Carvão ativado + prata se odor intenso.',
    alternativas:['DACC para biofilme','Curativo de iodofórmio em cavidades profundas (protocolo institucional)'],
    aplicar:'Irrigar com SF 0,9° sob pressão. Coletar cultura ANTES do antibiótico se possível. Aplicar cobertura antimicrobiana de contato. Cobertura secundária absorvente.',
    troca:'Diário ou 24–48h conforme exsudato e cobertura.',
    naoFazer:['Usar PVP-I no leito — citotóxico','Fechar ferida infectada — risco de abscesso','Subestimar infecção local: febre + leucocitose = pode ser sistêmico'],
    dica:'ISC: SEMPRE cultura antes do antibiótico — é a regra de ouro. Ferida infectada aberta não fecha. O tratamento é limpar, antimicrobiano tópico e, se necessário, antibiótico sistêmico. Fechar antes da hora é retroceder.' },

  { id:'fdeiscente', cat:'Cirúrgica', icon:'⚠️', title:'Deiscência de Ferida Cirúrgica', sub:'Abertura parcial ou total da incisão',
    desc:'Abertura da ferida sem necessariamente infecção. Pode ser superficial (só pele) ou profunda (fascia). Deiscência abdominal com alças = emergência cirúrgica.',
    exsudato:'Variável — seroso a sero-sanguinolento',
    cobertura:'Deiscência superficial limpa: gaze embebida em SF 0,9° (ambiente úmido) ou hidrogel. Deiscência profunda: TPN/VAC se indicado ou alginato + espuma. EVISCERAÇÃO: compressa úmida + emergência.',
    alternativas:['Espuma não aderente úmida (Mepitel)','TPN para fechamento secundário (prescrição médica)'],
    aplicar:'Nunca forçar reaproximação das bordas. Limpeza delicada. Manter leito úmido. Medir extensão e profundidade. Documentar com foto.',
    troca:'Diário ou a cada 12h em deiscências com exsudato alto.',
    naoFazer:['Tentar suturar no leito sem cirurgião','Deixar ferida profunda secar','EVISCERAÇÃO: nunca reintroduzir alças — compressa úmida + decúbito semifowler + acionar cirurgião IMEDIATAMENTE'],
    dica:'Evisceração abdominal = emergência cirúrgica. Cobre com compressa úmida, semifowler, não deixa o paciente se mover e chama o cirurgião. Calma, clareza e ação rápida — exatamente o que você sabe fazer.' },

  { id:'q1', cat:'Queimadura', icon:'🟡', title:'Queimadura 1° Grau', sub:'Eritema — epiderme íntegra, sem flictenas',
    desc:'Atinge apenas epiderme. Pele hiperemiada, dolorosa, sem bolhas. Cicatriza em 3–5 dias sem sequelas.',
    exsudato:'Nenhum',
    cobertura:'Hidratante com aloe vera ou emoliente. Não necessita curativo oclusivo.',
    alternativas:['Película semipermeável se área exposta a atrito','Compressa fria com SF nas primeiras horas'],
    aplicar:'Resfriar com água corrente morna (15°C por 20 min) IMEDIATAMENTE. Não aplicar manteiga, pasta dental ou óleos. Hidratante após resfriamento completo.',
    troca:'Hidratação 2–3× ao dia até resolução.',
    naoFazer:['Aplicar gelo direto — vasoconstrição piora a lesão','Manteiga, creme dental — retêm calor e contaminam','Romper flictenas se surgirem (pode reclassificar para 2°)'],
    dica:'Os primeiros 20 minutos fazem toda a diferença: água morna corrente reduz a profundidade da lesão. Não gelada, não fria — morna. Isso está no protocolo e salva tecido.' },

  { id:'q2s', cat:'Queimadura', icon:'🟠', title:'Queimadura 2° Grau Superficial', sub:'Flictenas — derme superficial, muito dolorosa',
    desc:'Atinge epiderme e derme superficial. Flictenas com base rosada úmida e brilhante, extremamente dolorosa. Cicatriza em 14–21 dias.',
    exsudato:'Moderado — seroso',
    cobertura:'Silicone não aderente (Mepitel One, Urgotul) + espuma de poliuretano. Ou sulfadiazina de prata 1% + gaze vaselinada.',
    alternativas:['Alginato se exsudato muito alto','Hidrocoloide em lesões rasas com pouco exsudato'],
    aplicar:'Lavar com SF 0,9° ou água e sabão neutro. Flictena ÍNTEGRA: não romper — proteger com silicone + espuma. Flictena ROTA: desbridar borda frouxa com tesoura, limpar leito, aplicar silicone não aderente.',
    troca:'Sulfadiazina de prata: 24h. Silicone + espuma: 3–7 dias (menor trauma). Trocar se saturado.',
    naoFazer:['Arrancar curativo seco — sempre umedecer antes','Romper flictenas íntegras sem necessidade','Usar álcool ou PVP-I no leito'],
    dica:'O maior erro na queimadura de 2° é a troca de curativo sem proteção. Silicone de contato muda tudo: menos dor, menos trauma, menos sangramento. E sempre: analgesia ANTES do curativo — não depois.' },

  { id:'q2p', cat:'Queimadura', icon:'🔴', title:'Queimadura 2° Grau Profunda', sub:'Derme profunda — pouco dolorosa, risco de sequela',
    desc:'Atinge toda a derme. Base pálida, seca, pouco dolorosa (nervos comprometidos). Risco alto de cicatrização com sequela e retração. Pode necessitar de enxertia.',
    exsudato:'Mínimo a nenhum',
    cobertura:'Sulfadiazina de prata 1% (padrão ouro hospitalar) + gaze não aderente. Prata nanocristalina (Acticoat). Avaliar enxertia precoce com cirurgião.',
    alternativas:['Espuma de prata','Xenoenxerto temporário se disponível'],
    aplicar:'Limpeza com SF 0,9°. Desbridamento de tecido desvitalizado. Sulfadiazina em camada generosa. Enfaixamento compressivo suave. Acionar cirurgião para avaliação de enxertia.',
    troca:'Sulfadiazina: 24h. Acticoat: 3–7 dias (molhar com água estéril a cada 12h para ativar prata).',
    naoFazer:['Atrasar referência para centro de queimados se >10% SCQ','Deixar o leito secar — manter ambiente úmido','Subestimar pela pouca dor — é sinal de gravidade, não melhora'],
    dica:'Queimadura 2° profunda que não dói é mais grave que a que dói. Os nervos foram destruídos. Face, mãos, pés, genitália e articulações = sempre encaminhar para centro especializado. Documente a SCQ (regra dos 9).' },

  { id:'uvenosa', cat:'Vascular', icon:'🔵', title:'Úlcera Venosa', sub:'Maléolo medial — insuficiência venosa crônica',
    desc:'Localização típica: maléolo medial. Leito com esfacelo ou granulação, bordas irregulares, exsudato abundante, edema perimaleolar. Dermatite ocre e lipodermatoesclerose na pele perilesional.',
    exsudato:'Abundante — seroso ou seropurulento',
    cobertura:'Espuma de alta absorção + compressão (bota de Unna ou bandagem multicamadas). A COMPRESSÃO é o tratamento, não o curativo isolado.',
    alternativas:['Alginato + espuma se exsudato muito alto','PHMB se colonização crítica','Hidrofibra de prata (Aquacel Ag) se infecção'],
    aplicar:'Limpar com SF 0,9°. Protetor cutâneo nas bordas (Cavilon, pasta de óxido de zinco). Cobertura de alta absorção. BOTA DE UNNA ou compressão multicamadas — essencial para reduzir o edema e tratar a causa.',
    troca:'Bota de Unna: 1–2× por semana. Curativo simples: diário a cada 2 dias conforme exsudato.',
    naoFazer:['Compressão sem ABI ≥ 0,8 confirmado — contraindicado se arterial','Deixar sem compressão — é a terapia principal','Produtos que maceram a pele perilesional'],
    dica:'Úlcera venosa sem compressão é ferida sem tratamento. O curativo é coadjuvante — o protagonista é a compressão. Mas antes de aplicar: verificar pulso pedioso e tibial posterior. Compressão em úlcera arterial = isquemia.' },

  { id:'uarterial', cat:'Vascular', icon:'🔴', title:'Úlcera Arterial', sub:'Pododáctilos / calcanhar — insuficiência arterial',
    desc:'Localização: pododáctilos, calcanhar, maléolo lateral. Leito pálido ou necrótico, bordas bem definidas ("punch-out"). Dor intensa em repouso. Pele fria, sem pelos, palidez à elevação do membro.',
    exsudato:'Mínimo',
    cobertura:'Curativo não aderente úmido (Mepitel, Urgotul) + cobertura seca protetora. Escara seca e estável: manter seco SEM desbridar. NÃO usar compressão.',
    alternativas:['Hidrogel se desbridamento autolítico indicado pelo médico','Espuma fina não compressiva'],
    aplicar:'Limpeza delicada com SF 0,9°. Curativo de baixa aderência. Proteção sem qualquer compressão. Encaminhar urgente para cirurgia vascular (revascularização = tratamento definitivo).',
    troca:'Diário a cada 2 dias. Mínima manipulação.',
    naoFazer:['NUNCA usar compressão — agrava isquemia e pode causar amputação','Desbridar escara seca sem revascularização prévia','Elevar MMII — piora a perfusão arterial'],
    dica:'Úlcera arterial é emergência vascular. O curativo mantém protegida, mas o tratamento é revascularização. Escara seca e aderida no calcanhar: não mexe. Flutuação, odor ou eritema perilesional = médico urgente.' },

  { id:'pdiabet', cat:'Vascular', icon:'🟡', title:'Pé Diabético', sub:'Neuropático, isquêmico ou misto',
    desc:'Neuropático: plantar, indolor, hiperqueratose. Isquêmico: dedos/calcanhar, doloroso, leito pálido. Classificação de Wagner (0–5) orienta a conduta.',
    exsudato:'Variável — leve a abundante',
    cobertura:'Wagner 1–2 sem infecção: cobertura não aderente + espuma. Com infecção: PHMB ou prata. Wagner 3+: internação + antibiótico sistêmico + equipe multidisciplinar.',
    alternativas:['Alginato de prata se infecção + exsudato alto','TPN em feridas profundas pós-desbridamento'],
    aplicar:'Desbridamento de calosidades ao redor. Limpeza com SF 0,9°. Cobertura adequada ao exsudato. DESCARGA DE PRESSÃO obrigatória (bota de contato total ou sandália ortopédica).',
    troca:'Diário a cada 2 dias dependendo do exsudato e da infecção.',
    naoFazer:['Aquecer pé neuropático com bolsa quente — sem sensação, queima sem perceber','Cortar calos/unhas sem treinamento específico','Ignorar odor fétido — sinal de infecção anaeróbica grave'],
    dica:'Descarga de pressão salva o pé — sem tirar o peso, o melhor curativo do mundo não funciona. E checar glicemia: ferida que não cicatriza com glicemia descontrolada é batalha perdida. Controle metabólico é parte do curativo.' },

  { id:'necroseseca', cat:'Complexa', icon:'⚫', title:'Necrose Seca (Escara)', sub:'Tecido desvitalizado desidratado — protocolo específico',
    desc:'Tecido escuro, duro, ressecado, aderido ao leito. Pode ocorrer em LPP, úlceras vasculares e queimaduras. Escara estável funciona como barreira biológica temporária.',
    exsudato:'Nenhum',
    cobertura:'ESTÁVEL (bordas fixas, sem sinais de infecção): não desbridar — espuma não aderente SEM pressão. INSTÁVEL (flutuante, odor, eritema perilesional): hidrogel + cobertura secundária para amolecimento.',
    alternativas:['Película semipermeável para proteger escara estável','Colagenase para desbridamento enzimático (prescrição médica)'],
    aplicar:'Escara estável: limpar bordas sem comprimir. Proteger com espuma. Escara instável: hidrogel amorfo direto no leito + filme ou espuma para criar ambiente úmido e amolecer gradualmente.',
    troca:'Escara estável: 3–5 dias. Hidrogel: 24–48h.',
    naoFazer:['Desbridar escara estável de calcanhar — risco de infecção e isquemia','Forçar retirada da escara durante a troca','Hidrogel em escara com sinais de infecção sistêmica'],
    dica:'Regra de ouro: escara seca e estável no calcanhar = deixa quieta. Qualquer coisa diferente — cheiro, flutuação, eritema — é sinal de infecção embaixo. Avaliação médica urgente. O erro é desbridar o que deveria ser protegido.' },

  { id:'esfacelo', cat:'Complexa', icon:'🟡', title:'Ferida com Esfacelo', sub:'Tecido desvitalizado úmido — desbridamento necessário',
    desc:'Tecido amarelo, bege, cinza ou viscoso no leito. Esfacelo (fibrina/biofilme) impede a cicatrização e serve como meio de cultura para bactérias. Remoção é obrigatória.',
    exsudato:'Moderado a abundante',
    cobertura:'Hidrogel para desbridamento autolítico (amolece o esfacelo). Hidrofibra de prata (Aquacel Ag) se colonização crítica. PHMB se biofilme suspeito. Mel medicinal (Medihoney) como opção antibacteriana e desbridante.',
    alternativas:['Colagenase para esfacelo espesso (prescrição médica)','Desbridamento cortante por profissional capacitado'],
    aplicar:'Irrigação com SF 0,9° sob pressão. Hidrogel em camada generosa cobrindo todo o esfacelo. Cobertura secundária oclusiva (espuma ou filme) para manter a umidade.',
    troca:'Hidrogel: 24–48h. Hidrofibra: 24–48h. Reavaliar o leito a cada troca.',
    naoFazer:['Confundir esfacelo com pus — esfacelo adere ao leito, pus é mais líquido e livre','Gaze seca no leito — adere e traumatiza na retirada','PVP-I no leito com esfacelo — citotóxico e ineficaz para biofilme'],
    dica:'Hidrogel + oclusão = desbridamento autolítico suave e eficaz. Se em 5–7 dias o esfacelo não reduzir, reavaliar com médico para desbridamento cortante ou enzimático. Paciência e constância fazem o leito.' },

  { id:'hipergran', cat:'Complexa', icon:'🔴', title:'Hipergranulação', sub:'Granulação excessiva que ultrapassa o nível da pele',
    desc:'Tecido avermelhado, esponjoso, friável, que ultrapassa o nível da pele e sangra facilmente. Impede a epitelização. Causas: oclusão excessiva, pressão, infecção, corpo estranho.',
    exsudato:'Moderado — sero-sanguinolento',
    cobertura:'Curativo de prata (Acticoat, Mepilex Ag) — reduz a granulação excessiva. Espuma de poliuretano com compressão suave.',
    alternativas:['Nitrato de prata em bastão — cauterização pontual (protocolo médico)','Corticoide tópico em curta duração (prescrição médica)'],
    aplicar:'Limpar com SF 0,9°. Aplicar cobertura de prata diretamente sobre o tecido hipergranulado. Curativo compressivo suave por cima. Reavaliar em 48–72h.',
    troca:'48–72h. Monitorar redução progressiva do tecido excessivo.',
    naoFazer:['Tentar remover mecanicamente sem indicação','Coberturas oclusivas que estimulem mais granulação','Ignorar — hipergranulação impede o fechamento'],
    dica:'Hipergranulação frequentemente aparece quando o curativo ocluiu demais por tempo demais. Prata tópica resolve na maioria em 7–14 dias. Se não reduzir, avaliar com médico para cauterização com nitrato de prata.' },
];
