import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useLayoutEffect, useState } from 'react';
import { Linking, TouchableOpacity, View } from 'react-native';
import { Divider, List } from 'react-native-paper';
import IconSvgMaterno from '~/assets/icons/linhasDeCuidado/maternoInfantilBanner.svg';
import BarraDeStatus from '~/components/BarraDeStatus';
import { CORES } from '~/constantes/estiloBase';
import { labelsAnalytics } from '~/constantes/labelsAnalytics';
import { TESTIDS } from '~/constantes/testIDs';
import useAnalytics from '~/hooks/useAnalytics';
import { ArrowLeftIcon } from '~/icons';
import { Container, ScrollView, SvgView, Texto, Titulo } from './styles';

export default function MaternoInfantil() {
  const { analyticsData } = useAnalytics();

  const route = useRoute();

  const { expanded } = route.params;

  const navigation = useNavigation();

  const { MATERNO_INFANTIL } = labelsAnalytics;

  const [_expanded, setExpanded] = useState(expanded);

  const handlePress = () => {
    if (_expanded) {
      analyticsData(
        MATERNO_INFANTIL.NASCER_NO_CEARA,
        'Click',
        'Materno Infantil',
      );
    }
    setExpanded(!_expanded);
  };

  const onPressEstratificacaoRisco = () => {
    analyticsData(
      MATERNO_INFANTIL.ESTRATIFICACAO_DE_RISCO,
      'Click',
      'Materno Infantil',
    );
    return Linking.openURL(
      'https://coronavirus.ceara.gov.br/wp-content/uploads/2020/11/Nascer_Ceara_1.pdf',
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: CORES.ROXO,
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: CORES.BRANCO,
      headerTitleAlign: 'center',
      headerTitle: 'Linha Materno-Infantil',
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

  // FIXME: Ta muito feio isso aqui
  const textoNascerNoCeara = () => (
    <Texto>
      {
        'A redução da mortalidade materna faz parte das metas dos Objetivos de  Desenvolvimento'
      }
      {
        ' do Milênio e do Ceará Saudável, e seu monitoramento tem grande importância para fortalecer'
      }
      {' ou redirecionar as políticas de saúde.'}
      {'\n\n'}
      {
        'O Nascer no Ceará objetiva reduzir a morbimortalidade materna e perinatal reestruturando a'
      }
      {
        ' Linha de Cuidado Materno-Infantil, qualificando a assistência às mulheres e crianças'
      }
      {
        ' no estado através de um conjunto de ações para o fortalecimento da atenção em rede,'
      }
      {
        ' como a elaboração e implantação de protocolos e condutas assistenciais, baseadas'
      }
      {' em evidências científicas.'}
      {'\n\n'}
      {
        'As orientações visam ao manejo clínico, diagnóstico ou tratamento e à organização da'
      }
      {
        ' assistência baseando-se na estratificação de risco, na parametrização da assistência,'
      }
      {' nas competências e atribuições de serviços e nos profissionais.'}
    </Texto>
  );

  return (
    <ScrollView style={{ flex: 1 }}>
      <BarraDeStatus backgroundColor={CORES.ROXO} />
      <Container>
        <SvgView style={{ alignSelf: 'center' }}>
          <IconSvgMaterno width={335} height={170} />
        </SvgView>
      </Container>
      <View style={{ marginHorizontal: 16, marginTop: 18 }}>
        <Texto>
          {
            'A Linha de Cuidado Materno-Infantil expressa os fluxos assistenciais'
          }
          {
            ' de atendimento às necessidades de saúde de mulheres e crianças, através de'
          }
          {
            ' ações e serviços desenvolvidos nos diferentes pontos da Rede de Atenção à Saúde, '
          }
          {'nos 184 municípios do Ceará.'}
          {'\n\n'}
          {
            'Todos os materiais aqui apresentados são elaborados e implantados pela Secretaria '
          }
          {
            'da Saúde do Ceará. Eles organizam e orientam a atenção à saúde da gestante, a '
          }
          {
            'qualificação dos profissionais médicos e enfermeiros, a oferta de exames específicos, entre outras ações.'
          }
          {'\n\n'}
          {
            'A Sesa também acompanha e monitora todas as ações dessa Linha de Cuidado através de sistemas de informação'
          }
          {' e aplicativos desenvolvidos para esse fim.'}
        </Texto>
      </View>
      <List.Accordion
        expanded={!_expanded}
        title="Nascer no Ceará"
        testID={TESTIDS.MATERNO_INFANTIL.NASCER_CEARA}
        onPress={handlePress}>
        <List.Item titleNumberOfLines={80} title={textoNascerNoCeara()} />
        <List.Item title={<Titulo>Guias assistenciais</Titulo>} />
        <List.Item
          left={() => <List.Icon icon="file-document" color="#808080" />}
          title="Estratificação de risco"
          testID={TESTIDS.MATERNO_INFANTIL.ESTRATIFICACAO_RISCO}
          right={() => <List.Icon icon="chevron-right" />}
          onPress={onPressEstratificacaoRisco}
        />
        <Divider />
        <List.Item
          left={() => <List.Icon icon="file-document" color="#808080" />}
          title="Pré-natal de risco habitual"
          testID={TESTIDS.MATERNO_INFANTIL.PRE_NATAL_RISCO_HABITUAL}
          right={() => <List.Icon icon="chevron-right" />}
          onPress={() => {
            analyticsData(
              MATERNO_INFANTIL.PRE_NATAL_RISCO_HABITUAL,
              'Click',
              'Materno Infantil',
            );
            return Linking.openURL(
              'https://coronavirus.ceara.gov.br/wp-content/uploads/2020/11/Nascer_Ceara_2.pdf',
            );
          }}
        />
        <Divider />
        <List.Item
          left={() => <List.Icon icon="file-document" color="#808080" />}
          title="Pré-natal de alto risco"
          testID={TESTIDS.MATERNO_INFANTIL.PRE_NATAL_ALTO_RISCO}
          right={() => <List.Icon icon="chevron-right" />}
          onPress={() => {
            analyticsData(
              MATERNO_INFANTIL.PRE_NATAL_ALTO_RISCO,
              'Click',
              'Materno Infantil',
            );
            return Linking.openURL(
              'https://coronavirus.ceara.gov.br/wp-content/uploads/2020/11/Nascer_Ceara_3.pdf',
            );
          }}
        />
        <Divider />
        <List.Item
          left={() => <List.Icon icon="file-document" color="#808080" />}
          title="Síndromes hipertensivas em gestação"
          testID={TESTIDS.MATERNO_INFANTIL.SINDROMES_HIPERTENSIVAS_GESTACAO}
          right={() => <List.Icon icon="chevron-right" />}
          onPress={() => {
            analyticsData(
              MATERNO_INFANTIL.SINDROMES_HIPERTENSIVAS_GESTACAO,
              'Click',
              'Materno Infantil',
            );
            return Linking.openURL(
              'https://coronavirus.ceara.gov.br/wp-content/uploads/2020/11/Nascer_Ceara_4.pdf',
            );
          }}
        />
        <Divider />
        <List.Item
          left={() => <List.Icon icon="file-document" color="#808080" />}
          title="Hemorragia em Gestação"
          testID={TESTIDS.MATERNO_INFANTIL.HEMORRAGIA_GESTACAO}
          right={() => <List.Icon icon="chevron-right" />}
          onPress={() => {
            analyticsData(
              MATERNO_INFANTIL.GUIA_HEMORRAGIA_GESTACAO,
              'Click',
              'Materno Infantil',
            );
            return Linking.openURL(
              'https://coronavirus.ceara.gov.br/wp-content/uploads/2020/11/Nascer_Ceara_5.pdf',
            );
          }}
        />
      </List.Accordion>
    </ScrollView>
  );
}
