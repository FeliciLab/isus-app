import moment from 'moment';
import React from 'react';
import { CORES } from '~/constantes/estiloBase';
import { CheckCircleoIcon, CloseCircleoIcon } from '~/icons/';
import { getDayOfWeekDate } from '~/utils/dateUtils';
import { Container, Content, Date, Turno } from './styles';

const PresencaItem = ({ presenca }) => {
  console.log(getDayOfWeekDate);

  return (
    <Container>
      {presenca.isPresent ? (
        <CheckCircleoIcon size={36} color={CORES.VERDE} />
      ) : (
        <CloseCircleoIcon size={36} color={CORES.VERMELHO} />
      )}
      <Content>
        <Date>{moment(presenca.date).format('dddd [|] DD/MM/YYYY')}</Date>
        <Turno>Turno: {presenca.turn}</Turno>
      </Content>
    </Container>
  );
};

export default PresencaItem;
