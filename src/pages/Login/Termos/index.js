import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ConteudoTermo, TextoTermo, TextoLink } from './styles';

const Termos = () => {
  const navigation = useNavigation();
  return (
    <ConteudoTermo>
      <TextoTermo>
        Ao continuar,
        você concorda com nossos
        {' '}
        <TextoLink onPress={() => navigation.navigate('TERMOS_DE_USO')}>
          Termos de Uso
        </TextoLink>
        .
      </TextoTermo>
    </ConteudoTermo>
  );
};

export default Termos;
