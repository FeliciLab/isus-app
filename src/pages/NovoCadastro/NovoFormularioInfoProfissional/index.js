import { useRoute } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TouchableOpacity } from 'react-native';
// import { alteraDadosDoUsuario } from '~/apis/apiCadastro';
// import Alerta from '~/components/alerta';
import BarraDeStatus from '~/components/barraDeStatus';
import ControlledMultipleSelectModal from '~/components/ControlledMultipleSelectModal/index';
import ControlledSelectModal from '~/components/ControlledSelectModal/index';
// import DropDown from '~/components/dropdown';
import rotas from '~/constantes/rotas';
import { useCategoriasProfissionais } from '~/hooks/useCategoriasProfissionais';
import { useEspecialidades } from '~/hooks/useEspecialidades';
import { useServicos } from '~/hooks/useServicos';
import { ArrowLeftIcon } from '~/icons';
// import { pegarDados } from '~/services/armazenamento';
// import { Botao, Scroll, Titulo } from './styles';
import { Botao, Container, Titulo, SubTitulo } from './styles';
import { find, filter } from 'lodash';

function NovoFormularioInfoProfissional({ navigation }) {
  const route = useRoute();

  const { infoPessoal } = route.params;

  console.log(JSON.stringify(infoPessoal, null, 2));

  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      categoriaProfissionalSelectedId: '',
      especialidadesSelectedsIds: [],
      servicosSelectedsIds: [],
    },
    // TODO: colocar as validações
    // resolver: yupResolver(schema),
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

  const handleOnPressNextButton = dataForm => {
    const infoProfissional = {
      categoriaProfissional: find(categoriasProfissionais, [
        'id',
        Number(dataForm.categoriaProfissionalSelectedId),
      ]),
      especialidades: filter(especialidades, item =>
        dataForm.especialidadesSelectedsIds.map(Number).includes(item.id),
      ),
      servicos: filter(servicos, item =>
        dataForm.servicosSelectedsIds.map(Number).includes(item.id),
      ),
    };

    console.log(JSON.stringify(infoProfissional, null, 2));

    navigation.navigate('FormularioSenha', { infoPessoal, infoProfissional });
  };

  const veioDoPerfil = route.params.tela_anterior === rotas.PERFIL;

  useEffect(() => {
    featchServicos();
    featchCategoriasProfissionais();
  }, []);

  useEffect(() => {
    setValue('especialidadesSelectedsIds', []);
    featchEspecialidades(categoriaProfissionalSelectedIdWatch);
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
            color={veioDoPerfil ? '#4CAF50' : '#304FFE'}
          />
        </TouchableOpacity>
      ),
    });
  }, []);

  const definirCorDosElementos = () => (veioDoPerfil ? '#FF9800' : '#304FFE');

  return (
    <Container>
      <BarraDeStatus barStyle="dark-content" backgroundColor="#FFF" />
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
        labelStyle={{ color: '#fff' }}
        // onPress={() => {
        //   registrarUnidadesDeServico();
        //   registrarUnidadesDeEspecialidades();
        //   if (veioDoPerfil) {
        //     return adicionarInformaçõesProfissionais();
        //   }
        //   return alterarTelaDoCadastro();
        // }}
        onPress={handleSubmit(handleOnPressNextButton)}
        mode="contained">
        {veioDoPerfil ? 'salvar' : 'Próximo'}
      </Botao>
      {/* <Alerta
        visivel={exibicaoDoAlerta}
        // textoDoAlerta={}
        duration={4000}
        onDismiss={() => setExibicaoDoAlerta(false)}
      /> */}
    </Container>
  );
}

export default NovoFormularioInfoProfissional;
