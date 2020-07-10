import React, { useContext } from 'react';
import { View, Image } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { ContextoDeVersaoDoManejo } from '../ClinicalManagement/contexto/contextoVersaoManejo';
import TagNotificacao from '../ClinicalManagement/tagNotificacao';
import normalize from '../../utils/normalize';


import IconPaciente from '../../assets/icons/icon_paciente.png';

export default function Banner() {
  const navigation = useNavigation();

  const { versaoDoManejo, marcarVersaoComoLida } = useContext(ContextoDeVersaoDoManejo);
  return (
    <Card
      onPress={() => {
        if (!versaoDoManejo.lida) {
          marcarVersaoComoLida();
        }
        navigation.navigate('clinical management');
      }}
      style={{
        marginVertical: 20,
        marginHorizontal: 16,
        borderRadius: 10,
        backgroundColor: '#4054B2',
        minHeight: 130,
        alignCotent: 'stretch'
        // alignItems: 'center'
      }}
    >
      <View
        style={{
          marginHorizontal: 12,
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1
        }}
      >
        <View
          style={{
            height: 80,
            width: 80,
            borderRadius: 80
          }}
        >
          <Image source={IconPaciente} style={{ height: 80, width: 80 }} resizeMode="contain" />
        </View>
        <View style={{ flex: 1, paddingHorizontal: 12 }}>
          <Paragraph style={{ fontSize: normalize(16), color: '#FFEB3B' }}>
            Manejo Clínico de Paciente com Covid-19
          </Paragraph>
          <TagNotificacao versaoManejo={versaoDoManejo} />
        </View>
      </View>
    </Card>
  );
}
