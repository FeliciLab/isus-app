export const formularioPessoal = {
  email: 'O email deve ser no formato exemplo@exemplo.com',
  emailExistente: 'Email já cadastrado',
  telefoneMin: 'O telefone deve ter pelo menos 11 números',
  telefoneObrigatorio: 'O campo telefone é obrigatório.',
  cpfMin: 'O seu cpf deve ter pelo menos 11 números',
  cpfInvalido: 'O CPF é inválido',
  cpfCadastrado: 'Este CPF já foi cadastrado',
};

export const formularioSenha = {
  erroTamanho: 'A sua senha deve ter pelo menos 8 caracteres.',
  erroIguais: 'As senhas não são iguais.',
};
export default {
  formularioPessoal,
  formularioSenha,
};
