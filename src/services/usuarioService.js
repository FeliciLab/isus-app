import { atualizarUsuarioApi } from '../apis/apiCadastro';

const tratarDadosPessoais = form => ({
  ...form,
  cpf: form.cpf.replace(/\D/g, ''),
  telefone: form.telefone.replace(/\D/g, ''),
  cidade: form._hidden?.municipios?.find(municipio => municipio.id === form.cidadeId)?.nome,
  termos: true
});

const tratarDadosProfissionais = form => ({
  especialidades: Object.keys(form?.especialidades || {})
    .filter(key => form.especialidades[key])
    .map((especialidade) => {
      const id = form._hidden.especialidades.find(item => item.nome === especialidade)?.id;
      return {
        id,
        nome: especialidade
      };
    }),
  unidadeServico: Object.keys(form?.unidadeServico || {})
    .filter(key => form.unidadeServico[key])
    .map((unidade) => {
      const id = form._hidden.unidadesDeServicos.find(item => item.nome === unidade)?.id;
      return {
        id,
        nome: unidade
      };
    }),
  categoriaProfissional: form._hidden?.categoriasProfissionais?.find(
    categoria => categoria.id === form.categoriaProfissional
  ) || false,
  termos: true
});


const tratarDadosUsuario = (form, options) => {
  if (options?.somentePessoais) {
    return tratarDadosPessoais(form);
  }

  if (options?.somenteProfissionais) {
    return tratarDadosProfissionais(form);
  }

  return ({
    ...tratarDadosPessoais(form),
    ...tratarDadosProfissionais(form),
    termos: true
  });
};

export const atualizarUsuario = async (dados, options) => {
  const usuario = {
    ...dados,
    ...tratarDadosUsuario(
      dados,
      options
    )
  };

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
  atualizarUsuario
};
