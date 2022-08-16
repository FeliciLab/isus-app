import { useNavigation } from '@react-navigation/native';
import React, { Fragment, useLayoutEffect } from 'react';
import { Linking, TouchableOpacity, View } from 'react-native';
import { Divider, List } from 'react-native-paper';
import ArbovirosesIcon from '~/assets/icons/linhasDeCuidado/arboviroses-icon.svg';
import BarraDeStatus from '~/components/BarraDeStatus';
import { CORES } from '~/constantes/estiloBase';
import useAnalytics from '~/hooks/useAnalytics';
import { ArrowLeftIcon } from '~/icons';
import { linkList } from './linkList';
import { articleList, mainText } from './textContent';
import { Container, ScrollView, SvgView, Titulo } from './styles';

export default function Monkeypox() {
  const navigation = useNavigation();

  const { analyticsData } = useAnalytics();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: CORES.ROXO,
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: CORES.BRANCO,
      headerTitleAlign: 'center',
      headerTitle: 'Linha Arboviroses',
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19,
          }}
          onPress={() => {
            navigation.goBack();
          }}>
          <ArrowLeftIcon size={28} color={CORES.BRANCO} />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <ScrollView style={{ flex: 1 }}>
      <BarraDeStatus backgroundColor={CORES.ROXO} />
      <Container>
        <SvgView
          style={{
            alignSelf: 'center',
            width: 335.2,
            height: 165,
            backgroundColor: CORES.ROXO,
            borderRadius: 6,
          }}>
          <ArbovirosesIcon width={335} height={165} />
        </SvgView>
      </Container>
      <View style={{ marginHorizontal: 16, marginTop: 18 }}>{mainText}</View>

      {articleList.map((article, index) => {
        let expanded = false;

        return (
          <Fragment key={article.testId}>
            <List.Accordion
              titleNumberOfLines={2}
              title={article.title}
              testID={article.testId}
              onPress={() => {
                expanded = !expanded;
                expanded &&
                  analyticsData(article.analyticsId, 'Click', 'Arboviroses');
              }}>
              <List.Item titleNumberOfLines={80} title={article.text} />
            </List.Accordion>
            {articleList.length - 1 !== index && (
              <View style={{ marginVertical: 8 }} />
            )}
          </Fragment>
        );
      })}

      <List.Item
        title={<Titulo>Materiais de apoio sobre as arboviroses:</Titulo>}
      />
      {linkList.map((link, index) => (
        <Fragment key={link.title}>
          <List.Item
            titleNumberOfLines={2}
            left={() => (
              <List.Icon icon="file-document" color={CORES.CINZA_ESCURO} />
            )}
            title={link.title}
            testID={link.testId}
            right={() => <List.Icon icon="chevron-right" />}
            onPress={() => {
              analyticsData(link.analyticsId, 'Click', 'Arboviroses');
              return Linking.openURL(link.url);
            }}
          />
          {linkList.length - 1 !== index && <Divider />}
        </Fragment>
      ))}
    </ScrollView>
  );
}
