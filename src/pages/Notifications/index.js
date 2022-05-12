import React from 'react';
import { FlatList } from 'react-native';
import { Button } from 'react-native-paper';
import NotificationCard from './NotificationCard';
import { Container, NotificationsBottomBar } from './styles';

// TODO: remover depois
const items = [
  {
    id: '1',
    title: 'Protocolo aborda alocação de recursos em ...',
    date: 'Há 6 horas',
  },
  {
    id: '2',
    title: 'Protocolo aborda alocação de recursos em ...',
    date: 'Há 6 horas',
  },
  {
    id: '3',
    title: 'Protocolo aborda alocação de recursos em ...',
    date: 'Há 6 horas',
  },
  {
    id: '4',
    title: 'Protocolo aborda alocação de recursos em ...',
    date: 'Há 6 horas',
  },
  {
    id: '5',
    title: 'Protocolo aborda alocação de recursos em ...',
    date: 'Há 6 horas',
  },
  {
    id: '6',
    title: 'Protocolo aborda alocação de recursos em ...',
    date: 'Há 6 horas',
  },
  {
    id: '7',
    title: 'Protocolo aborda alocação de recursos em ...',
    date: 'Há 6 horas',
  },
];

const Notifications = () => {
  return (
    <Container>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={items}
        renderItem={({ item }) => <NotificationCard data={item} />}
        keyExtractor={item => item.id}
      />
      <NotificationsBottomBar>
        <Button onPress={() => console.log('Pressed')}>
          MARCAR TODAS COMO LIDAS
        </Button>
      </NotificationsBottomBar>
    </Container>
  );
};

export default Notifications;
