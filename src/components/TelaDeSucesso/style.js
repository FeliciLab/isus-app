import styled from 'styled-components/native';
import { CORES } from '../../constantes/estiloBase';

export const SafeArea = styled.SafeAreaView`
  height: '100%';
  align-items: 'center';
  justify-content: 'center';
`;

export const Text = styled.Text`
  text-align: 'center';
  font-size: 24px;
  color: ${CORES.BRANCO};
  margin-top: 32px;
  margin-left: 10px;
  margin-right: 10px;
`;

export default SafeArea;
