import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { BotaoLaranja } from '../../components/Botoes/BotoesCirculares';
import ROTAS from '../../constantes/rotas';
import {
  ContainerBody,
  RowButton,
} from './styles';
import FormContext from '../../context/FormContext';
import FormInfoPessoal from '../../components/FormPessoa/FormInfoPessoal';

export default function PreCadastroInfoPessoal() {
  const navigator = useNavigation();
  const {
    errors,
    trigger,
  } = useContext(FormContext);

  const hasErrors = errors.nome
    || errors.email
    || errors.telefone
    || errors.cpf
    || errors.cidadeId;

  return (
    <>
      <ContainerBody>
        <ScrollView>
          <FormInfoPessoal hiddenActionButton />
          <RowButton>
            <BotaoLaranja
              disabled={hasErrors}
              onPress={async () => {
                await trigger(['nome', 'email', 'telefone', 'cpf', 'cidadeId']);
                if (hasErrors) return;
                navigator.navigate(ROTAS.PRE_CADASTRO_PROFISSIONAL);
              }}
            >
              Continuar
            </BotaoLaranja>
          </RowButton>
        </ScrollView>
      </ContainerBody>
    </>
  );
}
