import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import {
  Image,
  Linking,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EspSVG from '~/assets/images/sobreOiSUS/esp.svg';
import Uece from '~/assets/images/sobreOiSUS/euce2.png';
import FelicilabSVG from '~/assets/images/sobreOiSUS/felicilab.svg';
import FuncapSVG from '~/assets/images/sobreOiSUS/funcap.svg';
import GesadSVG from '~/assets/images/sobreOiSUS/gesad.svg';
import GovernoSVG from '~/assets/images/sobreOiSUS/governo_ceara.svg';
import IsusSVG from '~/assets/images/sobreOiSUS/isus.svg';
import SesaSVG from '~/assets/images/sobreOiSUS/secretaria_saude.svg';
import ThoughtworksSVG from '~/assets/images/sobreOiSUS/thoughtworks.svg';
import { CORES } from '~/constantes/estiloBase';
import AboutLink from './AboutLink';
import {
  AboutHeader,
  AboutHeaderTitle,
  AboutParagraph,
  Container,
  Fotter,
  FotterRow,
  FotterRowGov,
  FotterRowWrapper,
  TitleISUS,
} from './styles';

export default function About() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: CORES.VERDE,
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: CORES.BRANCO,
      headerTitleAlign: 'center',
      headerTitle: 'Sobre o iSUS',
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19,
          }}
          onPress={() => {
            navigation.toggleDrawer();
          }}>
          <Icon name="menu" size={28} color={CORES.BRANCO} />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <ScrollView>
      <Container>
        <AboutHeader>
          <IsusSVG width={130} />
          <AboutHeaderTitle>
            O super app do profissional da saúde
          </AboutHeaderTitle>
        </AboutHeader>
        <View>
          <TitleISUS>Sobre o iSUS</TitleISUS>
          <AboutParagraph>
            O iSUS é um produto digital criado para ser um cinto de utilidades e
            apoiar os profissionais e gestores do Sistema Único de Saúde (SUS)
            diante de desafios de urgência, emergência e proteção à vida.
          </AboutParagraph>
          <AboutParagraph>
            Desenvolvido em meio à pandemia do novo coronavírus, respondeu à
            demanda de integração e entrega de informações oficiais para os
            profissionais de saúde, e está evoluindo para consolidar-se como
            canal de relacionamento entre trabalhadores e gestores do SUS.
          </AboutParagraph>
          <AboutParagraph>
            O objetivo é entregar informações, serviços e oportunidades, de
            forma automatizada, personalizada e segura, na palma da mão das
            pessoas, otimizando seu tempo e fortalecendo as decisões baseadas em
            dados e evidências científicas.
          </AboutParagraph>
          <TitleISUS>Quem faz?</TitleISUS>
          <AboutParagraph>
            Iniciativa da{' '}
            <AboutLink to="https://www.esp.ce.gov.br/">
              Escola de Saúde Pública do Ceará (ESP)
            </AboutLink>
            , o iSUS foi desenvolvido com apoio voluntário da{' '}
            <AboutLink to="https://www.thoughtworks.com/pt">
              ThoughtWorks
            </AboutLink>
            , consultora global em tecnologias, e com apoio financeiro da{' '}
            <AboutLink to="https://www.funcap.ce.gov.br/">
              Fundação Cearense de Apoio ao Desenvolvimento Científico e
              Tecnológico (Funcap)
            </AboutLink>
            .
          </AboutParagraph>
          <TitleISUS>Colabore!</TitleISUS>
          <AboutParagraph>
            Faça parte do time do iSUS acessando o{' '}
            <AboutLink to="https://github.com/EscolaDeSaudePublica/isus-app">
              repositório no github
            </AboutLink>{' '}
            para ver os códigos fonte, o{' '}
            <AboutLink to="https://github.com/orgs/EscolaDeSaudePublica/projects/20">
              painel de atividades
            </AboutLink>{' '}
            para acompanhar o processo de desenvolvimento ou fale com a gente
            através do{' '}
            <AboutLink to="https://t.me/grupoanticorona">
              grupo no Telegram
            </AboutLink>
            .
          </AboutParagraph>
        </View>
        <Fotter>
          <FotterRow>
            <FotterRowWrapper>
              <GesadSVG
                onPress={() => Linking.openURL('http://www.uece.br/gesad/')}
              />
            </FotterRowWrapper>
            <FotterRowWrapper>
              <Image
                source={Uece}
                onPress={() => Linking.openURL('http://www.uece.br/')}
              />
            </FotterRowWrapper>
          </FotterRow>
          <FotterRow>
            <FotterRowWrapper>
              <FuncapSVG
                onPress={() => Linking.openURL('https://www.funcap.ce.gov.br/')}
              />
            </FotterRowWrapper>
            <FotterRowWrapper>
              <ThoughtworksSVG
                onPress={() =>
                  Linking.openURL(
                    'https://www.thoughtworks.com/locations/brasil',
                  )
                }
              />
            </FotterRowWrapper>
          </FotterRow>
          <Divider />
          <FotterRow>
            <FotterRowWrapper>
              <FelicilabSVG
                onPress={() =>
                  Linking.openURL(
                    'https://escoladesaudepublica.github.io/#FeliciLab',
                  )
                }
              />
            </FotterRowWrapper>
            <FotterRowWrapper>
              <EspSVG
                onPress={() => Linking.openURL('https://www.esp.ce.gov.br/')}
              />
            </FotterRowWrapper>
          </FotterRow>
          <Divider />
          <FotterRowGov>
            <SesaSVG
              onPress={() => Linking.openURL('https://www.saude.ce.gov.br/')}
            />
          </FotterRowGov>
          <Divider />
          <FotterRowGov>
            <GovernoSVG
              onPress={() => Linking.openURL('https://www.ceara.gov.br/')}
            />
          </FotterRowGov>
        </Fotter>
      </Container>
    </ScrollView>
  );
}
