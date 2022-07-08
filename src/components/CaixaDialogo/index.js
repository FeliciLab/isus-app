import React, { useContext } from 'react';
import { View } from 'react-native';
import {
  Button,
  DefaultTheme,
  Dialog,
  Paragraph,
  Portal,
} from 'react-native-paper';
import { CaixaDialogoContext } from '~/context/CaixaDialogoContext';

const CaixaDialogo = () => {
  const {
    visivel,
    cor,
    titulo,
    texto,
    textoCancelamento,
    textoConclusao,
    aoCancelar,
    aoConcluir,
  } = useContext(CaixaDialogoContext);

  const theme = {
    ...DefaultTheme,
    colors: {
      primary: cor,
    },
  };

  return (
    <View>
      <Portal>
        <Dialog visible={visivel} onDismiss={() => aoCancelar()}>
          {titulo === '' ? undefined : <Dialog.Title>{titulo}</Dialog.Title>}
          {/* <Dialog.Title>{titulo}</Dialog.Title> */}
          <Dialog.Content>
            <Paragraph>{texto}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button theme={theme} onPress={() => aoCancelar()}>
              {textoCancelamento}
            </Button>
            <Button theme={theme} onPress={() => aoConcluir()}>
              {textoConclusao}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default CaixaDialogo;
