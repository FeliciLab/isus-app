import styled from 'styled-components/native';
import { Card } from 'react-native-paper';

const ConteudoImagem = styled.View`
  width: 100%;
  height: 130px;
`;

const Imagem = styled.Image`
  border-radius: 10px;
  height: 130px;
  width: 100%;
`;

const Cartao = styled(Card)`
  height: 130px;
  border-radius: 10px;
  margin: 20px 16px;
`;

export {
  ConteudoImagem,
  Imagem,
  Cartao
};
