// TODO: estamos usando o user do Autenticação
// Remover depois

const especialidade = { id: '', nome: '' };

const categoriaProfissional = { id: '', nome: '' };

const unidadeServico = { id: '', nome: '' };

const pessoaModelo = {
  termos: true,
  nomeCompleto: '',
  email: '',
  telefone: '',
  cpf: '',
  cidadeId: '',
  cidade: '',
  especialidades: [],
  categoriaProfissional: {},
  unidadeServico: [],
};

const cidadeMunicipioId = dados =>
  dados?.cidadeId || dados?.municipio_id || dados?.municipio?.id || false;

const cidadeNome = dados => dados?.cidade || dados?.municipio?.nome || '';

const nomeCompletoName = dados => dados?.nomeCompleto || dados?.name || '';

const infoPessoal = dados => ({
  nomeCompleto: nomeCompletoName(dados),
  email: dados?.email || '',
  telefone: dados?.telefone || '',
  cpf: dados?.cpf || '',
  cidadeId: parseInt(cidadeMunicipioId(dados), 10) || '',
  cidade: cidadeNome(dados),
});

const mapDadosProfissionaisKeycloakToModel = dados => {
  const result = {
    especialidades: [],
    categoriaProfissional: {
      id: dados?.profissional?.categoria_profissional?.id || '',
      nome: dados?.profissional?.categoria_profissional?.nome || '',
    },
    unidadeServico: [],
  };

  if (dados?.profissional?.especialidades) {
    result.especialidades = dados.profissional.especialidades.map(
      dadoEspecialidade => ({
        ...especialidade,
        id: dadoEspecialidade.id || '',
        nome: dadoEspecialidade.nome || '',
      }),
    );
  }

  if (dados?.profissional?.unidades_servicos) {
    result.unidadeServico = dados?.profissional?.unidades_servicos.map(
      item => ({
        ...unidadeServico,
        id: item.id || '',
        nome: item.nome || '',
      }),
    );
  }

  return result;
};

const definirFormCategoriaProfissional = (dados, formProfissional) => {
  if (formProfissional) {
    return JSON.stringify({
      id: dados?.categoriaProfissional?.id || '',
      nome: dados?.categoriaProfissional?.nome || '',
    });
  }

  return dados?.categoriaProfissional || '';
};

const definirFormEspecialidades = (dados, formProfissional) => {
  if (!formProfissional) {
    return dados?.especialidades;
  }

  return dados?.especialidades?.reduce((acc, curr) => {
    const chave = JSON.stringify({ id: curr.id, nome: curr.nome });
    if (!acc[chave]) {
      acc[chave] = true;
    }

    return acc;
  }, {});
};

const definirFormUnidadesServicos = (dados, formProfissional) => {
  if (!formProfissional) {
    return dados?.unidadeServico;
  }

  return dados?.unidadeServico?.reduce((acc, curr) => {
    const chave = JSON.stringify({
      id: curr?.id || '',
      nome: curr?.nome || '',
    });
    if (!acc[chave]) {
      acc[chave] = true;
    }

    return acc;
  }, {});
};

const infoProfissional = (dados, formProfissional) => {
  if (dados?.profissional) {
    return mapDadosProfissionaisKeycloakToModel(dados, formProfissional);
  }

  return {
    categoriaProfissional: definirFormCategoriaProfissional(
      dados,
      formProfissional,
    ),
    especialidades: definirFormEspecialidades(dados, formProfissional) || [],
    unidadeServico: definirFormUnidadesServicos(dados, formProfissional) || [],
  };
};

export const infoSenha = () => ({
  senha: '',
  confirmarSenha: '',
});

const createModel = (dados, option) => ({
  idKeycloak: dados?.id_keycloak || dados?.idKeycloak || null,
  ...infoPessoal(dados),
  ...infoProfissional(dados, option?.formProfissional),
  ...infoSenha(),
});

export default {
  criar: createModel,
  model: pessoaModelo,
  subModel: {
    especialidade,
    categoriaProfissional,
    unidadeServico,
  },
  mapInfoPessoal: infoPessoal,
  mapInfoProfissional: infoProfissional,
};
