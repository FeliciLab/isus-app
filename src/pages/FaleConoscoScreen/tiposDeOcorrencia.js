const ALERTA_FALTA_EPI = {
  feedback: 'Seu alerta',
  header: 'Alerta de falta de EPI',
  textoDoDropdown: 'Alerta de falta de EPI'
};
const RELATAR_SUGESTAO = {
  feedback: 'Sua sugestão',
  header: 'Relatar sugestão',
  textoDoDropdown: 'Relatar sugestão (iSUS)'
};
const RELATAR_PROBLEMA = {
  feedback: 'Seu problema',
  header: 'Relatar problema',
  textoDoDropdown: 'Relatar problema (iSUS)'
};

const tiposDeOcorrenciaDropdown = {
  'Relatar problema (iSUS)': RELATAR_PROBLEMA,
  'Relatar sugestão (iSUS)': RELATAR_SUGESTAO,
  'Alerta de falta de EPI': ALERTA_FALTA_EPI
};

export {
  ALERTA_FALTA_EPI, RELATAR_SUGESTAO, RELATAR_PROBLEMA, tiposDeOcorrenciaDropdown
};
