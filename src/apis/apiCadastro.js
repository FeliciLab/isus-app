import request from '../services/request';

export const getMunicipiosCeara = () => request.get('/estados/6/municipios');

export const cadastrarUsuario = dadosUsuario => request.post('/user', dadosUsuario);

export const perfilUsuario = async () => {
  const result = await request.get('/perfil');
  return result?.data;
};

// TODO: remover método abaixo
export const alteraDadosDoUsuario = dadosDoUsuario => request.put('/user', dadosDoUsuario);
export const atualizarUsuarioApi = dadosDoUsuario => request.put('/user', dadosDoUsuario);

export const verificarEmailCadastrado = email => request.get(`/user/email-cadastrado/${email}`);

export const verificarCPFCadastrado = cpf => request.get(`/user/cpf-cadastrado/${cpf}`);

export const deletarUsuario = () => request.delete('/user');
