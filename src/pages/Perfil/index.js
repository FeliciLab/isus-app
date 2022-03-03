import { Feature } from '@paralleldrive/react-feature-toggles';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useContext, useLayoutEffect } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { perfilUsuario } from '~/apis/apiCadastro';
import BarraDeStatus from '~/components/barraDeStatus';
import features from '~/constantes/features';
import rotas from '~/constantes/rotas';
import { CaixaDialogoContext } from '~/context/CaixaDialogoContext';
import useAnalytics from '~/hooks/useAnalytics';
import useAutenticacao from '~/hooks/useAutenticacao';
import useLogoutApplication from '~/hooks/useLogoutApplication';
import { ArrowLeftIcon } from '~/icons';
import { salvarDados } from '~/services/armazenamento';
import {
  pegarEstadoLogadoArmazenado,
  pegarTokenDoUsuarioNoStorage,
} from '~/services/autenticacao';
import CabecalhoPerfil from './cabecalhoPerfil';
import { DadosUsuario, DadosUsuarioProfissional } from './DadosUsuario';
import MenuPerfil from './Menus/menuPerfil';
import MenuPerfilItem from './Menus/menuPerfilItem';

export default function PerfilScreen() {
  const navigation = useNavigation();

  const { analyticsData } = useAnalytics();

  const { user, setUser, setToken, alterarPessoa } = useAutenticacao();

  const { mostrarCaixaDialogo, fecharCaixaDialogo } = useContext(
    CaixaDialogoContext,
  );
  const { abrirCaixaDialogoSair, realizarLogout } = useLogoutApplication();

  useFocusEffect(
    useCallback(() => {
      async function pegarTokenUsuario() {
        const logado = await pegarEstadoLogadoArmazenado();
        if (!logado) return;

        const token = await pegarTokenDoUsuarioNoStorage();
        await setToken(token);
        try {
          const perfil = await perfilUsuario();
          await setUser(perfil.data);
          await alterarPessoa(perfil.data);
          salvarDados('perfil', perfil.data);
        } catch (err) {
          console.log('ERRO', err);
        }
      }
      pegarTokenUsuario();
    }, []),
  );

  const abrirCaixaDialogo = async () => {
    const atributosCaixaDialogo = {
      titulo: '',
      texto:
        'Tem certeza que deseja excluir a sua conta? Ao removê-la, os seus dados serão apagados e você perderá o acesso ao iSUS e a todos os serviços vinculados ao ID Saúde.',
      cor: '#FF9800',
      textoConclusao: 'Excluir',
      textoCancelamento: 'Voltar',
      aoConcluir: () => {
        fecharCaixaDialogo();
        navigation.navigate('EXCLUIR_PERFIL');
        analyticsData(
          'solicitar_confirmacao_exclusao_conta',
          'Click',
          'Perfil',
        );
      },
      aoCancelar: () => {
        fecharCaixaDialogo();
        analyticsData('cancelar_exclusao_conta', 'Click', 'Perfil');
      },
    };

    mostrarCaixaDialogo(atributosCaixaDialogo);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#FFF',
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: '#000',
      headerTitleAlign: 'center',
      headerTitle: 'Perfil',
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19,
          }}
          onPress={() => {
            navigation.goBack();
          }}>
          <ArrowLeftIcon size={28} color="#4CAF50" />
        </TouchableOpacity>
      ),
    });
  }, []);

  if (!user) return null;

  return (
    <>
      <BarraDeStatus backgroundColor="#ffffff" barStyle="dark-content" />
      <ScrollView style={{ backgroundColor: '#FFF' }}>
        <View style={estilos.margem}>
          <CabecalhoPerfil nome={user.name} />
          <MenuPerfil titulo="Informações pessoais">
            <DadosUsuario dados={user} />
          </MenuPerfil>
          <MenuPerfil titulo="Informações profissionais">
            <DadosUsuarioProfissional dados={user} />
          </MenuPerfil>
          <MenuPerfil titulo="Privacidade">
            <MenuPerfilItem
              icone="clipboard-text"
              titulo="Termos de uso"
              onPress={() => navigation.navigate(rotas.TERMOS_DE_USO)}
            />
          </MenuPerfil>
          <MenuPerfil titulo="Preferências">
            <Feature
              name={features.CONFIRMACAO_AO_SAIR}
              activeComponent={() => (
                <MenuPerfilItem
                  icone="exit-to-app"
                  titulo="Sair"
                  onPress={() => abrirCaixaDialogoSair()}
                />
              )}
              inactiveComponent={() => (
                <MenuPerfilItem
                  icone="exit-to-app"
                  titulo="Sair"
                  onPress={() => realizarLogout()}
                />
              )}
            />
            <Feature
              name={features.EXCLUSAO_USUARIO}
              activeComponent={() => (
                <MenuPerfilItem
                  icone="delete-forever"
                  titulo="Excluir Conta"
                  onPress={() => {
                    abrirCaixaDialogo();
                  }}
                />
              )}
            />
          </MenuPerfil>
        </View>
      </ScrollView>
    </>
  );
}

const estilos = StyleSheet.create({
  margem: {
    padding: 15,
    flex: 1,
    flexDirection: 'column',
  },
  espacamento: {
    marginLeft: 20,
    marginBottom: 10,
  },
  espaco_voltar: {
    marginRight: 15,
  },
});
