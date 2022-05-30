import React from 'react';
import { View } from 'react-native';
import ControlledTextInput from '~/components/ControlledTextInput/index';
import { useForm } from 'react-hook-form';

const DemandaEducacaoFrom = () => {
  const { control } = useForm({
    defaultValues: {
      demanda: '',
      unidadeDeSaude: '',
      email: '',
    },
  });

  return (
    <View>
      <ControlledTextInput
        style={{ marginVertical: 5 }}
        control={control}
        name="situacaoAtual"
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
    </View>
  );
};

export default DemandaEducacaoFrom;
