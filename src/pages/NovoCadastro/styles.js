import styled from 'styled-components/native';
import {
  Title, TextInput, Button, List, Text
} from 'react-native-paper';
import { ScrollView } from 'react-native';
import IconDropdown from 'react-native-vector-icons/MaterialIcons';

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

const CampoDeTexto = styled(TextInput)`
  padding-bottom: 16px;
  background-color: #fff;
`;

const TextoDeErro = styled.Text`
  color: #ff0c3e;
`;

const Botao = styled(Button)`
  border-radius: 50px;
  width: 150px;
  height: 45px;
  align-self: flex-end;
  margin: 20px;
  justify-content: center;
  background-color: ${props => (props.disabled ? '#BDBDBD' : '#304FFE')};
`;

const ConteudoDropdown = styled.View`
  margin-top: 14px;
`;

const IconeDropdown = styled(IconDropdown)`
  position: absolute;
  right: 8px;
  top: 30px;
  font-size: 25px;
`;

const PlaceholderAcordeon = styled(Text)`
  font-size: 16;
  color: rgba(0, 0, 0, 0.54);
`;

const Acordeon = styled(List.Accordion)`
  border-color: rgba(25, 25, 25, 0.32);
  border-width: 2;
  margin-top: 16;
`;

export {
  Titulo,
  Scroll,
  TituloDoFormulario,
  CampoDeTexto,
  TextoDeErro,
  Botao,
  ConteudoDropdown,
  IconeDropdown,
  PlaceholderAcordeon,
  Acordeon
};
