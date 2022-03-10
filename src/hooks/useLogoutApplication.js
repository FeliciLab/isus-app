import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import rotas from '~/constantes/rotas';
import { CaixaDialogoContext } from '~/context/CaixaDialogoContext';
import useAutenticacao from './useAutenticacao';

function useLogoutApplication() {
  const navigation = useNavigation();

  const { mostrarCaixaDialogo, fecharCaixaDialogo } = useContext(
    CaixaDialogoContext,
  );

  const { signOut, setAutenticacaoLoading } = useAutenticacao();

  const realizarLogout = async () => {
    try {
      setAutenticacaoLoading(true);

      await signOut();

      navigation.navigate(rotas.HOME);
    } catch (err) {
      console.log('erro', err);
    } finally {
      setAutenticacaoLoading(false);
    }
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
