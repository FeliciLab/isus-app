import React, { useLayoutEffect, useState, useCallback } from 'react';
import {
  TouchableOpacity, StyleSheet
} from 'react-native';
import { useNavigation, useFocusEffect, DrawerActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BarraDeStatus from '../../components/barraDeStatus';
import LoginApp from '../../assets/icons/login/login_app.svg';
import FormularioLogin from './formulario';
import ConteudoInicial from './ConteudoInicial';
import Termos from './Termos';
import { CORES } from '../../constantes/estiloBase';
import { ConteudoImagem, SafeArea, Scroll } from './styles';

function Login({ route }) {
  const [possuiIDSaude, alterarPossuirIDSaude] = useState(route.params.possuiIDSaude);
  const navigation = useNavigation();


  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        ...estilos.header
      },
      headerTintColor: '#FFF',
      headerTitleAlign: 'center',
      headerTitle: 'ID Saúde',
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19
          }}
          onPress={() => {
            if (possuiIDSaude) {
              alterarPossuirIDSaude(false);
            } else {
              navigation.dispatch(DrawerActions.toggleDrawer());
            }
          }}
        >
          <Icon name={possuiIDSaude ? 'arrow-left' : 'menu'} size={28} color="#FFF" />
        </TouchableOpacity>
      )
    });
  });

  useFocusEffect(useCallback(() => {
    alterarPossuirIDSaude(route.params.possuiIDSaude);
  }, []));

  return (
    <>
      <BarraDeStatus barStyle="light-content" backgroundColor={CORES.AZUL} />
      <SafeArea>
        <Scroll>
          <ConteudoImagem>
            <LoginApp />
          </ConteudoImagem>
          {
            possuiIDSaude
              ? <FormularioLogin navigation={navigation} />
              : <ConteudoInicial alterarPossuirIDSaude={alterarPossuirIDSaude} />

          }
          <Termos />
        </Scroll>
      </SafeArea>
    </>
  );
}

const estilos = StyleSheet.create({
  header: {
    backgroundColor: '#304FFE',
    elevation: 0,
    shadowOpacity: 0
  }
});
export default Login;
