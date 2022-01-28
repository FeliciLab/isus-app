import { useNavigation } from '@react-navigation/native';
import React, { useContext, useLayoutEffect, useState } from 'react';
import Alerta from '~/components/alerta';
import BarraDeStatus from '~/components/barraDeStatus';
import FormProfissional from '~/components/FormPessoa/FormProfissional';
import { cabecalhoVoltar } from '~/components/layoutEffect/cabecalhoLayout';
import { CORES } from '~/constantes/estiloBase';
import ROTAS from '~/constantes/rotas';
import CONST_TEXT from '~/constantes/textos';
import FormContext from '~/context/FormContext';
import useAutenticacao from '~/hooks/useAutenticacao';
import { atualizarUsuario } from '~/services/usuarioService';
import {
  analyticsCategoria,
  analyticsUnidadeServico,
} from '~/utils/funcoesAnalytics';
import { ConteudoFormulario, SafeArea, TituloPrincipal } from './styles';

function EdicaoInfoProfissional() {
  const navigation = useNavigation();

  const { handleSubmit, getValues } = useContext(FormContext);

  const { pessoa } = useAutenticacao();

  const [exibicaoDoAlerta, setExibicaoDoAlerta] = useState(false);

  const [mensagemDoAlerta, setMensagemDoAlerta] = useState('');

  const now = Date.now();

  useLayoutEffect(() => {
    cabecalhoVoltar({
      navegador: navigation,
      titulo: CONST_TEXT.PERFIL.EDICAO_INFO_PROFISSIONAL.CABECALHO,
      cor: 'brancoPreto',
    });
  }, []);

  const mostrarAlerta = mensagem => {
    setExibicaoDoAlerta(true);
    setMensagemDoAlerta(mensagem);
  };

  return (
    <SafeArea>
      <BarraDeStatus backgroundColor="#ffffff" barStyle="dark-content" />
      <ConteudoFormulario>
        <TituloPrincipal>
          Vamos agora adicionar suas informações profissionais, para isso,
          selecione as opções abaixo:
        </TituloPrincipal>
      </ConteudoFormulario>
      <FormProfissional
        labelButton="Salvar"
        actionPress={handleSubmit(async () => {
          try {
            const result = await atualizarUsuario(
              {
                ...pessoa,
                ...getValues(),
              },
              { somenteProfissionais: true },
            );
            if (result) {
              navigation.navigate('TelaDeSucesso', {
                textoApresentacao:
                  CONST_TEXT.PERFIL.EDICAO_INFO_PESSOAIS.MSG_SUCESSO,
                telaDeRedirecionamento: ROTAS.PERFIL,
                telaDeBackground: CORES.VERDE,
              });
              const categoriaProfissional = JSON.stringify(
                result.categoriaProfissional,
              );
              const uniServ = result.unidadeServico;
              analyticsCategoria(
                categoriaProfissional,
                now,
                'Atualização Cadastro',
              );
              analyticsUnidadeServico(uniServ, now, 'Atualização Cadastro');
            }
          } catch (e) {
            console.log(e);
            mostrarAlerta(
              CONST_TEXT.PERFIL.EDICAO_INFO_PROFISSIONAL.MSG_ERRO_SALVAR,
            );
          }
        })}
      />
      <Alerta
        visivel={exibicaoDoAlerta}
        textoDoAlerta={mensagemDoAlerta}
        duration={4000}
        onDismiss={() => setExibicaoDoAlerta(false)}
      />
    </SafeArea>
  );
}

export default EdicaoInfoProfissional;
