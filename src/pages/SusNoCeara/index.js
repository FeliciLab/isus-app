import React, { useLayoutEffect } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { List } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

export default function SusNoCeareScreen() {
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
      headerTitle: 'iSUS no Ceará',
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19
          }}
          onPress={() => {
            navigation.navigate('Buscar');
          }}
        >
          <Icon name="magnify" size={28} color="#FFF" />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19
          }}
          onPress={() => {
            navigation.toggleDrawer();
          }}
        >
          <Icon name="menu" size={28} color="#FFF" />
        </TouchableOpacity>
      )
    });
  });

  return (
    <ScrollView style={{ backgroundColor: '#ffffff', flex: 1, padding: 15 }}>
      <Text
        style={{
          letterSpacing: 0.25,
          fontSize: 14,
          lineHeight: 20,
          color: '#828282',
          marginBottom: 18
        }}
      >
      A Escola de Saúde Pública do Ceará – ESP/CE, é uma
       entidade da Administração Indireta Estadual, de natureza
       autárquica, vinculada a Secretaria da Saúde do Ceará
      </Text>

      <List.Accordion titleStyle={{ color: 'black' }} title="Sobre o SUS">
        <List.Item
          titleNumberOfLines={80}
          title={`
O Sistema Único de Saúde (SUS) é um dos maiores e mais complexos sistemas de saúde pública do mundo, abrangendo desde o simples atendimento para avaliação da pressão arterial, por meio da Atenção Primária, até o transplante de órgãos, garantindo acesso integral, universal e gratuito para toda a população do país.

Criado pela Constituição Federal Brasileira em 1988, o sistema visa garantir atenção integral à saúde, e não somente aos cuidados assistenciais, como um direito de todos os brasileiros, desde a gestação e por toda a vida, com foco na saúde com qualidade de vida, visando a prevenção e a promoção da saúde.

Sua rede é ampla e abrange tanto ações quanto os serviços de saúde. Engloba a atenção primária, média e alta complexidades, os serviços urgência e emergência, a atenção hospitalar, as ações e serviços das vigilâncias epidemiológica, sanitária e ambiental e assistência farmacêutica.
      `}
        />
      </List.Accordion>
      <List.Accordion titleStyle={{ color: 'black' }} title="O que é a SESA">
        <List.Item
          titleNumberOfLines={80}
          title={`
A Secretaria da Saúde do Estado do Ceará (Sesa) é um órgão da administração direta do Governo estadual. Ela é a responsável pelo gerenciamento do Sistema Único de Saúde (SUS) no Ceará.

O órgão tem como base das suas atividades o tripé da ética, moral e integridade, disponibilizando todos os meios necessários para que seus colaboradores e todos os que interagem com ela possam, juntos, desenvolver e proteger a instituição dos descaminhos políticos e socioculturais.

Seu compromisso é o de cumprir as políticas públicas de saúde na garantia do atendimento à população de forma plena e com qualidade. Além de gerenciar o sistema de saúde no Estado, proporcionando  resolutividade, satisfação e acessibilidade a todas as pessoas.
          `}
        />
      </List.Accordion>
    </ScrollView>
  );
}
