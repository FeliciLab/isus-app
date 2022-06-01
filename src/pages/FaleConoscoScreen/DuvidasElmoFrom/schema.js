import * as yup from 'yup';

const schema = yup.object({
  duvida: yup.string().required('Campo obrigatório'),
  email: yup
    .string()
    .required('Campo obrigatório')
    .email('Email inválido'),
});

export default schema;
