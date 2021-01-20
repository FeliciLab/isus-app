import styled from 'styled-components/native';
import {
  TouchableOpacity, Dimensions
} from 'react-native';
import { Button, Card } from 'react-native-paper';
import { CORES } from '../constantes/estiloBase';

const Container = styled.View`
  background-color: #fff;
  margin: 0 16px;
  margin-top: 18px;
`;

const ScrollView = styled.ScrollView`
  background-color: #fff;
  flex: 1;
  padding: 14px;
  margin-bottom: 20px;
`;

const View = styled.View`
  justify-content: center;
  display: flex;
  flex-direction: row;
  padding-top: 26px;
`;

const CentralizarItensView = styled.View`
  justify-content: center;
  width: 100%;
`;

const Lista = styled.View`
  margin-top: 24px;
`;

const CardSemConteudo = styled(Card)`
  margin: 16px;
  padding: 16px;
`;

const TituloH6 = styled.Text`
  /* styleName: H6; */
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 23px;
  text-align: left;
  margin-top: 28px;
  margin-left: 8px;
`;
const Titulo = styled.Text`
  /* styleName: H5; */
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: 0px;
  text-align: left;
  margin-left: 8px;
  margin-top: 24px;
`;

const TextoCentralizado = styled.Text`
  text-align: center;
  align-items: center;
  margin-top: ${props => (props.marginTop ? props.marginTop : '0px')};
  width: 100%;
  color: ${props => (props.color ? props.color : 'black')};
`;

const Texto = styled.Text`
  /* styleName: Body 2; */
  font-size: 14px;
  font-style: ${props => (props.fontStyle ? props.fontStyle : 'normal')};
  font-weight: ${props => (props.fontWeight ? props.fontWeight : 400)};
  line-height: 20px;
  letter-spacing: 0.25px;
  text-align: left;
  color: rgba(0, 0, 0, 0.6);
`;

const Conteudo = styled(TouchableOpacity)`
  height: 200px;
  width: ${Dimensions.get('window').width / 2.2}px;
  align-items: center;
  margin: 5px;
`;


const Botao = styled(Button)`
  justify-content: center;
  align-items: ${props => (props.alignItems ? props.alignItems : 'center')};
  margin: 0 16px;
  margin-top: 20px;
  background-color: ${props => (props.backgroundColor ? props.backgroundColor : CORES.BRANCO)};
 `;

export {
  Container,
  ScrollView,
  View,
  CentralizarItensView,
  Titulo,
  TituloH6,
  TextoCentralizado,
  Texto,
  Botao,
  Lista,
  CardSemConteudo,
  Conteudo
};
