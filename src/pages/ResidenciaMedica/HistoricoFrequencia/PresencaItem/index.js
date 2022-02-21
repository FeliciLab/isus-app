import React from 'react';
import { Container, Content, Date, Turno } from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import { CORES } from '~/constantes/estiloBase';

const PresencaItem = ({ presenca }) => {
  return (
    <Container>
      {presenca.isPresent ? (
        <Icon name="checkcircleo" size={36} color={CORES.VERDE} />
      ) : (
        <Icon name="closecircleo" size={36} color={CORES.VERMELHO} />
      )}
      <Content>
        <Date>{presenca.date}</Date>
        <Turno>Turno: {presenca.turn}</Turno>
      </Content>
    </Container>
  );
};

export default PresencaItem;
