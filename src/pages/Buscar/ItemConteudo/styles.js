import { Caption } from 'react-native-paper';
import styled from 'styled-components/native';

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

export const ImagePost = styled.Image`
  height: 80px;
  width: 80px;
  margin-left: 32px;
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

export const ViewImg = styled.View`
  height: 80px;
  width: 80px;
  margin-left: 32px;
`;
