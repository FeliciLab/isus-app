import React from 'react';
import { View } from 'react-native';
import ControlledTextInput from '~/components/ControlledTextInput/index';
import { useForm } from 'react-hook-form';

const DuvidasElmoFrom = () => {
  const { control } = useForm({
    defaultValues: {
      duvida: '',
      email: '',
    },
  });

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
    </View>
  );
};

export default DuvidasElmoFrom;
