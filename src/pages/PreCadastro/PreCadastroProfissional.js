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
import { perfilUsuario } from '../../apis/apiCadastro';
import { AutenticacaoContext } from '../../context/AutenticacaoContext';

const PreCadastroProfissional = () => {
  const navigator = useNavigation();
  const { getValues } = useContext(FormContext);
  const {
    alterarDadosUsuario,
    tokenUsuario,
    alterarPessoa
  } = useContext(AutenticacaoContext);

  const atualizarAutenticacao = async () => {
    const perfil = await perfilUsuario(tokenUsuario);
    console.log('atualizando perfil', perfil.data);
    alterarDadosUsuario(perfil.data);
    alterarPessoa(perfil.data);
  };

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

                try {
                  await atualizarAutenticacao();
                } catch (e) {
                  console.log('problema ao atualizar perfil no context');
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
