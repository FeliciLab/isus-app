import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useMemo, useCallback } from 'react';
import { View } from 'react-native';
import rotas from '~/constantes/rotas';
import { KeyboardArrowRightIcon } from '~/icons';
import { Container, Dates, OfertaItemRow, SubTitle, Title } from './styles';

const OfertaItem = ({ oferta }) => {
  const navigation = useNavigation();

  const isForaDoPeriodo = useMemo(() => {
    const now = moment();
    if (
      moment(now).isAfter(oferta.fim, 'day') ||
      moment(now).isBefore(oferta.inicio, 'day')
    ) {
      return true;
    }
    return false;
  }, [oferta]);

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
        // disabled={isForaDoPeriodo} // TODO: remover isso depois
        onPress={handleNavigateToConfirmarPresenca}>
        <View>
          <Title disabled={isForaDoPeriodo}>{oferta.title}</Title>
          <Dates disabled={isForaDoPeriodo}>
            {moment(oferta.inicio).format('DD/MM')} à{' '}
            {moment(oferta.fim).format('DD/MM/YYYY')}
          </Dates>
        </View>
        <KeyboardArrowRightIcon disabled={isForaDoPeriodo} size={24} />
      </OfertaItemRow>
      <OfertaItemRow
        disabled={isForaDoPeriodo}
        onPress={handleNavigateToHisoricoFrequencias}>
        <SubTitle disabled={isForaDoPeriodo}>Histórico de Frequência</SubTitle>
        <KeyboardArrowRightIcon disabled={isForaDoPeriodo} size={24} />
      </OfertaItemRow>
    </Container>
  );
};

export default OfertaItem;
