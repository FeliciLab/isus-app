import { Button } from 'react-native-paper';
import styled from 'styled-components/native';
import { CORES } from '~/constantes/estiloBase';

export const BotaoCircular = styled(Button)`
  justify-content: center;
  align-items: ${props => (props.alignItems ? props.alignItems : 'center')};
  padding: 5px 10px;
  border-radius: 30px;
  background-color: ${props =>
    props.backgroundColor ? props.backgroundColor : CORES.BRANCO};
`;
