import { useNavigation, useRoute } from '@react-navigation/native';
import moment from 'moment';
import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-paper';
import CustonDialog from '~/components/CustonDialog';
import CustonFAB from '~/components/CustonFAB/index';
import SelectModal from '~/components/SelectModal';
import { CORES } from '~/constantes/estiloBase';
import rotas from '~/constantes/rotas';
import useAutenticacao from '~/hooks/useAutenticacao';
import { useSaguUserInfo } from '~/hooks/useSaguUserInfo';
import { useUserPresencas } from '~/hooks/useUserPresencas';
import { ArrowLeftIcon } from '~/icons';
import { marcarPresenca, updateSaguUserInfo } from '~/services/frequencias';
import {
  componentes,
  getProgramasResidencias,
  getResidenciaMunicipios,
} from './options';
import {
  ActivityIndicatorWrapper,
  AlunoInfo,
  Container,
  Content,
  SubTitle,
  Title,
  Warning,
} from './styles';

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

  const [isManha, setIsManha] = useState(false);

  const [isTarde, setIsTarde] = useState(false);

  // é possivel marcar a presenca se estiver no horário e se o dia não é sabado ou domingo
  const isPresenceIsCheckable = useMemo(() => {
    return (
      (isManha || isTarde) &&
      [1, 2, 3, 4, 5].some(item => item === moment().day())
    );
  }, [isManha, isTarde]);

  const currentTurn = useMemo(() => {
    if (isManha) return 'manhã';
    if (isTarde) return 'tarde';
    return '-';
  }, [isManha, isTarde]);

  const atualSaguUserInfoIsValid = useMemo(() => {
    return getResidenciaMunicipios(programaResidencia).length > 0
      ? componente && programaResidencia && residenciaMunicipio
      : componente && programaResidencia;
  }, [
    getResidenciaMunicipios,
    componente,
    programaResidencia,
    residenciaMunicipio,
  ]);

  const {
    saguUserInfo,
    fetchSaguUserInfo,
    isLoading: saguUserInfoIsLoading,
  } = useSaguUserInfo(user.id);

  const { presencas, fetchUserPresencas } = useUserPresencas(
    user.id,
    oferta.id,
  );

  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: CORES.VERDE,
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: CORES.BRANCO,
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

  useEffect(() => {
    fetchSaguUserInfo();
    fetchUserPresencas();
  }, []);

  useEffect(() => {
    setComponente(saguUserInfo?.componente);
    setProgramaResidencia(saguUserInfo?.programa_residencia);
    setResidenciaMunicipio(saguUserInfo?.municipio_residencia);
  }, [saguUserInfo]);

  useEffect(() => {
    const schedule = setInterval(() => {
      const now = moment().format('HH:mm'); // pega o horário atual

      setIsManha(now >= '09:00' && now <= '10:00');

      setIsTarde(now >= '15:00' && now <= '16:00');
    }, 100);

    return () => clearInterval(schedule);
  }, []);

  const handleUpdateSaguUserInfo = async () => {
    try {
      setIsLoading(true);

      await Promise.all([
        updateSaguUserInfo(user.id, {
          componente,
          programaResidencia,
          residenciaMunicipio,
        }),
        marcarPresenca(user.id, oferta.id, {
          data: moment(), // não precisar ser formatada
          turno: currentTurn,
        }),
      ]);

      navigation.navigate(rotas.SUCESSO_PRESENCA, { oferta });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarcarPresencaButtonOnPress = async () => {
    const newPresenca = {
      data: moment().format('DD/MM/YYYY'),
      turno: currentTurn,
    };

    // Verifica se já existe uma presença para aquele dia e turno para o usuário e oferta
    const presencaMarcada = presencas.some(
      item =>
        newPresenca.data === moment(item.data).format('DD/MM/YYYY') &&
        newPresenca.turno === item.turno,
    );

    if (presencaMarcada) {
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
        <SelectModal
          title="Componente Hospitalar"
          placeholder="Componente Hospitalar"
          items={componentes.map(item => ({
            label: item,
            value: item,
          }))}
          value={componente}
          setValue={value => {
            setComponente(value);
            setProgramaResidencia(null);
            setResidenciaMunicipio(null);
          }}
        />
      )}
      {componente && (
        <SelectModal
          title="Programa de Residência"
          placeholder="Programa de Residência"
          items={getProgramasResidencias(componente).map(item => ({
            label: item,
            value: item,
          }))}
          value={programaResidencia}
          setValue={value => {
            setProgramaResidencia(value);
            setResidenciaMunicipio(null);
          }}
        />
      )}
      {programaResidencia &&
        getResidenciaMunicipios(programaResidencia).length > 0 && (
          <SelectModal
            title="Selecione o Município"
            placeholder="Selecione o Município"
            items={getResidenciaMunicipios(programaResidencia).map(item => ({
              label: item,
              value: item,
            }))}
            value={residenciaMunicipio}
            setValue={setResidenciaMunicipio}
          />
        )}
      {atualSaguUserInfoIsValid && (
        <Content>
          <View>
            <AlunoInfo>Aluno(a): {user.name}</AlunoInfo>
            <AlunoInfo>
              Data: {moment().format('DD/MM/YYYY')} | Turno: {currentTurn}{' '}
            </AlunoInfo>
          </View>
          <CustonFAB
            color="#fff"
            label={
              isPresenceIsCheckable ? 'MARCAR PRESENÇA' : 'FORA DO HORÁRIO'
            }
            small
            onPress={handleMarcarPresencaButtonOnPress}
            disabled={isLoading || !isPresenceIsCheckable}
            loading={isLoading}
          />
          <View>
            <Warning>
              Atenção: O botão de presença só ficará ativo no horário previsto.
              Você só poderá marcar sua frequência no período da manhã (de 9h às
              10h) ou durante as tardes (de 15 às 16h). Se você errar a seleção
              de alguma informação, poderá corrigir no período permitido.
            </Warning>
          </View>
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
