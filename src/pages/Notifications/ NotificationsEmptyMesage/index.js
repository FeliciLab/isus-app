import React from 'react';
import { Container, SubTitle, Title } from './styles';

const NotificationsEmptyMesage = () => {
  return (
    <Container>
      <Title>Você ainda não tem nenhuma notificação</Title>
      <SubTitle>
        Logo mais você receberá alertas sobre atividades, notícias e atualidades
        do SUS.
      </SubTitle>
    </Container>
  );
};

export default NotificationsEmptyMesage;
