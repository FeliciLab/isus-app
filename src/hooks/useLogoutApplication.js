import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { CaixaDialogoContext } from '~/context/CaixaDialogoContext';
import useAutenticacao from './useAutenticacao';

function useLogoutApplication() {
  const navigation = useNavigation();

  const { mostrarCaixaDialogo, fecharCaixaDialogo } = useContext(
    CaixaDialogoContext,
  );

  const {
    alterarPessoa,
    setUser,
    signOut,
    setAutenticacaoLoading,
  } = useAutenticacao();

  const realizarLogout = async () => {
    try {
      setAutenticacaoLoading(true);
      await signOut();
    } catch (err) {
      console.log('erro', err);
    } finally {
      setAutenticacaoLoading(false);
    }

    await alterarPessoa({});
    setUser(null);
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
