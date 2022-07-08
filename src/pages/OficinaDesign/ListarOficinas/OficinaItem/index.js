import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useCallback, useMemo } from 'react';
import { View } from 'react-native';
import rotas from '~/constantes/rotas';
import { KeyboardArrowRightIcon } from '~/icons';
import { Container, Dates, OfertaItemRow, SubTitle, Title } from './styles';

const OficinaItem = ({ oficina }) => {
  const navigation = useNavigation();

  const isForaDoPeriodo = useMemo(() => {
    const now = moment();
    if (
      moment(now).isAfter(oficina.fim, 'day') ||
      moment(now).isBefore(oficina.inicio, 'day')
    ) {
      return true;
    }
    return false;
  }, [oficina]);

  const handleNavigateToConfirmarPresenca = useCallback(
    () =>
      navigation.navigate(rotas.OFICINA_DESIGN_CONFIRMAR_PRESENCA, { oficina }),
    [],
  );

  const handleNavigateToHisoricoFrequencias = useCallback(
    () =>
      navigation.navigate(rotas.OFICINA_DESIGN_HISTORICO_FREQUENCIA, {
        oficina,
      }),
    [],
  );

  return (
    <Container>
      <OfertaItemRow
        disabled={isForaDoPeriodo}
        onPress={handleNavigateToConfirmarPresenca}>
        <View>
          <Title disabled={isForaDoPeriodo}>{oficina.title}</Title>
          <Dates disabled={isForaDoPeriodo}>
            {moment(oficina.inicio).format('DD/MM')} à{' '}
            {moment(oficina.fim).format('DD/MM/YYYY')}
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

export default OficinaItem;
