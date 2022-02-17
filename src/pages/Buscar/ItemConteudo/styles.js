import styled from 'styled-components/native';
import { CORES } from '~/constantes/estiloBase';

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  padding: 8px;
  background-color: #fff;
`;

export const ImagePost = styled.Image`
  width: 30%;
  height: 80px;
  border-radius: 8px;
  background-color: ${CORES.CINZA};
`;

export const LeftContent = styled.View`
  width: 70%;
  padding: 8px;
  justify-content: space-between;
`;

export const PostTitle = styled.Text`
  font-size: 16px;
  color: ${CORES.PRETO54};
  font-weight: normal;
  line-height: 16px;
`;

export const PostDate = styled.Text`
  font-size: 12px;
  color: ${CORES.VERDE};
  font-weight: normal;
  letter-spacing: 0.5px;
`;
