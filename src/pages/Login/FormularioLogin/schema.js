import * as yup from 'yup';

const schema = yup.object({
  email: yup
    .string()
    .required('Campo obrigatório')
    .email('Email inválido'),
  senha: yup
    .string()
    .required('Campo obrigatório')
    .min(8, 'Senha dever ter pelo menos 8 caracteres'),
});

export default schema;
