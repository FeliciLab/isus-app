import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Surface, Text } from 'react-native-paper';

export default function CartaoDeConteudo(props) {
  const navigation = useNavigation();

  const { conteudo } = props;

  return (
    <Surface>
      <TouchableOpacity
        style={styles.cartao}
        onPress={() =>
          navigation.navigate(conteudo.tipo_conteudo, {
            title: 'Meus Conteúdos',
            url: conteudo.link,
          })
        }>
        <Image
          resizeMode="cover"
          style={styles.imagem}
          source={{ uri: conteudo.imagem }}
        />
        <View style={styles.textos}>
          <Text numberOfLines={2} style={styles.titulo}>
            {conteudo.title}
          </Text>
          <Text style={styles.data}>
            {moment(conteudo.data).format('DD/MM/YYYY')}
          </Text>
        </View>
      </TouchableOpacity>
    </Surface>
  );
}

const styles = StyleSheet.create({
  imagem: {
    height: 100,
    width: 140,
  },
  cartao: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginVertical: 4,
    elevation: 4,
    backgroundColor: '#FAFAFA',
  },
  titulo: {
    fontSize: 14,
    letterSpacing: 0.25,
    color: 'rgba(0, 0, 0, 0.87)',
    lineHeight: 20,
  },
  data: {
    fontWeight: '500',
    fontSize: 10,
    letterSpacing: 1.5,
    color: '#4CAF50',
    marginTop: 10,
  },
  textos: {
    flex: 1,
    marginHorizontal: 16,
    maxWidth: 207,
    alignSelf: 'center',
  },
});
