import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { navigate } from '../../routes/rootNavigation';

const informacoes = {
  SUS: {
    tituloCompleto: 'Sobre o SUS',
    url: 'http://www.saude.gov.br/'
  },
  SESA: {
    tituloCompleto: 'Sobre a SESA',
    url: 'https://www.saude.ce.gov.br/'
  },
  ESP: {
    tituloCompleto: 'Sobre a ESP',
    url: 'https://www.esp.ce.gov.br/'
  }
};

export const TextoSobreSUS = () => (
  <>
<Text>
    O Sistema Único de Saúde (SUS) é um dos maiores e mais complexos sistemas de saúde pública do
    mundo,
    abrangendo desde o simples atendimento para avaliação da pressão arterial, por meio da Atenção
    Primária, até o transplante de órgãos, garantindo acesso integral, universal e gratuito para
    toda a população do país.
    {'\n\n'}
    Criado pela Constituição Federal Brasileira em 1988, o sistema visa garantir atenção integral à
    saúde, e não somente aos cuidados assistenciais, como um direito de todos os brasileiros,
    desde a gestação e por toda a vida, com foco na saúde com qualidade de vida, visando a
    prevenção e a promoção da saúde.
    {'\n\n'}
    Sua rede é ampla e abrange tanto ações quanto os serviços de saúde. Engloba a atenção primária,
    média e alta complexidades, os serviços urgência e emergência, a atenção hospitalar, as ações e
    serviços das vigilâncias epidemiológica, sanitária e ambiental e assistência farmacêutica.
</Text>
    {'\n\n'}
    <Text style={estilos.textoLink} onPress={() => navegar('SUS')}>Saiba mais acessando o site</Text>
  </>
);

export const TextoSobreSESA = () => (
  <>
<Text>
A Secretaria da Saúde do Estado do Ceará (Sesa) é um órgão da administração direta do Governo
estadual. Ela é a responsável pelo gerenciamento do Sistema Único de Saúde (SUS) no Ceará.
{'\n\n'}
O órgão tem como base das suas atividades o tripé da ética, moral e integridade, disponibilizando
todos os meios necessários para que seus colaboradores e todos os que interagem com ela possam,
juntos, desenvolver e proteger a instituição dos descaminhos políticos e socioculturais.
{'\n\n'}
Seu compromisso é o de cumprir as políticas públicas de saúde na garantia do atendimento à
população de forma plena e com qualidade. Além de gerenciar o sistema de saúde no Estado,
proporcionando  resolutividade, satisfação e acessibilidade a todas as pessoas.
</Text>
    {'\n\n'}
    <Text style={estilos.textoLink} onPress={() => navegar('SESA')}>Saiba mais acessando o site</Text>
  </>
);


export const TextoSobreESP = () => (
  <>
<Text>
A Escola de Saúde Pública do Ceará Paulo Marcelo Martins Rodrigues (ESP/CE) é uma autarquia
vinculada à Secretaria da Saúde do Ceará (SESA). Criada em 22 de julho de 1993, a instituição
tem como objetivo promover a formação e educação permanente, pesquisa e extensão na área da saúde,
com inovação e produção tecnológica, integrando ensino-serviço-comunidade às suas práticas.
{'\n\n'}
Ao longo dos últimos 27 anos, a escola tem construindo sólidas parcerias e redes colaborativas para
o atendimento das necessidade sociais do Sistema Único de Saúde (SUS). Sua atuação engloba um
pioneiro trabalho junto a programas de residências em saúde, educação profissional em saúde, cursos
e projetos nas áreas da gestão, atenção, vigilância e extensão em saúde.
{'\n\n'}
Além do fomento à pesquisa e o conhecimento científico por meio de iniciativas e programas de
estímulo e disseminação da ciência  em articulação direta com a saúde e a educação.

</Text>
    {'\n\n'}
    <Text style={estilos.textoLink} onPress={() => navegar('ESP')}>Saiba mais acessando o site</Text>
  </>
);


const navegar = (titulo) => {
  navigate('webview', { title: informacoes[titulo].tituloCompleto, url: informacoes[titulo].url });
};

const estilos = StyleSheet.create({
  textoLink: {
    color: '#4CAF50',
    textDecorationLine: 'underline'
  }
});
