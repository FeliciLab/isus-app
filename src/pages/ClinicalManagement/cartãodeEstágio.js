import React from 'react';
import { Card, Button } from 'react-native-paper';
import {
  View, Text, Image, StyleSheet
} from 'react-native';

const CartãoDeEstágio = estágio => (
    <Card
      key={estágio.id}
      elevation={4}
      style={{
        ...estilo.cartão,
        MaxHeight: estágio.estáAberto ? (estágio.alturaDoCartão) : (172)
      }}
    >
    <Card.Content style={estilo.conteúdoDoCard}>
        <View style={estilo.containerDoCartão}>
            <View style={estilo.subcontainerDoCartão}>
                <Text style={estilo.estiloDoEstágio}>
                    {estágio.títuloEstágio}
                </Text>
               <Text
                 style={{ ...estilo.estilo2DoEstágio, color: estágio.cor }}
               >
                 {estágio.título}
               </Text>
                {
                    estágio.subtítulo && (
                        <Text style={estilo.subtítuloDoEstágio}>
                            {estágio.subtítulo}
                        </Text>
                    )
                }
            </View>
            <View>
                {
                    estágio.id === 4 ? <Image source={estágio.Logo} /> : <estágio.Logo />
                }
            </View>
        </View>
        <View>
        {
            estágio.estáAberto && <estágio.conteúdoOculto navigation={estágio.navigation} />
        }
        </View>
    </Card.Content>
    <Card.Actions>
        <Button
          color={estágio.cor}
          style={estilo.cartãoBotão}
          onPress={() => estágio.métodoDeAbertura(!estágio.estáAberto)}
        >
        {estágio.estáAberto ? 'fechar' : 'Saiba mais'}
        </Button>
    </Card.Actions>
    </Card>
);

const estilo = StyleSheet.create({
  cartão: {
    marginVertical: 8,
    marginHorizontal: 1,
  },
  containerDoCartão: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  conteúdoDoCard: {
    flexDirection: 'column'
  },
  subcontainerDoCartão: {
    flex: 1
  },
  estiloDoEstágio: {
    marginVertical: 7,
    letterSpacing: 1.5,
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: 10
  },
  estilo2DoEstágio: {
    fontSize: 24
  },
  subtítuloDoEstágio: {
    color: 'rgba(0,0,0,0.6)',
    fontSize: 14,
    marginVertical: 15
  },
  cartãoBotão: {
    color: '#4054B2',
    letterSpacing: 0.75
  }
});

export default CartãoDeEstágio;
