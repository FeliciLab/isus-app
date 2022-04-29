import * as yup from 'yup';
import { cpfValido } from '~/utils/validadores';

const schema = yup.object({
  nomeCompleto: yup.string().required('Campo obrigatório'),
  email: yup
    .string()
    .required('Campo obrigatório')
    .email('O email deve ser no formato exemplo@exemplo.com'),
  telefone: yup
    .string()
    .required('Campo obrigatório')
    .transform(value => value.replace(/\D+/g, ''))
    .min(11, 'O telefone deve ter pelo menos 11 números'),
  cpf: yup
    .string()
    .required('Campo obrigatório')
    .transform(value => value.replace(/\D+/g, ''))
    .min(11, 'O seu CPF deve ter pelo menos 11 números')
    .test({
      name: 'cpfValido',
      test: cpfValido,
      message: 'CPF inválido',
    }),
  municipioSelectedId: yup.string().required('Campo obrigatório'),
});

export default schema;
