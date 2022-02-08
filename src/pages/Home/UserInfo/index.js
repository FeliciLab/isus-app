import React from 'react';
import useAutenticacao from '~/hooks/useAutenticacao';
import { Categoria, Container, Perfil } from './styles';

const UserInfo = () => {
  const { user } = useAutenticacao();

  if (!user) return null;

  return (
    <Container>
      <Perfil>Olá, {user?.name?.split(' ')[0] || ''}</Perfil>
      <Categoria>
        {user?.profissional.categoria_profissional?.nome || ''}
      </Categoria>
    </Container>
  );
};

export default UserInfo;
