import React from 'react';
import {
  Text, View, Image
} from 'react-native';

import {
  Paragraph
} from 'react-native-paper';
import UTI from './text-content/UTI.json';
import Pulmao from '../../assets/icons/estagiosManejo/pulmao.png';

const Estágio4 = ({ navigation }) => (
  <>
    <View style={{ marginTop: 8 }}>
      <Paragraph>
        {UTI.sections.paragraphOne.firstPhrase}
        <Text onPress={() => navigation.navigate('webview', { title: UTI.sections.paragraphOne.link.title, url: UTI.sections.paragraphOne.link.url })} style={{ color: '#F2453D', textDecorationLine: 'underline' }}>{UTI.sections.paragraphOne.link.text}</Text>
        {UTI.sections.paragraphOne.secondPhrase}
      </Paragraph>
      <Paragraph>
        {UTI.sections.paragraphOne.item.firstPhrase}
        <Text onPress={() => navigation.navigate('webview', { title: UTI.sections.paragraphOne.item.link.title, url: UTI.sections.paragraphOne.item.link.url })} style={{ color: '#F2453D', textDecorationLine: 'underline' }}>{UTI.sections.paragraphOne.item.link.text}</Text>
      </Paragraph>
      <Paragraph>
        <Text style={{ fontWeight: 'bold' }}>{UTI.sections.paragraphTwo.bold}</Text>
        {UTI.sections.paragraphTwo.secondPhrase}
        <Text
          onPress={() => navigation.navigate('webview', { title: UTI.sections.paragraphTwo.link.title, url: UTI.sections.paragraphTwo.link.url })}
          style={{ color: '#F2453D', textDecorationLine: 'underline' }}
        >
          {UTI.sections.paragraphTwo.link.text}
        </Text>
      </Paragraph>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Image source={Pulmao} style={{ marginBottom: 16 }} />
      </View>
      <Paragraph>
        <Text style={{ fontWeight: 'bold' }}>
          {UTI.sections.paragraphThree.bold}
        </Text>
        {UTI.sections.paragraphThree.secondPhrase}
        <Text onPress={() => navigation.navigate('webview', { title: UTI.sections.paragraphThree.link.title, url: UTI.sections.paragraphThree.link.url })} style={{ color: '#F2453D', textDecorationLine: 'underline' }}>
        {UTI.sections.paragraphThree.link.text}
        </Text>
      </Paragraph>
      <Text>
        {UTI.sections.paragraphFour}
      </Text>
    </View>
  </>
);

export default Estágio4;
