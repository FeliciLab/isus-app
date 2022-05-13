import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useLayoutEffect, useMemo } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { CORES } from '~/constantes/estiloBase';
import { ArrowLeftIcon } from '~/icons/index';
import NotificationsEmptyMesage from './ NotificationsEmptyMesage/index';
import items from './mockItems';
import NotificationCard from './NotificationCard';
import { Container, NotificationsBottomBar } from './styles';
import { sortBy } from 'lodash';

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

  const notifications = useMemo(() => sortBy(items, 'date').reverse(), [
    items,
    sortBy,
  ]);

  // TODO: implementar integração
  const handrleMarkAllRead = useCallback(async () => {
    console.log('handrleMarkAllRead Press');
  }, []);

  return (
    <Container>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={notifications}
        renderItem={({ item }) => <NotificationCard data={item} />}
        keyExtractor={item => item.id}
        ListEmptyComponent={() => <NotificationsEmptyMesage />}
      />
      <NotificationsBottomBar>
        <Button onPress={handrleMarkAllRead}>MARCAR TODAS COMO LIDAS</Button>
      </NotificationsBottomBar>
    </Container>
  );
};

export default Notifications;
