import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { cores } from '../../constantes/estiloBase';

const estiloCores = {
  verde: {
    corFundo: cores.verde,
    corTexto: cores.branco
  },
  roxo: {
    corFundo: cores.roxo,
    corTexto: cores.branco
  },
  branco: {
    corFundo: cores.branco,
    corTexto: cores.verde
  }
};

const TouchableSearch = ({ navegador, cor }) => (
  <TouchableOpacity
    style={{ marginHorizontal: 19 }}
    onPress={() => { navegador.navigate('Buscar'); }}
  >
    <Icon name="magnify" size={28} color={cor} />
  </TouchableOpacity>
);

const TouchableMenu = ({ navegador, cor }) => (
  <TouchableOpacity
    style={{ marginHorizontal: 19 }}
    onPress={() => {
      navegador.toggleDrawer();
    }}
  >
    <Icon name="menu" size={28} color={cor} />
  </TouchableOpacity>
);

const TouchableGoBack = ({ navegador, cor }) => (
  <TouchableOpacity
    style={{ marginHorizontal: 19 }}
    onPress={() => {
      navegador.goBack();
    }}
  >
    <Icon name="arrow-left" size={28} color={cor} />
  </TouchableOpacity>
);

const TouchableGoHome = ({ navegador, cor }) => (
  <TouchableOpacity
    style={{ marginHorizontal: 19 }}
    onPress={() => {
      navegador.navigate('HOME');
    }}
  >
    <Icon name="arrow-left" size={28} color={cor} />
  </TouchableOpacity>
);


export const cabecalhoMenuBusca = ({ navegador, titulo, cor }) => {
  navegador.setOptions({
    headerStyle: {
      backgroundColor: estiloCores[cor].corFundo,
      elevation: 0,
      shadowOpacity: 0
    },
    headerTintColor: estiloCores[cor].corTexto,
    headerTitleAlign: 'center',
    headerTitle: titulo,
    headerRight: () => <TouchableSearch navegador={navegador} cor={estiloCores[cor].corTexto} />,
    headerLeft: () => <TouchableMenu navegador={navegador} />
  });
};

export const cabecalhoMenu = ({ navegador, titulo, cor }) => {
  navegador.setOptions({
    headerStyle: {
      backgroundColor: estiloCores[cor].corFundo,
      elevation: 0,
      shadowOpacity: 0
    },
    headerTintColor: estiloCores[cor].corTexto,
    headerTitleAlign: 'center',
    headerTitle: titulo,
    headerLeft: () => <TouchableMenu navegador={navegador} cor={estiloCores[cor].corTexto} />
  });
};

export const cabecalhoVoltar = ({ navegador, titulo, cor }) => {
  navegador.setOptions({
    headerStyle: {
      backgroundColor: estiloCores[cor].corFundo,
      elevation: 0,
      shadowOpacity: 0
    },
    headerTintColor: estiloCores[cor].corTexto,
    headerTitleAlign: 'center',
    headerTitle: titulo,
    headerLeft: () => <TouchableGoBack navegador={navegador} cor={estiloCores[cor].corTexto} />
  });
};

export const cabecalhoVoltarHome = ({ navegador, titulo, cor }) => {
  navegador.setOptions({
    headerStyle: {
      backgroundColor: estiloCores[cor].corFundo,
      elevation: 0,
      shadowOpacity: 0
    },
    headerTintColor: estiloCores[cor].corTexto,
    headerTitleAlign: 'center',
    headerTitle: titulo,
    headerLeft: () => <TouchableGoHome navegador={navegador} cor={estiloCores[cor].corTexto} />
  });
};

export default {
  cabecalhoMenuBusca,
  cabecalhoMenu,
  cabecalhoVoltar,
  cabecalhoVoltarHome
};
