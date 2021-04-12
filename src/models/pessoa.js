export const cidadeMunicipioId = dados => dados?.cidadeId || dados?.municipio_id || 0;

export const infoPessoal = dados => ({
  nomeCompleto: dados?.nomeCompleto || '',
  email: dados?.email || '',
  telefone: dados?.telefone || '',
  cpf: dados?.cpf || '',
  cidadeId: parseInt(cidadeMunicipioId(dados), 10),
  cidade: dados?.cidade || ''
});

export const infoProfissional = dados => ({
  categoriaProfissional: dados?.categoriaProfissional || '',
  especialidades: dados?.especialidades || [],
  unidadeServico: dados?.unidadeServico || [],
});

export const infoSenha = () => ({
  senha: '',
  confirmarSenha: ''
});

const Pessoa = dados => ({
  idKeycloak: dados?.id_keycloak || dados?.idKeycloak,
  ...infoPessoal(dados),
  ...infoProfissional(dados),
  ...infoSenha()
});

export default Pessoa;
