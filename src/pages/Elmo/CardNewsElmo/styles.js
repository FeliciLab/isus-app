import styled from 'styled-components/native';
import { CORES } from '~/constantes/estiloBase';

export const Container = styled.TouchableOpacity`
  width: 50%;
  padding: 8px;
  margin-bottom: 16px;
`;

export const DateText = styled.Text`
  font-weight: 500;
  font-size: 10px;
  line-height: 16px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: ${CORES.VERDE};
`;

export const PostImage = styled.Image`
  height: 100px;
  width: 100%;
  border-radius: 8px;
  background-color: ${CORES.CINZA};
`;

export const PostTitle = styled.Text`
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0.25px;
  color: 'rgba(0, 0, 0, 0.87)';
`;
