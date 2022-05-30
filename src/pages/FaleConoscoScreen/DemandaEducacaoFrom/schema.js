import * as yup from 'yup';

const schema = yup.object({
  situacaoAtual: yup.string().required('Campo obrigatório'),
  demanda: yup.string().required('Campo obrigatório'),
  unidadeDeSaude: yup.string().required('Campo obrigatório'),
  email: yup.string().email('Email inválido'),
});

export default schema;
