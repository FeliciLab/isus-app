import moment from 'moment';
import React from 'react';
import { CORES } from '~/constantes/estiloBase';
import { CheckCircleoIcon, CloseCircleoIcon } from '~/icons/';
import { Container, Content, Date, Turno } from './styles';

const PresencaItem = ({ presenca }) => {
  return (
    <Container>
      {presenca.isPresent ? (
        <CheckCircleoIcon size={36} color={CORES.VERDE} />
      ) : (
        <CloseCircleoIcon size={36} color={CORES.VERMELHO} />
      )}
      <Content>
        <Date>{moment(presenca.data).format('dddd [|] DD/MM/YYYY')}</Date>
        <Turno>Turno: {presenca.turno}</Turno>
      </Content>
    </Container>
  );
};

export default PresencaItem;
