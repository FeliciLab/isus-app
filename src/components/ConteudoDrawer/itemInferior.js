import React from 'react';
import {
  Share
} from 'react-native';
import {
  DrawerItem
} from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { analyticsData } from '../../utils/analytics';
import packageJson from '../../../package.json';
import {
  ItensInferior, ConteudoVersao, TextoVersao
} from './styles';
import { CORES } from '../../constantes/estiloBase';

const itemInferior = () => {
  const navigationTermos = useNavigation();

  const versaoSistema = packageJson.version;

  const conteudoItem = [
    {
      icone: 'information',
      nome: 'Sobre o iSUS',
      aoPressionar: () => navigationTermos.navigate('SOBRE')
    },
    {
      icone: 'clipboard-text',
      nome: 'Termos de Uso',
      aoPressionar: () => navigationTermos.navigate('TERMOS_DE_USO')
    },
    {
      icone: 'share-variant',
      nome: 'Compartilhe o iSUS',
      aoPressionar: () => {
        analyticsData('Compartilhe_o_iSUS', 'Click', 'Home');
        aoCompartilhar();
      }
    }
  ];

  const aoCompartilhar = async () => {
    const messagLink = 'Conhece o app iSUS? Um produto digital do governo do Ceará de apoio a profissionais de saúde, com informações, serviços e oportunidades na palma da mão! Saiba mais: https://coronavirus.ceara.gov.br/isus/';
    try {
      await Share.share({
        message: messagLink
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <ItensInferior>
        {
          conteudoItem.map(item => (
            <DrawerItem
              icon={() => <Icon name={item.icone} size={22} color={CORES.PRETO54} />}
              label={item.nome}
              labelStyle={{ fontSize: 15 }}
              inactiveTintColor="#111"
              activeTintColor="#111"
              inactiveBackgroundColor="transparent"
              activeBackgroundColor="transparent"
              onPress={item.aoPressionar}
            />
          ))
        }
      </ItensInferior>
      <ConteudoVersao>
        <TextoVersao>
          Versão
          {' '}
          {versaoSistema}
        </TextoVersao>
      </ConteudoVersao>
    </>
  );
};

export default itemInferior;
