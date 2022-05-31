import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
// import { postDemandaEducacao } from '~/apis/apiHome';
import ControlledTextInput from '~/components/ControlledTextInput/index';
import CustonFAB from '~/components/CustonFAB/index';
import { DEMANDA_EDUCACAO } from '~/constantes/ocorrencias';
import schema from './schema';

const DemandaEducacaoFrom = ({ showFeedBackMessage }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      descricao: '',
      unidadeDeSaude: '',
      email: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({ descricao, unidadeDeSaude, email }) => {
    try {
      setIsLoading(true);
      // const { data } = await postDemandaEducacao(
      //   descricao,
      //   unidadeDeSaude,
      //   email,
      // );

      showFeedBackMessage(DEMANDA_EDUCACAO.feedback);

      console.log(
        JSON.stringify({ descricao, unidadeDeSaude, email }, null, 2),
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

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
          loading={isLoading}
          disabled={isLoading}
          labelStyle={{ color: '#fff' }}
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
