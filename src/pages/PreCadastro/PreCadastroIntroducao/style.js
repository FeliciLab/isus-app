import { Dimensions, ImageBackground } from 'react-native';
import { Paragraph } from 'react-native-paper';
import styled from 'styled-components/native';

export const ContainerPage = styled(ImageBackground)`
  flex: 1;
  justify-content: flex-end;
`;

export const ContainerBody = styled.View`
  justify-content: space-between;
  margin-bottom: 30px;
  height: ${Math.floor(Dimensions.get('window').width * 0.6)}px;
`;

export const RowTextIntro = styled.View`
  justify-content: center;
  align-items: center;
  padding: 30px;
`;
export const RowButton = styled.View`
  align-items: flex-end;
  padding-right: 12px;
`;

export const TextTitle = styled(Paragraph)`
  font-weight: 500;
  font-size: 20px;
  margin-bottom: 10px;
`;

export const TextBody = styled(Paragraph)`
  font-weight: 400;
  font-size: 14px;
`;

export default {
  ContainerPage,
};
