import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import ControlledTextInput from '~/components/ControlledTextInput/index';
import CustonFAB from '~/components/CustonFAB/index';
import { ALERTA_FALTA_EPI } from '~/constantes/ocorrencias';
import schema from './schema';

const AlertarFaltaEPIFrom = ({ showFeedBackMessage }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      situacaoAtual: '',
      unidadeDeSaude: '',
      email: '',
    },
    resolver: yupResolver(schema),
  });

  // TODO: implementar
  const onSubmit = data => {
    showFeedBackMessage(ALERTA_FALTA_EPI.feedback);
    console.log(data);
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
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        <CustonFAB
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

export default AlertarFaltaEPIFrom;