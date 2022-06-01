import { yupResolver } from '@hookform/resolvers/yup';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import ControlledTextInput from '~/components/ControlledTextInput/index';
import CustonFAB from '~/components/CustonFAB/index';
import { DUVIDAS_ELMO } from '~/constantes/ocorrencias';
import schema from './schema';

const DuvidasElmoFrom = ({ showFeedBackMessage }) => {
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

  const onSubmit = data => {
    try {
      setIsLoading(true);
      showFeedBackMessage(DUVIDAS_ELMO.feedback);
      console.log(data);
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
