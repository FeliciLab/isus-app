import { atualizarUsuarioApi } from '~/apis/apiCadastro';

// TODO: possivel remoção desse arquivo

const tratarDadosPessoais = form => ({
  ...form,
  cpf: form.cpf.replace(/\D/g, ''),
  telefone: form.telefone.replace(/\D/g, ''),
  cidade: form._hidden?.municipios?.find(
    municipio => municipio.id === form.cidadeId,
  )?.nome,
  termos: true,
});

const tratarDadosProfissionais = form => ({
  especialidades:
    Object.keys(form?.especialidades || {})
      .filter(key => form.especialidades[key])
      .map(item => JSON.parse(item)) || [],
  unidadeServico:
    Object.keys(form?.unidadeServico || {})
      .filter(key => form.unidadeServico[key])
      .map(item => JSON.parse(item)) || [],
  categoriaProfissional: JSON.parse(form.categoriaProfissional) || {},
  termos: true,
});

const tratarDadosUsuario = (form, options) => {
  if (options?.somentePessoais) {
    return tratarDadosPessoais(form);
  }

  if (options?.somenteProfissionais) {
    return tratarDadosProfissionais(form);
  }

  return {
    ...tratarDadosPessoais(form),
    ...tratarDadosProfissionais(form),
    termos: true,
  };
};

// TODO: remover. Isso já está senfo deito pelo useAutenticacao
export const atualizarUsuario = async (dados, options) => {
  const usuario = {
    ...dados,
    ...tratarDadosUsuario(dados, options),
  };

  // Nunca entendo essa parada de _hidden. Ass.: Ericson
  delete usuario._hidden;

  try {
    await atualizarUsuarioApi(usuario);
    return usuario;
  } catch (err) {
    console.log('Falha ao atualizar na API', err);
    return false;
  }
};

export default {
  atualizarUsuario,
};

export { tratarDadosPessoais };
