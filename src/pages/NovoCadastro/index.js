import React from 'react';
import {
  Platform
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import BarraDeStatus from '../../components/barraDeStatus';


function TelaDeCadastro() {
  // const navigator = useNavigation();
  // const textoDeApresentacao = 'Vamos realizar seu cadast
  // ro, precisamos apenas de algumas informações';
  // const textoDeTelaSenha = 'Para finalizar seu cadastro,
  // precisamos apenas de mais uma informação:';


  return (
    <>
      <BarraDeStatus barStyle="light-content" backgroundColor="#FFF" />
      <KeyboardAwareScrollView
        style={{ backgroundColor: '#FFF' }}
        extraScrollHeight={100}
        keyboardOpeningTime={100}
        enableOnAndroid
        enableAutomaticScroll={Platform.OS === 'ios'}
      >
        {/* <View style={{ marginHorizontal: 16 }}>
          {
            TelaAtual.indice === 2
              ? <Text style={estilos.apresentacao}>{textoDeTelaSenha}</Text>
              : <Text style={estilos.apresentacao}>{textoDeApresentacao}</Text>
          }

            { TelaAtual.tela }
        </View> */}
      </KeyboardAwareScrollView>
    </>
  );
}

export default function ConteudoTelaDeCadastro() {
  return (
    <TelaDeCadastro />
  );
}

// const estilos = StyleSheet.create({
//   apresentacao: {
//     fontSize: 24,
//     marginTop: 40,
//     lineHeight: 28,
//     color: 'rgba(0, 0, 0, 0.87)'
//   },
//   campoDeTexto: {
//     paddingBottom: 28,
//     backgroundColor: '#FFF'
//   },
//   botao: {
//     borderRadius: 50,
//     width: 150,
//     height: 45,
//     alignSelf: 'flex-end',
//     margin: 20,
//     justifyContent: 'center',
//     backgroundColor: '#BDBDBD'
//   },

// });
