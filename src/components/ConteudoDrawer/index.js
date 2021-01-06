import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ItemDrawer from './itemDrawer';
import Heart from '../../assets/icons/isus_hor.svg';
import { pegarTokenDoUsuarioNoStorage } from '../../services/autenticacao';
import {
  DroidSafeArea
} from './styles';
import { CORES } from '../../constantes/estiloBase';
import ItemInferior from './itemInferior';

function conteudoDoDrawer(props) {
  const [tokenUsuario, alterarTokenUsuario] = useState({});
  const {
    navigation: { navigate },
    routeName
  } = props;


  pegarTokenDoUsuarioNoStorage().then(token => alterarTokenUsuario(token));

  const ItensDoDrawer = [
    {
      nome: 'Home',
      icone: <Icon name="home" size={22} color={CORES.PRETO54} />,
      rota: 'HOME'
    },
    {
      nome: 'Meu perfil',
      icone: <Icon name="account" size={22} color={CORES.PRETO54} />,
      rota: tokenUsuario ? 'PERFIL' : 'LOGIN',
    },
    {
      nome: 'Fale conosco',
      icone: <MaterialIcon name="feedback" size={22} color={CORES.PRETO54} />,
      rota: 'FEEDBACK'
    },
    {
      nome: 'SUS no Ceará',
      icone: <Icon name="help-circle" size={22} color={CORES.PRETO54} />,
      rota: 'SUS_NO_CEARA'
    }
  ];

  const RenderizaItensDoDrawer = () => ItensDoDrawer.map(item => (
    <ItemDrawer
      nome={item.nome}
      icone={item.icone}
      isFocado={routeName === item.rota}
      onPress={() => navigate(item.rota)}
    />
  ));

  return (
    <>
      <DroidSafeArea>
        <View>
          <Heart size={40} style={{ margin: 10 }} />
        </View>
        <View style={{ height: '100%', flexDirection: 'column', justifyContent: 'space-around' }}>
          <ScrollView
            {...props}
          >
            {
              RenderizaItensDoDrawer().map(Item => <>{Item}</>)
            }
          </ScrollView>
          <ItemInferior />
        </View>
      </DroidSafeArea>

      {/* View é relativa a margem de porcentagem em relação a ultima opção do drawer */}
      {/* Caso adicione um item, a margemTop deve diminuir também */}

    </>
  );
}

export default conteudoDoDrawer;
