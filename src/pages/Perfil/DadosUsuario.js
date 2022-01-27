/* eslint-disable no-mixed-operators */
import { Feature } from '@paralleldrive/react-feature-toggles';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import features from '~/constantes/features';
import { labelsAnalytics } from '~/constantes/labelsAnalytics';
import rotas from '~/constantes/rotas';
import useAnalytics from '~/hooks/useAnalytics';
import { aplicaMascaraNumerica } from '~/utils/mascaras';

function DadosUsuario({ dados }) {
  return (
    <View style={estilos.espacamento}>
      <Text style={estilos.label}>NOME</Text>
      <Text style={estilos.dado}>{dados.name}</Text>
      <Text style={estilos.label}>E-MAIL</Text>
      <Text style={estilos.dado}>{dados.email}</Text>
      <Text style={estilos.label}>TELEFONE</Text>
      <Text style={estilos.dado}>
        {dados.telefone
          ? aplicaMascaraNumerica(dados.telefone, '(##) #####-####')
          : 'Não informado'}
      </Text>
      <Text style={estilos.label}>CPF</Text>
      <Text style={estilos.dado}>
        {dados.cpf
          ? aplicaMascaraNumerica(dados.cpf, '###.###.###-##')
          : 'Não informado'}
      </Text>
      <Text style={estilos.label}>MUNICIPIO</Text>
      <Text style={estilos.dado}>
        {dados.municipio ? dados.municipio.nome : 'Não informado'}
      </Text>
      <Botao
        uri={rotas.EDICAO_INFO_PESSOAIS}
        params={{ tela_anterior: rotas.PERFIL }}
        testID="botao-editar-dado-pessoal"
        style={estilos.espacamento}>
        EDITAR INFORMAÇÕES
      </Botao>
    </View>
  );
}

function Especialidades({ dados }) {
  return (dados.profissional &&
    dados.profissional.categoria_profissional.id === 1) ||
    dados.profissional.categoria_profissional.id === 3 ? (
      <>
        <Text style={estilos.label}>ESPECIALIDADE</Text>
        <Text style={estilos.dado}>
          {dados.profissional &&
        dados.profissional.especialidades &&
        dados.profissional.especialidades.length
            ? dados.profissional.especialidades.map(dado => dado.nome).join(', ')
            : ''}
        </Text>
      </>
    ) : (
      <></>
    );
}

function DadosUsuarioProfissional({ dados }) {
  return (
    // eslint-disable-next-line
    dados.profissional &&
      dados.profissional.categoria_profissional &&
      dados.profissional.unidades_servicos ? (
        MostrarDadosUsuarioProfissional(dados)
      ) : (
        <AdicionarDadosProfissionais />
      )
  );
}

function MostrarDadosUsuarioProfissional(dados) {
  return (
    <View style={estilos.espacamento}>
      <Text style={estilos.label}>CATEGORIA PROFISSIONAL</Text>
      <Text style={estilos.dado}>
        {dados.profissional && dados.profissional.categoria_profissional
          ? dados.profissional.categoria_profissional.nome
          : ''}
      </Text>
      <Especialidades dados={dados} />
      <Text style={estilos.label}>SERVIÇOS EM QUE ATUA</Text>
      <Text style={estilos.dado}>
        {dados.profissional && dados.profissional.unidades_servicos.length
          ? dados.profissional.unidades_servicos
            .map(dado => dado.nome)
            .join(', ')
          : ''}
      </Text>
      <Feature
        name={features.EDICAO_DE_INFORMACOES_PROFISSIONAIS}
        activeComponent={() => (
          <Botao
            uri={rotas.EDICAO_PROFISSIONAL}
            params={{ tela_anterior: rotas.PERFIL }}
            testID={labelsAnalytics.EDITAR_INFORMACOES_PROFISSIONAIS}
            style={estilos.botao}>
            EDITAR INFORMAÇÕES
          </Botao>
        )}
      />
    </View>
  );
}

function AdicionarDadosProfissionais() {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text
        style={{ color: 'rgba(0,0,0,0.6)', marginBottom: 10, marginLeft: 16 }}>
        Parece que você ainda não cadastrou suas informações profissionais,
        vamos fazer isso agora?
      </Text>
      <Feature
        name={features.EDICAO_DE_INFORMACOES_PROFISSIONAIS}
        activeComponent={() => (
          <Botao
            uri={rotas.CADASTRO}
            params={{
              screen: rotas.FORMULARIO_PROFISSIONAL,
              params: { tela_anterior: rotas.PERFIL },
            }}
            testID="botao-dados-adicionar">
            ADICIONAR INFORMAÇÕES
          </Botao>
        )}
        inactiveComponent={() => (
          <Botao
            uri={rotas.EDICAO_PROFISSIONAL}
            params={{
              screen: rotas.FORMULARIO_PROFISSIONAL,
              params: { tela_anterior: rotas.PERFIL },
            }}>
            ADICIONAR INFORMAÇÕES
          </Botao>
        )}
      />
    </View>
  );
}

const Botao = ({ children, uri, params = '', testID }) => {
  const { analyticsData } = useAnalytics();
  const navigation = useNavigation();
  return (
    <Button
      testID={testID}
      color="#FF9800"
      contentStyle={{ justifyContent: 'flex-start' }}
      onPress={() => {
        if (testID === labelsAnalytics.EDITAR_INFORMACOES_PROFISSIONAIS) {
          analyticsData(
            labelsAnalytics.EDITAR_INFORMACOES_PROFISSIONAIS,
            'Click',
            'Perfil',
          );
        }
        navigation.navigate(uri, params);
      }}>
      {children}
    </Button>
  );
};

const estilos = StyleSheet.create({
  label: {
    fontSize: 10,
    fontWeight: '500',
    letterSpacing: 1.5,
    color: 'rgba(0,0,0,0.6)',
  },
  dado: {
    marginTop: 1,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'normal',
    color: 'rgba(0,0,0,0.87)',
  },
  espacamento: {
    marginLeft: 20,
    marginBottom: 10,
  },
});

export { DadosUsuario, DadosUsuarioProfissional };
