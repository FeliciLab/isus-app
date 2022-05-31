import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import ControlledTextInput from '~/components/ControlledTextInput/index';
import CustonFAB from '~/components/CustonFAB/index';
import { DUVIDAS_ELMO } from '~/constantes/ocorrencias';
import schema from './schema';

const DuvidasElmoFrom = ({ showFeedBackMessage }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      duvida: '',
      email: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = data => {
    showFeedBackMessage(DUVIDAS_ELMO.feedback);
    console.log(data);
  };

  return (
    <View>
      <ControlledTextInput
        style={{ marginVertical: 5 }}
        control={control}
        name="duvida"
        mode="outlined"
        label="Dúvidas sobre o Elmo *"
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

export default DuvidasElmoFrom;
