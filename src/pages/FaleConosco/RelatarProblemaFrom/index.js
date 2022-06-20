import { yupResolver } from '@hookform/resolvers/yup';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Button, Chip } from 'react-native-paper';
import { postFeedback } from '~/apis/apiHome';
import ControlledTextInput from '~/components/ControlledTextInput/index';
import CustonFAB from '~/components/CustonFAB/index';
import { labelsAnalytics } from '~/constantes/labelsAnalytics';
import { RELATAR_PROBLEMA } from '~/constantes/ocorrencias';
import { TESTIDS } from '~/constantes/testIDs';
import useAnalytics from '~/hooks/useAnalytics';
import schema from './schema';

const RelatarProblemaFrom = ({ showFeedBackMessage }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { analyticsData } = useAnalytics();

  const [imagem, setImagem] = useState();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      motivo: '',
      email: '',
    },
    resolver: yupResolver(schema),
  });

  const extrairMensagemDeErro = ({ errors }) => {
    if (errors.motivo) return errors.duvida[0];
    if (errors.email) return errors.duvida[0];
    if (errors['imagem.dados']) {
      return 'Falha no envio da imagem. Entre em contato com o suporte técnico para verificar o problema.';
    }
    if (errors['imagem.tipo']) return errors['imagem.tipo'][0];
    if (errors['imagem.tamanho']) return errors['imagem.tamanho'][0];
    return '';
  };

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

  const limparCampos = () => {
    reset({
      motivo: '',
      email: '',
    });
    setImagem(null);
  };

  const handleParserImage = response => ({
    nome: response.fileName,
    tipo: response.type,
    tamanho: response.fileSize,
    dados: response.base64,
  });

  const onSubmit = async ({ motivo, email }) => {
    try {
      setIsLoading(true);

      analyticsData(labelsAnalytics.ENVIAR_FEEDBACK, 'Click', 'Fale Conosco');

      const { data } = await postFeedback(
        RELATAR_PROBLEMA.label,
        motivo,
        email,
        handleParserImage(imagem),
      );

      if (data.errors) {
        showFeedBackMessage(extrairMensagemDeErro(data));
      } else {
        limparCampos();
        showFeedBackMessage(RELATAR_PROBLEMA.feedback);
      }
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
      <Text>
        Reporte a falta ou escassez dos equipamentos de EPI da sua Unidade de
        Saúde para nos ajudar a resolver o problema e melhorar a condição atual.
      </Text>
      <ControlledTextInput
        testID="motivoInput"
        style={{ marginVertical: 5 }}
        control={control}
        name="motivo"
        mode="outlined"
        label="Motivo"
      />
      <Text>Lembre-se de especificar a seção do app a que você se refere</Text>
      <View style={{ flexDirection: 'row', marginBottom: 8, marginTop: 8 }}>
        <Button
          mode="text"
          color="#FF9800"
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
      <ControlledTextInput
        testID="emailInput"
        style={{ marginVertical: 5 }}
        control={control}
        name="email"
        mode="outlined"
        label="Email"
      />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        <CustonFAB
          testID={TESTIDS.BOTAO_FEEDBACK_ENVIAR}
          labelStyle={{ color: '#fff' }}
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

export default RelatarProblemaFrom;
