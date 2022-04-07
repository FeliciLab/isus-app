import * as yup from 'yup';

const schema = yup.object({
  email: yup
    .string()
    .email('Email inválido')
    .required('Campo obrigatório'),
  senha: yup
    .string()
    .min(8, 'Senha dever ter pelo menos 8 caracteres')
    .required('Campo obrigatório'),
});

export default schema;
