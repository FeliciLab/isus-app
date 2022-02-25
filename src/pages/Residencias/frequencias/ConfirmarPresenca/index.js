import { useNavigation, useRoute } from '@react-navigation/native';
import moment from 'moment';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-paper';
import CustonDialog from '~/components/CustonDialog';
import Select from '~/components/Select';
import { CORES } from '~/constantes/estiloBase';
import rotas from '~/constantes/rotas';
import useAutenticacao from '~/hooks/useAutenticacao';
import { useSaguUserInfo } from '~/hooks/useSaguUserInfo';
import { ArrowLeftIcon } from '~/icons';
import { updateSaguUserInfo } from '~/services/frequencias';
import {
  AlunoInfo,
  Container,
  MarcarPresencaButton,
  SubTitle,
  Title,
  Warning,
  WrapperSelect,
  ActivityIndicatorWrapper,
  Content,
} from './styles';

// TODO: Usar react hook form
const ConfirmarPresenca = () => {
  const navigation = useNavigation();

  const {
    params: { oferta },
  } = useRoute();

  const { user } = useAutenticacao();

  const [componente, setComponente] = useState();

  const [programaResidencia, setProgramaResidencia] = useState();

  const [residenciaMunicipio, setResidenciaMunicipio] = useState();

  const [dialogVisible, setDialogVisible] = useState(false);

  const {
    saguUserInfo,
    featchSaguUserInfo,
    isLoading: saguUserInfoIsLoading,
  } = useSaguUserInfo(user.id);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    featchSaguUserInfo();
  }, []);

  useEffect(() => {
    setComponente(saguUserInfo?.componente);
    setProgramaResidencia(saguUserInfo?.programa_residencia);
    setResidenciaMunicipio(saguUserInfo?.municipio_residencia);
  }, [saguUserInfo]);

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

  const handleUpdateSaguUserInfo = async () => {
    try {
      setIsLoading(true);

      await updateSaguUserInfo(user.id, {
        componente,
        programaResidencia,
        residenciaMunicipio,
      });

      navigation.navigate(rotas.SUCESSO_PRESENCA, { oferta });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarcarPresencaButton = async () => {
    // Caso as informações do Sagu so usuário já existam

    // Mudar isso, para o caso do usuário já ter marcao a presença no dia
    if (saguUserInfo) {
      setDialogVisible(true);
      return;
    }

    await handleUpdateSaguUserInfo();
  };

  const handleMarcarPresencaDialogVoltarButton = () => {
    setDialogVisible(false);
  };

  const handleMarcarPresencaDialogConfirmarButton = async () => {
    setDialogVisible(false);
    await handleUpdateSaguUserInfo();
  };

  if (saguUserInfoIsLoading) {
    return (
      <ActivityIndicatorWrapper>
        <ActivityIndicator size="large" />
      </ActivityIndicatorWrapper>
    );
  }

  return (
    <Container>
      <Title>Residência Multiprofissional | {oferta.title}</Title>
      <SubTitle>
        {oferta.title} | {moment(oferta.inicio).format('DD/MM')} a{' '}
        {moment(oferta.fim).format('DD/MM/YYYY')}
      </SubTitle>
      {useSaguUserInfo && (
        <WrapperSelect>
          <Select
            label="Componente Hospitalar"
            value={componente}
            setValue={setComponente}
            items={[
              { label: 'Comunitário', value: 'Comunitário' },
              { label: 'Hospitalar', value: 'Hospitalar' },
            ]}
          />
        </WrapperSelect>
      )}
      {componente && (
        <WrapperSelect>
          <Select
            label="Programa de Residência"
            value={programaResidencia}
            setValue={setProgramaResidencia}
            items={[
              {
                label: 'Saúde da Família e Comunidade',
                value: 'Saúde da Família e Comunidade',
              },
              {
                label: 'Saúde Mental Coletiva',
                value: 'Saúde Mental Coletiva',
              },
              { label: 'Saúde Coletiva', value: 'Saúde Coletiva' },
            ]}
          />
        </WrapperSelect>
      )}
      {programaResidencia && (
        <WrapperSelect>
          <Select
            label="Selecione o Município"
            value={residenciaMunicipio}
            setValue={setResidenciaMunicipio}
            items={[
              { label: 'Acaraú', value: 'Acaraú' },
              { label: 'Aracati', value: 'Aracati' },
              { label: 'Camocim', value: 'Camocim' },
            ]}
          />
        </WrapperSelect>
      )}
      {residenciaMunicipio && (
        <Content>
          <View>
            <AlunoInfo>Aluno(a): {user.name}</AlunoInfo>
            <AlunoInfo>
              Data: {moment(new Date()).format('DD/MM/YYYY')} | Turno: Manhã{' '}
            </AlunoInfo>
          </View>
          <MarcarPresencaButton
            color="#fff"
            label="MARCAR PRESENÇA"
            small
            onPress={handleMarcarPresencaButton}
            disabled={isLoading}
            loading={isLoading}
          />
          <Warning>
            Atenção: O botão de presença só ficará ativo no horário previsto.
            Você só poderá marcar sua frequência no período da manhã (de 9h às
            10h) ou durante as tardes (de 15 às 16h). Se você errar a seleção de
            alguma informação, poderá corrigir no período permitido.
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
        </Content>
      )}
    </Container>
  );
};

export default ConfirmarPresenca;
