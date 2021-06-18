import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

export const Postagem = styled.TouchableOpacity`
  height: 200px;
  width: ${Dimensions.get('window').width / 2.2}px;
  align-items: center;
  margin: 5px;
`;

export const ListaPostagens = styled.FlatList`
  flex: 1;
  align-self: center;
`;

export const ListaPostagemVazia = styled.View`
  justify-content: center;
  width: 100%;
`;

export const TextoSemPostagem = styled.Text`
  color: rgba(0,0,0,0.6);
  margin-top: 20px;
`;
