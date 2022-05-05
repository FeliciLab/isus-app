import { Button } from 'react-native-paper';
import styled from 'styled-components/native';
import { CORES } from '~/constantes/estiloBase';

export const Botao = styled(Button)`
  border-radius: 200px;
  /* margin: 10px 16px; */
  margin: 10px 0;
  background-color: ${props =>
    props.mode === 'text' ? CORES.AZUL : CORES.BRANCO};
`;

export const FormContainer = styled.View`
  margin: 0 16px;
`;

export const FormButtonContainer = styled.View`
  margin-top: 18px;
`;

export const FormInputSpacer = styled.View`
  height: 18px;
`;
