import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { logout } from '~/apis/apiKeycloak';
import { CaixaDialogoContext } from '~/context/CaixaDialogoContext';
import {
  armazenarEstadoLogado,
  excluirTokenDoUsuarioNoStorage,
} from '~/services/autenticacao';
import useAutenticacao from './useAutenticacao';

function useLogoutApplication() {
  const navigation = useNavigation();

  const { mostrarCaixaDialogo, fecharCaixaDialogo } = useContext(
    CaixaDialogoContext,
  );

  const { tokenUsuario, alterarEstaLogado, alterarPessoa } = useAutenticacao();

  const realizarLogout = async () => {
    try {
      await logout(tokenUsuario);
    } catch (err) {
      console.log('erro', err);
    }

    await alterarPessoa({});
    await alterarEstaLogado(false);
    await excluirTokenDoUsuarioNoStorage();
    await armazenarEstadoLogado(false);
    navigation.navigate('HOME');
  };

  const abrirCaixaDialogoSair = async () => {
    const atributosCaixaDialogo = {
      titulo: 'Deseja realmente sair?',
      texto:
        'Será necessário efetuar login novamente para acessar serviços e conteúdos personalizados.',
      cor: '#FF9800',
      textoConclusao: 'SIM',
      textoCancelamento: 'NÃO',
      aoConcluir: () => {
        fecharCaixaDialogo();
        realizarLogout();
      },
      aoCancelar: () => {
        fecharCaixaDialogo();
      },
    };

    mostrarCaixaDialogo(atributosCaixaDialogo);
  };
  return { abrirCaixaDialogoSair, realizarLogout };
}

export default useLogoutApplication;
