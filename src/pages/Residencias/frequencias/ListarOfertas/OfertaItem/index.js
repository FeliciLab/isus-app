import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useMemo, useCallback } from 'react';
import { View } from 'react-native';
import rotas from '~/constantes/rotas';
import { KeyboardArrowRightIcon } from '~/icons';
import { Container, Dates, OfertaItemRow, SubTitle, Title } from './styles';

const OfertaItem = ({ oferta }) => {
  const navigation = useNavigation();

  const isDisabled = useMemo(() => {
    const now = moment();

    if (
      moment(now).isAfter(oferta.fim) ||
      moment(now).isBefore(oferta.inicio)
    ) {
      return true;
    }

    return false;
  }, [oferta]);

  console.log({ isDisabled });

  const handleNavigateToConfirmarPresenca = useCallback(
    () => navigation.navigate(rotas.CONFIRMAR_PRESENCA, { oferta }),
    [],
  );

  const handleNavigateToHisoricoFrequencias = useCallback(
    () => navigation.navigate(rotas.HISTORICO_FREQUENCIA, { oferta }),
    [],
  );

  return (
    <Container>
      <OfertaItemRow
        disabled={isDisabled}
        onPress={handleNavigateToConfirmarPresenca}>
        <View>
          <Title>{oferta.title}</Title>
          <Dates>
            {moment(oferta.inicio).format('DD/MM')} à{' '}
            {moment(oferta.fim).format('DD/MM/YYYY')}
          </Dates>
        </View>
        <KeyboardArrowRightIcon disabled={isDisabled} size={24} />
      </OfertaItemRow>
      <OfertaItemRow
        disabled={isDisabled}
        onPress={handleNavigateToHisoricoFrequencias}>
        <SubTitle disabled={isDisabled}>Histórico de Frequência</SubTitle>
        <KeyboardArrowRightIcon disabled={isDisabled} size={24} />
      </OfertaItemRow>
    </Container>
  );
};

export default OfertaItem;
