import styled from 'styled-components/native';
import { List, Button, TextInput } from 'react-native-paper';
import IconDropdown from 'react-native-vector-icons/MaterialIcons';
import { Paragraph } from 'react-native-paper';
import { CORES } from '~/constantes/estiloBase';

// removido o styled.SafeAreaView pois já tem um SafeAreaView ativo
export const Container = styled.View`
  height: 100%;
  background-color: #ffffff;
`;

export const Scroll = styled.ScrollView`
  padding: 0 16px 0 16px;
`;

export const ConteudoFormulario = styled.View`
  margin-top: 24px;
`;

export const CampoDeTexto = styled(TextInput)`
  padding-top: 16px;
  background-color: #fff;
`;

export const TituloPrincipal = styled.Text`
  font-size: 24px;
  line-height: 28px;
  color: rgba(0, 0, 0, 0.87);
  margin-bottom: 24px;
  max-width: 359px;
`;

export const Acordeon = styled(List.Accordion)`
  border-color: 'rgba(25, 25, 25, 0.32)';
  border-width: 2px;
  margin-top: 16px;
`;

export const Titulo = styled.Text`
  font-size: 18px;
  color: rgba(25, 25, 25, 0.32);
`;

export const Destaque = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const BotaoSalvar = styled(Button)`
  border-radius: 50px;
  width: 150px;
  height: 45px;
  margin: 30px;
  align-self: flex-end;
  justify-content: center;
  background-color: #ff9800;
`;

export const ConteudoDropdown = styled.View`
  margin-top: 14px;
`;

export const IconeDropdown = styled(IconDropdown)`
  position: absolute;
  right: 8px;
  top: 30px;
  font-size: 25px;
`;

export const TextoDeErro = styled.Text`
  color: red;
  margin-top: 0;
`;

export const Title = styled(Paragraph)`
  font-weight: 500;
  font-size: 20px;
  margin-bottom: 10px;
`;

export const ContainerBody = styled.View`
  flex: 1;
  justify-content: space-between;
  background-color: ${CORES.BRANCO};
`;

export const ContainerForm = styled.View`
  margin-top: 15px;
`;

export const RowInput = styled.View`
  margin-top: 14px;
  margin-bottom: 14px;
`;

export const RowButton = styled.View`
  align-self: flex-end;
  margin-bottom: 20px;
`;
