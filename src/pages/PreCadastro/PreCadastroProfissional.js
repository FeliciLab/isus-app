import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { perfilUsuario } from '~/apis/apiCadastro';
import { BotaoLaranja } from '~/components/Botoes/BotoesCirculares';
import FormProfissional from '~/components/FormPessoa/FormProfissional';
import ROTAS from '~/constantes/rotas';
import FormContext from '~/context/FormContext';
import useAutenticacao from '~/hooks/useAutenticacao';
import { atualizarUsuario } from '~/services/usuarioService';
import { ContainerBody, RowButton } from './styles';

const PreCadastroProfissional = () => {
  const navigator = useNavigation();

  const { getValues } = useContext(FormContext);

  const { setUser, token, alterarPessoa } = useAutenticacao();

  const [isLoading, setIsLoading] = useState(false);

  const handlerOnPressConcluir = async () => {
    try {
      setIsLoading(true);

      await atualizarUsuario(getValues());

      const perfil = await perfilUsuario(token);

      await setUser(perfil.data);

      await alterarPessoa(perfil.data);

      console.log('atualizando perfil', perfil.data);

      navigator.navigate(ROTAS.PRE_CADASTRO_SUCESSO);
    } catch (error) {
      console.log('problema ao atualizar perfil no context', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ContainerBody>
      <ScrollView>
        <FormProfissional hiddenActionButton />
        <RowButton>
          <BotaoLaranja loading={isLoading} onPress={handlerOnPressConcluir}>
            Concluir
          </BotaoLaranja>
        </RowButton>
      </ScrollView>
    </ContainerBody>
  );
};

export default PreCadastroProfissional;
