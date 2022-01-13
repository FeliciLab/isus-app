import React from 'react';
import { Button, Card, Paragraph } from 'react-native-paper';
import useAppTrackTransparency from '../../hooks/useAppTrackTransparency';

const AppTrackTransparencyCard = () => {
  const {
    isTrackingAuthorized,
    isTrackingNotDetermined,
    requestTrackingPermission,
  } = useAppTrackTransparency();

  if (isTrackingAuthorized) return null;

  return (
    <Card>
      <Card.Title title="Rastreio desabilitado" />
      <Card.Content>
        <Paragraph>
          Algumas funcionalidades necessitam do rasteio do dispositivo. Ative o
          rastreio para ter todas as funionalidades.
        </Paragraph>
      </Card.Content>

      {isTrackingNotDetermined() && (
        <Card.Actions>
          <Button onPress={requestTrackingPermission}>
            Habilitar rastreio
          </Button>
        </Card.Actions>
      )}
    </Card>
  );
};

export default AppTrackTransparencyCard;
