import styled from 'styled-components/native';
import { Title } from 'react-native-paper';

export const Container = styled.View`
  flex: 1;
  padding: 8px 16px;
  background-color: #fff;
`;

export const AboutHeader = styled.View`
  width: 100%;
  align-items: center;
  padding: 24px 0;
`;

export const AboutHeaderTitle = styled.Text`
  max-width: 200px;
  margin-top: 16px;
  text-align: center;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.87);
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0.15px;
`;

export const TitleISUS = styled(Title)`
  font-size: 20px;
  line-height: 24px;
  font-weight: bold;
  margin-top: 24px;
  color: rgba(0, 0, 0, 0.6);
`;

export const AboutParagraph = styled.Text`
  margin-top: 16px;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.25px;
  color: rgba(0, 0, 0, 0.6);
`;

export const Fotter = styled.View`
  margin: 20px 0;
`;

export const FotterRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const FotterRowWrapper = styled.View`
  width: 150px;
  height: 120px;
  align-items: center;
  justify-content: center;
`;

export const FotterRowGov = styled.View`
  margin: 20px 0;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;
