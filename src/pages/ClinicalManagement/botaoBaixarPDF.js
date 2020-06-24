import React from 'react';
import {
  View, TouchableOpacity, Text, StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import checkPlatform from '../../utils/PDF';

export default function BotaoBaixarPDF() {
  const UrlOrigemManejo = 'https://coronavirus.ceara.gov.br/wp-content/uploads/2020/05/11.05-Manejo-Cl%C3%ADnico-Mobile-1.pdf';
  const CaminhoDestino = 'Manejo Clinico.pdf';

  return (
        <View>
          <TouchableOpacity
            onPress={() => (checkPlatform(UrlOrigemManejo, CaminhoDestino))}
            style={estilo.Botao}
          >
          <Text style={estilo.descricaoDownload}>Realize o download em PDF</Text>
          <Icon name="download" size={28} color="#BDBDBD" />
          </TouchableOpacity>
        </View>
  );
}

const estilo = StyleSheet.create({
  descricaoDownload: {
    marginTop: 12,
    fontSize: 14,
    color: '#BDBDBD'
  },
  Botao: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  }
});
