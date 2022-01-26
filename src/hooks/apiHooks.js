import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { pegarCategoriasArquitetura } from '../apis/apiHome';
import rotas from '../constantes/rotas';
import { pegarDados, salvarDados } from '../services/armazenamento';

// TODO: descobrir o que isso faz
const useApiHooks = () => {
  const navigation = useNavigation();
  const [categorias, setCategorias] = useState([
    {
      name: ' ',
      slug: ' ',
      term_group: 0,
      term_id: 0,
    },
  ]);

  const pegarCategorias = async route => {
    await pegarCategoriasArquitetura()
      .then(async resposta => {
        setCategorias(resposta.data[route.name]);
        salvarDados(
          `@categorias_${route.name}`,
          resposta.data[route.name],
        ).catch(console.log('Erro ao salvar categorias no storage'));
      })
      .catch(err => {
        if (err.message === 'Network Error') {
          pegarDados(`@categorias_${route.name}`)
            .then(resposta => {
              setCategorias(resposta);
            })
            .catch(
              navigation.navigate(rotas.SEM_CONEXAO, {
                goHome: true,
                componente: route.name,
              }),
            );
        }
      });
  };
  return {
    categorias,
    setCategorias,
    pegarCategorias,
  };
};

export default useApiHooks;
