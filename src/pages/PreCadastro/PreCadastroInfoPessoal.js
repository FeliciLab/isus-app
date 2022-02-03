import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { BotaoLaranja } from '~/components/Botoes/BotoesCirculares';
import FormInfoPessoal from '~/components/FormPessoa/FormInfoPessoal';
import ROTAS from '~/constantes/rotas';
import FormContext from '~/context/FormContext';
import { ContainerBody, RowButton } from './styles';

export default function PreCadastroInfoPessoal() {
  const navigator = useNavigation();

  const { errors, trigger } = useContext(FormContext);

  const hasErrors =
    errors.nome ||
    errors.email ||
    errors.telefone ||
    errors.cpf ||
    errors.cidadeId;

  return (
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
            }}>
            Continuar
          </BotaoLaranja>
        </RowButton>
      </ScrollView>
    </ContainerBody>
  );
}
