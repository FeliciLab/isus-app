import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import {
  Placeholder,
  PlaceholderLine, PlaceholderMedia, Fade
} from 'rn-placeholder';

const windowHeight = Dimensions.get('window').width;

const PostListSkeletonPlaceholder = () => {

  const PlaceHolderItem = () => {
    const placeHolderItemHeight = 182;
    const numberOfLines = Math.ceil(windowHeight / placeHolderItemHeight);
    const itemList = [];

    for (let index = 0; index < numberOfLines; index++) {
      itemList.push(
        <View style={styles.item} key={index}>
          <PlaceholderMedia style={styles.imagem} />
          <PlaceholderLine style={styles.texto} />
        </View>
      );
    }

    return (
      <View>
        {itemList}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Placeholder
        Animation={Fade}
        Left={PlaceHolderItem}
        Right={PlaceHolderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 15
  },
  item: {
    marginBottom: 20,
  },
  imagem: {
    height: 100,
    width: windowHeight / 2.2,
    marginBottom: 10,
  },
  texto: {
    height: 40,
  },
});

export default PostListSkeletonPlaceholder;
