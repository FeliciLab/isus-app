const ALERTA_FALTA_EPI = {
  feedback: 'Seu alerta foi enviado',
  header: 'Alerta de falta de EPI',
  textoDoDropdown: 'Alerta de falta de EPI',
};

const RELATAR_SUGESTAO = {
  feedback: 'Sua sugestão foi enviada',
  header: 'Relatar sugestão',
  textoDoDropdown: 'Relatar sugestão (iSUS)',
};

const RELATAR_PROBLEMA = {
  feedback: 'Seu problema foi enviado',
  header: 'Relatar problema',
  textoDoDropdown: 'Relatar problema (iSUS)',
};

const DEMANDA_EDUCACAO = {
  feedback: 'Sua demanda foi enviado',
  header: 'Demanda por Educação Permanente',
  textoDoDropdown: 'Demanda por Educação Permanente',
};

const DUVIDAS_ELMO = {
  feedback: 'Sua dúvida foi enviada',
  header: 'Dúvidas sobre o Elmo',
  textoDoDropdown: 'Dúvidas sobre o Elmo',
};

const tiposDeOcorrenciaDropdown = {
  'Relatar problema (iSUS)': RELATAR_PROBLEMA,
  'Relatar sugestão (iSUS)': RELATAR_SUGESTAO,
  'Alerta de falta de EPI': ALERTA_FALTA_EPI,
  'Demanda por Educação Permanente': DEMANDA_EDUCACAO,
  'Dúvidas sobre o Elmo': DUVIDAS_ELMO,
};

export {
  ALERTA_FALTA_EPI,
  RELATAR_SUGESTAO,
  RELATAR_PROBLEMA,
  DEMANDA_EDUCACAO,
  DUVIDAS_ELMO,
  tiposDeOcorrenciaDropdown,
};
