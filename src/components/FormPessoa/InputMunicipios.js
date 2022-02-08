import React, { useContext, useEffect, useState } from 'react';
import { getMunicipiosCeara } from '~/apis/apiCadastro';
import FormContext from '~/context/FormContext';
import FormSelect from '../FormLayoutContexts/FormSelect';

const InputMunicipios = () => {
  const [municipios, setMunicipios] = useState(['Município']);

  const { setValue, register } = useContext(FormContext);

  const handleEffect = () => {
    getMunicipiosCeara().then(result => {
      setMunicipios(result.data);
      register('_hidden.municipios', result.data);
      setValue('_hidden.municipios', result.data);
    });
  };

  useEffect(handleEffect, []);

  return (
    <FormSelect
      data={municipios.map(m => ({ label: m.nome, value: m.id }))}
      name="cidadeId"
      rules={{ required: true }}
      label="Município"
    />
  );
};

export default InputMunicipios;
