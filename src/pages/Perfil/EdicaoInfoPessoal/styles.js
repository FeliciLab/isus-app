import styled from 'styled-components/native';
import { List, Button, TextInput } from 'react-native-paper';
import IconDropdown from 'react-native-vector-icons/MaterialIcons';

const SafeArea = styled.SafeAreaView`
    height: 100%;
    background-color: #ffffff;
`;

const Scroll = styled.ScrollView`
  padding: 0 16px 0 16px;
`;

const ConteudoFormulario = styled.View`
  margin-top: 24px;
`;

const CampoDeTexto = styled(TextInput)`
  padding-top: 16px;
  background-color: #fff;
`;

const TituloPrincipal = styled.Text`
    font-size: 24px;
    line-height: 28px;
    color: rgba(0, 0, 0, 0.87);
    margin-bottom: 24px;
    max-width: 359px;
`;

const Acordeon = styled(List.Accordion)`
    border-color: 'rgba(25, 25, 25, 0.32)';
    border-width: 2px;
    margin-top: 16px;
`;

const Titulo = styled.Text`
    font-size: 18px;
    color: rgba(25, 25, 25, 0.32);
`;

const Destaque = styled.Text`
    font-size: 18px;
    font-weight: bold;
`;

const BotaoSalvar = styled(Button)`
    border-radius: 50px;
    width: 150px;
    height: 45px;
    margin: 30px;
    align-self: flex-end;
    justify-content: center;
    background-color: #FF9800;
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

const TextoDeErro = styled.Text`
  color: red;
  margin-top: 0;
`;

export {
  SafeArea,
  Scroll,
  ConteudoDropdown,
  CampoDeTexto,
  IconeDropdown,
  ConteudoFormulario,
  TituloPrincipal,
  Acordeon,
  Titulo,
  Destaque,
  BotaoSalvar,
  TextoDeErro
};
