import React from 'react';
import { Text, View } from 'react-native';
import ControlledTextInput from '~/components/ControlledTextInput/index';
import { useForm } from 'react-hook-form';

const AlertarFaltaEPIFrom = () => {
  const { control } = useForm({
    defaultValues: {
      situacaoAtual: '',
      unidadeDeSaude: '',
      email: '',
    },
  });

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

export default AlertarFaltaEPIFrom;
