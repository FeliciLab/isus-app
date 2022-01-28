import { Button, Snackbar, TextInput } from 'react-native-paper';
import styled from 'styled-components/native';
import { CORES } from '~/constantes/estiloBase';

export const Container = styled.View`
  background-color: ${CORES.BRANCO};
  margin: 0 16px;
  margin-top: 18px;
`;

export const View = styled.View`
  flex: 1;
  padding: 15px;
  background-color: ${CORES.BRANCO};
`;

export const AlertaBar = styled(Snackbar)`
  background-color: ${CORES.PRETO_MISTERIOSO};
`;

export const EntradaTexto = styled(TextInput)`
  margin-bottom: 20px;
  margin-top: ${props => (props.margintop ? props.margintop : '0px')};
`;

export const BotaoForm = styled(Button)`
  border-radius: 50px;
  width: 150px;
  height: 45px;
  align-self: flex-end;
  justify-content: center;
  margin: 20px;
  background-color: ${props =>
    props.disabled ? CORES.CINZA_DESABILITADO : CORES.LARANJA};
`;

export const BotaoFormDisable = styled(Button)`
  border-radius: 50px;
  width: 150px;
  height: 45px;
  align-self: flex-end;
  /* align-items: flex-end; */
  justify-content: center;
  margin: 20px;
`;
