import { useNetInfo } from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useLayoutEffect } from 'react';
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
import listaOficinasCards from './listaOficinasCards';
import { Container, Content, OficinaDesignImage } from './styles';

const OficinaDesign = () => {
  const navigation = useNavigation();

  const { isConnected } = useNetInfo();

  const { analyticsData } = useAnalytics();

  const iconBackgroundColor = CORES.AZUL_OFICINA;

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
      <BarraDeStatus
        backgroundColor={CORES.AZUL_OFICINA_DARK}
        barStyle="light-content"
      />
      <OficinaDesignImage source={OficinaDesignBG} />
      <Content>
        <Paragraph>
          A Oficina de Design de Serviços da ESP tem o objetivo de reunir
          pessoas de representatividade de todas as áreas da escola para, por
          meio de um processo colaborativo baseado no Design Thinking,
          reconhecer seus principais problemas e priorizá-los com a validação de
          todos os participantes. Além disso, o mapeamento dos problemas irá
          possibilitar o reconhecimento do que será tratado com base na
          aproximação dos objetivos estratégicos da ESP alinhados aos
          Macroprocessos por Eixos Estratégicos. Acesse esse ambiente para
          realizar sua frequência nos dias do evento.
        </Paragraph>
      </Content>
      <FlatList
        horizontal
        data={listaOficinasCards.filter(item => item.ativo)}
        keyExtractor={({ id }) => String(id)}
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
            iconBackgroundColor={iconBackgroundColor}
          />
        )}
      />
    </Container>
  );
};

export default OficinaDesign;
