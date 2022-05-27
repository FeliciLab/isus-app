// import { useNetInfo } from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
// import { Linking } from 'react-native';
import IconeSemConexaoLaranja from '~/assets/icons/sem_conexao_laranja.svg';
// import IconeSemConexaoVermelho from '~/assets/icons/sem_conexao_vermelho.svg';
import {
  cabecalhoVoltar,
  cabecalhoVoltarHome,
} from '~/components/layoutEffect/cabecalhoLayout';
import {
  Botao,
  CentralizarItensView,
  ScrollView,
  TextoCentralizado,
  TituloH6,
  View,
} from '~/components/style';
import { CORES } from '~/constantes/estiloBase';
import rotas from '~/constantes/rotas';
import { TESTIDS } from '~/constantes/testIDs';

const SemConexao = props => {
  const { route } = props;
  const { params } = route;

  // const [isLoading, setIsLoading] = useState(false);

  // const isConnected = useNetInfo().isConnected;

  const navigation = useNavigation();

  const tituloCabecalho = 'Sem Conexão';

  const corFundo = 'verde';

  // const onPressTentarNovamente = () => {
  //   setIsLoading(true);

  //   if (isConnected) {
  //     if (params?.componente === 'webview') {
  //       navigation.replace(params?.componente, {
  //         title: params?.title,
  //         url: params?.url,
  //         rota: params?.rota,
  //         idSaude: params?.idSaude,
  //         expanded: params?.expanded,
  //       });
  //       return;
  //     }

  //     if (params?.componente === 'browser') {
  //       Linking.openURL(params?.url);
  //       return;
  //     }

  //     navigation.goBack();
  //   }
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1500);
  // };

  const onPressVoltar = () =>
    navigation.navigate(rotas.HOME, { screen: 'Home' });

  useLayoutEffect(() => {
    if (!params?.goHome) {
      cabecalhoVoltar({
        navegador: navigation,
        titulo: tituloCabecalho,
        cor: corFundo,
      });
    } else {
      cabecalhoVoltarHome({
        navegador: navigation,
        titulo: tituloCabecalho,
        cor: corFundo,
      });
    }
  }, []);

  return (
    <ScrollView>
      <CentralizarItensView marginTop="59px">
        <IconeSemConexaoLaranja
          testID={TESTIDS.SEM_CONEXAO.ICONE_SEM_CONEXAO_LARANJA}
        />
        <TituloH6>Sem conexão com a internet</TituloH6>
      </CentralizarItensView>
      <View>
        <TextoCentralizado>
          Verifique se o wi-fi ou dados móveis estão ativos e tente novamente.
        </TextoCentralizado>
      </View>
      <View>
        <Botao
          testID={TESTIDS.SEM_CONEXAO.BOTAO_VOLTAR}
          labelStyle={{ color: CORES.LARANJA }}
          onPress={onPressVoltar}>
            VOLTAR
        </Botao>
      </View>
    </ScrollView>
  );
};

export default SemConexao;
