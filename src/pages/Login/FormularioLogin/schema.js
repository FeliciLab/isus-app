import * as yup from 'yup';
import { cpfValido } from '~/utils/validadores';

const schema = yup.object({
  isCpf: yup.
    boolean(),
  username: yup
    .string()
    .when('isCpf', {
      is: true,
      then: yup.string()
        .test({
          name: 'cpfValido',
          test: cpfValido,
          message: 'CPF inválido',
        }),
      otherwise: yup.string()
        .email('Email inválido'),
    })
    .required('Campo obrigatório'),
  senha: yup
    .string()
    .required('Campo obrigatório')
    .min(8, 'Senha dever ter pelo menos 8 caracteres'),
});

export default schema;
