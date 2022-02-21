import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, Title } from './styles';
import { useNavigation } from '@react-navigation/native';
import rotas from '~/constantes/rotas';

const OfertasListFooter = () => {
  const navigation = useNavigation();

  const handleOnPress = () => {
    navigation.navigate(rotas.HISTORICO_FREQUENCIA);
  };

  return (
    <Container onPress={handleOnPress}>
      <Title>Histórico de Frequência</Title>
      <Icon name="keyboard-arrow-right" size={24} />
    </Container>
  );
};

export default OfertasListFooter;
