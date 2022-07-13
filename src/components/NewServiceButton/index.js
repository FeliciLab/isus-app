import React from 'react';
import { CardTitle, Container, Content, IconeWrapper } from './styles';

const NewServiceButton = props => {
  const { Icone, titulo, iconBackgroundColor, ...rest } = props;

  return (
    <Container {...rest}>
      <IconeWrapper iconBackgroundColor={iconBackgroundColor}>
        <Icone />
      </IconeWrapper>
      <Content>
        <CardTitle>{titulo}</CardTitle>
      </Content>
    </Container>
  );
};

export default NewServiceButton;
