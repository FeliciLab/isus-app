import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Tag({ text, onClose }) {
  if (!text) return <View />;

  return (
    <View style={styles.tagContainer}>
      <View style={styles.textContainer}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.tagText}>
          {text}
        </Text>
      </View>
      <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
        <Icon name="close-circle" size={20} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tagContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 10,
    marginLeft: 10,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.12)',
    width: 120,
    height: 33,
    borderRadius: 26,
  },
  textContainer: {
    width: 80,
  },
  tagText: {
    color: '#000000',
  },
  closeIcon: {
    marginLeft: 'auto',
    marginRight: 8,
  },
});
