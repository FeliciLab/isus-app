import { yupResolver } from '@hookform/resolvers/yup';
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { postAlertaFaltaDeEpi } from '~/apis/apiHome';
import ControlledTextInput from '~/components/ControlledTextInput/index';
import CustonFAB from '~/components/CustonFAB/index';
import { labelsAnalytics } from '~/constantes/labelsAnalytics';
import { ALERTA_FALTA_EPI } from '~/constantes/ocorrencias';
import { TESTIDS } from '~/constantes/testIDs';
import useAnalytics from '~/hooks/useAnalytics';
import schema from './schema';
import { useFocusEffect } from '@react-navigation/native';

const AlertarFaltaEPIFrom = ({ showFeedBackMessage }) => {
  const { analyticsData } = useAnalytics();

  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      descricao: '',
      unidadeDeSaude: '',
      email: '',
    },
    resolver: yupResolver(schema),
  });

  const extrairMensagemDeErro = ({ errors }) => {
    if (errors.descricao) return errors.descricao[0];
    if (errors.unidadeDeSaude) return errors.unidadeDeSaude[0];
    if (errors.email) return errors.email[0];
    return '';
  };

  const limparCampos = () => {
    reset({
      descricao: '',
      unidadeDeSaude: '',
      email: '',
    });
  };

  useFocusEffect(useCallback(() => limparCampos(), []));

  const onSubmit = async ({ descricao, unidadeDeSaude, email }) => {
    try {
      setIsLoading(true);
      const { data } = await postAlertaFaltaDeEpi(
        descricao,
        unidadeDeSaude,
        email,
      );

      if (data.errors) {
        showFeedBackMessage(extrairMensagemDeErro(data));
      } else {
        limparCampos();
      }

      analyticsData(
        labelsAnalytics.ENVIAR_ALERTA_FALTA_EPI,
        'Click',
        'Fale Conosco',
      );

      showFeedBackMessage(ALERTA_FALTA_EPI.feedback);
    } catch (error) {
      console.log(error);
      if (error.message === 'Network Error')
        showFeedBackMessage(
          'Erro na conexão com o servidor. Tente novamente mais tarde.',
        );
      else
        showFeedBackMessage(
          'Ocorreu um erro inesperado. Tente novamente mais tarde.',
        );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View>
      <Text>
        Reporte a falta ou escassez dos equipamentos de EPI da sua Unidade de
        Saúde para nos ajudar a resolver o problema e melhorar a condição atual.
      </Text>
      <ControlledTextInput
        style={{ marginVertical: 5 }}
        multiline
        numberOfLines={5}
        control={control}
        name="descricao"
        mode="outlined"
        label="Descreva a situação atual *"
      />
      <ControlledTextInput
        style={{ marginVertical: 5 }}
        control={control}
        name="unidadeDeSaude"
        mode="outlined"
        label="Unidade de Saúde *"
      />
      <ControlledTextInput
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
          testID={TESTIDS.BOTAO_ALERTAEPI_ENVIAR}
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

export default AlertarFaltaEPIFrom;
