import styled from 'styled-components/native';
import { Title } from 'react-native-paper';
import { ScrollView } from 'react-native';

const Titulo = styled(Title)`
  font-size: 24px;
  line-height: 28px;
  color: rgba(0, 0, 0, 0.87);
  margin-top: 16px;
`;

const Scroll = styled(ScrollView)`
  background-color: #ffffff;
  padding-left: 16px;
  padding-right: 16px;
`;

const TituloDoFormulario = styled(Title)`
  margin-top: 24px;
  margin-bottom: 16px;
  color: rgba(0, 0, 0, 0.87);
  font-size: 20px;
  letter-spacing: 0.15px;
  line-height: 23px;
`;

export {
  Titulo,
  Scroll,
  TituloDoFormulario,
};
