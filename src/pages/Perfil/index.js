import React, {
  useLayoutEffect, useCallback, useContext
} from 'react';
import {
  View, TouchableOpacity, StyleSheet, ScrollView,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Feature } from '@paralleldrive/react-feature-toggles';
import CabecalhoPerfil from './cabecalhoPerfil';
import MenuPerfil from './Menus/menuPerfil';
import MenuPerfilItem from './Menus/menuPerfilItem';
import { logout } from '../../apis/apiKeycloak';
import {
  pegarTokenDoUsuarioNoStorage,
  excluirTokenDoUsuarioNoStorage,
  pegarEstadoLogadoArmazenado,
  armazenarEstadoLogado
} from '../../services/autenticacao';
import { DadosUsuario, DadosUsuarioProfissional } from './DadosUsuario';
import { perfilUsuario } from '../../apis/apiCadastro';
import BarraDeStatus from '../../components/barraDeStatus';
import { salvarDados } from '../../services/armazenamento';
import features from '../../constantes/features';
import { CaixaDialogoContext } from '../../context/CaixaDialogoContext';
import { AutenticacaoContext } from '../../context/AutenticacaoContext';

export default function PerfilScreen() {
  const {
    dadosUsuario,
    alterarDadosUsuario,
    tokenUsuario,
    alterarTokenUsuario,
    alterarEstaLogado,
    alterarPessoa
  } = useContext(AutenticacaoContext);

  const { mostrarCaixaDialogo, fecharCaixaDialogo } = useContext(CaixaDialogoContext);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      async function pegarTokenUsuario() {
        const logado = await pegarEstadoLogadoArmazenado();
        if (!logado) return;

        const token = await pegarTokenDoUsuarioNoStorage();
        alterarTokenUsuario(token);
        try {
          const perfil = await perfilUsuario();
          alterarDadosUsuario(perfil.data);
          salvarDados('perfil', perfil.data);
        } catch (err) {
          console.log('ERRO', err);
        }
      }
      pegarTokenUsuario();
    }, [])
  );

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

  const abrirCaixaDialogo = async () => {
    const atributosCaixaDialogo = {
      titulo: '',
      texto: 'Tem certeza que deseja excluir a sua conta? Ao removê-la, os seus dados serão apagados e você perderá o acesso ao iSUS e a todos os serviços vinculados ao ID Saúde.',
      cor: '#FF9800',
      textoConclusao: 'Excluir',
      textoCancelamento: 'Voltar',
      aoConcluir: () => {
        fecharCaixaDialogo(); navigation.navigate('EXCLUIR_PERFIL');
      },
      aoCancelar: () => { fecharCaixaDialogo(); }
    };

    mostrarCaixaDialogo(atributosCaixaDialogo);
  };

  const abrirCaixaDialogoSair = async () => {
    const atributosCaixaDialogo = {
      titulo: 'Deseja realmente sair?',
      texto: 'Será necessário efetuar login novamente para acessar serviços e conteúdos personalizados.',
      cor: '#FF9800',
      textoConclusao: 'SIM',
      textoCancelamento: 'NÃO',
      aoConcluir: () => {
        fecharCaixaDialogo(); realizarLogout();
      },
      aoCancelar: () => { fecharCaixaDialogo(); }
    };

    mostrarCaixaDialogo(atributosCaixaDialogo);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#FFF',
        elevation: 0,
        shadowOpacity: 0
      },
      headerTintColor: '#000',
      headerTitleAlign: 'center',
      headerTitle: 'Perfil',
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="arrow-left" size={28} color="#4CAF50" />
        </TouchableOpacity>
      )
    });
  });

  return (
    <>
      <BarraDeStatus backgroundColor="#ffffff" barStyle="dark-content" />
      <ScrollView style={{ backgroundColor: '#FFF' }}>
        <View style={estilos.margem}>
          <CabecalhoPerfil nome={dadosUsuario.name} />
          <MenuPerfil titulo="Informações pessoais">
            <DadosUsuario dados={dadosUsuario} />
          </MenuPerfil>
          <MenuPerfil titulo="Informações profissionais">
            <DadosUsuarioProfissional dados={dadosUsuario} />
          </MenuPerfil>
          <MenuPerfil titulo="Privacidade">
            <MenuPerfilItem icone="clipboard-text" titulo="Termos de uso" onPress={() => navigation.navigate('TERMOS_DE_USO')} />
          </MenuPerfil>
          <MenuPerfil titulo="Preferências">
            <Feature
              name={features.CONFIRMACAO_AO_SAIR}
              activeComponent={() => (<MenuPerfilItem icone="exit-to-app" titulo="Sair" onPress={() => abrirCaixaDialogoSair()} />)}
              inactiveComponent={() => (<MenuPerfilItem icone="exit-to-app" titulo="Sair" onPress={() => realizarLogout()} />)}
            />
            <Feature
              name={features.EXCLUSAO_USUARIO}
              activeComponent={() => (
              <MenuPerfilItem
                icone="delete-forever"
                titulo="Excluir Conta"
                onPress={() => { abrirCaixaDialogo(); }}
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
    flexDirection: 'column'
  },
  espacamento: {
    marginLeft: 20,
    marginBottom: 10
  },
  espaco_voltar: {
    marginRight: 15
  }
});
