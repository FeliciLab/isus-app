import React from 'react';
import { Divider } from 'react-native-paper';
import rotas from '../../constantes/rotas';
import {
  ImagePost,
  Legenda,
  ViewImg,
  ViewRowCentering,
  ViewWhite,
  WhiteTouchable
} from './styles';

const ItemConteudo = ({ item, navigation }) => (
  <ViewWhite>
    <WhiteTouchable
      onPress={() =>
        navigation.navigate(rotas.DESCRICAO, {
          parametros: {
            ...item
          },
          title: item.post_title
        })
      }
    >
      <ViewRowCentering>
        {item.image && (
          <ImagePost resizeMode="contain" source={{ uri: `${item.image}` }} />
        )}
        {!item.image && <ViewImg />}
        <Legenda>{item.post_title}</Legenda>
      </ViewRowCentering>

      <Divider />
    </WhiteTouchable>
  </ViewWhite>
);

export default ItemConteudo;
