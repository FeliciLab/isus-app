import { useNetInfo } from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useLayoutEffect } from 'react';
import { FlatList, Linking, TouchableOpacity } from 'react-native';
import { Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import residenciaMedicaBG from '~/assets/backgrounds/residencia_medica.png';
import ESPVirtualSVG from '~/assets/icons/residenciaMedica/esp-virtual.svg';
import FrequenciasSVG from '~/assets/icons/residenciaMedica/frequencias.svg';
import SaguSVG from '~/assets/icons/residenciaMedica/sagu.svg';
import MatriculasSVG from '~/assets/icons/residenciaMedica/matricula_residencia.svg';
import SIGResidenciasSVG from '~/assets/icons/residenciaMedica/sig-residencias.svg';
import BarraDeStatus from '~/components/barraDeStatus';
import ServiceButton from '~/components/ServiceButton';
import { CORES } from '~/constantes/estiloBase';
import ROTAS from '~/constantes/rotas';
import { urls } from '~/constantes/urls';
import useAnalytics from '~/hooks/useAnalytics';
import { Container, Content, ResidenciasEmSaudeImage } from './styles';

const residenciaMedicaListCards = [
  {
    id: 'frequencias',
    titulo: 'Frequências',
    ativo: false,
    icone: FrequenciasSVG,
    navegacao: {
      componente: ROTAS.LISTAR_OFERTAS,
    },
  },
  {
    id: 'matriculas',
    titulo: 'MATRÍCULAS',
    ativo: true,
    icone: MatriculasSVG,
    navegacao: {
      componente: 'webview',
      titulo: 'MATRÍCULAS',
      url: urls.MATRICULA_RESIDENCIA,
    },
  },
  {
    id: 'sagu',
    titulo: 'SAGU',
    ativo: true,
    icone: SaguSVG,
    navegacao: {
      componente: 'webview',
      titulo: 'SAGU',
      url: urls.SAGU,
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
      url: urls.ESP_VIRTUAL,
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
      url: urls.SIG_RESIDENCIAS,
    },
  },
];

const ResidenciaMedica = () => {
  const navigation = useNavigation();

  const { isConnected } = useNetInfo();

  const { analyticsData } = useAnalytics();

  const handleOnPressServiceButton = useCallback(
    item => {
      analyticsData(item.id, 'Click', 'ResidenciaMedica');

      if (item.navegacao.componente === 'browser') {
        Linking.openURL(item.navegacao.url);
        return;
      }

      navigation.navigate(item.navegacao.componente);
    },
    [isConnected, analyticsData],
  );

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
      <ResidenciasEmSaudeImage source={residenciaMedicaBG} />
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
