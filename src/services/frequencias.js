import request from '~/services/request';

/**
 * Listar as ofertas
 * @returns uma lista de ofertas que os usuários podem marcar presença
 */
export const getListOgertas = async () => {
  const response = await request.get('/sagu/ofertas');
  return response.data;
};

/**
 *
 * @param {int} userId
 * @returns informações do usuário relacionadas a residencia multiprofissional
 */
export const getSaguUserInfo = async userId => {
  const response = await request.get(`/sagu/userInfo/${userId}`);
  return response.data;
};

/**
 * Lista as presencas de um usuário
 *
 * @param {int} userId id do usuário
 * @param {int} ofertaId id da oferta
 * @returns lista de presenças do usuário daquela oferta
 */
export const getUserPresencas = async (userId, ofertaId) => {
  const response = await request.get(`/sagu/presencas/${userId}/${ofertaId}`);
  return response.data;
};

/**
 *
 * @param {int} userId id do usuário
 * @param {int} ofertaId id da oferta
 * @param {data, turno} presenca presenca a ser marcada
 * @returns
 */
export const marcarPresenca = async (userId, ofertaId, presenca) => {
  const response = await request.post(
    `/sagu/presencas/${userId}/${ofertaId}`,
    presenca,
  );
  return response.data;
};

/**
 *
 * @param {int} userId id do
 * @param {"componente": string, "programaResidencia": string, "residenciaMunicipio": "string"} saguUserInfo
 * @returns
 */
export const updateSaguUserInfo = async (userId, saguUserInfo) => {
  const response = await request.put(`/sagu/userInfo/${userId}`, saguUserInfo);
  return response.data;
};
