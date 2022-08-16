import React from 'react';
import { View } from 'react-native';
import { labelsAnalytics } from '~/constantes/labelsAnalytics';
import { TESTIDS } from '~/constantes/testIDs';
import { Texto } from './styles';

const { ARBOVIROSES: LABEL_ARBOVIROSES } = labelsAnalytics;
const { ARBOVIROSES: TESTID_ARBOVIROSES } = TESTIDS;

export const mainText = (
  <>
    <Texto style={{ marginBottom: 8 }}>
      Os arbovírus (Arthropod-borne Virus) são hoje uma grande preocupação para
      a saúde pública no cenário mundial. São patologias formadas por centenas
      de vírus que possuem características comuns, inclusive de serem
      transmitidos por artrópodes. Os vírus mais importantes para a saúde humana
      são os transmitidos por culicídeos, principalmente dos gêneros{' '}
      <Texto style={{ fontStyle: 'italic' }}>Culex e Aedes</Texto> (WEAVER, S.C;
      REISEN, W.K, 2010).
    </Texto>
    <Texto style={{ marginBottom: 8 }}>
      Existe no contexto epidemiológico brasileiro a cocirculação de infecção
      por DENV, CHIKV e ZIKV, dificultando o manejo clínico em razão de suas
      similaridades, tendo implicações na população geral, mas principalmente
      nos grupos considerados de risco como: crianças, idosos, gestantes e
      pessoas com comorbidades. O impacto gerado por esses vírus ainda não é
      conhecido em toda sua totalidade, porém casos de reinfecção pelos
      diferentes sorotipos do DENV, a interação de arboviroses (DENV sorotipos
      1-4, CHIKV e ZIKV) podem, teoricamente, resultar em viremias mais intensas
      ou outras alterações imunológicas que, por sua vez, agiriam como gatilho
      para doenças autoimunes, como a síndrome de Guillain-Barré (WEAVER, S.C;
      REISEN, W.K, 2010).
    </Texto>
    <Texto style={{ marginBottom: 8 }}>
      A iminente crise ambiental brasileira desencadeada pela propagação das
      arboviroses, por intermédio do mosquito{' '}
      <Texto style={{ fontStyle: 'italic' }}>Aedes aegypti</Texto>, representam
      desafios à saúde pública. Este problema, além de soluções técnicas, requer
      soluções educacionais que se configurem na construção de conhecimentos,
      mudanças de hábitos, a internalização de novos valores e atitudes que
      contribuam para a superação dos problemas apresentados (FILHO; SANTOS,
      2016).
    </Texto>
  </>
);

