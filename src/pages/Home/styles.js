import styled from 'styled-components/native';
import { Title } from 'react-native-paper';

const Titulo = styled(Title)`
  margin: 0 16px 0 16px;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.6);
`;

const ConteudoTitulo = styled(Title)`
    margin: 16px;
    margin-Top: 24px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export {
  Titulo,
  ConteudoTitulo
};
