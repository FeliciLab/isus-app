const ALERTA_FALTA_EPI = {
  feedback: 'Seu alerta foi enviado',
  header: 'Alerta de falta de EPI',
  textoDoDropdown: 'Alerta de falta de EPI'
};
const RELATAR_SUGESTAO = {
  feedback: 'Sua sugestão foi enviada',
  header: 'Relatar sugestão',
  textoDoDropdown: 'Relatar sugestão (iSUS)'
};
const RELATAR_PROBLEMA = {
  feedback: 'Seu problema foi enviado',
  header: 'Relatar problema',
  textoDoDropdown: 'Relatar problema (iSUS)'
};
const DEMANDA_EDUCACAO = {
  feedback: 'Sua demanda foi enviado',
  header: 'Demanda por Educação Permanente',
  textoDoDropdown: 'Demanda por Educação Permanente'
};

const tiposDeOcorrenciaDropdown = {
  'Relatar problema (iSUS)': RELATAR_PROBLEMA,
  'Relatar sugestão (iSUS)': RELATAR_SUGESTAO,
  'Alerta de falta de EPI': ALERTA_FALTA_EPI,
  'Demanda por Educação Permanente': DEMANDA_EDUCACAO
};

export {
  ALERTA_FALTA_EPI, RELATAR_SUGESTAO, RELATAR_PROBLEMA, DEMANDA_EDUCACAO, tiposDeOcorrenciaDropdown
};
