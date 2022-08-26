import { yupResolver } from '@hookform/resolvers/yup';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Button, Chip } from 'react-native-paper';
import ControlledSelectModal from '~/components/ControlledSelectModal';
// import { postDemandaEducacao } from '~/apis/apiHome';
import ControlledTextInput from '~/components/ControlledTextInput/index';
import CustonFAB from '~/components/CustonFAB/index';
import { CORES } from '~/constantes/estiloBase';
// import { labelsAnalytics } from '~/constantes/labelsAnalytics';
// import { DEMANDA_EDUCACAO } from '~/constantes/ocorrencias';
import { TESTIDS } from '~/constantes/testIDs';
// import useAnalytics from '~/hooks/useAnalytics';
import schema from './schema';
import { launchImageLibrary } from 'react-native-image-picker';

const assuntos = [
  {
    id: 'DUVIDA',
    nome: 'Dúvida',
  },
  {
    id: 'SUGESTAO',
    nome: 'Sugestão',
  },
  {
    id: 'RELATAR_PROBLEMA',
    nome: 'Relatar Problema',
  },
];

const DuvidasResidenciasFrom = ({ showFeedBackMessage }) => {
  // const { analyticsData } = useAnalytics();

  const [isLoading, setIsLoading] = useState(false);

  const [imagem, setImagem] = useState();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      descricao: '',
      unidadeDeSaude: '',
      email: '',
    },
    resolver: yupResolver(schema),
  });

  const limparCampos = () => {
    reset({
      descricao: '',
      unidadeDeSaude: '',
      email: '',
    });
  };

  // const extrairMensagemDeErro = ({ errors }) => {
  //   if (errors.descricao) return errors.descricao[0];
  //   if (errors.unidadeDeSaude) return errors.unidadeDeSaude[0];
  //   if (errors.email) return errors.email[0];
  //   return '';
  // };

  const handleAttachmentImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        includeBase64: true,
      });

      setImagem(result.assets[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async ({ assuntoSelectedId, mensagem, curso, email }) => {
    console.log({
      assunto: assuntos.find(assunto => assunto.id === assuntoSelectedId).nome,
      mensagem,
      curso,
      email,
    }); // TODO: remover depois

    try {
      setIsLoading(true);

      // analyticsData(
      //   labelsAnalytics.ENVIAR_DUVIDAS_RESIDENCIAS,
      //   'Click',
      //   'Fale Conosco',
      // );

      // TODO: criar o postDuvidaResidencias
      // const { data } = await postDemandaEducacao(
      //   descricao,
      //   unidadeDeSaude,
      //   email,
      // );

      // TODO: usar essa parte quando tivermos a rota na api
      // if (data.errors) {
      //   showFeedBackMessage(extrairMensagemDeErro(data));
      // } else {
      //   showFeedBackMessage(DEMANDA_EDUCACAO.feedback);
      //   limparCampos();
      // }
    } catch (error) {
      if (error.message === 'Network Error') {
        showFeedBackMessage(
          'Erro na conexão com o servidor. Tente novamente mais tarde.',
        );
      } else {
        showFeedBackMessage(
          'Ocorreu um erro inesperado. Tente novamente mais tarde.',
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(useCallback(() => limparCampos(), []));

  return (
    <View>
      <ControlledSelectModal
        control={control}
        name="assuntoSelectedId"
        mode="outlined"
        placeholder="Selecione o Assunto"
        items={assuntos.map(item => ({
          value: String(item.id),
          label: String(item.nome),
        }))}
      />
      <ControlledTextInput
        style={{ marginVertical: 5 }}
        control={control}
        multiline
        numberOfLines={5}
        name="mensagem"
        mode="outlined"
        label="Escreve aqui sua mensagem"
      />
      <ControlledTextInput
        style={{ marginVertical: 5 }}
        control={control}
        name="curso"
        mode="outlined"
        label="Seu Curso"
      />
      <ControlledTextInput
        style={{ marginVertical: 5 }}
        control={control}
        name="email"
        mode="outlined"
        label="Seu e-mail"
      />
      <View style={{ flexDirection: 'row', marginBottom: 8, marginTop: 8 }}>
        <Button
          mode="text"
          color={CORES.LARANJA}
          compact
          onPress={handleAttachmentImage}>
          ANEXAR IMAGEM
        </Button>
        {imagem && (
          <Chip
            style={{ maxWidth: 200 }}
            ellipsizeMode="middle"
            onClose={() => setImagem(null)}>
            {imagem.fileName}
          </Chip>
        )}
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        <CustonFAB
          testID={TESTIDS.BOTAO_DEMANDAEDUCACAO_ENVIAR}
          labelStyle={{ color: CORES.BRANCO }}
          loading={isLoading}
          disabled={isLoading}
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          label="Enviar"
          small
        />
      </View>
    </View>
  );
};

export default DuvidasResidenciasFrom;
