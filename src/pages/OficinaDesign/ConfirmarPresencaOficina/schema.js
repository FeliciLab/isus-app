import * as yup from 'yup';

const schema = yup.object({
  isOutrosSelected: yup.
    boolean(),
  area_esp: yup
    .string()
    .required('Campo Obrigatório'),
  area_outros: yup
    .string()
    .when('isOutrosSelected', {
      is: true,
      then: yup
        .string()
        .required('Campo Obrigatório')
    })
});

export default schema;
