import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CORES } from '~/constantes/estiloBase';
import {
  AlunoInfo,
  Container,
  MarcarPresencaButton,
  SubTitle,
  Title,
  Warning,
} from './styles';

const CorfirmarPresenca = () => {
  const navigation = useNavigation();

  const {
    params: { oferta },
  } = useRoute();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#4CAF50',
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: '#fff',
      headerTitleAlign: 'center',
      headerTitle: 'Residências em Saúde',
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19,
          }}
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="arrow-left" size={28} color={CORES.BRANCO} />
        </TouchableOpacity>
      ),
    });
  });

  // TODO: implementar
  const handleMarcarPresencaButton = () => {
    console.log('MarcarPresencaButton');
  };

  return (
    <Container>
      <Title>Residência Multiprofissional | {oferta.title}</Title>
      <SubTitle>
        {oferta.title} | {oferta.inicio} a {oferta.fim}
      </SubTitle>
      <View>
        <AlunoInfo>Aluno(a): Francisco Cézar Aragão</AlunoInfo>
        <AlunoInfo>Data: 07/03/2022 | Turno: Manhã </AlunoInfo>
      </View>
      <MarcarPresencaButton
        color="#fff"
        label="MARCAR PRESENÇA"
        small
        onPress={handleMarcarPresencaButton}
      />
      <Warning>
        Atenção: O botão de presença só ficará ativo no horário previsto. Você
        só poderá marcar sua frequência no período da manhã (de 9h às 10h) ou
        durante as tardes (de 15 às 16h). Se você errar a seleção de alguma
        informação, poderá corrigir no período permitido.
      </Warning>
    </Container>
  );
};

export default CorfirmarPresenca;
