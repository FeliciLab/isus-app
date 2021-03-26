import React, { useEffect, useState } from 'react';
import {
  TouchableOpacity, View, Text, StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card, Paragraph, ActivityIndicator } from 'react-native-paper';
import { pegarProjetosPorProfissional } from '../../../apis/apiHome';
import CartaoDeConteudo from './CartaoDeConteudo';
import { Titulo } from '../styles';
import Carrossel from '../../../components/Carrossel';

function MeusConteudos() {
  const navigation = useNavigation();
  const [conteudos, alterarConteudos] = useState([]);
  const [carregados, alterarCarregamento] = useState(false);

  const aoIniciar = async () => {
    try {
      alterarCarregamento(true);
      const resposta = await pegarProjetosPorProfissional();
      console.log('resposta', resposta.data);
      alterarConteudos(resposta.data.projetosDoProfissional);
      alterarCarregamento(false);
    } catch (err) {
      console.log(err);
      alterarCarregamento(false);
    }
  };

  useEffect(() => {
    aoIniciar();
  }, []);

  const ListaDeConteudo = () => {
    if (conteudos && conteudos.length > 0) {
      return (
        <Carrossel
          dados={conteudos.slice(0, 4)}
          aoRenderizarItem={conteudo => (
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
        <Titulo>Meus Conteúdos</Titulo>
        {conteudos && conteudos.length > 0 && (
          <TouchableOpacity
            style={estilos.conteudoVerMais}
            onPress={() => navigation.navigate('MeusConteudos', { conteudos })}
          >
            <Text style={estilos.verMais}>
              Ver mais
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={estilos.listaDeConteudo}>
        {!carregados ? <ListaDeConteudo /> : <ActivityIndicator />}
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
    justifyContent: 'space-between'
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
    color: 'rgba(0, 0, 0, 0.6)'
  },
  listaDeConteudo: {
    marginBottom: 24
  },
  link: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  }
});

export default MeusConteudos;
