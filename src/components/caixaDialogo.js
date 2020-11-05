import * as React from 'react';
import { View } from 'react-native';
import {
  Button, Paragraph, Dialog, Portal, DefaultTheme
} from 'react-native-paper';
import { CaixaDialogoContext } from '../context/CaixaDialogoContext';

const CaixaDialogo = () => {
  const {
    visivel,
    cor, titulo, texto,
    textoCancelamento, textoConclusao,
    aoCancelar, aoConcluir
  } = React.useContext(CaixaDialogoContext);

  const theme = {
    ...DefaultTheme,
    colors: {
      primary: cor
    }
  };
  console.log(aoCancelar);
  return (
    <View>
      <Portal>
        <Dialog visible={visivel} onDismiss={() => aoCancelar()}>
          <Dialog.Title>{titulo}</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{texto}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button theme={theme} onPress={() => aoCancelar()}>{textoCancelamento}</Button>
            <Button theme={theme} onPress={() => aoConcluir()}>{textoConclusao}</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};


export default CaixaDialogo;
