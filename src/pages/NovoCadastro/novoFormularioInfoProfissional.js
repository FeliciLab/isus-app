import { useRoute } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
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
import { Botao, Scroll, Titulo } from './styles';
import textos from './textos.json';

function FormularioInfoProfissional({ navigation }) {
  const route = useRoute();

  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      categoriaProfissionalSelectedId: '',
      especialdadeSelectedId: '',
      servicosSelectedsIds: [],
    },
    // TODO: colocar as validações
    // resolver: yupResolver(schema),
  });

  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);

    console.log(dataForm);

    setIsLoading(false);
  };

  const veioDoPerfil = route.params.tela_anterior === rotas.PERFIL;

  useEffect(() => {
    featchServicos();
    featchCategoriasProfissionais();
  }, []);

  useEffect(() => {
    setValue('especialdadeSelectedId', '');
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
    <Scroll>
      <BarraDeStatus barStyle="dark-content" backgroundColor="#FFF" />
      <Titulo>
        {veioDoPerfil
          ? textos.formularioProfissional.introducaoAdicaoPerfil
          : textos.formularioProfissional.introducao}
      </Titulo>
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
        <ControlledSelectModal
          control={control}
          name="especialdadeSelectedId"
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
        loading={isLoading}
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
    </Scroll>
  );
}

export default FormularioInfoProfissional;
