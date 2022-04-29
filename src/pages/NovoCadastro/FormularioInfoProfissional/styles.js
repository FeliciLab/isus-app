import styled from 'styled-components/native';
import { Title, TextInput, Button, List, Text } from 'react-native-paper';
import { ScrollView } from 'react-native';
import IconDropdown from 'react-native-vector-icons/MaterialIcons';
import featureAtivas from '../../featureAtivas';
import features from '../../constantes/features';

export const Titulo = styled(Title)`
  font-size: 24px;
  line-height: 28px;
  color: rgba(0, 0, 0, 0.87);
  margin-top: 16px;
`;

export const Scroll = styled(ScrollView)`
  background-color: #ffffff;
  padding-left: 16px;
  padding-right: 16px;
`;

export const TituloDoFormulario = styled(Title)`
  margin-top: 24px;
  color: rgba(0, 0, 0, 0.87);
  font-size: 20px;
  letter-spacing: 0.15px;
  line-height: 23px;
`;

export const CampoDeTexto = styled(TextInput)`
  padding-top: 16px;
  background-color: #fff;
`;

export const TextoDeErro = styled.Text`
  color: red;
  margin-top: 0;
`;

export const Botao = styled(Button)`
  border-radius: 50px;
  width: 150px;
  height: 45px;
  align-self: flex-end;
  margin: 20px;
  justify-content: center;
  background-color: ${props => {
    if (props.disabled) {
      return '#BDBDBD';
    }
    if (featureAtivas.includes(features.EDICAO_DE_INFORMACOES_PROFISSIONAIS)) {
      return props.cor;
    }
    return '#304FFE';
  }};
`;

export const ConteudoDropdown = styled.View`
  margin-top: 14px;
`;

export const IconeDropdown = styled(IconDropdown)`
  position: absolute;
  right: 8px;
  top: 30px;
  font-size: 25px;
`;

export const PlaceholderAcordeon = styled(Text)`
  font-size: 16px;
  color: rgba(0, 0, 0, 0.54);
`;

export const Acordeon = styled(List.Accordion)`
  border-color: rgba(25, 25, 25, 0.32);
  border-width: 2px;
  margin-top: 16px;
`;
