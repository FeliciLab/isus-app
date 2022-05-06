// import NetInfo from '@react-native-community/netinfo';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNetInfo } from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, DefaultTheme } from 'react-native-paper';
import BarraDeStatus from '~/components/BarraDeStatus';
import ControlledTextInput from '~/components/ControlledTextInput';
import useAnalytics from '~/hooks/useAnalytics';
import useAutenticacao from '~/hooks/useAutenticacao';
import { ArrowLeftIcon } from '~/icons';
import schema from './schema';

export default function ExcluirPerfil() {
  const navigation = useNavigation();

  const { isConnected } = useNetInfo();

  const [isLoading, setIsLoading] = useState(false);

  const { deleteUser } = useAutenticacao();

  const { analyticsData } = useAnalytics();

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      palavra: '',
    },
    resolver: yupResolver(schema),
  });

  const handleOnPressExcluirButton = async formData => {
    try {
      console.log({ formData });

      setIsLoading(true);

      if (!isConnected) {
        Alert.alert(
          'Sem conexão com a internet',
          'Verifique se o wi-fi ou os dados móveis estão ativos e tente novamente.',
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate('HOME');
              },
            },
          ],
        );
      } else {
        await deleteUser();

        await analyticsData('confirmar_exclusao_conta', 'Click', 'Perfil');

        navigation.navigate('CONTA_EXCLUIDA');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const theme = {
    ...DefaultTheme,
    colors: {
      primary: '#FF9800',
      accent: '#f1c40f',
      background: '#fff',
    },
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#FFF',
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: '#000',
      headerTitleAlign: 'center',
      headerTitle: 'Exclusão de Perfil',
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19,
          }}
          onPress={() => {
            setValue('palavra', '');
            navigation.goBack();
          }}>
          <ArrowLeftIcon size={28} color="#4CAF50" />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <View style={styles.container}>
      <BarraDeStatus backgroundColor="#fff" barStyle="dark-content" />
      <Text style={styles.tituloDestaque}>
        Para confirmar a exclusão da sua conta no ID Saúde, digite EXCLUIR.
      </Text>
      <ControlledTextInput
        style={{ marginVertical: 5 }}
        name="palavra"
        control={control}
        variant="outlined"
        mode="outlined"
        label="Confirmação de exclusão"
        theme={theme}
      />
      <Button
        testID="botao-excluir-perfil"
        style={styles.botaoHabilitado}
        mode="contained"
        disabled={isLoading}
        loading={isLoading}
        labelStyle={styles.botaoExcluirConta}
        onPress={handleSubmit(handleOnPressExcluirButton)}>
        EXCLUIR
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
  },
  tituloDestaque: {
    fontSize: 20,
    paddingTop: 24,
    color: 'rgba(0, 0, 0, 0.54)',
  },
  botaoHabilitado: {
    borderRadius: 50,
    width: 148,
    height: 48,
    marginTop: 16,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    backgroundColor: '#F2453D',
  },
  botaoExcluirConta: {
    color: '#FFFFFF',
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '500',
  },
});
