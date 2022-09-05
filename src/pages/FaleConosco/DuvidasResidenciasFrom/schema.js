import * as yup from 'yup';

const schema = yup.object({
  assuntoSelectedId: yup.string().required('Campo obrigatório'),
  mensagem: yup.string().required('Campo obrigatório'),
  curso: yup.string().required('Campo obrigatório'),
  email: yup
    .string()
    .required('Campo obrigatório')
    .email('Digite um formato válido de e-mail'),
});

export default schema;
