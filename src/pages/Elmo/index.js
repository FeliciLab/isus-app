import React, { useLayoutEffect } from 'react';
import {
  TouchableOpacity, View, FlatList
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import elmoPatternBG from '../../assets/backgrounds/elmo_pattern.png';
import SvgElmoLogo from '../../assets/images/logo/logo-elmo-h1.svg';
import SvgCapacitacao from '../../assets/icons/elmo/icon_capacitacao.svg';
import SvgManualUso from '../../assets/icons/elmo/icon_manual_uso.svg';
import SvgFaleConosco from '../../assets/icons/elmo/icon_fale_conosco.svg';

import BarraDeStatus from '../../components/barraDeStatus';
import CartaoHome from '../Home/cartaoHome';
import {
  ScrollView, Texto, SvgView, BackgroundImage, Botao, Titulo
} from './styles';
import { CORES } from '../../constantes/estiloBase';
import ROTAS from '../../constantes/rotas';


export default function Elmo() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0
      },
      headerTransparent: true,
      headerTintColor: CORES.BRANCO,
      headerTitleAlign: 'center',
      headerTitle: '',
      headerLeft: () => (
            <TouchableOpacity
              style={{
                marginHorizontal: 19
              }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Icon name="arrow-left" size={28} color={CORES.BRANCO} />
            </TouchableOpacity>
      )
    });
  });

  const listaElmoCards = [
    {
      id: 'elmo-1',
      titulo: 'Capacitação',
      ativo: true,
      icone: SvgCapacitacao,
      navegacao: {
        componente: ROTAS.CAPACITACAO_ELMO,
        titulo: 'Elmo',
        background: CORES.INDIGO_DYE
      }
    },
    {
      id: 'elmo-2',
      titulo: 'Manual de Uso',
      ativo: true,
      icone: SvgManualUso,
      navegacao: {
        componente: ROTAS.SOBRE_ELMO,
        background: CORES.INDIGO_DYE
      }
    },
    {
      id: 'elmo-3',
      titulo: 'Fale Conosco',
      ativo: true,
      icone: SvgFaleConosco,
      navegacao: {
        componente: ROTAS.FALE_CONOSCO,
      }
    }
  ];
  return (
    <>
      <BarraDeStatus backgroundColor={CORES.INDIGO_DYE} barStyle="white-content" />
      <ScrollView style={{ flex: 1 }}>
        <BackgroundImage source={elmoPatternBG}>
          <SvgView>
            <SvgElmoLogo />
          </SvgView>
        </BackgroundImage>
        <View style={{ marginHorizontal: 16, marginTop: 18 }}>
          <Texto>
          {'O Elmo é um capacete de respiração assistida genuinamente cearense, não-invasivo e mais seguro para profissionais de saúde e pacientes. Criado em abril de 2020, o equipamento surgiu como um novo passo para o tratamento de pacientes com insuficiência respiratória aguda hipoxêmica, um dos efeitos da Covid-19.'}
          </Texto>
        </View>
        <Botao
          color={CORES.LARANJA}
          onPress={() => navigation.navigate(ROTAS.SOBRE_ELMO)}
        >
          Saiba Mais
        </Botao>
        <FlatList
          horizontal
          data={listaElmoCards}
          keyExtractor={(item, index) => `${index}`}
          style={{
            flexDirection: 'row',
            alignSelf: 'center'
          }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
          <CartaoHome
            testID={`cards-${item.id}`}
            key={item.id}
            ativo={item.ativo}
            titulo={item.titulo}
            Icone={item.icone}
            onPress={() => navigation.navigate(item.navegacao.componente, {
              title: item.navegacao.titulo,
              url: item.navegacao.url,
              headerStyle: {
                backgroundColor: item.navegacao.background
              }
            })}
          />
          )}
        />
        <View style={{ marginHorizontal: 16, marginTop: 18 }}>
          <Titulo>Novidades</Titulo>
        </View>
      </ScrollView>
    </>
  );
}
