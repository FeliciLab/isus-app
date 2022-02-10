import { useNetInfo } from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { FlatList, Image, Linking, TouchableOpacity } from 'react-native';
import { Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import residenciaMedicaBG from '~/assets/backgrounds/residencia_medica.png';
import ESPVirtualSVG from '~/assets/icons/residenciaMedica/esp-virtual.svg';
import SaguSVG from '~/assets/icons/residenciaMedica/sagu.svg';
import SIGResidenciasSVG from '~/assets/icons/residenciaMedica/sig-residencias.svg';
import BarraDeStatus from '~/components/barraDeStatus';
import ServiceButton from '~/components/ServiceButton/index';
import { CORES } from '~/constantes/estiloBase';
import ROTAS from '~/constantes/rotas';
import { Container, Content } from './styles';

const residenciaMedicaListCards = [
  {
    id: 'sagu',
    titulo: 'SAGU',
    ativo: true,
    icone: SaguSVG,
    navegacao: {
      componente: 'webview',
      titulo: 'SAGU',
      url: 'http://academico.esp.ce.gov.br/',
    },
  },
  {
    id: 'esp-virtual',
    titulo: 'ESP Virtual',
    ativo: true,
    icone: ESPVirtualSVG,
    navegacao: {
      componente: 'webview',
      titulo: 'ESP Virtual',
      url: 'http://espvirtual.esp.ce.gov.br/',
    },
  },
  {
    id: 'sig-residencias',
    titulo: 'SIG Residências',
    ativo: true,
    icone: SIGResidenciasSVG,
    navegacao: {
      componente: 'webview',
      titulo: 'SIG Residências',
      url: 'https://sigresidencias.saude.gov.br',
    },
  },
];

const ResidenciaMedica = () => {
  const navigation = useNavigation();

  const netInfo = useNetInfo();

  const handleOnPressServiceButton = item => {
    // analyticsData(item.id, 'Click', 'Elmo');
    if (item.navegacao.net && !netInfo.isConnected) {
      navigation.navigate(ROTAS.SEM_CONEXAO);
      return;
    }

    if (item.navegacao.componente === 'browser') {
      Linking.openURL(item.navegacao.url);
      return;
    }

    navigation.navigate(item.navegacao.componente, {
      title: item.navegacao.titulo,
      url: item.navegacao.url,
      headerStyle: {
        backgroundColor: item.navegacao.background,
      },
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTransparent: true,
      headerTintColor: CORES.BRANCO,
      headerTitleAlign: 'center',
      headerTitle: '',
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19,
          }}
          onPress={() => {
            navigation.navigate(ROTAS.HOME);
          }}>
          <Icon name="arrow-left" size={28} color={CORES.BRANCO} />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <Container>
      <BarraDeStatus backgroundColor={CORES.VERDE} barStyle="light-content" />
      <Image source={residenciaMedicaBG} />
      <Content>
        <Paragraph>
          As Residências em Saúde constituem modalidade de ensino de
          pós-graduação destinada à profissionais da área da saúde, em formato
          de cursos de especialização, caracterizadas por treinamento em
          serviço, funcionando sob a responsabilidade de Instituições de Saúde.
          Trata-se de uma formação de especialista orientada pelos princípios e
          diretrizes do Sistema Único de Saúde (SUS), promovendo o
          fortalecimento da rede de atenção por meio da qualificação da força de
          trabalho alinhado com as necessidades regionais, reconhecendo a
          importância das conexões entre as práticas educacionais, a realidade
          social e necessidades assistenciais da população.
        </Paragraph>
      </Content>
      <FlatList
        horizontal
        data={residenciaMedicaListCards}
        keyExtractor={item => `${item.id}`}
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
        }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <ServiceButton
            testID={`cards-${item.id}`}
            key={item.id}
            ativo={item.ativo}
            titulo={item.titulo}
            Icone={item.icone}
            onPress={() => handleOnPressServiceButton(item)}
          />
        )}
      />
    </Container>
  );
};

export default ResidenciaMedica;
