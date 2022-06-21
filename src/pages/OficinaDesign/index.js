import React from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import { useCallback, useLayoutEffect } from 'react';
import { Linking, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Paragraph } from 'react-native-paper';
import OficinaDesignBG from '~/assets/backgrounds/oficina_design.png';
import BarraDeStatus from '~/components/BarraDeStatus';
import ServiceButton from '~/components/ServiceButton';
import { CORES } from '~/constantes/estiloBase';
import rotas from '~/constantes/rotas';
import useAnalytics from '~/hooks/useAnalytics';
import { ArrowLeftIcon } from '~/icons';
import { Container, Content, OficinaDesignImage } from './styles';
import FrequenciasSVG from '~/assets/icons/oficinaDesign/frequencias.svg';
import SiteOficinaSVG from '~/assets/icons/oficinaDesign/site-oficial.svg';
import { urls } from '~/constantes/urls';

const OficinaDesign = () => {
  const navigation = useNavigation();

  const { isConnected } = useNetInfo();

  const { analyticsData } = useAnalytics();

  const residenciasCards = [
    {
      id: 'frequencias',
      titulo: 'Frequências',
      ativo: true,
      icone: FrequenciasSVG,
      navegacao: {
        componente: rotas.OFICINA_DESIGN_LISTAR_OFICINAS,
      },
    },
    {
      id: 'matriculas',
      titulo: 'Site da Oficina',
      ativo: true,
      icone: SiteOficinaSVG,
      navegacao: {
        componente: 'webview',
        titulo: 'Oficina de Design',
        url: urls.OFICINA_DESIGN,
      },
    },
  ];

  const handleOnPressServiceButton = useCallback(
    item => {
      analyticsData(item.id, 'Click', 'ResidenciaMedica');

      if (item.navegacao.net && !isConnected) {
        navigation.navigate(rotas.SEM_CONEXAO);
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
            navigation.navigate(rotas.HOME);
          }}>
          <ArrowLeftIcon size={28} color={CORES.BRANCO} />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <Container>
      <BarraDeStatus backgroundColor="#59AAB8" barStyle="light-content" />
      <OficinaDesignImage source={OficinaDesignBG} />
      <Content>
        <Paragraph>
          A Oficina de Design de Serviços da ESP tem o objetivo de reunir
          pessoas de representatividade de todas as áreas da escola para, por
          meio de um processo colaborativo baseado no Design Thinking,
          reconhecer seus principais desafios e priorizá-los com a validação de
          todos os participantes.
        </Paragraph>
        <Paragraph style={{ marginTop: 16 }}>
          Acesse esse ambiente para realizar sua frequência nos dias do evento.
          Para mais informações sobre a oficina acesse:
          sus.ce.gov.br/felicilab/oficinadesignesp/
        </Paragraph>
      </Content>
      <FlatList
        horizontal
        data={residenciasCards}
        keyExtractor={item => `${item.id}`}
        style={{
          flexDirection: 'row',
          alignSelf: 'flex-start',
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

export default OficinaDesign;
