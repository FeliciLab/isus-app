import { Platform } from 'react-native';
import React, { useContext } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import {
  ContainerBody,
  ContainerForm,
  RowButton,
  RowInput,
  Title
} from './styles';
import { CORES } from '../../constantes/estiloBase';
import { BotaoLaranja } from '../../components/Botoes/BotoesCirculares';
import ROTAS from '../../constantes/rotas';
import InputCategoria from './InputCategoria';
import InputEspecialidades from './InputEspecialidades';
import InputSetores from './InputSetores';
import FormContext from '../../context/FormContext';

const PreCadastroProfissional = () => {
  const navigator = useNavigation();
  const { getValues } = useContext(FormContext);

  return (
    <KeyboardAwareScrollView
      extraScrollHeight={500}
      keyboardOpeningTime={100}
      enableAutomaticScroll={Platform.OS === 'ios'}
      style={{ backgroundColor: CORES.BRANCO }}
      enableOnAndroid
    >
      <ContainerBody>
        <ContainerForm>
          <Title>Cadastro Profissional</Title>
          <RowInput>
            <InputCategoria />
          </RowInput>
          <RowInput>
            <InputEspecialidades />
          </RowInput>
          <RowInput>
            <InputSetores />
          </RowInput>
        </ContainerForm>
        <RowButton>
          <BotaoLaranja
            onPress={() => navigator.navigate(ROTAS.PRE_CADASTRO_SENHA)}
          >
            Concluir
          </BotaoLaranja>
        </RowButton>
      </ContainerBody>
    </KeyboardAwareScrollView>
  );
};

export default PreCadastroProfissional;
