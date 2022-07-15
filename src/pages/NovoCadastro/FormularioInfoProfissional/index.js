import { useRoute } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TouchableOpacity } from 'react-native';
import BarraDeStatus from '~/components/BarraDeStatus';
import ControlledMultipleSelectModal from '~/components/ControlledMultipleSelectModal/index';
import ControlledSelectModal from '~/components/ControlledSelectModal/index';
import rotas from '~/constantes/rotas';
import { useCategoriasProfissionais } from '~/hooks/useCategoriasProfissionais';
import { useEspecialidades } from '~/hooks/useEspecialidades';
import { useServicos } from '~/hooks/useServicos';
import { ArrowLeftIcon } from '~/icons';
import { Botao, Container, Titulo, SubTitulo } from './styles';
import { find, filter } from 'lodash';
import { CORES } from '~/constantes/estiloBase';

function FormularioInfoProfissional({ navigation }) {
  const route = useRoute();

  const { infoPessoal } = route.params;

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

  const { servicos, fetchServicos } = useServicos();

  const {
    categoriasProfissionais,
    fetchCategoriasProfissionais,
  } = useCategoriasProfissionais();

  const { especialidades, fetchEspecialidades } = useEspecialidades();

  const handleOnPressNextButton = dataForm => {
    const infoProfissional = {
      categoriaProfissional: find(categoriasProfissionais, [
        'id',
        Number(dataForm?.categoriaProfissionalSelectedId),
      ]) || '',

      especialidades:
        filter(especialidades, item =>
          dataForm?.especialidadesSelectedsIds.map(Number).includes(item.id),
        ) || [],

      unidadeServico:
        filter(servicos, item =>
          dataForm?.servicosSelectedsIds.map(Number).includes(item.id),
        ) || [],
    };

    navigation.navigate(
      rotas.FORMULARIO_SENHA,
      { infoPessoal, infoProfissional }
    );
  };

  const veioDoPerfil = route.params.tela_anterior === rotas.PERFIL;

  useEffect(() => {
    fetchServicos();
    fetchCategoriasProfissionais();
  }, []);

  useEffect(() => {
    setValue('especialidadesSelectedsIds', []);
    fetchEspecialidades(categoriaProfissionalSelectedIdWatch);
  }, [categoriaProfissionalSelectedIdWatch]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: veioDoPerfil ? 'Informações profissionais' : 'Cadastro',
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19,
          }}
          onPress={() => {
            navigation.goBack();
          }}>
          <ArrowLeftIcon
            size={28}
            color={veioDoPerfil ? CORES.VERDE : CORES.AZUL}
          />
        </TouchableOpacity>
      ),
    });
  }, []);

  const definirCorDosElementos = () => (
    veioDoPerfil
      ? CORES.LARANJA
      : CORES.AZUL
  );

  return (
    <Container>
      <BarraDeStatus barStyle="dark-content" backgroundColor={CORES.BRANCO} />
      <Titulo>
        {veioDoPerfil
          ? 'Vamos agora adicionar suas informações profissionais, para isso, selecione as opções abaixo:'
          : 'Vamos realizar seu cadastro, precisamos apenas de suas informações profissionais:'}
      </Titulo>
      <SubTitulo>Informações Profissionais:</SubTitulo>

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

      <Botao
        cor={definirCorDosElementos()}
        disabled={false}
        labelStyle={{ color: CORES.BRANCO }}
        onPress={handleSubmit(handleOnPressNextButton)}
        mode="contained">
        {veioDoPerfil ? 'salvar' : 'Próximo'}
      </Botao>
    </Container>
  );
}

export default FormularioInfoProfissional;
