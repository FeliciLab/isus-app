import React from 'react';
import { Text, StyleSheet, Share } from 'react-native';
import { navigate } from '../../routes/rootNavigation';

const informacoes = {
  Lei8080: {
    tituloCompleto: 'LEI Nº 8.080',
    url: 'http://www.planalto.gov.br/ccivil_03/leis/l8080.htm#:~:text=LEI%20N%C2%BA%208.080%2C%20DE%2019%20DE%20SETEMBRO%20DE%201990.&text=Disp%C3%B5e%20sobre%20as%20condi%C3%A7%C3%B5es%20para,correspondentes%20e%20d%C3%A1%20outras%20provid%C3%AAncias.'
  },
  Direito: {
    tituloCompleto: 'Constituição Federal',
    url: 'https://conselho.saude.gov.br/web_sus20anos/20anossus/legislacao/constituicaofederal.pdf'
  },
  SistemaUnicoDeSaude: {
    tituloCompleto: 'Sistema Único de Saúde',
    url: 'https://pt.wikipedia.org/wiki/Sistema_%C3%9Anico_de_Sa%C3%BAde'
  },
  Memorias: {
    tituloCompleto: 'Memórias da Saúde da Família',
    url: 'https://bvsms.saude.gov.br/bvs/publicacoes/memorias_saude_familia_brasil.pdf'
  },
  SUS: {
    tituloCompleto: 'A história do SUS',
    url: 'https://pensesus.fiocruz.br/sus'
  },
  Brasil: {
    tituloCompleto: 'Ministério da Saúde',
    url: 'https://saude.gov.br/'
  },
  SaudeCeara: {
    tituloCompleto: 'Secretaria da Saúde',
    url: 'https://www.saude.ce.gov.br/'
  },
  ConselhoEstadual: {
    tituloCompleto: 'Conselho Estadual de Saúde',
    url: 'http://www.cesau.ce.gov.br/'
  },
  ESPCE: {
    tituloCompleto: 'ESP/CE',
    url: 'https://www.esp.ce.gov.br/'
  },
  UECE: {
    tituloCompleto: 'UECE',
    url: 'http://www.uece.br/'
  },
  ThoughtWorks: {
    tituloCompleto: 'ThoughtWorks',
    url: 'https://www.thoughtworks.com/pt'
  },
  Governo: {
    tituloCompleto: 'Governo do Estado do CE',
    url: 'https://www.ceara.gov.br/'
  }
};

export const TextoSobreSUS = () => (
  <>
  <Text style={estilos.textoSUS}>
  O Sistema Único de Saúde (SUS) é um dos maiores e mais complexos sistemas de saúde pública do
    mundo. Criado pela Constituição Federal Brasileira em 1988, e
    promulgado pela
    {' '}
    <Text style={estilos.textoLink} onPress={() => aoCompartilhar('Lei8080')}>Lei 8080</Text>
    , busca assegurar o acesso universal como
    {' '}
    <Text style={estilos.textoLink} onPress={() => navegar('Direito')}>um dever do Estado e um direito de todos os brasileiros</Text>
    .
    {'\n\n'}
    Sua rede é ampla, funciona de maneira integral, e
    {' '}
    <Text style={estilos.textoLink} onPress={() => navegar('SistemaUnicoDeSaude')}>abrange tanto ações quanto os serviços de saúde</Text>
    , ofertados desde a gestação e por toda a vida. Apesar de ser
    nomeado de Único, o SUS é descentralizado, e sua a implementação considera as
    distintas e diversas características de cada território brasileiro.
  </Text>
  </>
);

export const TextoSobreSUSNoCeara = () => (
  <>
<Text style={estilos.textoConteudo}>
    O Ceará é um estado com muitas histórias de sucesso no SUS. A criação do
    Programa Saúde da Família, dos Agentes Comunitários de Saúde, e o processo de
    municipalização e regionalização da saúde são alguns exemplos de conquistas com
    {' '}
    <Text style={estilos.textoLink} onPress={() => navegar('Memorias')}>forte presença do Ceará em seus DNAs</Text>
    .
    {'\n\n'}
    E agora o foco em nosso estado é a inovação e qualificação,  promover transformação digital,
    para seguir crescendo e capilarizando ações positivas pelo Brasil. O iSUS é fruto desse
    pensamento e dessa missão.
    {'\n\n'}
    Saiba mais sobre
{' '}
<Text style={estilos.textoLink} onPress={() => navegar('SUS')}>a história do SUS</Text>
, sua gestão
{' '}
<Text style={estilos.textoLink} onPress={() => navegar('Brasil')}>no Brasil</Text>
{' '}
e
{' '}
<Text style={estilos.textoLink} onPress={() => navegar('SaudeCeara')}>no Ceará</Text>
, e sobre as instâncias de
{' '}
    <Text style={estilos.textoLink} onPress={() => aoCompartilhar('ConselhoEstadual')}>participação das pessoas</Text>
{' '}
na construção e no fortalecimento dessa conquista.
</Text>
  </>
);

