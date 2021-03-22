import React, { useEffect, useState } from 'react';
import { pegarListaDeServicos } from '../../apis/apiKeycloak';
import FormCheckBoxList from '../../components/FormLayoutContexts/FormCheckBoxList';

const InputSetores = () => {
  const [data, setData] = useState([]);

  const handleEffect = () => {
    pegarListaDeServicos()
      .then((result) => {
        setData(result.map(item => ({ label: item.nome, value: item.nome })));
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
