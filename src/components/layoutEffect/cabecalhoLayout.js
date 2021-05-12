import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CORES } from '../../constantes/estiloBase';
import rotas from '../../constantes/rotas';

const estiloCores = {
  verde: {
    corFundo: CORES.VERDE,
    corTexto: CORES.BRANCO
  },
  roxo: {
    corFundo: CORES.ROXO,
    corTexto: CORES.BRANCO
  },
  branco: {
    corFundo: CORES.BRANCO,
    corTexto: CORES.VERDE
  },
  brancoPreto: {
    corFundo: CORES.BRANCO,
    corTexto: CORES.PRETO
  },
  pretoBranco: {
    corFundo: CORES.PRETO,
    corTexto: CORES.BRANCO
  },
  azul: {
    corFundo: CORES.AZUL,
    corTexto: CORES.BRANCO
  }
};

const TouchableSearch = ({ navegador, cor }) => (
  <TouchableOpacity
    style={{ marginHorizontal: 19 }}
    onPress={() => {
      navegador.navigate('Buscar');
    }}
  >
    <Icon
      name="magnify"
      size={28}
      color={cor}
    />
  </TouchableOpacity>
);

const TouchableMenu = ({ navegador, cor }) => (
  <TouchableOpacity
    style={{ marginHorizontal: 19 }}
    onPress={() => {
      navegador.toggleDrawer();
    }}
  >
    <Icon
      name="menu"
      size={28}
      color={cor}
    />
  </TouchableOpacity>
);

const TouchableGoBack = ({ navegador, cor }) => (
  <TouchableOpacity
    style={{ marginHorizontal: 19 }}
    onPress={() => {
      navegador.goBack();
    }}
  >
    <Icon
      name="arrow-left"
      size={28}
      color={cor}
    />
  </TouchableOpacity>
);

const TouchableGoHome = ({ navegador, cor }) => (
  <TouchableOpacity
    style={{ marginHorizontal: 19 }}
    onPress={() => {
      navegador.navigate(rotas.HOME, { screen: 'Home' });
    }}
  >
    <Icon
      name="arrow-left"
      size={28}
      color={cor}
    />
  </TouchableOpacity>
);

const TouchableGoRoute = ({ navegador, cor, rota }) => (
  <TouchableOpacity
    style={{ marginHorizontal: 19 }}
    onPress={() => {
      navegador.navigate(rota);
    }}
  >
    <Icon
      name="arrow-left"
      size={28}
      color={cor}
    />
  </TouchableOpacity>
);

export const getOptions = ({ titulo, cor }) => ({
  headerStyle: {
    backgroundColor: estiloCores[cor].corFundo,
    elevation: 0,
    shadowOpacity: 0
  },
  headerTintColor: estiloCores[cor].corTexto,
  headerTitleAlign: 'center',
  headerTitle: titulo
});

export const cabecalhoMenuBusca = ({ navegador, titulo, cor }) => navegador.setOptions({
  ...getOptions({ titulo, cor }),
  headerRight: () => (
    <TouchableSearch
      navegador={navegador}
      cor={estiloCores[cor].corTexto}
    />
  ),
  headerLeft: () => <TouchableMenu navegador={navegador} />
});

export const cabecalhoMenu = ({ navegador, titulo, cor }) => navegador.setOptions({
  ...getOptions({ titulo, cor }),
  headerLeft: () => (
    <TouchableMenu
      navegador={navegador}
      cor={estiloCores[cor].corTexto}
    />
  )
});

export const cabecalhoVoltar = ({ navegador, titulo, cor }) => navegador.setOptions({
  ...getOptions({ titulo, cor }),
  headerLeft: () => (
    <TouchableGoBack
      navegador={navegador}
      cor={estiloCores[cor].corTexto}
    />
  )
});

export const cabecalhoVoltarHome = ({ navegador, titulo, cor }) => navegador.setOptions({
  ...getOptions({ titulo, cor }),
  headerLeft: () => (
    <TouchableGoHome
      navegador={navegador}
      cor={estiloCores[cor].corTexto}
    />
  )
});

export const cabecalhoVoltarRota = ({
  navegador,
  titulo,
  cor,
  rota
}) => navegador.setOptions({
  ...getOptions({ titulo, cor }),
  headerLeft: () => (
    (
      <TouchableGoRoute
        navegador={navegador}
        cor={estiloCores[cor].corTexto}
        rota={rota}
      />
    )
  )
});


export const getOptionsCabecalhoSemBotao = ({ titulo, cor }) => ({
  ...getOptions({ titulo, cor }),
  headerLeft: () => {
  },
  headerRight: () => {
  }
});

export const cabecalhoSemBotao = ({ navegador, titulo, cor }) => navegador.setOptions({
  ...getOptions({ titulo, cor }),
  headerLeft: () => {
  },
  headerRight: () => {
  }
});

export default {
  cabecalhoMenuBusca,
  cabecalhoMenu,
  cabecalhoVoltar,
  cabecalhoVoltarHome,
  cabecalhoSemBotao
};
