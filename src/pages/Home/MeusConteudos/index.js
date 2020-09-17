import React, { useEffect, useState } from 'react';
import {
  TouchableOpacity, View, FlatList, Text, StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card, Paragraph } from 'react-native-paper';
import { pegarProjetosPorProfissional } from '../../../apis/apiHome';
import CartaoDeConteudo from './CartaoDeConteudo';


function MeusConteudos() {
  const navigation = useNavigation();
  const [conteudos, alterarConteudos] = useState([]);

  const aoIniciar = async () => {
    try {
      const resposta = await pegarProjetosPorProfissional();
      console.log('resposta', resposta.data);
      alterarConteudos(resposta.data.projetosDoProfissional);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    aoIniciar();
  }, []);

  const ListaDeConteudo = () => {
    if (conteudos.length > 0) {
      return (
        <FlatList
          horizontal
          data={conteudos}
          keyExtractor={(item, index) => `${index}`}
          style={{
            flexDirection: 'row',
            alignSelf: 'center'
          }}
          showsHorizontalScrollIndicator={false}
          renderItem={conteudo => (
            <CartaoDeConteudo conteudo={conteudo} />
          )}
        />
      );
    }
    return (
      <Card elevation={4} style={estilos.cardSemConteudo}>
        <Paragraph style={estilos.paragrafoSemConteudo}>
          Ainda não temos conteúdo específico para sua área, mas se você acha que isso é importante,
          {' '}
          <Text style={estilos.link} onPress={() => navigation.navigate('FEEDBACK')}>Fale Conosco.</Text>
        </Paragraph>
      </Card>
    );
  };

  return (
    <>
      <View style={estilos.conteudoTitulo}>
        <Text style={estilos.titulo}>Meus Conteúdos</Text>
        <TouchableOpacity style={estilos.conteudoVerMais} onPress={() => navigation.navigate('MeusConteudos')}>
          <Text style={estilos.verMais}>Ver mais</Text>
        </TouchableOpacity>
      </View>
      <ListaDeConteudo />
    </>
  );
}

const estilos = StyleSheet.create({
  conteudoTitulo: {
    margin: 16,
    marginTop: 24,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  conteudoVerMais: {
    alignSelf: 'center',
  },
  verMais: {
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 16,
    textAlign: 'center',
    letterSpacing: 0.75,
    textTransform: 'uppercase',
    color: '#FF9800',

  },
  titulo: {
    fontSize: 20,
    fontWeight: '500',
    color: 'rgba(0, 0, 0, 0.6)',
  },
  cardSemConteudo: {
    margin: 16,
    padding: 16,
  },
  paragrafoSemConteudo: {
    textAlign: 'center',
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.6)'
  },
  link: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  }
});

export default MeusConteudos;
