import styled from 'styled-components/native';
import { CORES } from '../../../constantes/estiloBase';

const ConteudoDoTexto = styled.View`
  margin: 0 16px;
  margin-bottom: 50px;
`;

const Texto = styled.Text`
  color: ${CORES.BRANCO};
  font-size: 20px;
  text-align: center;
  font-weight: bold;
  line-height: 23.44px;
`;

export {
  ConteudoDoTexto,
  Texto
};
