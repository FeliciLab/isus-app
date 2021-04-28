import React, { useEffect, useState } from 'react';
import { pegarListaDeServicos } from '../../apis/apiKeycloak';
import FormCheckBoxList from '../FormLayoutContexts/FormCheckBoxList';

const InputUnidadeServico = ({ defaultValue }) => {
  const [data, setData] = useState([]);

  const handleEffect = () => {
    pegarListaDeServicos()
      .then((result) => {
        setData(result.map(item => ({
          label: item.nome,
          value: JSON.stringify({
            id: item.id,
            nome: item.nome
          })
        })));
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
      defaultValue={defaultValue}
    />
  );
};
export default InputUnidadeServico;
