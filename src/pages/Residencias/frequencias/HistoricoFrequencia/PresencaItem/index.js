import React from 'react';
import { Container, Content, Date, Turno } from './styles';
import { CORES } from '~/constantes/estiloBase';
import { CheckCircleoIcon, CloseCircleoIcon } from '~/icons/';

const PresencaItem = ({ presenca }) => {
  return (
    <Container>
      {presenca.isPresent ? (
        <CheckCircleoIcon size={36} color={CORES.VERDE} />
      ) : (
        <CloseCircleoIcon size={36} color={CORES.VERMELHO} />
      )}
      <Content>
        <Date>{presenca.date}</Date>
        <Turno>Turno: {presenca.turn}</Turno>
      </Content>
    </Container>
  );
};

export default PresencaItem;
