import styled from 'styled-components/native';
import { Button } from 'react-native-paper';


const SafeArea = styled.SafeAreaView`
  flex: 1;
`;
const ConteudoTopo = styled.View`
  background-color: #000;
`;

const ConteudoCentral = styled.View`
  flex: 3;
  align-items: center;
  justify-content: space-between;
`;

// Footer and View Content
const Conteudo = styled.View`
  flex: 1;
`;

const ConteudoImagem = styled.View`
  flex: 2;
  align-items: flex-end;
  flex-direction: column-reverse;
  margin-bottom: 5px;
`;

const ConteudoPularTutorial = styled.View`
  margin-top: 60px;
  right: 40px;
  flex-direction: row-reverse;
`;

const PularTutorial = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  text-align: center;
  letter-spacing: 0.75;
  text-transform: uppercase;
  color: #F2F2F2;
`;

const ConteudoDescricao = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
`;

const TituloDescricao = styled.Text`
  color: #F2F2F2;
  text-align: center;
  font-size: 34px;
`;

const TextoDescricao = styled.Text`
  align-self: center;
  max-width: 278px;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 28px;
  text-align: center;
  letter-spacing: 0.5;
  color: #FFFFFF;
`;

const Botao = styled(Button)`
  border-radius: 200px;
  margin: 10px 16px;
  padding: 5px 22px;
`;

const BotaoCadastro = styled(Botao)`
  background-color: #ffffff
`;


export {
  ConteudoTopo,
  Botao,
  TextoDescricao,
  TituloDescricao,
  ConteudoDescricao,
  PularTutorial,
  ConteudoImagem,
  Conteudo,
  ConteudoCentral,
  SafeArea,
  BotaoCadastro,
  ConteudoPularTutorial
};
