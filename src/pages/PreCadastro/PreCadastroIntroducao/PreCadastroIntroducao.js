import { useNavigation } from '@react-navigation/native';
import React from 'react';
import BgIntro from '~/assets/images/idsaude/bgIntro.png';
import { BotaoLaranja } from '~/components/Botoes/BotoesCirculares';
import ROTAS from '~/constantes/rotas';
import {
  ContainerBody,
  ContainerPage,
  RowButton,
  RowTextIntro,
  TextBody,
  TextTitle,
} from './style';

export default function PreCadastroIntroducao() {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate(ROTAS.PRE_CADASTRO);
  };

  return (
    <>
      <ContainerPage source={BgIntro}>
        <ContainerBody>
          <RowTextIntro>
            <TextTitle style={{ fontWeight: 'bold' }}>
              Que bom ter você com a gente!
            </TextTitle>
            <TextBody>
              Falta pouco para concluir o seu cadastro no iSUS. Precisamos
              conhecer você melhor para lhe oferecer conteúdos selecionados de
              acordo com o seu perfil.
            </TextBody>
          </RowTextIntro>
          <RowButton>
            <BotaoLaranja onPress={onPress}>Continuar</BotaoLaranja>
          </RowButton>
        </ContainerBody>
      </ContainerPage>
    </>
  );
}
