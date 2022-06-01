import { yupResolver } from '@hookform/resolvers/yup';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { postDemandaEducacao } from '~/apis/apiHome';
import ControlledTextInput from '~/components/ControlledTextInput/index';
import CustonFAB from '~/components/CustonFAB/index';
import { DEMANDA_EDUCACAO } from '~/constantes/ocorrencias';
import schema from './schema';

const DemandaEducacaoFrom = ({ showFeedBackMessage }) => {
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

  const onSubmit = async ({ descricao, unidadeDeSaude, email }) => {
    try {
      setIsLoading(true);

      const { data } = await postDemandaEducacao(
        descricao,
        unidadeDeSaude,
        email,
      );

      showFeedBackMessage(DEMANDA_EDUCACAO.feedback);

      // TODO: remover depois esses consoles.logs
      console.log(JSON.stringify(data, null, 2));

      console.log(
        JSON.stringify({ descricao, unidadeDeSaude, email }, null, 2),
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(useCallback(() => limparCampos(), []));

  return (
    <View>
      <ControlledTextInput
        style={{ marginVertical: 5 }}
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
