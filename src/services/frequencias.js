import request from '~/services/request';

export const getListOgertas = async () => {
  const response =  await request.get('/sagu/ofertas');
  return response.data;
};
