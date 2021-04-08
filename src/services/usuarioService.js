import { atualizarUsuarioApi } from '../apis/apiCadastro';

const tratarDadosUsuario = form => ({
  ...form,
  cpf: form.cpf.replace(/\D/g, ''),
  telefone: form.telefone.replace(/\D/g, ''),
  especialidades: JSON.stringify(
    Object.keys(form?.especialidades || {})
      .filter(key => form.especialidades[key])
      .map((especialidade) => {
        const id = form._hidden.especialidades.find(item => item.nome === especialidade)?.id;
        return {
          id,
          nome: especialidade
        };
      })
  ),
  unidadeServico: JSON.stringify(
    Object.keys(form.unidadeServico)
      .filter(key => form.unidadeServico[key])
      .map((unidade) => {
        const id = form._hidden.unidadesDeServicos.find(item => item.nome === unidade)?.id;
        return {
          id,
          nome: unidade
        };
      })
  ),
  categoriaProfissional: JSON.stringify(
    form._hidden.categoriasProfissionais
      .find(categoria => categoria.id === form.categoriaProfissional)
  ),
  cidade: form._hidden.municipios.find(municipio => municipio.id === form.cidadeId)?.nome,
  termos: true
});

export const atualizarUsuario = async (dados) => {
  const usuario = tratarDadosUsuario(dados);
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
