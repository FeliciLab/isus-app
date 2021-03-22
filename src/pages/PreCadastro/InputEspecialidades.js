import React, { useState, useEffect } from 'react';
import FormCheckBoxList from '../../components/FormLayoutContexts/FormCheckBoxList';
import { pegarListaDeEspecialidades } from '../../apis/apiKeycloak';

const InputEspecialidades = () => {
  const [data, setData] = useState([]);

  const handleEffect = () => {
    pegarListaDeEspecialidades(1) // TODO remover o id, usar a categoria escolhida para isso
      .then(result => setData(result.map(item => ({ label: item.nome, value: item.nome }))));
  };

  useEffect(() => {
    handleEffect();
  }, []);

  return (
    <FormCheckBoxList
      name="especialidades"
      label="Qual é a sua especialidade?"
      data={data}
      rules={{}}
    />
  );
};

export default InputEspecialidades;
