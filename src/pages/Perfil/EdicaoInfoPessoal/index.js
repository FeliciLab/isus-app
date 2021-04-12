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

function EdicaoInfoPessoal() {
  const {
    getValues,
    handleSubmit
  } = useContext(FormContext);

  const [exibicaoDoAlerta, alterarExibicaoDoAlerta] = useState(false);
  const [mensagemDoAlerta, alterarMensagemDoAlerta] = useState('');
  const navigation = useNavigation();

  useLayoutEffect(() => {
    cabecalhoVoltarRota({
      navegador: navigation,
      titulo: CONST_TEXT.PERFIL.EDICAO_INFO_PESSOAIS.CABEÇALHO,
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
          <TituloPrincipal>
            Edite as informações pessoais que você deseja atualizar:
          </TituloPrincipal>
        </ConteudoFormulario>

        <FormInfoPessoal
          actionPress={handleSubmit(async () => {
            try {
              const result = await atualizarUsuario(getValues(), { somentePessoais: true });
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
