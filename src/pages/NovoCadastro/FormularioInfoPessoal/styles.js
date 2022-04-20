import { ScrollView } from 'react-native';
import { Button, Title } from 'react-native-paper';
import styled from 'styled-components/native';
import features from '~/constantes/features';
import featureAtivas from '~/featureAtivas';

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

export const Scroll = styled(ScrollView)`
  background-color: #ffffff;
  padding-left: 16px;
  padding-right: 16px;
`;

export const Titulo = styled(Title)`
  font-size: 18px;
  line-height: 28px;
  color: rgba(0, 0, 0, 0.87);
  margin-top: 16px;
`;

export const TituloDoFormulario = styled(Title)`
  font-size: 16px;
  margin-top: 12px;
  color: rgba(0, 0, 0, 0.87);
  letter-spacing: 0.15px;
  line-height: 23px;
`;
