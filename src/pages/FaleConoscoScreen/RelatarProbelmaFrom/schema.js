import * as yup from 'yup';

const schema = yup.object({
  motivo: yup.string().required('Campo obrigatório'),
  email: yup.string().email('Email inválido'),
});

export default schema;
