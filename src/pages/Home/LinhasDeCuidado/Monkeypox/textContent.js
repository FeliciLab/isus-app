import React from 'react';
import { labelsAnalytics } from '~/constantes/labelsAnalytics';
import { TESTIDS } from '~/constantes/testIDs';
import { Texto } from './styles';

const { MONKEYPOX: LABEL_MONKEYPOX } = labelsAnalytics;
const { MONKEYPOX: TESTID_MONKEYPOX } = TESTIDS;

export const mainText = (
  <>
    <Texto style={{ marginBottom: 8 }}>
      A Monkeypox é uma zoonose viral (doença originada de animais que passa a
      acometer seres humanos), por vírus de mesmo nome, pertencente ao gênero{' '}
      <Texto style={{ fontStyle: 'italic' }}>Orthopoxirus</Texto>, da família{' '}
      <Texto style={{ fontStyle: 'italic' }}>Poxviridae</Texto>. Tem grande
      semelhança com a varíola humana, considerada como erradicada desde 1980,
      porém com apresentação clínica de menor gravidade. Desde os anos 1970 a
      doença ocorre em região endêmica, localizada na África Central e
      Ocidental, inicialmente como casos isolados, nas proximidades de florestas
      tropicais. Nos últimos 20 anos foi observado nestas regiões o aumento
      progressivo de casos, cada vez mais frequentes em áreas urbanas. Nestes
      anos, casos e surtos esporádicos foram relatados fora da região endêmica,
      usualmente relacionados a viajantes ou comércio de animais. A partir de
      abril/2022 passaram a ser notificados milhares de casos da doença,
      ocorrendo em dezenas de países de todos os continentes. Em 23 de julho de
      2022 o diretor-geral da Organização Mundial de Saúde declarou o surto de
      Monkeypox como uma situação de Emergência de Saúde Pública de Preocupação
      Internacional.
    </Texto>
  </>
);

export const articleList = [
  {
    title: 'Transmissão',
    testId: TESTID_MONKEYPOX.TRANSMISSAO,
    analyticsId: LABEL_MONKEYPOX.TRANSMISSAO,
    text: () => (
      <>
        <Texto style={{ marginBottom: 8 }}>
          A transmissão para humanos pode ocorrer por meio do contato com
          animais, embora, mais recentemente, tenha se tornado cada vez mais
          comum o contágio entre humanos. A transmissão ocorre principalmente
          por meio do contato direto com a pele ou mucosa de indivíduos
          infectados. O fluido e a crosta das lesões de pele são altamente
          infecciosos. O contágio também pode ocorrer de forma indireta, por
          meio do contato com objetos, roupas, toalhas ou outros fômites, que
          estejam contaminados com as secreções corporais do indivíduo
          infectado. É possível ainda a transmissão por meio de gotículas
          respiratórias, quando o indivíduo suscetível permanece próximo por
          muito tempo, sem a utilização de máscaras, usualmente no próprio
          domicílio. Nos casos relatados no surto de 2022 tem sido observada a
          ocorrência da doença em muitos indivíduos após a exposição sexual.
          Apesar de não haver consenso entre os especialistas, a transmissão
          sexual tem sido considerada cada vez mais provável. São descritas mais
          raramente a transmissão materno-fetal e por acidentes em laboratórios
          de análises clínicas ou de pesquisa.
        </Texto>
        <Texto style={{ marginBottom: 8 }}>
          A Monkeypox costuma ter curso benigno e autolimitado, que dura entre 2
          e 4 semanas. Casos graves podem ocorrer mais comumente em crianças e
          indivíduos com comprometimento do sistema imune, costumando estar
          relacionados à extensão da exposição ao vírus, estado de saúde do
          paciente e natureza das complicações. A infecção de gestantes pode
          resultar em abortamento ou morte fetal, sendo por isso considerada
          como população mais vulnerável. Em uma minoria dos indivíduos pode ser
          necessário o tratamento em regime de internamento hospitalar. A
          letalidade da doença é variável, mas tem sido estimada em cerca de 1%.
        </Texto>
      </>
    ),
  },
  {
    title: 'Tratamento',
    testId: TESTID_MONKEYPOX.TRATAMENTO,
    analyticsId: LABEL_MONKEYPOX.TRATAMENTO,
    text: () => (
      <>
        <Texto style={{ marginBottom: 8 }}>
          O indivíduo infectado deve ser acompanhado pelo serviço de saúde,
          usualmente mediante monitoramento ambulatorial. Costumam ser
          prescritos medicamentos para o alívio dos sintomas, fornecidas
          orientações gerais sobre a doença, incluindo medidas para a prevenção
          e controle da transmissão da doença. Indivíduos com manifestações mais
          intensas, como dor acentuada, infecção das lesões, dificuldade na
          respiração ou alimentação, desidratação (por vômitos e/ou diarreia),
          queda da pressão arterial, com lesões oculares ou sonolência excessiva
          podem necessitar de internamento hospitalar. Existem medicamentos com
          potencial para combater diretamente o vírus, embora estes ainda não
          estejam disponíveis na atualidade. É importante cuidar das lesões de
          pele, deixando-as secar ou cobrindo-as com curativo úmido para
          proteger a área afetada, se necessário.
        </Texto>
      </>
    ),
  },
  {
    title: 'Prevenção',
    testId: TESTID_MONKEYPOX.PREVENCAO,
    analyticsId: LABEL_MONKEYPOX.PREVENCAO,
    text: () => (
      <>
        <Texto style={{ marginBottom: 8 }}>
          O indivíduo infectado continua sendo fonte de contaminação até que
          todas as lesões de pele estejam completamente cicatrizadas. A doença
          deve ser obrigatoria e imediatamente notificada para a autoridade de
          saúde (vigilância epidemiológica), Seus contatos próximos devem ser
          avaliados e acompanhados pelo serviço de saúde. É importante manter o
          isolamento domiciliar do doente até resolução das lesões cutâneas, ou
          seja, cicatrização e desaparecimento de todas as lesões e crostas e
          evitar contato próximo e/ou prolongado com outras pessoas até
          resolução do quadro clínico. Medidas de proteção, como isolamento em
          um quarto do domicílio, o uso de máscaras quando se aproximar, a
          higiene das mãos e dos objetos devem ser implementadas tão logo tenha
          sido suspeitado da doença, mesmo antes da confirmação. Também é
          importante não compartilhar objetos como toalhas, roupas, lençóis,
          pratos, copos e itens individuais durante o período de
          transmissibilidade.
        </Texto>
        <Texto style={{ marginBottom: 8 }}>
          Existem produtos vacinais que podem ser úteis na prevenção da
          transmissão, podendo ser utilizados mesmo após a exposição à doença.
          Tais vacinas deverão brevemente estar disponíveis em nosso país, em
          quantidade limitada, devendo ser direcionadas para utilização em
          indivíduos com risco aumentado de exposição (eg. profissionais da
          saúde) ou contatos de casos notificados (profilaxia pós-exposição).
        </Texto>
      </>
    ),
  },
];
