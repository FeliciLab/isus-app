import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import rotas from '~/constantes/rotas';
import { KeyboardArrowRightIcon } from '~/icons';
import { Container, Dates, OfertaItemRow, SubTitle, Title } from './styles';

const OfertaItem = ({ oferta }) => {
  const navigation = useNavigation();

  // TODO: implementar
  const handleNavigateToConfirmarPresenca = () => {
    navigation.navigate(rotas.CONFIRMAR_PRESENCA, { oferta });
  };

  const handleNavigateToHisoricoFrequencias = () => {
    navigation.navigate(rotas.HISTORICO_FREQUENCIA, { oferta });
  };

  return (
    <Container>
      <OfertaItemRow onPress={handleNavigateToConfirmarPresenca}>
        <View>
          <Title>{oferta.title}</Title>
          <Dates>
            {oferta.inicio} à {oferta.fim}
          </Dates>
        </View>
        <KeyboardArrowRightIcon size={24} />
      </OfertaItemRow>
      <OfertaItemRow onPress={handleNavigateToHisoricoFrequencias}>
        <SubTitle>Histórico de Frequência</SubTitle>
        <KeyboardArrowRightIcon size={24} />
      </OfertaItemRow>
    </Container>
  );
};

export default OfertaItem;
