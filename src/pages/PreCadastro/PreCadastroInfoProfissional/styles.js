import styled from 'styled-components/native';
import { CORES } from '~/constantes/estiloBase';

export const Container = styled.View`
  flex: 1;
  justify-content: space-between;
  background-color: ${CORES.BRANCO};
  padding: 0 16px 16px;
`;

export const RowButton = styled.View`
  align-self: flex-end;
  margin-top: 40px;
  margin-bottom: 20px;
`;
