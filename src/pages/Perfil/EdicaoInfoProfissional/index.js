import React, {
  useContext, useState, useLayoutEffect
} from 'react';
import { useNavigation } from '@react-navigation/native';
import FormContext from '../../../context/FormContext';
import Alerta from '../../../components/alerta';
import BarraDeStatus from '../../../components/barraDeStatus';
import {
  SafeArea, ConteudoFormulario, TituloPrincipal
} from './styles';
import FormProfissional from '../../../components/FormPessoa/FormProfissional';
import { cabecalhoVoltar } from '../../../components/layoutEffect/cabecalhoLayout';
import CONST_TEXT from '../../../constantes/textos';
import ROTAS from '../../../constantes/rotas';
import { atualizarUsuario } from '../../../services/usuarioService';
import { CORES } from '../../../constantes/estiloBase';
import { AutenticacaoContext } from '../../../context/AutenticacaoContext';
import { analyticsCategoria, analyticsUnidadeServico } from '../../../utils/funcoesAnalytics';

function EdicaoInfoProfissional() {
  const navigation = useNavigation();

  const { handleSubmit, getValues } = useContext(FormContext);
  const { pessoa } = useContext(AutenticacaoContext);

  const [exibicaoDoAlerta, alterarExibicaoDoAlerta] = useState(false);
  const [mensagemDoAlerta, alterarMensagemDoAlerta] = useState('');
  const now = Date.now();
  useLayoutEffect(() => {
    cabecalhoVoltar({
      navegador: navigation,
      titulo: CONST_TEXT.PERFIL.EDICAO_INFO_PROFISSIONAL.CABECALHO,
      cor: 'brancoPreto'
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
      <ConteudoFormulario>
        <TituloPrincipal>
          Vamos agora adicionar suas informações profissionais,
          para isso, selecione as opções abaixo:
        </TituloPrincipal>
      </ConteudoFormulario>
      <FormProfissional
        labelButton="Salvar"
        actionPress={handleSubmit(async () => {
          try {
            const result = await atualizarUsuario(
              {
                ...pessoa,
                ...getValues()
              },
              { somenteProfissionais: true }
            );
            if (result) {
              navigation.navigate('TelaDeSucesso',
                {
                  textoApresentacao: CONST_TEXT.PERFIL.EDICAO_INFO_PESSOAIS.MSG_SUCESSO,
                  telaDeRedirecionamento: ROTAS.PERFIL,
                  telaDeBackground: CORES.VERDE
                });
              const categoriaProfissional = JSON.stringify(result.categoriaProfissional);
              const uniServ = result.unidadeServico;
              analyticsCategoria(categoriaProfissional, now, 'Atualização Cadastro');
              analyticsUnidadeServico(uniServ, now, 'Atualização Cadastro');
            }
          } catch (e) {
            console.log(e);
            mostrarAlerta(CONST_TEXT.PERFIL.EDICAO_INFO_PROFISSIONAL.MSG_ERRO_SALVAR);
          }
        })}
      />

      <Alerta
        visivel={exibicaoDoAlerta}
        textoDoAlerta={mensagemDoAlerta}
      />
    </SafeArea>
  );
}

export default EdicaoInfoProfissional;
