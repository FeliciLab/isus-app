import { useContext } from 'react';
import { CaixaDialogoContext } from '../context/CaixaDialogoContext';
import { logout } from '../apis/apiKeycloak';
import useAutenticacao from './useAutenticacao';
import { useNavigation } from '@react-navigation/native';
import {
  armazenarEstadoLogado,
  excluirTokenDoUsuarioNoStorage,
} from '../services/autenticacao';

export default function useLogoutApplication () {
  const { mostrarCaixaDialogo, fecharCaixaDialogo } = useContext(
    CaixaDialogoContext
  );

  const navigation = useNavigation();

  const {
    tokenUsuario,
    alterarEstaLogado,
    alterarPessoa
  } = useAutenticacao();

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
      }
    };

    mostrarCaixaDialogo(atributosCaixaDialogo);
  };
  return { abrirCaixaDialogoSair, realizarLogout };
}