export const articleList = [
  {
    title: 'Agentes de Combate às Endemias',
    testId: TESTID_ARBOVIROSES.AGENTES_COMBATE_ENDEMIAS,
    analyticsId: LABEL_ARBOVIROSES.AGENTES_COMBATE_ENDEMIAS,
    text: () => (
      <>
        <Texto style={{ marginBottom: 8 }}>
          Qualquer recipiente que acumule água é um potencial foco de
          proliferação do{' '}
          <Texto style={{ fontStyle: 'italic' }}>Aedes aegypti</Texto>. Apenas a
          eliminação do foco não é o suficiente para o combate, é preciso cuidar
          para que na próxima estação chuvosa o local não venha a acumular água
          novamente. Os ovos são resistentes e continuam viáveis por meses,
          mesmo em locais secos, basta entrar em contato com a água para que
          continuem o ciclo.
        </Texto>
        <Texto style={{ marginBottom: 8 }}>
          As medidas de controle são fundamentais, destacando-se o trabalho da
          Atenção Básica, especialmente as funções desenvolvidas na visita
          domiciliar pelos Agentes de Combate às Endemias (ACE), que realizam
          ações de Vigilância em Saúde para identificação e prevenção de
          criadouros do mosquito, adotando medidas de controle em conjunto com o
          domiciliado/população.
        </Texto>
        <Texto style={{ marginBottom: 8 }}>
          Os Agentes de Combate às Endemias (ACE) são o forte elo para aliar
          conscientização da população e trabalho direcionado frente às
          arboviroses vigentes, o trabalho realizado por estes profissionais
          visam a redução da incidência das arboviroses no Estado.
        </Texto>
      </>
    ),
  },
  {
    title: 'Definição de Caso Suspeito de Dengue',
    testId: TESTID_ARBOVIROSES.DEFINICAO_CASO_SUSPEITO_DENGUE,
    analyticsId: LABEL_ARBOVIROSES.DEFINICAO_CASO_SUSPEITO_DENGUE,
    text: () => (
      <>
        <Texto style={{ marginBottom: 8 }}>
          Se o paciente é residente ou procedente de área com presença de{' '}
          <Texto style={{ fontStyle: 'italic' }}>Aedes aegypti</Texto> ou tiver
          viajado nos últimos 14 dias para local que tenha a presença do
          mosquito e apresentar:
        </Texto>

        <View style={{ marginLeft: 16, marginBottom: 8 }}>
          <Texto>● febre (entre dois e sete dias)</Texto>
          <Texto>● náuseas</Texto>
          <Texto>● vômitos</Texto>
          <Texto>● manchas e coceiras na pele</Texto>
          <Texto>● dor muscular/articular</Texto>
          <Texto>● dor de cabeça</Texto>
          <Texto>● dor atrás dos olhos</Texto>
        </View>

        <Texto>
          <Texto style={{ fontWeight: '600' }}>Agente Etiológico: </Texto>
          Vírus Chikungunya (CHIKV), da família{' '}
          <Texto style={{ fontStyle: 'italic' }}>Togaviridae</Texto> e do gênero{' '}
          <Texto style={{ fontStyle: 'italic' }}>Alphavirus</Texto>.
        </Texto>
      </>
    ),
  },
  {
    title: 'Definição de Caso Supeito de Chikungunya',
    testId: TESTID_ARBOVIROSES.DEFINICAO_CASO_SUSPEITO_CHIKUNGUNYA,
    analyticsId: LABEL_ARBOVIROSES.DEFINICAO_CASO_SUSPEITO_CHIKUNGUNYA,
    text: () => (
      <>
        <Texto style={{ marginBottom: 8 }}>
          Se o paciente é residente ou procedente de área com presença de{' '}
          <Texto style={{ fontStyle: 'italic' }}>Aedes aegypti</Texto> ou tiver
          viajado nos últimos 14 dias para local que tenha a presença do
          mosquito e apresentar:
        </Texto>
        <View style={{ marginLeft: 16, marginBottom: 8 }}>
          <Texto>● febre maior que 38,5°C</Texto>
          <Texto>
            ● dores/inflamações nas articulações intensas de início agudo, não
            explicadas por outras condições
          </Texto>
        </View>

        <Texto>
          <Texto style={{ fontWeight: '600' }}>Agente Etiológico: </Texto>
          Vírus Chikungunya (CHIKV), da família{' '}
          <Texto style={{ fontStyle: 'italic' }}>Togaviridae</Texto> e do gênero{' '}
          <Texto style={{ fontStyle: 'italic' }}>Alphavirus</Texto>.
        </Texto>
      </>
    ),
  },
  {
    title: 'Definição de Caso Supeito de Zika',
    testId: TESTID_ARBOVIROSES.DEFINICAO_CASO_SUSPEITO_ZIKA,
    analyticsId: LABEL_ARBOVIROSES.DEFINICAO_CASO_SUSPEITO_ZIKA,
    text: () => (
      <View key="1">
        <Texto style={{ marginBottom: 8 }}>
          Se o indivíduo apresentar manchas acompanhadas de um dos seguintes
          sinais e sintomas:
        </Texto>
        <View style={{ marginLeft: 16, marginBottom: 8 }}>
          <Texto>● febre baixa ou ausente</Texto>
          <Texto>● conjuntivite não purulenta</Texto>
          <Texto>● dor muscular/articular</Texto>
        </View>
        <Texto>
          <Texto style={{ fontWeight: '600' }}>Agente Etiológico: </Texto>
          Vírus zika (ZIKAV) é um RNA vírus do gênero{' '}
          <Texto style={{ fontStyle: 'italic' }}>Flavivirus</Texto>, pertencente
          à família <Texto style={{ fontStyle: 'italic' }}>Flaviviridae</Texto>.
        </Texto>
      </View>
    ),
  },
  {
    title: 'Definição de Caso Supeito de Febre Amarela',
    testId: TESTID_ARBOVIROSES.DEFINICAO_CASO_SUSPEITO_FEBRE_AMARELA,
    analyticsId: LABEL_ARBOVIROSES.DEFINICAO_CASO_SUSPEITO_FEBRE_AMARELA,
    text: () => (
      <>
        <Texto style={{ marginBottom: 8 }}>
          Se o paciente não vacinado ou com quadro vacinal ignorado for
          residente ou tenha visitado áreas endêmicas ou epidêmicas até duas
          semanas antes do início dos sintomas e apresenta quadro de:
        </Texto>
        <View style={{ marginLeft: 16, marginBottom: 8 }}>
          <Texto>● febre aguda (até 7 dias)</Texto>
          <Texto>● olhos e pele amarelados</Texto>
          <Texto>● dor nas costas ou corpo todo</Texto>
          <Texto>● náuseas e vômitos</Texto>
          <Texto>● dor de cabeça</Texto>
          <Texto>● calafrios</Texto>
        </View>
        <Texto style={{ marginBottom: 8 }}>
          <Texto style={{ fontWeight: '600' }}>Agente Etiológico: </Texto>
          Arbovírus do gênero{' '}
          <Texto style={{ fontStyle: 'italic' }}>Flavivirus</Texto>, família{' '}
          <Texto style={{ fontStyle: 'italic' }}>Flaviviridae</Texto>.
        </Texto>
        <Texto>
          Vacinação é a principal forma de prevenção contra a febre amarela.
        </Texto>
      </>
    ),
  },
];
