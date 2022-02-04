import React, { useState } from 'react';
import { Button, Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MessageErrorCard = props => {
  const {
    title, // título
    subtitle, // subtítulo
    iconColor, // cor do ícone
    iconName, // nome do ícone, olhar https://oblador.github.io/react-native-vector-icons/
    onPressButton, // callback para o onClick do botão (opciona)
    textButton, // texto do botão (opcional)
    ...rest // Rest operator
  } = props;

  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return null;
  }

  const handleOnPressButton = () =>
    onPressButton ? onPressButton() : setIsOpen(false);

  return (
    <Card {...rest}>
      <Card.Title
        title={title}
        subtitle={subtitle}
        left={props => <Icon name={iconName} color={iconColor} {...props} />}
      />
      <Card.Actions>
        <Button onPress={handleOnPressButton}>
          {textButton ? textButton : 'Fechar'}
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default MessageErrorCard;
