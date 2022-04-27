
import * as yup from 'yup';

const schema = yup.object({
  palavra: yup
    .string()
    .required('Campo obrigatório')
    .oneOf(['EXCLUIR'], 'O campo deve ser igual a EXCLUIR'),
});

export default schema;
