import React from 'react';
import { View, Image } from 'react-native';
import { Card, Caption } from 'react-native-paper';

export default function HomeCard({
  onPress, FontIcon, Logo, logoSize, title, color, isImage, margin
}) {
  margin = margin || 0;
  return (
    <Card
      style={{
        padding: 4,
        height: 135,
        width: 135,
        margin,
        justifyContent: 'center',
        borderColor: color,
        borderWidth: 0.6,
        borderRadius: 8
      }}
      onPress={onPress}
    >
      <View
        style={{
          flex: 1,
          alignSelf: 'center',
          justifyContent: 'center',
          marginBottom: 20
        }}
      >
        {// Provisório enquanto os svgs corretos não chegam
        // eslint-disable-next-line no-nested-ternary
        isImage ? (
          <Image source={Logo} style={{ height: 50, width: 50 }} resizeMode="contain" />
        ) : typeof Logo === 'string' ? (
          <FontIcon name={Logo} size={logoSize || 60} color={color} />
        ) : (
          <Logo color={color} width={logoSize || 60} height={logoSize || 60} />
        )}
      </View>
      <Caption
        style={{
          position: 'absolute',
          bottom: 0,
          textAlign: 'center',
          fontSize: 12,
          lineHeight: 16,
          alignSelf: 'center'
        }}
      >
        {title}
      </Caption>
    </Card>
  );
}
