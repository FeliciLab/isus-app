import * as yup from 'yup';

const schema = yup.object({
  nomeCompleto: yup.string().required('Campo obrigatório'),
  email: yup
    .string()
    .email('Email inválido')
    .required('Campo obrigatório'),
  telefone: yup.string().required('Campo obrigatório'),
  cpf: yup.string().required('Campo obrigatório'),
  cidade: yup.string().required('Campo obrigatório'),
});

export default schema;
