import * as yup from 'yup';

const schema = yup.object({
  descricao: yup.string().required('Campo obrigatório'),
  unidadeDeSaude: yup.string().required('Campo obrigatório'),
  email: yup.string().email('Email inválido'),
});

export default schema;
