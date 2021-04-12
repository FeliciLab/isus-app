import React, { useContext, useEffect, useState } from 'react';
import { pegarListaDeServicos } from '../../apis/apiKeycloak';
import FormCheckBoxList from '../FormLayoutContexts/FormCheckBoxList';
import FormContext from '../../context/FormContext';

const InputSetores = () => {
  const [data, setData] = useState([]);
  const { setValue, register } = useContext(FormContext);

  const handleEffect = () => {
    pegarListaDeServicos()
      .then((result) => {
        setData(result.map(item => ({ label: item.nome, value: item.nome })));
        register('_hidden.unidadesDeServicos');
        setValue('_hidden.unidadesDeServicos', result);
      });
  };

  useEffect(() => {
    handleEffect();
  }, []);

  return (
    <FormCheckBoxList
      name="unidadeServico"
      label="Em que setor você está atuando?"
      data={data}
      rules={{}}
    />
  );
};

export default InputSetores;
