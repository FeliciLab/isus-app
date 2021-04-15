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
import FormProfissional from '../../../components/FormPessoa/FormProfissional';
import { cabecalhoVoltar } from '../../../components/layoutEffect/cabecalhoLayout';
import CONST_TEXT from '../../../constantes/textos';
import ROTAS from '../../../constantes/rotas';
import { atualizarUsuario } from '../../../services/usuarioService';
import { CORES } from '../../../constantes/estiloBase';
import { AutenticacaoContext } from '../../../context/AutenticacaoContext';

function EdicaoInfoProfissional() {
  const navigation = useNavigation();

  const { handleSubmit, getValues } = useContext(FormContext);
  const { pessoa } = useContext(AutenticacaoContext);

  const [exibicaoDoAlerta, alterarExibicaoDoAlerta] = useState(false);
  const [mensagemDoAlerta, alterarMensagemDoAlerta] = useState('');

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
      <Scroll>
        <ConteudoFormulario>
          <TituloPrincipal>
            Vamos agora adicionar suas informações profissionais,
            para isso, selecione as opções abaixo:ssssssssssS
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
                { somentePessoais: true }
              );
              if (result) {
                navigation.navigate('TelaDeSucesso',
                  {
                    textoApresentacao: CONST_TEXT.PERFIL.EDICAO_INFO_PESSOAIS.MSG_SUCESSO,
                    telaDeRedirecionamento: ROTAS.PERFIL,
                    telaDeBackground: CORES.VERDE
                  });
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

      </Scroll>
    </SafeArea>
  );
}

export default EdicaoInfoProfissional;
