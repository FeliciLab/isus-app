import * as yup from 'yup';

const schema = yup.object({
  nomeCompleto: yup.string().required('Campo obrigatório'),
  email: yup
    .string()
    .required('Campo obrigatório')
    .email('O email deve ser no formato exemplo@exemplo.com'),
  telefone: yup
    .string()
    .required('Campo obrigatório')
    .min(15, 'O telefone deve ter pelo menos 11 números'),
  municipioSelectedId: yup.string().required('Campo obrigatório'),
});

export default schema;
