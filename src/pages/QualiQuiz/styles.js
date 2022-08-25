import styled from 'styled-components/native';
import { CORES } from '~/constantes/estiloBase';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${CORES.QUALIQUIZ_LIGTH};
`;

export const Content = styled.View`
  align-items: center;
  justify-content: center;
`;

export const TextContent = styled.Text`
  text-align: center;
  color: ${CORES.BRANCO};
  line-height: 19px;
  font-weight: 500;
  font-size: 16.5px;
  margin-top: 38px;
`;
