import * as yup from 'yup';

const schema = yup.object({
  area: yup.string().required('Campo Obrigatório'),
  especArea: yup.string(),
});

export default schema;
