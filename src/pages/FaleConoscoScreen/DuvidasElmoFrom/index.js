import React from 'react';
import { View } from 'react-native';
import ControlledTextInput from '~/components/ControlledTextInput/index';
import { useForm } from 'react-hook-form';
import CustonFAB from '~/components/CustonFAB/index';

const DuvidasElmoFrom = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      duvida: '',
      email: '',
    },
  });

  const onSubmit = data => {
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
