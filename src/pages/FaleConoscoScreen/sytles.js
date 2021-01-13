import styled from 'styled-components/native';
import { Button, Snackbar, TextInput } from 'react-native-paper';
import { CORES } from '../../constantes/estiloBase';

const Container = styled.View`
  background-color: ${CORES.BRANCO};
  margin: 0 16px;
  margin-top: 18px;
`;

const View = styled.View`
  flex: 1;
  padding: 15px;
  background-color: ${CORES.BRANCO};
`;

const AlertaBar = styled(Snackbar)`
  background-color: ${CORES.PRETO30};
`;

const EntradaTexto = styled(TextInput)`
  margin-bottom: 20px;
  margin-top: ${props => (props.margintop ? props.margintop : '0px')};
`;

const BotaoForm = styled(Button)`
  border-radius: 50px;
  width: 150px;
  height: 45px;
  align-self: flex-end;
  justify-content: center;
  margin: 20px;
  background-color: ${CORES.LARANJA};
`;

const BotaoFormDisable = styled(Button)`
  border-radius: 50px;
  width: 150px;
  height: 45px;
  align-self: flex-end;
  /* align-items: flex-end; */
  justify-content: center;
  margin: 20px;
`;

export {
  Container,
  View,
  EntradaTexto,
  AlertaBar,
  BotaoForm,
  BotaoFormDisable
};
