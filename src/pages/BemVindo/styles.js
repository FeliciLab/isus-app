import styled from 'styled-components/native';
import { Button } from 'react-native-paper';

export const SafeArea = styled.SafeAreaView`
  flex: 1;
`;
export const ConteudoTopo = styled.View`
  background-color: #000;
`;

export const ConteudoCentral = styled.View`
  flex: 3;
  align-items: center;
  justify-content: space-between;
`;

// Footer and View Content
export const Conteudo = styled.View`
  flex: 1;
`;

export const ConteudoImagem = styled.View`
  flex: 2;
  align-items: flex-end;
  flex-direction: column-reverse;
  margin-bottom: 5px;
`;

export const ConteudoPularTutorial = styled.View`
  margin-top: 60px;
  right: 40px;
  flex-direction: row-reverse;
`;

export const PularTutorial = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  text-align: center;
  letter-spacing: 0.75px;
  text-transform: uppercase;
  color: #f2f2f2;
`;

export const ConteudoDescricao = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
`;

export const TituloDescricao = styled.Text`
  color: #f2f2f2;
  text-align: center;
  font-size: 34px;
`;

export const TextoDescricao = styled.Text`
  align-self: center;
  max-width: 278px;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 28px;
  text-align: center;
  letter-spacing: 0.5px;
  color: #ffffff;
`;

export const Botao = styled(Button)`
  border-radius: 200px;
  margin: 10px 16px;
  padding: 5px 22px;
`;

export const BotaoCadastro = styled(Botao)`
  background-color: #ffffff;
`;
