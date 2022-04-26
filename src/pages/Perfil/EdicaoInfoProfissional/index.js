import { useNavigation } from '@react-navigation/native';
import { filter, find } from 'lodash';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { atualizarUsuarioApi } from '~/apis/apiCadastro';
import BarraDeStatus from '~/components/barraDeStatus';
import ControlledMultipleSelectModal from '~/components/ControlledMultipleSelectModal/index';
import ControlledSelectModal from '~/components/ControlledSelectModal/index';
import { cabecalhoVoltar } from '~/components/layoutEffect/cabecalhoLayout';
import { PERFIL } from '~/constantes/textos';
import useAutenticacao from '~/hooks/useAutenticacao';
import { useCategoriasProfissionais } from '~/hooks/useCategoriasProfissionais';
import { useEspecialidades } from '~/hooks/useEspecialidades';
import { useServicos } from '~/hooks/useServicos';
import { BotaoSalvar, Container, TituloPrincipal } from './styles';
// import Alerta from '~/components/alerta';
// import FormProfissional from '~/components/FormPessoa/FormProfissional';
// import { CORES } from '~/constantes/estiloBase';
// import FormContext from '~/context/FormContext';
// import ROTAS from '~/constantes/rotas';
// import { atualizarUsuario } from '~/services/usuarioService';
// import {
//   analyticsCategoria,
//   analyticsUnidadeServico,
// } from '~/utils/funcoesAnalytics';

function EdicaoInfoProfissional() {
  const navigation = useNavigation();

  const { user, updateUser } = useAutenticacao();

  const [isLoading, setIsLoading] = useState(false);

  console.log('EdicaoInfoProfissional: user', user);

  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      categoriaProfissionalSelectedId: '',
      especialidadesSelectedsIds: [],
      servicosSelectedsIds: [],
    },
  });

  const categoriaProfissionalSelectedIdWatch = watch(
    'categoriaProfissionalSelectedId',
  );

  const { servicos, featchServicos } = useServicos();

  const {
    categoriasProfissionais,
    featchCategoriasProfissionais,
  } = useCategoriasProfissionais();

  const { especialidades, featchEspecialidades } = useEspecialidades();

  useLayoutEffect(() => {
    cabecalhoVoltar({
      navegador: navigation,
      titulo: PERFIL.EDICAO_INFO_PROFISSIONAL.CABECALHO,
      cor: 'brancoPreto',
    });
  }, []);

  useEffect(() => {
    featchServicos();
    featchCategoriasProfissionais();
  }, []);

  useEffect(() => {
    setValue('especialidadesSelectedsIds', []);
    featchEspecialidades(categoriaProfissionalSelectedIdWatch);
  }, [categoriaProfissionalSelectedIdWatch]);

  useEffect(() => {
    setValue(
      'categoriaProfissionalSelectedId',
      String(user.categoriaProfissional.id),
    );
    setValue(
      'especialidadesSelectedsIds',
      user.especialidades.map(esp => String(esp.id)),
    );
    setValue(
      'servicosSelectedsIds',
      user.unidadesServicos.map(esp => String(esp.id)),
    );
  }, []);

  const handleOnPressNextButton = async dataForm => {
    // console.log(JSON.stringify(dataForm, null, 2));

    try {
      setIsLoading(true);

      const infoProfissional = {
        categoriaProfissional: find(categoriasProfissionais, [
          'id',
          Number(dataForm.categoriaProfissionalSelectedId),
        ]),
        especialidades: filter(especialidades, item =>
          dataForm.especialidadesSelectedsIds.map(Number).includes(item.id),
        ),
        unidadesServicos: filter(servicos, item =>
          dataForm.servicosSelectedsIds.map(Number).includes(item.id),
        ),
      };

      await atualizarUsuarioApi({
        ...user,
        ...infoProfissional,
        cidade: user.municipio,
        cidadeId: user.municipio.id,
        nomeCompleto: user.name,
        termos: true,
      });

      await updateUser();

      console.log(JSON.stringify(user, null, 2));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }

    // try {
    //   const result = await atualizarUsuario(
    //     {
    //       ...pessoa,
    //       ...getValues(),
    //     },
    //     { somenteProfissionais: true },
    //   );
    //   if (result) {
    //     navigation.navigate('TelaDeSucesso', {
    //       textoApresentacao: PERFIL.EDICAO_INFO_PESSOAIS.MSG_SUCESSO,
    //       telaDeRedirecionamento: ROTAS.PERFIL,
    //       telaDeBackground: CORES.VERDE,
    //     });
    //     const categoriaProfissional = JSON.stringify(
    //       result.categoriaProfissional,
    //     );
    //     const uniServ = result.unidadeServico;
    //     analyticsCategoria(
    //       categoriaProfissional,
    //       now,
    //       'Atualização Cadastro',
    //     );
    //     analyticsUnidadeServico(uniServ, now, 'Atualização Cadastro');
    //   }
    // } catch (e) {
    //   console.log(e);
    //   mostrarAlerta(PERFIL.EDICAO_INFO_PROFISSIONAL.MSG_ERRO_SALVAR);
    // }
  };

  // const mostrarAlerta = mensagem => {
  //   setExibicaoDoAlerta(true);
  //   setMensagemDoAlerta(mensagem);
  // };

  return (
    <Container>
      <BarraDeStatus backgroundColor="#ffffff" barStyle="dark-content" />

      <TituloPrincipal>
        Vamos agora adicionar suas informações profissionais, para isso,
        selecione as opções abaixo
      </TituloPrincipal>

      <ControlledSelectModal
        control={control}
        name="categoriaProfissionalSelectedId"
        mode="outlined"
        placeholder="Categoria Profissional"
        title="Categoria Profissional"
        items={categoriasProfissionais.map(item => ({
          value: String(item.id),
          label: String(item.nome),
        }))}
      />
      {['1', '3'].includes(categoriaProfissionalSelectedIdWatch) && (
        <ControlledMultipleSelectModal
          control={control}
          name="especialidadesSelectedsIds"
          mode="outlined"
          placeholder="Especialidade"
          title="Especialidade"
          items={especialidades.map(item => ({
            value: String(item.id),
            label: String(item.nome),
          }))}
        />
      )}
      <ControlledMultipleSelectModal
        control={control}
        name="servicosSelectedsIds"
        mode="outlined"
        placeholder="Em que setor você está atuando?"
        title="Setor de Atuação"
        items={servicos.map(item => ({
          value: String(item.id),
          label: String(item.nome),
        }))}
      />

      <BotaoSalvar
        labelStyle={{ color: '#fff' }}
        onPress={handleSubmit(handleOnPressNextButton)}
        loading={isLoading}
        mode="contained">
        Salvar
      </BotaoSalvar>
      {/* <FormProfissional
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
                textoApresentacao: PERFIL.EDICAO_INFO_PESSOAIS.MSG_SUCESSO,
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
            mostrarAlerta(PERFIL.EDICAO_INFO_PROFISSIONAL.MSG_ERRO_SALVAR);
          }
        })}
      /> */}
      {/* <Alerta
        visivel={exibicaoDoAlerta}
        textoDoAlerta={mensagemDoAlerta}
        duration={4000}
        onDismiss={() => setExibicaoDoAlerta(false)}
      /> */}
    </Container>
  );
}

export default EdicaoInfoProfissional;
