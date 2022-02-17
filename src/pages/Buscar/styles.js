import styled from 'styled-components/native';
import { Caption, Headline, Subheading } from 'react-native-paper';

export const ViewColumn = styled.View`
  flex: 1;
`;

export const CabecalhoVazio = styled(Headline)`
  top: 15%;
  width: 100%;
  text-align: center;
  font-weight: bold;
`;

export const SubCabecalhoVazio = styled(Subheading)`
  top: 15%;
  width: 100%;
  text-align: center;
`;

export const Legenda = styled(Caption)`
  flex: 1;
  align-content: center;
  flex-direction: row;
  padding: 10px;
  font-size: 15px;
  color: #00000099;
  font-style: normal;
  font-weight: normal;
  line-height: 28px;
  letter-spacing: 0.5px;
`;

export const Negrito = styled.Text`
  font-weight: bold;
`;

export const ViewWhite = styled.View`
  background-color: #fff;
`;

export const WhiteTouchable = styled.TouchableOpacity`
  background-color: #fff;
`;

export const ViewRowCentering = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 13px;
`;

export const ViewImg = styled.View`
  height: 80px;
  width: 80px;
  margin-left: 32px;
`;

export const ImagePost = styled.Image`
  height: 80px;
  width: 80px;
  margin-left: 32px;
`;

export const TouchableLeft = styled.TouchableOpacity`
  margin-left: 20px;
`;

export const TouchableRight = styled.TouchableOpacity`
  margin-right: 23px;
`;

export const TextSearch = styled.TextInput`
  background-color: transparent;
  width: 200px;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 28px;
  letter-spacing: 0.5px;
  color: #f2f2f2;
  opacity: 0.87;
`;
