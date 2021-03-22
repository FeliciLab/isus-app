import React, { useEffect, useState } from 'react';
import FormSelect from '../../components/FormLayoutContexts/FormSelect';
import { pegarListaDeCategoriasProfissionais } from '../../apis/apiKeycloak';

const InputCategoria = () => {
  const [data, setData] = useState([]);

  const handleEffect = () => {
    pegarListaDeCategoriasProfissionais()
      .then(result => setData(result));
  };

  useEffect(handleEffect, []);

  return (
    <>
      <FormSelect
        data={data.map(m => ({ label: m.nome, value: m.id }))}
        name="categoriaProfissional"
        rules={{ required: true }}
        label="Categoria profissional"
      />
    </>
  );
};

export default InputCategoria;
