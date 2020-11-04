/* eslint-disable operator-linebreak */
/* eslint-disable no-var */
/* eslint-disable no-undef */
/* eslint-disable no-plusplus */
/* eslint-disable eqeqeq */
/* eslint-disable radix */
import Regex from './regex';
import { verificarEmailCadastrado, verificarCPFCadastrado } from '../apis/apiCadastro';

export const emailValido = email => Regex.EMAIL.test(email.toLowerCase());
export const nomeValido = nomeCompleto =>
  // eslint-disable-next-line implicit-arrow-linebreak
  Regex.NOME.test(nomeCompleto.toLowerCase());

// eslint-disable-next-line arrow-parens
export const cpfValido = cpf => {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf == '') return false;
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
  let add = 0;
  for (i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
  let rev = 11 - (add % 11);
  if (rev == 10 || rev == 11) rev = 0;
  if (rev != parseInt(cpf.charAt(9))) return false;
  add = 0;
  for (i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
  rev = 11 - (add % 11);
  if (rev == 10 || rev == 11) rev = 0;
  if (rev != parseInt(cpf.charAt(10))) return false;
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
