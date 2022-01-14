import React from 'react';
import { Button, Card, Paragraph } from 'react-native-paper';
import useAppTrackTransparency from '../../hooks/useAppTrackTransparency';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CORES } from '../../constantes/estiloBase';
import { StyleSheet } from 'react-native';

const AppTrackTransparencyCard = () => {
  const {
    isTrackingAuthorized,
    isTrackingNotDetermined,
    requestPermission,
  } = useAppTrackTransparency();

  if (isTrackingAuthorized()) return null;

  return (
    <Card mode="elevated" style={style.card}>
      <Card.Title
        title="Rastreio desabilitado"
        left={props => (
          <Icon {...props} name="alert" color={CORES.LARANJA} />
        )}
      />

      <Card.Content>
        <Paragraph>
          Algumas funcionalidades necessitam do rastreio do dispositivo. Habilite para acessar
          todas as funcionalidades.
        </Paragraph>
      </Card.Content>

      <Card.Actions>
        {isTrackingNotDetermined() && (
          <Button onPress={requestPermission}>Habilitar</Button>
        )}
      </Card.Actions>
    </Card>
  );
};

const style = StyleSheet.create({
  card: {
    margin: 16,
  },
});

export default AppTrackTransparencyCard;