import { styled } from 'styled-components/native';
import { CORES } from '../../../constantes/estiloBase';


const ConteudoTermo = styled.View`
  margin: 30px 40px;
`;

const TextoTermo = styled.Text`
  text-align: center;
  color: ${CORES.BRANCO};
  font-size: 12px;
`;

const TextoLink = styled.Text`
  text-decoration: underline
`;

export {
  ConteudoTermo,
  TextoTermo,
  TextoLink
};
