import request from '~/services/request';

/**
 * Listar as ofertas
 * @returns uma lista de ofertas que os usuários podem marcar presença
 */
export const getListOfertas = async () => {
  const response = await request.get('/esp/ofertas');
  return response.data;
};

/**
 *
 * @param {int} userId
 * @returns informações do usuário relacionadas a Oficina ESP
 */
export const getEspUserInfo = async userId => {
  const response = await request.get(`/esp/userInfo/${userId}`);
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
  const response = await request.get(`/esp/presencas/${userId}/${ofertaId}`);
  return response.data;
};

/**
 *
 * @param {int} userId id do usuário
 * @param {int} ofertaId id da oferta
 * @param {data} presenca data no formato(dd-MM-YYYY hh:mm:ss)
 * @returns
 */
export const marcarPresenca = async (userId, ofertaId, presenca) => {
  const response = await request.post(
    `/esp/presencas/${userId}/${ofertaId}`,
    presenca,
  );
  return response.data;
};

/**
 *
 * @param {int} userId id do usuário
 * @param {"area_esp": string, "area_outros": string} espUserInfo
 * @returns
 */
export const updateEspUserInfo = async (userId, espUserInfo) => {
  const response = await request.put(`/esp/userInfo/${userId}`, espUserInfo);
  return response.data;
};
