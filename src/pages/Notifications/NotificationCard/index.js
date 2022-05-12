import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Surface } from 'react-native-paper';
import { CORES } from '~/constantes/estiloBase';

const NotificationCard = props => {
  const { data } = props;

  return (
    <Surface style={styles.card}>
      <Image
        resizeMode="cover"
        style={styles.cover}
        source={{
          uri:
            'https://coronavirus.ceara.gov.br/wp-content/uploads/2020/05/001232.png',
        }}
      />
      <View
        style={[
          styles.content,
          data.Visualized
            ? styles.contentVisualized
            : styles.contentNotVisualized,
        ]}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.date}>{data.date}</Text>
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 4,
    display: 'flex',
    flexDirection: 'row',
    elevation: 4,
  },
  content: {
    flexGrow: 1,
    width: 180,
    padding: 10,
    justifyContent: 'space-between',
  },
  contentVisualized: {
    backgroundColor: '#FFF',
  },
  contentNotVisualized: {
    backgroundColor: '#FBF7D4',
  },
  cover: {
    height: 100,
    width: 140,
  },
  title: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.25,
    color: CORES.PRETO87,
  },
  date: {
    fontWeight: '500',
    fontSize: 10,
    lineHeight: 16,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: CORES.VERDE,
  },
});

export default NotificationCard;