export const TextoSobreSESA = () => (
  <>
<Text style={estilos.textoConteudo}>
O iSUS foi criado na
{' '}
    <Text style={estilos.textoLink} onPress={() => navegar('ESPCE')}>Escola de Saúde Pública do Ceará Paulo Marcelo Martins Rodrigues</Text>
(ESP/CE), contando com a parceria da
{' '}
    <Text style={estilos.textoLink} onPress={() => aoCompartilhar('UECE')}>Universidade Estadual do Ceará</Text>
{' '}
e da
{' '}
    <Text style={estilos.textoLink} onPress={() => navegar('ThoughtWorks')}>ThoughtWorks</Text>
, se tornando um caso de trabalho colaborativo, transparente e focado na experiência
e na necessidade dos profissionais de saúde.
{'\n\n'}
Criada em 22 de julho de 1993, a ESP/CE existe para promover a formação e educação permanente,
pesquisa e extensão na área da saúde, com inovação e produção tecnológica, integrando
ensino-serviço-comunidade às suas práticas. E no último ano assumiu o desafio de funcionar como
um Centro de Inteligência em Saúde no Estado.
{'\n\n'}
Sua atuação engloba um pioneiro trabalho junto a programas de residências em saúde, educação
profissional em saúde, cursos e projetos nas áreas da gestão, atenção, vigilância e extensão
em saúde.
{'\n\n'}
Também promove fomento à pesquisa e conhecimento científico por meio de iniciativas e programas
de estímulo e disseminação da ciência em articulação direta com a saúde e a educação.
{'\n\n'}
<Text style={estilos.negrito}>Endereço: </Text>
Av. Antônio Justa, 3161. Meireles. Fortaleza-CE
{'\n'}
<Text style={estilos.negrito}>Telefones: </Text>
(85) 3101.1398 - FAX (85) 3101.1423
</Text>
  </>
);


export const TextoSobreESP = () => (
  <>
<Text style={estilos.textoConteudo}>
A ESP é uma autarquia vinculada à
{' '}
<Text style={estilos.textoLink} onPress={() => navegar('SaudeCeara')}>Secretaria da Saúde do Estado do Ceará (Sesa)</Text>
, órgão da administração direta do
{' '}
<Text style={estilos.textoLink} onPress={() => navegar('Governo')}>Governo estadual</Text>
. A SESA é a responsável pelo gerenciamento
do Sistema Único de Saúde (SUS) no Ceará.
{'\n\n'}
O órgão tem como base das suas atividades o tripé da ética, moral e integridade, disponibilizando
todos os meios necessários para que seus colaboradores e todos os que interagem com ela possam,
juntos, desenvolver e proteger a instituição dos descaminhos políticos e socioculturais.
{'\n\n'}
Seu compromisso é o de cumprir as políticas públicas de saúde na garantia do atendimento à população
de forma plena e com qualidade. Além de gerenciar o sistema de saúde no Estado, proporcionando
resolutividade, satisfação e acessibilidade a todas as pessoas.
{'\n\n'}
<Text style={estilos.negrito}>Endereço: </Text>
Av. Almirante Barroso, 600. Praia de Iracema. Fortaleza-CE
{'\n'}
<Text style={estilos.negrito}>Telefones: </Text>
(85) 3101.5223
</Text>
  </>
);

const navegar = (titulo) => {
  navigate('webview', { title: informacoes[titulo].tituloCompleto, url: informacoes[titulo].url });
};

const aoCompartilhar = async (titulo) => {
  const messagTitle = informacoes[titulo].tituloCompleto;
  const messagLink = informacoes[titulo].url;
  try {
    await Share.share({
      message: `${messagTitle} ${messagLink}`
    });
  } catch (error) {
    console.log(error.message);
  }
};

const estilos = StyleSheet.create({
  textoConteudo: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 14
  },
  textoLink: {
    color: '#4CAF50',
    fontSize: 14,
    textDecorationLine: 'underline'
  },
  negrito: {
    fontWeight: 'bold'
  },
  textoSUS: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 14,
    marginHorizontal: 14,
    marginVertical: 14,
  }

});
