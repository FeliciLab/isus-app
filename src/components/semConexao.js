import React, { useLayoutEffect } from 'react';
import {
  Text, TouchableOpacity, View
} from 'react-native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

export default function SemConexao() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#4CAF50',
        elevation: 0,
        shadowOpacity: 0
      },
      headerTintColor: '#FFF',
      headerTitleAlign: 'center',
      headerTitle: 'Sem Conexão',
      headerLeft: () => (
            <TouchableOpacity
              style={{
                marginHorizontal: 19
              }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Icon name="arrow-left" size={28} color="#FFF" />
            </TouchableOpacity>
      )
    });
  });


  return (
    <>
            <ScrollView style={{
              backgroundColor: '#ffffff', flex: 1, padding: 14, marginBottom: 20
            }}
            >
                <View style={{
                  justifyContent: 'center', display: 'flex', flexDirection: 'row', paddingTop: 26
                }}
                >
                    <Text style={{ fontSize: 20, fontWeight: '600' }}>Sem conexão com a internet</Text>
                </View>
                <View style={{
                  justifyContent: 'center', display: 'flex', flexDirection: 'row', paddingTop: 26
                }}
                >
                    <Text style={{ fontSize: 16 }}>
                        Verifique se o wi-fi ou dados móveis estão ativos e tente novamente.
                    </Text>
                </View>
                <View style={{
                  justifyContent: 'center', display: 'flex', flexDirection: 'row', paddingTop: 26
                }}
                >
                    <Button
                      color="#FF9800"
                      onPress={() => navigation.goBack()}
                    >
                        VOLTAR
                    </Button>
                </View>
            </ScrollView>
    </>
  );
}
