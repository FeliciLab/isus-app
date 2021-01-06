import styled from 'styled-components/native';
import { CORES } from '../../constantes/estiloBase';

const ConteudoVersao = styled.View`
  margin: 16px 0;
`;

const TextoVersao = styled.Text`
  color: ${CORES.PRETO54};
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0.4;
  margin: 20px;
`;

const DroidSafeArea = styled.SafeAreaView`
  padding-top: 25px;
  margin-bottom: 150px;
`;

const ItensInferior = styled.View`
  align-items: flex-start;
`;

export {
  ConteudoVersao,
  TextoVersao,
  DroidSafeArea,
  ItensInferior
};
