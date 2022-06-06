import { useNavigation } from '@react-navigation/native';
import React from 'react';
import BgIntro from '~/assets/images/idsaude/bgIntro.png';
import CustonFAB from '~/components/CustonFAB/index';
import ROTAS from '~/constantes/rotas';
import {
  ContainerBody,
  Container,
  RowButton,
  RowTextIntro,
  TextBody,
  TextTitle,
} from './style';

export default function PreCadastroIntroducao() {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate(ROTAS.PRE_CADASTRO_INFO_PESSOAL);
  };

  return (
    <Container source={BgIntro}>
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
          <CustonFAB
            labelStyle={{ color: '#fff' }}
            mode="contained"
            onPress={onPress}
            label="Continuar"
            small
          />
        </RowButton>
      </ContainerBody>
    </Container>
  );
}
