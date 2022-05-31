import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Button, Chip } from 'react-native-paper';
import { postFeedback } from '~/apis/apiHome';
import ControlledTextInput from '~/components/ControlledTextInput/index';
import CustonFAB from '~/components/CustonFAB/index';
import { RELATAR_SUGESTAO } from '~/constantes/ocorrencias';
import schema from './schema';

const RelatarSujestaoFrom = ({ showFeedBackMessage }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [imagem, setImagem] = useState();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      motivo: '',
      email: '',
    },
    resolver: yupResolver(schema),
  });

  const handleAttachmentImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        includeBase64: true,
      });

      setImagem(result.assets[0]);
    } catch (error) {
      console.log(error);
    }
  };

  // TODO: melhorar a implementação
  const onSubmit = async ({ motivo, email }) => {
    try {
      setIsLoading(true);

      const { data } = await postFeedback(
        RELATAR_SUGESTAO.label,
        motivo,
        email,
        imagem,
      );

      showFeedBackMessage(RELATAR_SUGESTAO.feedback);

      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
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
        {imagem && (
          <Chip
            style={{ maxWidth: 200 }}
            ellipsizeMode="middle"
            onClose={() => setImagem(null)}>
            {imagem.fileName}
          </Chip>
        )}
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

export default RelatarSujestaoFrom;
