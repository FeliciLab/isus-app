import React from 'react';
import { Dialog, Portal } from 'react-native-paper';
import { Actions, ContentText, Title } from './styles';

const CustonDialog = props => {
  const {
    visible,
    setVisible,
    title,
    content,
    LeftAction,
    RightAction,
  } = props;

  const hideDialog = () => setVisible(false);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Title>{title}</Title>
        <Dialog.Content>
          <ContentText>{content}</ContentText>
        </Dialog.Content>
        <Actions>
          {LeftAction && <LeftAction />}
          {RightAction && <RightAction />}
        </Actions>
      </Dialog>
    </Portal>
  );
};

export default CustonDialog;
