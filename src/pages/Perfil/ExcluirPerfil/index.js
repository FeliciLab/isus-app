// import NetInfo from '@react-native-community/netinfo';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, DefaultTheme } from 'react-native-paper';
import * as yup from 'yup';
import BarraDeStatus from '~/components/barraDeStatus';
import ControlledTextInput from '~/components/ControlledTextInput/index';
import { ArrowLeftIcon } from '~/icons';
import { useNetInfo } from '@react-native-community/netinfo';
import useAutenticacao from '~/hooks/useAutenticacao';
import useAnalytics from '~/hooks/useAnalytics';
import { deletarUsuario } from '~/apis/apiCadastro';

const schema = yup.object({
  palavra: yup
    .string()
    .required('Campo obrigatório')
    .oneOf(['EXCLUIR'], 'O campo deve ser igual a EXCLUIR'),
});

export default function ExcluirPerfil() {
  const navigation = useNavigation();

  const { isConnected } = useNetInfo();

  const [isLOading, setIsLoading] = useState(false);

  const { signOut } = useAutenticacao();

  const { analyticsData } = useAnalytics();

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      palavra: '',
    },
    resolver: yupResolver(schema),
  });

  const handleOnPressExcluirButton = async formData => {
    try {
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
        console.log({ formData });

        await deletarUsuario();

        await signOut();

        await analyticsData('confirmar_exclusao_conta', 'Click', 'Perfil');

        navigation.navigate('CONTA_EXCLUIDA');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // const excluirUsuario = () => {
  //   if (Object.keys(palavra).length !== 0 && palavra === 'EXCLUIR') {
  //     deletarUsuario()
  //       .then(value => {
  //         if (value.status === 200) {
  //           realizarLogout();
  //           navigation.navigate('CONTA_EXCLUIDA');
  //           analyticsData('confirmar_exclusao_conta', 'Click', 'Perfil');
  //         }
  //       })
  //       .catch(error => {
  //         console.log(error);
  //         setIsvalidator(false);
  //         setCorPrimariaSenha('#F2453D');
  //         setTimeout(() => {
  //           setIsvalidator(true);
  //           setCorPrimariaSenha('#FF9800');
  //         }, 4000);
  //       });
  //   } else {
  //     setIsvalidator(false);
  //     setCorPrimariaSenha('#F2453D');
  //     setTimeout(() => {
  //       setCorPrimariaSenha('#FF9800');
  //       setIsvalidator(true);
  //     }, 4000);
  //   }
  // };

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
    <View style={styles.margem}>
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
        disabled={isLOading}
        labelStyle={styles.botaoExcluirConta}
        onPress={handleSubmit(handleOnPressExcluirButton)}>
        EXCLUIR
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  margem: {
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
  infoErro: {
    marginLeft: 16,
    marginRight: 16,
    color: '#FF0C3E',
    width: 342,
    height: 46,
    fontSize: 14,
  },
});
