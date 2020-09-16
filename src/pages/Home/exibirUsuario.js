import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ExibirUsuario({ dados }) {
  return (
    <View>
      <Text style={style.perfil}>
        Olá,
        {' '}
        { dados.name }
      </Text>
      <Text style={style.atuacaoCategoria}>
        {
        // eslint-disable-next-line
        dados.profissional && (dados.profissional.categoria_profissional && dados.profissional.unidades_servicos) ? MostrarDadosUsuarioProfissional(dados)
          : ' '
        }
      </Text>
    </View>
  );
}

function MostrarDadosUsuarioProfissional(dados) {
  return (
    <>
      {
        dados.profissional && dados.profissional.unidades_servicos.length ? (
          dados.profissional.unidades_servicos.map(dado => (
            dado.nome
          )).join(', ')
        ) : (
          ''
        )
      }
      {', '}
      {
        dados.profissional && dados.profissional.categoria_profissional ? dados.profissional.categoria_profissional.nome : ''
      }
    </>
  );
}

const style = StyleSheet.create({
  semPerfil: {
    backgroundColor: '#fff',
  },
  perfil: {
    backgroundColor: '#fff',
    paddingTop: 15,
    paddingLeft: 16,
    fontSize: 34
  },
  atuacaoCategoria: {
    backgroundColor: '#fff',
    color: 'rgba(0,0,0,0.6)',
    paddingTop: -10,
    paddingLeft: 18,
    paddingBottom: 10,
    fontSize: 15,
    fontStyle: 'italic'
  }
});
