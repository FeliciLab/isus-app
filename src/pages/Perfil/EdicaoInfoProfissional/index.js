import { useNavigation } from '@react-navigation/native';
import { filter, find } from 'lodash';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { atualizarUsuarioApi } from '~/apis/apiCadastro';
import Alerta from '~/components/alerta';
import BarraDeStatus from '~/components/barraDeStatus';
import ControlledMultipleSelectModal from '~/components/ControlledMultipleSelectModal/index';
import ControlledSelectModal from '~/components/ControlledSelectModal/index';
import { cabecalhoVoltar } from '~/components/layoutEffect/cabecalhoLayout';
import { CORES } from '~/constantes/estiloBase';
import rotas from '~/constantes/rotas';
import { PERFIL } from '~/constantes/textos';
import useAutenticacao from '~/hooks/useAutenticacao';
import { useCategoriasProfissionais } from '~/hooks/useCategoriasProfissionais';
import { useEspecialidades } from '~/hooks/useEspecialidades';
import { useServicos } from '~/hooks/useServicos';
import { BotaoSalvar, Container, TituloPrincipal } from './styles';

function EdicaoInfoProfissional() {
  const navigation = useNavigation();

  const [isOpenAlert, setIsOpenAlert] = useState(false);

  const [alertMessage, setAlertMessage] = useState('');

  const { user, updateUser } = useAutenticacao();

  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      categoriaProfissionalSelectedId:
        String(user.categoriaProfissional.id) || '',
      especialidadesSelectedsIds:
        user.especialidades.map(item => String(item.id)) || [],
      servicosSelectedsIds:
        user.unidadesServicos.map(item => String(item.id)) || [],
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

  useEffect(() => {
    featchServicos();
    featchCategoriasProfissionais();
    featchEspecialidades(user.categoriaProfissional.id);
  }, []);

  useEffect(() => {
    if (isDirty) {
      setValue('especialidadesSelectedsIds', []);
      featchEspecialidades(categoriaProfissionalSelectedIdWatch);
    }
  }, [categoriaProfissionalSelectedIdWatch]);

  const handleOnPressNextButton = async dataForm => {
    try {
      setIsLoading(true);

      const infoProfissional = {
        categoriaProfissional: find(categoriasProfissionais, [
          'id',
          Number(dataForm.categoriaProfissionalSelectedId) || '',
        ]),
        especialidades:
          filter(especialidades, item =>
            dataForm.especialidadesSelectedsIds.map(Number).includes(item.id),
          ) || [],
        // lá na api está no singular
        unidadeServico:
          filter(servicos, item =>
            dataForm.servicosSelectedsIds.map(Number).includes(item.id),
          ) || [],
      };

      await atualizarUsuarioApi({
        ...user,
        ...infoProfissional,
        cidade: user.municipio,
        cidadeId: user.municipio.id,
        nomeCompleto: user.name,
        termos: true,
      });

      await updateUser(); // atualiza as informações do usuário internamente no app

      // TODO: colocar aqui o analytics
      // estava chamando os métodos analyticsCategoria e analyticsUnidadeServico
      // mas como essa chamada era antes depois de redirecionar para a tela de sucesso
      // o erro não era percebido
      // Rever como enviar essas informações para o analytics

      navigation.navigate('TelaDeSucesso', {
        textoApresentacao: PERFIL.EDICAO_INFO_PESSOAIS.MSG_SUCESSO,
        telaDeRedirecionamento: rotas.PERFIL,
        telaDeBackground: CORES.VERDE,
      });
    } catch (error) {
      console.log(error);
      handleShowAlert(PERFIL.EDICAO_INFO_PROFISSIONAL.MSG_ERRO_SALVAR);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowAlert = mensagem => {
    setIsOpenAlert(true);
    setAlertMessage(mensagem);
  };

  useLayoutEffect(() => {
    cabecalhoVoltar({
      navegador: navigation,
      titulo: PERFIL.EDICAO_INFO_PROFISSIONAL.CABECALHO,
      cor: 'brancoPreto',
    });
  }, []);

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
      <Alerta
        visivel={isOpenAlert}
        textoDoAlerta={alertMessage}
        duration={4000}
        onDismiss={() => setIsOpenAlert(false)}
      />
    </Container>
  );
}

export default EdicaoInfoProfissional;
