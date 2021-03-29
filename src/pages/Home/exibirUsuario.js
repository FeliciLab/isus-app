import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

function MostrarDadosUsuarioProfissional(dados) {
  let unidadesServicoes = '';
  if (dados.profissional && dados.profissional.unidades_servicos.length > 0) {
    unidadesServicoes = dados.profissional.unidades_servicos[0].nome;
  }

  let categoriaProfissional = '';
  if (dados.profissional && dados.profissional.categoria_profissional) {
    categoriaProfissional = dados.profissional.categoria_profissional.nome;
  }

  return `${unidadesServicoes}, ${categoriaProfissional}`;
}

const style = StyleSheet.create({
  semPerfil: {
    backgroundColor: '#fff'
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

export default function ExibirUsuario({ dados }) {
  const [detalhes, setDetalhes] = useState('');

  useEffect(() => {
    // eslint-disable-next-line
    if (dados?.profissional?.unidades_servicos) {
      setDetalhes(MostrarDadosUsuarioProfissional(dados));
    }
  }, [dados, setDetalhes]);

  return (
    <View>
      <Text style={style.perfil}>
        Olá,
        {' '}
        {dados.name}
      </Text>
      <Text style={style.atuacaoCategoria}>
        {detalhes}
      </Text>
    </View>
  );
}
