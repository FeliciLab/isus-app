import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Button, Chip } from 'react-native-paper';
import ControlledTextInput from '~/components/ControlledTextInput/index';
import CustonFAB from '~/components/CustonFAB/index';
import schema from './schema';

const RelatarSujestaoFrom = ({ showFeedBackMessage }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      motivo: '',
      email: '',
    },
    resolver: yupResolver(schema),
  });

  const handleAttachmentImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: true,
    });

    console.log(result.assets[0].uri);
  };

  // TODO: implementar
  const onSubmit = data => {
    showFeedBackMessage('Sua demanda foi enviado, obrigado!');
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
        control={control}
        name="motivo"
        mode="outlined"
        label="Motivo"
      />
      <Text>Lembre-se de especificar a seção do app a que você se refere</Text>
      <View style={{ flexDirection: 'row', marginBottom: 8, marginTop: 8 }}>
        <Button
          mode="text"
          color="#FF9800"
          compact
          onPress={handleAttachmentImage}>
          ANEXAR IMAGEM
        </Button>
        <Chip onClose={() => console.log('onClose Pressed')}>
          Nome do arquivo
        </Chip>
      </View>
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

export default RelatarSujestaoFrom;
