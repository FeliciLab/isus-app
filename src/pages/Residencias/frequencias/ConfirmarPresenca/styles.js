import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  padding: 24px 20px;
`;

export const Content = styled.View`
  flex: 1;
  margin-top: 20px;
  padding-bottom: 80px;
`;

export const ActivityIndicatorWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-weight: 500;
  font-size: 20px;
  line-height: 23px;
  letter-spacing: 0.15px;
  color: rgba(0, 0, 0, 0.6);
`;

export const SubTitle = styled.Text`
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.15px;
  color: rgba(0, 0, 0, 0.87);
`;

export const AlunoInfo = styled.Text`
  font-weight: 500;
  font-size: 20px;
  line-height: 26px;
  letter-spacing: 0.15px;
  color: rgba(0, 0, 0, 0.87);
`;

export const Warning = styled.Text`
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.25px;
  color: rgba(0, 0, 0, 0.87);
`;
