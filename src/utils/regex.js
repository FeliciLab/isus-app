// TODO: Remover esse arquivo
// Justificativa: não está claro o uso desse regex, mas percebemos que ele é usado para validar
// emails.
// Porém, essa validação já é feita pelo yup.

/* eslint-disable no-useless-escape */
const Regex = {
  EMAIL: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  NOME: /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
};

export default Regex;
