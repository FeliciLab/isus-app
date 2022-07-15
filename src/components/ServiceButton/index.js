import React from 'react';
import { CardTitle, Container, Content, IconeWrapper } from './styles';

const ServiceButton = props => {
  const { Icone, titulo, iconBackgroundColor, ...rest } = props;

  return (
    <Container activeOpacity={0.8} {...rest}>
      <IconeWrapper
        testID="service-button-icone-wrapper"
        iconBackgroundColor={iconBackgroundColor}>
        <Icone />
      </IconeWrapper>
      <Content>
        <CardTitle>{titulo}</CardTitle>
      </Content>
    </Container>
  );
};

export default ServiceButton;
