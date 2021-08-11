import React, {
  useContext, useState, useLayoutEffect
} from 'react';
import { useNavigation } from '@react-navigation/native';
import FormContext from '../../../context/FormContext';
import Alerta from '../../../components/alerta';
import BarraDeStatus from '../../../components/barraDeStatus';
import {
  SafeArea, Scroll, ConteudoFormulario, TituloPrincipal
} from './styles';
import FormInfoPessoal from '../../../components/FormPessoa/FormInfoPessoal';
import CONST_TEXT from '../../../constantes/textos';
import ROTAS from '../../../constantes/rotas';
import { CORES } from '../../../constantes/estiloBase';
import { cabecalhoVoltarRota } from '../../../components/layoutEffect/cabecalhoLayout';
import { atualizarUsuario } from '../../../services/usuarioService';
import { AutenticacaoContext } from '../../../context/AutenticacaoContext';
import useAnalytics from '../../../hooks/Analytics';
import { labelsAnalytics } from '../../../constantes/labelsAnalytics';

function EdicaoInfoPessoal() {
  const { analyticsData } = useAnalytics();
  const { handleSubmit, getValues } = useContext(FormContext);

  const { pessoa } = useContext(AutenticacaoContext);

  const [exibicaoDoAlerta, alterarExibicaoDoAlerta] = useState(false);
  const [mensagemDoAlerta, alterarMensagemDoAlerta] = useState('');
  const navigation = useNavigation();

  useLayoutEffect(() => {
    cabecalhoVoltarRota({
      navegador: navigation,
      titulo: CONST_TEXT.PERFIL.EDICAO_INFO_PESSOAIS.CABECALHO,
      cor: 'brancoPreto',
      rota: ROTAS.PERFIL
    });
  });

  const mostrarAlerta = (mensagem) => {
    alterarExibicaoDoAlerta(true);
    alterarMensagemDoAlerta(mensagem);
    setTimeout(() => alterarExibicaoDoAlerta(false), 4000);
  };

  return (
    <SafeArea>
      <BarraDeStatus
        backgroundColor="#ffffff"
        barStyle="dark-content"
      />
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
                  ...getValues()
                },
                { somentePessoais: true }
              );
              if (result) {
                analyticsData(
                  labelsAnalytics.EDITAR_INFORMACOES_PESSOAL,
                  'Click',
                  'atualizar informacao pessoal'
                );
                navigation.navigate('TelaDeSucesso',
                  {
                    textoApresentacao: CONST_TEXT.PERFIL.EDICAO_INFO_PESSOAIS.MSG_SUCESSO,
                    telaDeRedirecionamento: ROTAS.PERFIL,
                    telaDeBackground: CORES.VERDE
                  });
              }
            } catch (e) {
              console.log(e);
              mostrarAlerta('Encontramos erros no formulário. Verifique antes de prosseguir');
            }
          })}
          labelButton="Salvar"
        />

        <Alerta
          visivel={exibicaoDoAlerta}
          textoDoAlerta={mensagemDoAlerta}
        />
      </Scroll>
    </SafeArea>
  );
}

export default EdicaoInfoPessoal;
