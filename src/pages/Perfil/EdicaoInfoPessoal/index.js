import { useNavigation } from '@react-navigation/native';
import React, { useContext, useLayoutEffect, useState } from 'react';
import useAnalytics from '~/hooks/useAnalytics';
import Alerta from '../../../components/alerta';
import BarraDeStatus from '../../../components/barraDeStatus';
import FormInfoPessoal from '../../../components/FormPessoa/FormInfoPessoal';
import { cabecalhoVoltarRota } from '../../../components/layoutEffect/cabecalhoLayout';
import { CORES } from '../../../constantes/estiloBase';
import { labelsAnalytics } from '../../../constantes/labelsAnalytics';
import ROTAS from '../../../constantes/rotas';
import CONST_TEXT from '../../../constantes/textos';
import { AutenticacaoContext } from '../../../context/AutenticacaoContext';
import FormContext from '../../../context/FormContext';
import { atualizarUsuario } from '../../../services/usuarioService';
import {
  ConteudoFormulario,
  SafeArea,
  Scroll,
  TituloPrincipal,
} from './styles';

function EdicaoInfoPessoal() {
  const navigation = useNavigation();

  const { analyticsData } = useAnalytics();

  const { handleSubmit, getValues } = useContext(FormContext);

  const { pessoa } = useContext(AutenticacaoContext);

  const [exibicaoDoAlerta, setExibicaoDoAlerta] = useState(false);

  const [mensagemDoAlerta, setMensagemDoAlerta] = useState('');

  useLayoutEffect(() => {
    cabecalhoVoltarRota({
      navegador: navigation,
      titulo: CONST_TEXT.PERFIL.EDICAO_INFO_PESSOAIS.CABECALHO,
      cor: 'brancoPreto',
      rota: ROTAS.PERFIL,
    });
  }, []);

  const mostrarAlerta = mensagem => {
    setExibicaoDoAlerta(true);
    setMensagemDoAlerta(mensagem);
  };

  return (
    <SafeArea>
      <BarraDeStatus backgroundColor="#ffffff" barStyle="dark-content" />
      <Scroll>
        <ConteudoFormulario>
          <TituloPrincipal testID="texto">
            Edite as informações pessoais que você deseja atualizar:
          </TituloPrincipal>
        </ConteudoFormulario>

        <FormInfoPessoal
          actionPress={handleSubmit(async () => {
            try {
              const result = await atualizarUsuario(
                {
                  ...pessoa,
                  ...getValues(),
                },
                { somentePessoais: true },
              );
              if (result) {
                analyticsData(
                  labelsAnalytics.EDITAR_INFORMACOES_PESSOAL,
                  'Click',
                  'atualizar informacao pessoal',
                );
                navigation.navigate('TelaDeSucesso', {
                  textoApresentacao:
                    CONST_TEXT.PERFIL.EDICAO_INFO_PESSOAIS.MSG_SUCESSO,
                  telaDeRedirecionamento: ROTAS.PERFIL,
                  telaDeBackground: CORES.VERDE,
                });
              }
            } catch (e) {
              console.log(e);
              mostrarAlerta(
                'Encontramos erros no formulário. Verifique antes de prosseguir',
              );
            }
          })}
          labelButton="Salvar"
        />

        <Alerta
          visivel={exibicaoDoAlerta}
          textoDoAlerta={mensagemDoAlerta}
          duration={4000}
          onDismiss={() => setExibicaoDoAlerta(false)}
        />
      </Scroll>
    </SafeArea>
  );
}

export default EdicaoInfoPessoal;
