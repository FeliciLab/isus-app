const tratarDadosUsuario = form => ({
  ...form,
  especialidades: JSON.stringify(
    Object.keys(form.especialidades)
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

const realizarCadastroDoUsuario = async () => {
  const dados = tratarDadosCadastro(getValues());
  const resposta = await cadastrarUsuario(dados);
  return resposta.data;
};

export const atualizarUsuario = async (dados) => {
  console.log(
    'original',
    dados
  );
  const usuario = tratarDadosUsuario(dados);
  delete usuario._hidden;
  console.log(
    'tratado',
    usuario
  );
  // const usuario = tratarDadosUsuario(dados);
  // return resposta.then();
};

export default {
  atualizarUsuario
};
