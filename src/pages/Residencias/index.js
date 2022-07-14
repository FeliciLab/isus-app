import { useNetInfo } from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useLayoutEffect } from 'react';
import { FlatList, Linking, TouchableOpacity } from 'react-native';
import { Paragraph } from 'react-native-paper';
import residenciaMedicaBG from '~/assets/backgrounds/residencia_medica.png';
import BarraDeStatus from '~/components/BarraDeStatus';
import NewServiceButton from '~/components/NewServiceButton';
import { CORES } from '~/constantes/estiloBase';
import ROTAS from '~/constantes/rotas';
import useAnalytics from '~/hooks/useAnalytics';
import { ArrowLeftIcon } from '~/icons';
import listaResidenciasCards from './listaResidenciasCards';
import { Container, Content, ResidenciasEmSaudeImage } from './styles';

const Residencias = () => {
  const navigation = useNavigation();

  const { isConnected } = useNetInfo();

  const { analyticsData } = useAnalytics();

  const iconBackgroundColor = CORES.AZUL_RESIDENCIAS;

  const handleOnPressServiceButton = useCallback(
    item => {
      analyticsData(item.id, 'Click', 'ResidenciaMedica');

      if (item.navegacao.net && !isConnected) {
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
          <ArrowLeftIcon size={28} color={CORES.BRANCO} />
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
        data={listaResidenciasCards.filter(item => item.ativo)}
        keyExtractor={item => `${item.id}`}
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
        }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <NewServiceButton
            testID={`cards-${item.id}`}
            key={`cards-${item.id}`}
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

export default Residencias;
