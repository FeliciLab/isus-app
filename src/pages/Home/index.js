import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as yup from 'yup';
import BarraDeStatus from '~/components/barraDeStatus';
import ControlledMultipleSelectAccordion from '~/components/ControlledMultipleSelectAccordion';
import ControlledSelectAccordion from '~/components/ControlledSelectAccordion';
import ControlledSelectModal from '~/components/ControlledSelectModal';
import { CORES } from '~/constantes/estiloBase';
import rotas from '~/constantes/rotas';
import useAnalytics from '~/hooks/useAnalytics';
import useAutenticacao from '~/hooks/useAutenticacao';
import Banners from './Banners';
import ForcaTarefa from './ForcaTarefa';
import LinhasDeCuidado from './LinhasDeCuidado';
import Servicos from './Servicos';
import UserInfo from './UserInfo';
// import LinhasDeCuidado from './LinhasDeCuidado';
// import MeusConteudos from './MeusConteudos';

const items = [
  { value: 0, label: 'Fortaleza' },
  { value: 1, label: 'Mossoró' },
  { value: 2, label: 'Sobral' },
  {
    value: 3,
    label:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis tempore laboriosam iste sapiente, neque provident ipsum ex ipsa, odio quo tempora nisi voluptas explicabo rem nesciunt soluta sit recusandae praesentium',
  },
  {
    value: 4,
    label: 'Lorem ipsum dolor, sit amet consectetur',
  },
  {
    value: 5,
    label: 'Lorem ipsum',
  },
  {
    value: 6,
    label: 'Lorem ipsum dolor',
  },
  {
    value: 7,
    label: 'Lorem',
  },
  {
    value: 8,
    label: 'Lorem ip',
  },
];

const schema = yup.object({
  selectedMunicipioId: yup.number().required('Campo obrigatório'),
  mutipleSelectMunicipioId: yup
    .array()
    .min(1, 'Preencher pelo menos um campo.'),
});

export default function Home() {
  const navigation = useNavigation();

  const { analyticsData } = useAnalytics();

  const { user, showTutorial } = useAutenticacao();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      selectedMunicipioId: undefined,
      mutipleSelectMunicipioId: [],
      selectModalMunicipioId: undefined,
    },
    resolver: yupResolver(schema),
  });

  async function redirectToWelcome() {
    if (showTutorial) {
      return navigation.reset({
        index: 0,
        routes: [{ name: rotas.BEM_VINDO }],
      });
    }
    return null;
  }

  useEffect(() => {
    redirectToWelcome();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: user ? CORES.BRANCO : CORES.VERDE,
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: user ? CORES.PRETO : CORES.BRANCO,
      headerTitleAlign: 'center',
      headerTitle: 'iSUS',
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19,
          }}
          onPress={async () => {
            await analyticsData('Home', 'Click', 'lupa pesquisa');
            navigation.navigate(rotas.SEARCH_STACK_SCREEN);
          }}>
          <Icon
            name="magnify"
            size={28}
            color={user ? CORES.VERDE : CORES.BRANCO}
          />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19,
          }}
          onPress={() => {
            navigation.toggleDrawer();
          }}>
          <Icon
            name="menu"
            size={28}
            color={user ? CORES.VERDE : CORES.BRANCO}
          />
        </TouchableOpacity>
      ),
    });
  }, [user]);

  const { width } = Dimensions.get('screen');

  return (
    <>
      <BarraDeStatus
        backgroundColor={user ? CORES.BRANCO : CORES.VERDE}
        barStyle={user ? 'dark-content' : 'light-content'}
      />
      <UserInfo />
      <ScrollView style={{ backgroundColor: CORES.BRANCO, flex: 1 }}>
        <ControlledSelectAccordion
          control={control}
          name="selectedMunicipioId"
          items={items}
          title="Controlled Select Accordion"
          placeholder="Município"
        />
        <ControlledMultipleSelectAccordion
          control={control}
          name="mutipleSelectMunicipioId"
          items={items}
          title="Controlled Multiple Select Accordion"
          placeholder="Cidades"
        />
        <ControlledSelectModal
          control={control}
          name="selectModalMunicipioId"
          title="Controled Select Modal"
          items={items}
          placeholder="Município"
        />
        <Button
          icon="camera"
          mode="contained"
          onPress={handleSubmit(data => console.log(data))}
          style={{ marginTop: 12 }}>
          Confirmar
        </Button>
        <Banners sliderWidth={width} itemWidth={width} />
        <Servicos navigation={navigation} />
        {/* {estaLogado && <MeusConteudos />} */}
        <ForcaTarefa navigation={navigation} />
        <LinhasDeCuidado navigation={navigation} />
      </ScrollView>
    </>
  );
}
