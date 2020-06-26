import React from 'react';
import { Card, Button } from 'react-native-paper';
import {
  View, Text, Image, StyleSheet
} from 'react-native';

const CartaoDeEstagio = (estagio, navigation) => (
    <Card
      key={estagio.id}
      elevation={4}
      style={{
        ...estilo.cartao,
        MaxHeight: estagio.estaAberto ? (estagio.alturaDoCartao) : (172)
      }}
    >
    <Card.Content style={estilo.conteudoDoCard}>
        <View style={estilo.containerDoCartao}>
            <View style={estilo.subcontainerDoCartao}>
                <Text style={estilo.estiloDoEstagio}>
                    {estagio.tituloEstagio}
                </Text>
               <Text
                 style={{ ...estilo.estilo2DoEstagio, color: estagio.cor }}
               >
                 {estagio.titulo}
               </Text>
                {
                    estagio.subtitulo && (
                        <Text style={estilo.subtituloDoEstagio}>
                            {estagio.subtitulo}
                        </Text>
                    )
                }
            </View>
            <View>
                {
                    estagio.id === 4 ? <Image source={estagio.Logo} /> : <estagio.Logo />
                }
            </View>
        </View>
        <View>
        {
            estagio.estaAberto && <estagio.conteudoOculto navigation={navigation} />
        }
        </View>
    </Card.Content>
    <Card.Actions>
        <Button
          color={estagio.cor}
          style={estilo.cartaoBotao}
          onPress={() => estagio.metodoDeAbertura(!estagio.estaAberto)}
        >
        {estagio.estaAberto ? 'fechar' : 'Saiba mais'}
        </Button>
    </Card.Actions>
    </Card>
);

const estilo = StyleSheet.create({
  cartao: {
    marginVertical: 8,
    marginHorizontal: 1,
  },
  containerDoCartao: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  conteudoDoCard: {
    flexDirection: 'column'
  },
  subcontainerDoCartao: {
    flex: 1
  },
  estiloDoEstagio: {
    marginVertical: 7,
    letterSpacing: 1.5,
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: 10
  },
  estilo2DoEstagio: {
    fontSize: 24
  },
  subtituloDoEstagio: {
    color: 'rgba(0,0,0,0.6)',
    fontSize: 14,
    marginVertical: 15
  },
  cartaoBotao: {
    color: '#4054B2',
    letterSpacing: 0.75
  }
});

export default CartaoDeEstagio;
