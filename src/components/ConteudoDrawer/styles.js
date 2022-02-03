import styled from 'styled-components/native';
import { CORES } from '../../constantes/estiloBase';

export const ConteudoVersao = styled.View`
  margin: 16px 0;
`;

export const TextoVersao = styled.Text`
  color: ${CORES.PRETO54};
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0.4px;
  margin: 20px;
`;

export const DroidSafeArea = styled.SafeAreaView`
  padding-top: 25px;
  margin-bottom: 150px;
`;

export const ItensInferior = styled.View`
  text-align: left;
  align-content: flex-start;
`;
