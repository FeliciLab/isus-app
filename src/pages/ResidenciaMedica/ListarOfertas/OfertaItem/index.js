import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import rotas from '~/constantes/rotas';
import { Container, Dates, OfertaItemRow, SubTitle, Title } from './styles';

const OfertaItem = ({ oferta }) => {
  const navigation = useNavigation();

  // TODO: implementar
  const handleNavigateToCorfirmarPresenca = () => {
    navigation.navigate(rotas.CONFIRMAR_PRESENCA, { oferta });
  };

  const handleNavigateToHisoricoFrequencias = () => {
    navigation.navigate(rotas.HISTORICO_FREQUENCIA, { oferta });
  };

  return (
    <Container>
      <OfertaItemRow onPress={handleNavigateToCorfirmarPresenca}>
        <View>
          <Title>{oferta.title}</Title>
          <Dates>
            {oferta.inicio} à {oferta.fim}
          </Dates>
        </View>
        <Icon name="keyboard-arrow-right" size={24} />
      </OfertaItemRow>
      <OfertaItemRow onPress={handleNavigateToHisoricoFrequencias}>
        <SubTitle>Histórico de Frequência</SubTitle>
        <Icon name="keyboard-arrow-right" size={24} />
      </OfertaItemRow>
    </Container>
  );
};

export default OfertaItem;
