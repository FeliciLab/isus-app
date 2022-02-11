import React from 'react';
import { Card } from 'react-native-paper';
import { CardTitle, Container, IconeWrapper } from './styles';

const ServiceButton = props => {
  const { Icone, ativo, titulo, onPress, testID, ...rest } = props;

  if (ativo) {
    return (
      <Container elevation={4} onPress={onPress} testID={testID} {...rest}>
        <IconeWrapper>
          <Icone />
        </IconeWrapper>
        <Card.Content>
          <CardTitle>{titulo}</CardTitle>
        </Card.Content>
      </Container>
    );
  }

  return <></>;
};

export default ServiceButton;
