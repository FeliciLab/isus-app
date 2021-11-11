import styled from 'styled-components/native';
import { CORES } from '../../../constantes/estiloBase';

export const ConteudoTermo = styled.View`
  margin: 30px 40px;
`;

export const TextoTermo = styled.Text`
  text-align: center;
  color: ${CORES.BRANCO};
  font-size: 12px;
`;

export const TextoLink = styled.Text`
  text-decoration: underline;
  text-decoration-color: ${CORES.BRANCO};
`;
