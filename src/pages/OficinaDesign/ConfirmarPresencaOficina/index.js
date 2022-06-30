import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation, useRoute } from '@react-navigation/native';
import moment from 'moment';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-paper';
import BarraDeStatus from '~/components/BarraDeStatus';
import ControlledSelectModal from '~/components/ControlledSelectModal';
import ControlledTextInput from '~/components/ControlledTextInput';
import CustonDialog from '~/components/CustonDialog';
import CustonFAB from '~/components/CustonFAB';
import { CORES } from '~/constantes/estiloBase';
import rotas from '~/constantes/rotas';
import useAutenticacao from '~/hooks/useAutenticacao';
import { useEspUserInfo } from '~/hooks/useEspUserInfo';
import { useEspUserPresencas } from '~/hooks/useEspUserPresencas';
import { marcarPresenca, updateEspUserInfo } from '~/services/espFrequencias';
import { ArrowLeftIcon } from '~/icons';
import schema from './schema';
import {
  AlunoInfo,
  Container,
  Content,
  SubTitle,
  Title,
  Warning,
} from './styles';

const areas = [
  'ASCOM',
  'ADINS',
  'GOVERNANÇA E GESTÃO',
  'DESENVOLVIMENTO EDUCACIONAL',
  'EDUCAÇÃO E EXTENSÃO',
  'INTELIGÊNCIA EM SAÚDE',
  'INOVAÇÃO E TECNOLOGIA',
  'PESQUISA EM SAÚDE',
  'OUTROS',
];

const ConfirmarPresencaOficina = () => {
  const navigation = useNavigation();

  const {
    params: { oficina },
  } = useRoute();

  const { user } = useAutenticacao();

  const [isLoading, setIsLoading] = useState(false);

  const [dialogVisible, setDialogVisible] = useState(false);

  const { control, watch, setValue, getValues, handleSubmit } = useForm({
    defaultValues: {
      isOutrosSelected: false,
      area_esp: '',
      area_outros: '',
    },
    resolver: yupResolver(schema),
  });

  const areaWatch = watch('area_esp');

  const { espUserInfo, fetchEspUserInfo } = useEspUserInfo(user.id);

  const { presencas, fetchEspUserPresencas } = useEspUserPresencas(
    user.id,
    oficina.id,
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: CORES.AZUL_OFICINA,
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: '#fff',
      headerTitleAlign: 'center',
      headerTitle: 'Oficinas',
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

  const handleMarcarPresenca = async (novaPresenca) => {

    await marcarPresenca(user.id, oficina.id, novaPresenca);
  };

  const handleUpdateEspUserInfo = async (areaEsp, areaOutros) => {

    await updateEspUserInfo(user.id, {
      area_esp: areaEsp,
      area_outros: areaOutros
    });

    navigation.navigate(rotas.OFICINA_DESIGN_SUCESSO, { oficina });
  };

  const onPressMarcarPresenca = async () => {
    try {
      setIsLoading(true);

      const newPresenca = {
        data: moment(), //"2022-06-29T18:44:22.469Z" (ISO 8601 em GMT)
      };

      // Verifica se já existe uma presença pro dia.
      const presencaMarcada = presencas.some(
        item =>
          moment(newPresenca.data).format('DD/MM/YYYY') === moment(item.data).format('DD/MM/YYYY')
      );

      if (presencaMarcada) {
        setDialogVisible(true);
        return;
      }

      await handleMarcarPresenca(newPresenca);

      setDialogVisible(true);

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEspUserInfo();
    fetchEspUserPresencas();
  }, []);

  useEffect(() => {
    setValue('area_esp', espUserInfo?.area_esp);
    getValues('area_esp') === 'OUTROS' && setValue('area_outros', espUserInfo?.area_outros);
  }, [espUserInfo]);


  const handleMarcarPresencaDialogVoltarButton = () => {
    setDialogVisible(false);
  };

  const handleMarcarPresencaDialogConfirmarButton = async () => {
    setDialogVisible(false);
    const areaEsp = getValues('area_esp');
    const areaOutros = getValues('area_outros');
    await handleUpdateEspUserInfo(areaEsp, areaOutros);
  };

  useEffect(() => {
    if (areaWatch !== 'OUTROS') {
      setValue('area_outros', '');
      setValue('isOutrosSelected', false);
    } else {
      setValue('isOutrosSelected', true);
    }
  }, [areaWatch]);

  return (
    <Container>
      <BarraDeStatus
        backgroundColor={CORES.AZUL_OFICINA_DARK}
        barStyle="light-content"
      />
      <Title>{oficina.title}</Title>
      <SubTitle>
        {moment(oficina.inicio).format('DD/MM')} a{' '}
        {moment(oficina.fim).format('DD/MM/YYYY')}
      </SubTitle>
      <ControlledSelectModal
        control={control}
        items={areas.map(item => ({
          value: String(item),
          label: String(item),
        }))}
        mode="outlined"
        name="area_esp"
        placeholder="Selecione sua área na ESP"
        title="Área"
      />
      {
        areaWatch === 'OUTROS' &&
        <ControlledTextInput
          testID="descricaoInput"
          control={control}
          disabled={areaWatch !== 'OUTROS'}
          name="area_outros"
          mode="outlined"
          label="Especifique a área"
        />
      }
      <Content>
        <View>
          <AlunoInfo>Participante: {user.name}</AlunoInfo>
          <AlunoInfo>Data: {moment().format('DD/MM/YYYY')}</AlunoInfo>
        </View>
        <CustonFAB
          color="#fff"
          label="MARCAR PRESENÇA"
          small
          onPress={handleSubmit(onPressMarcarPresenca)}
          disabled={isLoading}
          loading={isLoading}
        />
        <Warning>
          Atenção: Se você errar a seleção de alguma informação, é só fazer uma
          nova seleção e marcar a presença novamente. Suas informações serão
          sobrescritas.
        </Warning>
        <CustonDialog
          visible={dialogVisible}
          setVisible={setDialogVisible}
          title="Presença já confirmada"
          content="Você já marcou sua presença. Caso deseje alterar alguma informação, faça a seleção correta e confirme a presença novamente."
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
    </Container>
  );
};

export default ConfirmarPresencaOficina;
