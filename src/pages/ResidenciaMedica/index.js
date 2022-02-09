import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { FlatList, Image, TouchableOpacity } from 'react-native';
import { Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import residenciaMedicaBG from '~/assets/backgrounds/residencia_medica.png';
import BarraDeStatus from '~/components/barraDeStatus';
import { CORES } from '~/constantes/estiloBase';
import ROTAS from '~/constantes/rotas';
import { Container, Content } from './styles';
import ResidenciaMedicaSVG01 from '~/assets/icons/residenciaMedica/icon01.svg';
import ResidenciaMedicaSVG02 from '~/assets/icons/residenciaMedica/icon02.svg';
import ResidenciaMedicaSVG03 from '~/assets/icons/residenciaMedica/icon03.svg';
import ServiceButton from '~/components/ServiceButton/index';

const residenciaMedicaListCards = [
  {
    id: 'elmo-capacitacao',
    titulo: 'Capacitação',
    ativo: true,
    icone: ResidenciaMedicaSVG01,
    navegacao: {
      componente: ROTAS.CAPACITACAO_ELMO,
      titulo: 'Elmo',
      background: CORES.INDIGO_DYE,
    },
  },
  {
    id: 'elmo-manual-uso',
    titulo: 'Manual de Uso',
    ativo: true,
    icone: ResidenciaMedicaSVG02,
    navegacao: {
      componente: 'browser',
      url:
        'https://sus.ce.gov.br/elmo/wp-content/uploads/sites/2/2021/01/Manual_Elmo_1.1_JAN2021.pdf',
    },
  },
  {
    id: 'elmo-fale-conosco',
    titulo: 'Fale Conosco',
    ativo: true,
    icone: ResidenciaMedicaSVG03,
    navegacao: {
      componente: ROTAS.DUVIDAS_ELMO,
    },
  },
];

const ResidenciaMedica = () => {
  const navigation = useNavigation();

  const handleOnPressServiceButton = item => {
    console.log('handleOnPressCartoHome', item.id);
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
