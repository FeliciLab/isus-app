import {
  verificarCPFCadastrado,
  verificarEmailCadastrado,
} from '~/apis/apiCadastro';
import Regex from './regex';

export const descricaoValida = descricao => descricao.replace(/\s/g, '').length;

export const unidadeDeSaudeValida = unidadeDeSaude =>
  unidadeDeSaude.replace(/\s/g, '').length;

export const feedbackValido = feedback => feedback.replace(/\s/g, '').length;

export const emailValido = email => Regex.EMAIL.test(email.toLowerCase());

export const senhaValido = senha => senha.replace(/\s/g, '').length > 0;

export const nomeValido = nomeCompleto =>
  // eslint-disable-next-line implicit-arrow-linebreak
  Regex.NOME.test(nomeCompleto.toLowerCase());

// eslint-disable-next-line arrow-parens
export const cpfValido = cpf => {
  // Remove os pontos/traço da expressão regular, caso exista
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf === '') {
    return false;
  }

  // Elimina CPFs invalidos conhecidos
  if (
    cpf.length != 11 ||
    cpf === '00000000000' ||
    cpf === '11111111111' ||
    cpf === '22222222222' ||
    cpf === '33333333333' ||
    cpf === '44444444444' ||
    cpf === '55555555555' ||
    cpf === '66666666666' ||
    cpf === '77777777777' ||
    cpf === '88888888888' ||
    cpf === '99999999999'
  ) {
    return false;
  }

  // Valida 1o digito
  let add = 0;
  for (let i = 0; i < 9; i++) {
    add += parseInt(cpf.charAt(i)) * (10 - i);
  }

  let rev = 11 - (add % 11);
  if (rev == 10 || rev == 11) {
    rev = 0;
  }

  if (rev != parseInt(cpf.charAt(9))) {
    return false;
  }

  // Valida 2o digito
  add = 0;
  for (let i = 0; i < 10; i++) {
    add += parseInt(cpf.charAt(i)) * (11 - i);
  }

  rev = 11 - (add % 11);
  if (rev == 10 || rev == 11) {
    rev = 0;
  }

  if (rev != parseInt(cpf.charAt(10))) {
    return false;
  }

  return true;
};

export async function emailNaoCadastrado(email) {
  const resposta = await verificarEmailCadastrado(email);
  const emailExiste = resposta.data.email_existe;
  return !emailExiste;
}

export async function cpfNaoCadastrado(cpf) {
  const resposta = await verificarCPFCadastrado(cpf);
  const cpfExiste = resposta.data.cpf_existe;
  return !cpfExiste;
}

export async function cpfCadastradoIdSaude(cpf) {
  const resposta = await verificarCPFCadastrado(cpf);
  return resposta.data.cpf_existe;
}
