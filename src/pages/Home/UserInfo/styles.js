import styled from 'styled-components/native';

export const Container = styled.View.attrs({
  borderBottomLeftRadius: 16,
  borderBottomRightRadius: 16,
})`
  background-color: #fff;
  padding: 16px;
`;

export const Perfil = styled.Text`
  color: #000;
  font-size: 28px;
  font-weight: 500;
`;

export const Categoria = styled.Text`
  color: 'rgba(0,0,0,0.6)';
  font-size: 16px;
  font-style: italic;
`;
