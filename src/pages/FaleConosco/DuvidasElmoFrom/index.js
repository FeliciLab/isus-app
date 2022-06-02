import { yupResolver } from '@hookform/resolvers/yup';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { postDuvidasElmo } from '~/apis/apiHome';
import ControlledTextInput from '~/components/ControlledTextInput/index';
import CustonFAB from '~/components/CustonFAB/index';
import { labelsAnalytics } from '~/constantes/labelsAnalytics';
import { DUVIDAS_ELMO } from '~/constantes/ocorrencias';
import { TESTIDS } from '~/constantes/testIDs';
import useAnalytics from '~/hooks/useAnalytics';
import schema from './schema';

const DuvidasElmoFrom = ({ showFeedBackMessage }) => {
  const { analyticsData } = useAnalytics();

  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      duvida: '',
      email: '',
    },
    resolver: yupResolver(schema),
  });

  const limparCampos = () => {
    reset({
      duvida: '',
      email: '',
    });
  };

  const extrairMensagemDeErro = ({ errors }) => {
    if (errors.duvida) return errors.duvida[0];
    if (errors.email) return errors.email[0];
    return '';
  };

  const onSubmit = async ({ duvida, email }) => {
    try {
      setIsLoading(true);

      analyticsData(
        labelsAnalytics.ENVIAR_DUVIDAS_ELMO,
        'Click',
        'Fale Conosco',
      );

      const { data } = await postDuvidasElmo(duvida, email);

      if (data.errors) {
        showFeedBackMessage(extrairMensagemDeErro(data));
      } else {
        showFeedBackMessage(DUVIDAS_ELMO.feedback);
        limparCampos();
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
      <ControlledTextInput
        testID="duvidaInput"
        style={{ marginVertical: 5 }}
        control={control}
        name="duvida"
        mode="outlined"
        label="Dúvidas sobre o Elmo *"
      />
      <ControlledTextInput
        testID="emailInput"
        style={{ marginVertical: 5 }}
        control={control}
        name="email"
        mode="outlined"
        label="Email *"
      />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        <CustonFAB
          testID={TESTIDS.ELMO.DUVIDAS.BOTAO_ENVIAR}
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

export default DuvidasElmoFrom;
