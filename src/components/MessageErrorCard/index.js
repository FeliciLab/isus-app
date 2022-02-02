import React, { useState } from 'react';
import { Button, Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MessageErrorCard = props => {
  const {
    title,
    subtitle,
    iconColor,
    iconName,
    onPressButton,
    ...rest
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
        <Button onPress={handleOnPressButton}>Fechar</Button>
      </Card.Actions>
    </Card>
  );
};

export default MessageErrorCard;
