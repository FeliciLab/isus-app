import { useNavigation, useRoute } from '@react-navigation/native';
import { filter, find } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView } from 'react-native-gesture-handler';
import { atualizarUsuarioApi } from '~/apis/apiCadastro';
import Alerta from '~/components/Alerta';
import { BotaoLaranja } from '~/components/Botoes/BotoesCirculares';
import ControlledMultipleSelectModal from '~/components/ControlledMultipleSelectModal/index';
import ControlledSelectModal from '~/components/ControlledSelectModal/index';
import rotas from '~/constantes/rotas';
import useAutenticacao from '~/hooks/useAutenticacao';
import { useCategoriasProfissionais } from '~/hooks/useCategoriasProfissionais';
import { useEspecialidades } from '~/hooks/useEspecialidades';
import { useServicos } from '~/hooks/useServicos';
import { Container, RowButton } from './styles';

const PreCadastroInfoProfissional = () => {
  const navigation = useNavigation();

  const route = useRoute();

  const { infoPessoal } = route.params;

  const { updateUser } = useAutenticacao();

  const [isLoading, setIsLoading] = useState(false);

  const [exibicaoDoAlerta, setExibicaoDoAlerta] = useState(false);

  const [mensagemDoAlerta, setMensagemDoAlerta] = useState('');

  const mostrarAlerta = mensagem => {
    setExibicaoDoAlerta(true);
    setMensagemDoAlerta(mensagem);
  };

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

  const handlerOnPressConcluir = async dataForm => {
    try {
      setIsLoading(true);

      const infoProfissional = {
        categoriaProfissional: find(categoriasProfissionais, [
          'id',
          Number(dataForm?.categoriaProfissionalSelectedId) || '',
        ]),
        especialidades:
          filter(especialidades, item =>
            dataForm?.especialidadesSelectedsIds.map(Number).includes(item.id),
          ) || [],
        // lá na api está no singular
        unidadeServico:
          filter(servicos, item =>
            dataForm?.servicosSelectedsIds.map(Number).includes(item.id),
          ) || [],
      };

      const newUserData = {
        ...infoPessoal,
        ...infoProfissional,
        cidade: infoPessoal.municipio,
        cidadeId: infoPessoal.municipio.id,
        nomeCompleto: infoPessoal.nomeCompleto,
      };

      await atualizarUsuarioApi({
        ...newUserData,
        termos: true,
      });

      await updateUser(); // atualiza as informações do usuário internamente no app

      navigation.navigate(rotas.PRE_CADASTRO_SUCESSO);
    } catch (error) {
      mostrarAlerta('Problema ao atualizar perfil.');
      console.log('Problema ao atualizar perfil.', error);
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
            disabled={isLoading}
            onPress={handleSubmit(handlerOnPressConcluir)}>
            Concluir
          </BotaoLaranja>
        </RowButton>
      </ScrollView>
      <Alerta
        visivel={exibicaoDoAlerta}
        textoDoAlerta={mensagemDoAlerta}
        duration={4000}
        onDismiss={() => setExibicaoDoAlerta(false)}
      />
    </Container>
  );
};

export default PreCadastroInfoProfissional;
