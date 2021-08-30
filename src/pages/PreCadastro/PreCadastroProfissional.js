import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  ContainerBody,
  RowButton,
} from './styles';
import { BotaoLaranja } from '../../components/Botoes/BotoesCirculares';
import ROTAS from '../../constantes/rotas';
import FormContext from '../../context/FormContext';
import { atualizarUsuario } from '../../services/usuarioService';
import FormProfissional from '../../components/FormPessoa/FormProfissional';

const PreCadastroProfissional = () => {
  const navigator = useNavigation();
  const { getValues } = useContext(FormContext);

  return (
    <>
      <ContainerBody>
        <ScrollView>
          <FormProfissional hiddenActionButton />
          <RowButton>
            <BotaoLaranja
              onPress={async () => {
                const result = await atualizarUsuario(getValues());
                if (!result) {
                  return;
                }
                navigator.navigate(
                  ROTAS.PRE_CADASTRO_SUCESSO,
                  { usuario: result }
                );
              }}
            >
              Concluir
            </BotaoLaranja>
          </RowButton>
        </ScrollView>
      </ContainerBody>
    </>
  );
};

export default PreCadastroProfissional;
