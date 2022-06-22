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
import { ArrowLeftIcon } from '~/icons';
import schema from './schema';
import { AlunoInfo, Container, Content, SubTitle, Warning } from './styles';

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

  const { control, watch, setValue, handleSubmit } = useForm({
    defaultValues: {
      area: '',
      especArea: '',
    },
    resolver: yupResolver(schema),
  });

  const areaWatch = watch('area');

  // TODO: implementar
  const onPressMarcarPresenca = async data => {
    try {
      setIsLoading(true);

      setTimeout(() => {
        console.log('handleMarcarPresenca:', data);
        navigation.navigate(rotas.OFICINA_DESIGN_SUCESSO, { oficina });
      }, 1000);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarcarPresencaDialogVoltarButton = () => {
    setDialogVisible(false);
  };

  // TODO: add o handleUpdateSaguUserInfo
  const handleMarcarPresencaDialogConfirmarButton = async () => {
    setDialogVisible(false);
    // await handleUpdateSaguUserInfo();
  };

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

  useEffect(() => {
    setValue('especArea', '');
  }, [areaWatch]);

  return (
    <Container>
      <BarraDeStatus
        backgroundColor={CORES.AZUL_OFICINA_DARK}
        barStyle="light-content"
      />
      <SubTitle>
        {oficina.title} | {moment(oficina.inicio).format('DD/MM')} a{' '}
        {moment(oficina.fim).format('DD/MM/YYYY')}
      </SubTitle>
      <ControlledSelectModal
        control={control}
        items={areas.map(item => ({
          value: String(item),
          label: String(item),
        }))}
        mode="outlined"
        name="area"
        placeholder="Selecione sua área na ESP"
        title="Área"
      />
      <ControlledTextInput
        testID="descricaoInput"
        control={control}
        disabled={areaWatch !== 'OUTROS'}
        name="especArea"
        mode="outlined"
        label="Especifique a área"
      />
      <Content>
        <View>
          <AlunoInfo>Aluno(a): {user.name}</AlunoInfo>
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
