import styled from 'styled-components/native';
import { Button } from 'react-native-paper';
import IconFarolDenunciar from '../../assets/icons/forcaTarefa/farolDenuncia.svg';

const Container = styled.View`
  background-color: #fff;
  align-items: center;
`;

const ScrollView = styled.ScrollView`
  background-color: #fff;
`;

const ImagemFarol = styled(IconFarolDenunciar)`
  height: 191px;
  margin-top: 32px;
`;

const Titulo = styled.Text`
    margin-top: 28px;
    font-weight: bold;
    font-size: 20px;
    line-height: 23px;
    letter-spacing: 0.15px;
    margin-left: 16px;
    margin-right: 16px;
    text-align: center;
`;

const TextoEmailLigacao = styled.Text`
  margin-left: 20px;
  margin-right: 20px;
  text-decoration-line: underline;
`;
const TextoEmail = styled.Text`
    margin-top: 32px;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.25px;
    margin-left: 16px;
    margin-right: 16px;
    text-align: center;
    color: rgba(0, 0, 0, 0.6);
`;

const BotaoEmail = styled(Button)`
    border-radius: 50px;
    margin-left: 16px;
    margin-right: 17px;
    height: 44px;
    justify-content: center;
    margin-top: 32px;
    border-color: #fff;
`;

const BotaoLigarSus = styled(Button)`
  margin-left: 16px;
  margin-right: 17px;
  height: 44px;
  justify-content: center;
  margin-top: 16px;
`;

const MandeEmail = styled.Text`
  font-weight: bold;
`;

const FaleLigacao = styled.Text`
  font-weight: bold;
`;

const RecipienteBotaoEmail = styled.View`
  width: 100%;
  justify-content: center;
`;

const Termos = styled.Text`
    font-size: 12px;
    color: rgba(0, 0, 0, 0.54);
    text-align: center;
    height: 32px;
    margin-top: 16px;
    margin-bottom: 16px;
`;

const TermosLink = styled.Text`
  text-decoration-line: underline;
`;

export {
  Container,
  ScrollView,
  ImagemFarol,
  Titulo,
  TextoEmail,
  BotaoEmail,
  BotaoLigarSus,
  Termos,
  TermosLink,
  RecipienteBotaoEmail,
  MandeEmail,
  FaleLigacao,
  TextoEmailLigacao
};
