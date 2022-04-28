import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView } from 'react-native-gesture-handler';
import { BotaoLaranja } from '~/components/Botoes/BotoesCirculares';
import ControlledMultipleSelectModal from '~/components/ControlledMultipleSelectModal/index';
import ControlledSelectModal from '~/components/ControlledSelectModal/index';
import rotas from '~/constantes/rotas';
import { useCategoriasProfissionais } from '~/hooks/useCategoriasProfissionais';
import { useEspecialidades } from '~/hooks/useEspecialidades';
import { useServicos } from '~/hooks/useServicos';
// import ROTAS from '~/constantes/rotas';
// import useAutenticacao from '~/hooks/useAutenticacao';
import { Container, RowButton } from './styles';

const PreCadastroInfoProfissional = () => {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);

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

  // TODO: colocar a atualização do usuário aqui
  const handlerOnPressConcluir = async dataForm => {
    try {
      setIsLoading(true);

      console.log({ dataForm });

      navigation.navigate(rotas.PRE_CADASTRO_SUCESSO);
    } catch (error) {
      console.log('problema ao atualizar perfil no context', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    featchServicos();
    featchCategoriasProfissionais();
  }, []);

  useEffect(() => {
    setValue('especialidadesSelectedsIds', []);
    featchEspecialidades(categoriaProfissionalSelectedIdWatch);
  }, [categoriaProfissionalSelectedIdWatch]);

  return (
    <Container>
      <ScrollView>
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
        <RowButton>
          <BotaoLaranja
            loading={isLoading}
            onPress={handleSubmit(handlerOnPressConcluir)}>
            Concluir
          </BotaoLaranja>
        </RowButton>
      </ScrollView>
    </Container>
  );
};

export default PreCadastroInfoProfissional;
