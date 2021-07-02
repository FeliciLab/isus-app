import styled from 'styled-components';
import { Dimensions, Platform } from 'react-native';
import { Title, Snackbar } from 'react-native-paper';

export const AreaConteudo = styled.SafeAreaView`
  flex: 1;
  background-color: #ffffff;
  padding-top: ${Platform.OS === 'android' ? 25 : 0}px;
`;

export const CorpoPrincipal = styled.View`
   flex: 1;
   background-color: #fff;
`;

export const Titulo = styled(Title)`
  margin-top: 24px;
  margin-left: 16px;
  margin-right: 16px;
  font-weight: normal;
  font-size: 24px;
  line-height: 28px;
  color: #00000099;
  font-style: normal;
`;

export const Espacador = styled.View`
  flex-direction: row;
  margin: 1px;
  justify-content: space-between;
  margin-top: 12px;
`;

export const CorpoConteudo = styled.View`
  width: ${Dimensions.get('window').width}px;
`;

export const ConteudoHtml = styled.View`
  padding: 10px;
  align-content: center;
`;

export const Barra = styled(Snackbar)`
  margin-bottom: ${Dimensions.get('window').height / 9}px;
`;

export const TextoLateral = styled.Text`
  color: rgba(0, 0, 0, 0.6);
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-size: 10px;
  line-height: 16px;
  font-weight: bold;
`;
