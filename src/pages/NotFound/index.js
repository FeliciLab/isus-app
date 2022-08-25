import React, { useState } from 'react';
import { Alert, Linking, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import VersionCheck from 'react-native-version-check';
import SvgDoacoes from '~/assets/images/notfound/no-data.svg';
import Alerta from '~/components/Alerta';
import { CORES } from '~/constantes/estiloBase';

const NotFound = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [exibicaoDoAlerta, setExibicaoDoAlerta] = useState(false);

  const [mensagemDoAlerta, setMensagemDoAlerta] = useState('');

  const handleVerifyUpdateVersionApp = async () => {
    try {
      setIsLoading(true);

      const { isNeedend, storeUrl } = await VersionCheck.needUpdate();

      if (isNeedend) {
        console.log(isNeedend ? 'precisa atualizar' : 'não precisa atualizar');
        Linking.openURL(storeUrl);
      } else {
        Alert.alert(
          'iSUS já atualizado',
          'Você já tem a versão mais recente do iSUS',
        );
      }
    } catch (error) {
      setMensagemDoAlerta(error);
      setExibicaoDoAlerta(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <SvgDoacoes />
      <Text style={styles.title}>Poxa, não há nada aqui!</Text>
      <Text style={styles.subTitle}>
        Esta página não existe ou sua versão do aplicativo pode estar
        desatualizada.
      </Text>
      <Button
        icon="reload"
        loading={isLoading}
        color={CORES.LARANJA}
        style={{ marginTop: 40 }}
        onPress={handleVerifyUpdateVersionApp}>
        Verificar atualizações
      </Button>
      <Alerta
        visivel={exibicaoDoAlerta}
        textoDoAlerta={mensagemDoAlerta}
        duration={4000}
        onDismiss={() => setExibicaoDoAlerta(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 36,
    paddingVertical: 36,
  },
  title: {
    marginTop: 40,
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: 0.15,
    lineHeight: 24,
    color: '#141414',
  },
  subTitle: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    letterSpacing: 0.5,
    lineHeight: 24,
    color: '#666666',
  },
});

export default NotFound;
