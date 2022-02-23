import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useLayoutEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Select from '~/components/Select';
import { CORES } from '~/constantes/estiloBase';
import rotas from '~/constantes/rotas';
import useAutenticacao from '~/hooks/useAutenticacao';
import CustonDialog from '~/components/CustonDialog';
import {
  AlunoInfo,
  Container,
  MarcarPresencaButton,
  SubTitle,
  Title,
  Warning,
  WrapperSelect,
} from './styles';
import { Button } from 'react-native-paper';
import { ArrowLeftIcon } from '~/icons';

const ConfirmarPresenca = () => {
  const navigation = useNavigation();

  const { user } = useAutenticacao();

  const [componenteHospitalar, setComponenteHospitalar] = useState();

  const [programaResidencia, setProgramaResidencia] = useState();

  const [municipio, setMunicipio] = useState();

  const [dialogVisible, setDialogVisible] = useState(false);

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
          <ArrowLeftIcon size={28} color={CORES.BRANCO} />
        </TouchableOpacity>
      ),
    });
  });

  const handleMarcarPresencaButton = () => {
    setDialogVisible(true);
    // navigation.navigate(rotas.SUCESSO_PRESENCA, { oferta });
  };

  const handleMarcarPresencaDialogVoltarButton = () => {
    setDialogVisible(false);
  };

  const handleMarcarPresencaDialogConfirmarButton = () => {
    setDialogVisible(false);
    navigation.navigate(rotas.SUCESSO_PRESENCA, { oferta });
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
      <CustonDialog
        visible={dialogVisible}
        setVisible={setDialogVisible}
        title="Presença já confirmada"
        content="Você já marcou sua presença. Caso deseje alterar alguma informação sobre o componente, programa ou município informado, faça a seleção correta e confirme a presença novamente."
        LeftAction={() => (
          <Button
            color={CORES.LARANJA}
            onPress={handleMarcarPresencaDialogVoltarButton}>
            VOLTAR
          </Button>
        )}
        RightAction={() => (
          <Button
            color={CORES.LARANJA}
            onPress={handleMarcarPresencaDialogConfirmarButton}>
            CONFIRMAR
          </Button>
        )}
      />
    </Container>
  );
};

export default ConfirmarPresenca;
