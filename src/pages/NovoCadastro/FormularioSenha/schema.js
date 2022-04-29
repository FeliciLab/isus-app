import * as yup from 'yup';

const schema = yup.object({
  password: yup
    .string()
    .required('Campo obrigatório')
    .min(8, 'A sua senha deve ter pelo menos 8 caracteres.'),
  confirmPassword: yup
    .string()
    .required('Campo obrigatório')
    .min(8, 'A sua senha deve ter pelo menos 8 caracteres.')
    .oneOf([yup.ref('password'), null], 'As senhas não são iguais.'),
});

export default schema;
