import { yupResolver } from '@hookform/resolvers/yup';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { postDemandaEducacao } from '~/apis/apiHome';
import ControlledTextInput from '~/components/ControlledTextInput/index';
import CustonFAB from '~/components/CustonFAB/index';
import { labelsAnalytics } from '~/constantes/labelsAnalytics';
import { DEMANDA_EDUCACAO } from '~/constantes/ocorrencias';
import { TESTIDS } from '~/constantes/testIDs';
import useAnalytics from '~/hooks/useAnalytics';
import schema from './schema';

const DemandaEducacaoFrom = ({ showFeedBackMessage }) => {
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

  const limparCampos = () => {
    reset({
      descricao: '',
      unidadeDeSaude: '',
      email: '',
    });
  };

  const extrairMensagemDeErro = ({ errors }) => {
    if (errors.descricao) return errors.descricao[0];
    if (errors.unidadeDeSaude) return errors.unidadeDeSaude[0];
    if (errors.email) return errors.email[0];
    return '';
  };

  const onSubmit = async ({ descricao, unidadeDeSaude, email }) => {
    try {
      setIsLoading(true);

      analyticsData(
        labelsAnalytics.ENVIAR_DEMANDA_EDUCACAO,
        'Click',
        'Fale Conosco',
      );

      const { data } = await postDemandaEducacao(
        descricao,
        unidadeDeSaude,
        email,
      );

      if (data.errors) {
        showFeedBackMessage(extrairMensagemDeErro(data));
      } else {
        showFeedBackMessage(DEMANDA_EDUCACAO.feedback);
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
        testID="descricaoInput"
        style={{ marginVertical: 5 }}
        control={control}
        name="descricao"
        mode="outlined"
        label="Descreva a situação atual *"
      />
      <ControlledTextInput
        testID="unidadeDeSaudeInput"
        style={{ marginVertical: 5 }}
        control={control}
        name="unidadeDeSaude"
        mode="outlined"
        label="Unidade de Saúde *"
      />
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
          testID={TESTIDS.BOTAO_DEMANDAEDUCACAO_ENVIAR}
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

export default DemandaEducacaoFrom;
