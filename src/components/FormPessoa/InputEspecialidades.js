import React, { useState, useEffect } from 'react';
import FormCheckBoxList from '../FormLayoutContexts/FormCheckBoxList';
import { pegarListaDeEspecialidades } from '../../apis/apiKeycloak';

const InputEspecialidades = ({ categoria, defaultValue }) => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);

  const handleEffect = idCategoria => pegarListaDeEspecialidades(idCategoria)
    .then((result) => {
      setData(
        result.map(item => ({
          label: item.nome,
          value: JSON.stringify({ id: item.id, nome: item.nome })
        }))
      );
    });

  useEffect(() => {
    const categoriaParse = JSON.parse(categoria || '{}');
    const idCategoria = categoriaParse?.id || 0;

    if (!idCategoria || (idCategoria !== 1 && idCategoria !== 3)) {
      setData([]);
      setShow(false);
      return;
    }

    handleEffect(idCategoria).then(() => setShow(true));
  }, [categoria]);

  return (
    <>
      {show && (
        <FormCheckBoxList
          name="especialidades"
          label="Qual é a sua especialidade?"
          data={data}
          rules={{}}
          defaultValue={defaultValue}
        />
      )
      }
    </>
  );
};

export default InputEspecialidades;
