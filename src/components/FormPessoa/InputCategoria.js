import React, { useContext, useEffect, useState } from 'react';
import FormSelect from '../FormLayoutContexts/FormSelect';
import { pegarListaDeCategoriasProfissionais } from '../../apis/apiKeycloak';
import FormContext from '../../context/FormContext';

const InputCategoria = () => {
  const [data, setData] = useState([]);
  const { setValue, register } = useContext(FormContext);

  const handleEffect = () => {
    pegarListaDeCategoriasProfissionais()
      .then((result) => {
        setData(result);
        register('_hidden.categoriasProfissionais');
        setValue('_hidden.categoriasProfissionais', result);
      });
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
