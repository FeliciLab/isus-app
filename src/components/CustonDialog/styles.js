import styled from 'styled-components/native';

import { Dialog } from 'react-native-paper';

export const Actions = styled(Dialog.Actions)`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const Title = styled(Dialog.Title)`
  font-weight: 500;
  font-size: 20px;
  line-height: 23px;
  letter-spacing: 0.15px;
  color: rgba(0, 0, 0, 0.87);
`;

export const ContentText = styled.Text`
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.15px;
  color: rgba(0, 0, 0, 0.87);
`;
