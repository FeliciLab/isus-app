import React, { useContext, useState, useEffect } from 'react';
import FormCheckBoxList from '../../components/FormLayoutContexts/FormCheckBoxList';
import { pegarListaDeEspecialidades } from '../../apis/apiKeycloak';
import FormContext from '../../context/FormContext';

const InputEspecialidades = ({ categoria }) => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const { setValue, register } = useContext(FormContext);

  const handleEffect = () => pegarListaDeEspecialidades(categoria)
    .then((result) => {
      setData(
        result.map(item => ({ label: item.nome, value: item.nome }))
      );

      setValue('_hidden.especialidades', result);
    });

  useEffect(() => {
    register('_hidden.especialidades');
    setValue('_hidden.especialidades', []);

    if (!categoria || (categoria !== 1 && categoria !== 3)) {
      setData([]);
      setShow(false);
      return;
    }

    handleEffect().then(() => setShow(true)).finally(() => console.log(data));
  }, [categoria]);

  return (
    <>
      {show && (
        <FormCheckBoxList
          name="especialidades"
          label="Qual é a sua especialidade?"
          data={data}
          rules={{}}
        />
      )
      }
    </>
  );
};

export default InputEspecialidades;
