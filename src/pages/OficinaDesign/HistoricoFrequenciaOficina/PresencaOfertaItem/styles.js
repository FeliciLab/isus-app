import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 8px 4px;
`;

export const Content = styled.View`
  margin-left: 10px;
`;

export const Date = styled.Text`
  text-transform: capitalize;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.15px;
  color: rgba(0, 0, 0, 0.87);
`;
