import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useLayoutEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Select from '~/components/Select';
import { CORES } from '~/constantes/estiloBase';
import useAutenticacao from '~/hooks/useAutenticacao';
import {
  AlunoInfo,
  Container,
  MarcarPresencaButton,
  SubTitle,
  Title,
  Warning,
  WrapperSelect,
} from './styles';

const CorfirmarPresenca = () => {
  const navigation = useNavigation();

  const { user } = useAutenticacao();

  const [componenteHospitalar, setComponenteHospitalar] = useState();

  const [programaResidencia, setProgramaResidencia] = useState();

  const [municipio, setMunicipio] = useState();

  const {
    params: { oferta },
  } = useRoute();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#4CAF50',
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: '#fff',
      headerTitleAlign: 'center',
      headerTitle: 'Residências em Saúde',
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19,
          }}
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="arrow-left" size={28} color={CORES.BRANCO} />
        </TouchableOpacity>
      ),
    });
  });

  // TODO: implementar
  const handleMarcarPresencaButton = () => {
    console.log('MarcarPresencaButton');
  };

  return (
    <Container>
      <Title>Residência Multiprofissional | {oferta.title}</Title>
      <SubTitle>
        {oferta.title} | {oferta.inicio} a {oferta.fim}
      </SubTitle>
      <View>
        <AlunoInfo>Aluno(a): {user.name}</AlunoInfo>
        <AlunoInfo>Data: 07/03/2022 | Turno: Manhã </AlunoInfo>
      </View>

      {/* TODO: remover esses componentes */}
      <Text>{componenteHospitalar}</Text>
      <Text>{programaResidencia}</Text>
      <Text>{municipio}</Text>

      <WrapperSelect>
        <Select
          label="Componente Hospitalar"
          setValue={setComponenteHospitalar}
          items={[
            { label: 'Comunitário', value: 'Comunitário' },
            { label: 'Hospitalar', value: 'Hospitalar' },
          ]}
        />
      </WrapperSelect>

      <WrapperSelect>
        <Select
          label="Programa de Residência"
          setValue={setProgramaResidencia}
          items={[
            {
              label: 'Saúde da Família e Comunidade',
              value: 'Saúde da Família e Comunidade',
            },
            { label: 'Saúde Mental Coletiva', value: 'Saúde Mental Coletiva' },
            { label: 'Saúde Coletiva', value: 'Saúde Coletiva' },
          ]}
        />
      </WrapperSelect>
      <WrapperSelect>
        <Select
          label="Selecione o Município"
          setValue={setMunicipio}
          items={[
            { label: 'Acaraú', value: 'Acaraú' },
            { label: 'Aracati', value: 'Aracati' },
            { label: 'Camocim', value: 'Camocim' },
          ]}
        />
      </WrapperSelect>
      <MarcarPresencaButton
        color="#fff"
        label="MARCAR PRESENÇA"
        small
        onPress={handleMarcarPresencaButton}
      />
      <Warning>
        Atenção: O botão de presença só ficará ativo no horário previsto. Você
        só poderá marcar sua frequência no período da manhã (de 9h às 10h) ou
        durante as tardes (de 15 às 16h). Se você errar a seleção de alguma
        informação, poderá corrigir no período permitido.
      </Warning>
    </Container>
  );
};

export default CorfirmarPresenca;
