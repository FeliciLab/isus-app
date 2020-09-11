import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { aplicaMascaraNumerica } from '../../utils/mascaras';

function DadosUsuario({ dados }) {
  return (
    <View style={estilos.espacamento}>
      <Text style={estilos.label}>NOME</Text>
      <Text style={estilos.dado}>
        {dados.name}
      </Text>
      <Text style={estilos.label}>E-MAIL</Text>
      <Text style={estilos.dado}>{dados.email}</Text>
      <Text style={estilos.label}>TELEFONE</Text>
      <Text style={estilos.dado}>
        {dados.telefone ? aplicaMascaraNumerica(dados.telefone, '(##) #####-####') : 'Não informado'}
      </Text>
      <Text style={estilos.label}>CPF</Text>
      <Text style={estilos.dado}>
        {dados.cpf ? aplicaMascaraNumerica(dados.cpf, '###.###.###-##') : 'Não informado'}
      </Text>
      <Text style={estilos.label}>MUNICIPIO</Text>
      <Text style={estilos.dado}>
        {dados.municipio.nome || 'Não informado'}
      </Text>
    </View>
  );
}

function DadosUsuarioProfissional({ dados }) {
  return (
    <View style={estilos.espacamento}>
      <Text style={estilos.label}>CATEGORIA PROFISSIONAL</Text>
      <Text style={estilos.dado}>
        {
        dados.profissional.categoria_profissional.nome || 'Adicionar'
        }
      </Text>
      <Text style={estilos.label}>SERVIÇOS EM QUE ATUA</Text>
      <Text style={estilos.dado}>
        {
          dados.profissional.unidades_servicos.length ? (
            dados.profissional.unidades_servicos.map(dado => (
              dado.nome
            )).join(', ')
          ) : (
            'Adicionar'
          )
        }
      </Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  label: {
    fontSize: 10,
    fontWeight: '500',
    letterSpacing: 1.5,
    color: 'rgba(0,0,0,0.6)'
  },
  dado: {
    marginTop: 1,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'normal',
    color: 'rgba(0,0,0,0.87)'
  },
  espacamento: {
    marginLeft: 20,
    marginBottom: 10
  }
});

export {
  DadosUsuario,
  DadosUsuarioProfissional
};
