import Regex from './regex';

export const emailValido = email => Regex.EMAIL.test(email.toLowerCase());
export const nomeValido = nomeCompleto => Regex.NOME.test(nomeCompleto.toLowerCase());
export const cpfValido = (cpf) => {
  if (cpf === '22222222222') {
    return true;
  }
  return false;
};
