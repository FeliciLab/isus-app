import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Card, Paragraph } from 'react-native-paper';
import { pegarProjetosPorProfissional } from '~/apis/apiHome';
import ListServices from '~/components/ListServices';
import CartaoDeConteudo from './CartaoDeConteudo';

function MeusConteudos() {
  const navigation = useNavigation();

  const [conteudos, setConteudos] = useState([]);

  const [isLoading, setIsloading] = useState(false);

  const aoIniciar = async () => {
    try {
      setIsloading(true);
      const resposta = await pegarProjetosPorProfissional();
      console.log('resposta', resposta.data);
      setConteudos(resposta.data.projetosDoProfissional);
    } catch (err) {
      console.log(err);
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    aoIniciar();
  }, []);

  const ListaDeConteudo = () => {
    if (conteudos && conteudos.length > 0) {
      return (
        <View style={estilos.listServices}>
          <ListServices
            dados={conteudos.slice(0, 4)}
            aoRenderizarItem={conteudo => (
              <CartaoDeConteudo conteudo={conteudo} />
            )}
          />
        </View>
      );
    }
    return (
      <Card elevation={4} style={estilos.cardSemConteudo}>
        <Paragraph style={estilos.paragrafoSemConteudo}>
          Ainda não temos conteúdo específico para sua área, mas se você acha
          que isso é importante,{' '}
          <Text
            style={estilos.link}
            onPress={() => navigation.navigate('FEEDBACK')}>
            Fale Conosco.
          </Text>
        </Paragraph>
      </Card>
    );
  };

  return (
    <>
      <View style={estilos.conteudoTitulo}>
        <Text style={estilos.fontText}>Meus Conteúdos</Text>
        {conteudos && conteudos.length > 0 && (
          <TouchableOpacity
            style={estilos.conteudoVerMais}
            onPress={() => navigation.navigate('MeusConteudos', { conteudos })}>
            <Text style={estilos.verMais}>Ver mais</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={estilos.listaDeConteudo}>
        {isLoading ? <ActivityIndicator /> : <ListaDeConteudo />}
      </View>
    </>
  );
}

const estilos = StyleSheet.create({
  conteudoTitulo: {
    margin: 16,
    marginTop: 24,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fontText: {
    fontWeight: '500',
    fontSize: 20,
    color: 'rgba(0, 0, 0, 0.6)',
  },
  conteudoVerMais: {
    alignSelf: 'center',
  },
  verMais: {
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 16,
    textAlign: 'center',
    letterSpacing: 0.75,
    textTransform: 'uppercase',
    color: '#FF9800',
  },
  cardSemConteudo: {
    margin: 16,
    padding: 16,
  },
  paragrafoSemConteudo: {
    textAlign: 'center',
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.6)',
  },
  listaDeConteudo: {
    marginBottom: 24,
  },
  link: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  listServices: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default MeusConteudos;
