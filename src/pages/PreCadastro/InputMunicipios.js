import React, { useEffect, useState } from 'react';
import { getMunicipiosCeara } from '../../apis/apiCadastro';
import FormSelect from '../../components/FormLayoutContexts/FormSelect';

const InputMunicipios = () => {
  const [municipios, setMunicipios] = useState(['Município']);

  const handleEffect = () => {
    getMunicipiosCeara()
      .then(result => setMunicipios(result.data));
  };

  useEffect(handleEffect, []);

  return (
    <>
      <FormSelect
        data={municipios.map(m => ({ label: m.nome, value: m.id }))}
        name="municipio"
        rules={{ required: true }}
        label="Município"
      />
    </>
  );
};

export default InputMunicipios;
