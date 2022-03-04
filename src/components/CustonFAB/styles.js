import styled from 'styled-components/native';
import { FAB } from 'react-native-paper';
import { CORES } from '~/constantes/estiloBase';

export const Container = styled(FAB)`
  align-self: center;
  background: ${props => (props.disabled ? CORES.CINZA : CORES.LARANJA)};
  margin: 16px 0;
`;
