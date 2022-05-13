import React, { useCallback, useLayoutEffect } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import items from './mockItems';
import NotificationCard from './NotificationCard';
import { Container, NotificationsBottomBar } from './styles';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeftIcon } from '~/icons/index';
import { CORES } from '~/constantes/estiloBase';

const Notifications = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: 'rgba(0, 0, 0, 0.87)',
      headerTitleAlign: 'center',
      headerTitle: 'Notificações',
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19,
          }}
          onPress={() => {
            navigation.goBack();
          }}>
          <ArrowLeftIcon size={28} color={CORES.VERDE} />
        </TouchableOpacity>
      ),
    });
  }, []);

  const handrleMarkAllRead = useCallback(async () => {
    console.log('handrleMarkAllRead Press');
  }, []);

  return (
    <Container>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={items}
        renderItem={({ item }) => <NotificationCard data={item} />}
        keyExtractor={item => item.id}
      />
      <NotificationsBottomBar>
        <Button onPress={handrleMarkAllRead}>MARCAR TODAS COMO LIDAS</Button>
      </NotificationsBottomBar>
    </Container>
  );
};

export default Notifications;
