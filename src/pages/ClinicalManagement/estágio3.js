import React from 'react';
import {
  Text, View
} from 'react-native';

import { Paragraph } from 'react-native-paper';
import checkPlatform from '../../utils/PDF';
import Internação from './text-content/internacao-hospitalar.json';

const Estágio3 = ({ navigation }) => (
  <>
    <View style={{ marginTop: 20 }}>
      <Paragraph>
        {Internação.sections.paragraphOne.firstPhrase}
        <Text style={{ fontWeight: 'bold' }}>
          {Internação.sections.paragraphOne.bold}
        </Text>
        {Internação.sections.paragraphOne.secondPhrase}
        <Text onPress={() => navigation.navigate('webview', { title: Internação.sections.paragraphOne.link.title, url: Internação.sections.paragraphOne.link.url })} style={{ textDecorationLine: 'underline', color: '#FF9800' }}>{Internação.sections.paragraphOne.link.text}</Text>
      </Paragraph>

      {Internação.sections.paragraphOne.items.map(item => (
        <Paragraph>
          {item}
        </Paragraph>
      ))}
      <Paragraph style={{ marginVertical: 8 }}>
        <Text style={{ fontWeight: 'bold' }}>{Internação.sections.paragraphTwo.bold}</Text>
        {Internação.sections.paragraphTwo.secondPhrase}
        <Text onPress={() => (checkPlatform(Internação.sections.paragraphTwo.link.url, 'Restricao do uso do oseltamivir.pdf'))} style={{ textDecorationLine: 'underline', color: '#FF9800' }}>{Internação.sections.paragraphTwo.link.text}</Text>
        {Internação.sections.paragraphTwo.ThirdPhrase}
      </Paragraph>
      <Paragraph>
        <Text style={{ fontWeight: 'bold' }}>{Internação.sections.paragraphThree.bold}</Text>
        {Internação.sections.paragraphThree.secondPhrase}
      <Text onPress={() => navigation.navigate('webview', { title: Internação.sections.paragraphThree.link.title, url: Internação.sections.paragraphThree.link.url })} style={{ textDecorationLine: 'underline', color: '#FF9800' }}>{Internação.sections.paragraphThree.link.text}</Text>
      </Paragraph>
      <Paragraph>
        <Text style={{ fontWeight: 'bold' }}>{Internação.sections.paragraphFour.bold}</Text>
        {Internação.sections.paragraphFour.secondPhrase}
        <Text onPress={() => navigation.navigate('webview', { title: Internação.sections.paragraphFour.link.title, url: Internação.sections.paragraphFour.link.url })} style={{ textDecorationLine: 'underline', color: '#FF9800' }}>{Internação.sections.paragraphFour.link.text}</Text>
      </Paragraph>
      <Paragraph style={{ marginVertical: 8 }}>
        {Internação.sections.paragraphFive.firstPhrase}
        <Text style={{ fontWeight: 'bold' }}>{Internação.sections.paragraphFive.bold}</Text>
        <Text onPress={() => navigation.navigate('webview', { title: Internação.sections.paragraphFive.link.title, url: Internação.sections.paragraphFive.link.url })} style={{ textDecorationLine: 'underline', color: '#FF9800' }}>{Internação.sections.paragraphFive.link.text}</Text>
      </Paragraph>

      <Paragraph>
        {Internação.sections.paragraphSix}
      </Paragraph>
    </View>
  </>
);

export default Estágio3;
