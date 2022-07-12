import { useNetInfo } from '@react-native-community/netinfo';
import React, { useCallback } from 'react';
import { Linking, View } from 'react-native';
import QualiQuizIcon from '~/assets/icons/servicos/qualiquiz.svg';
import ResidenciaMedicaIcon from '~/assets/icons/servicos/residencia_medica.svg';
import Servico1 from '~/assets/icons/servicos/servico_1.svg';
import Servico2 from '~/assets/icons/servicos/servico_2.svg';
import Servico3 from '~/assets/icons/servicos/servico_3.svg';
// import Servico4 from '~/assets/icons/servicos/servico_4.svg';
import Servico5 from '~/assets/icons/servicos/servico_5.svg';
import Servico6 from '~/assets/icons/servicos/servico_6.svg';
import Servico7 from '~/assets/icons/servicos/servico_7.svg';
import Servico8 from '~/assets/icons/servicos/servico_8.svg';
import ListServices from '~/components/ListServices';
import ServiceButton from '~/components/ServiceButton';
import ROTAS from '~/constantes/rotas';
import useAnalytics from '~/hooks/useAnalytics';
import { Titulo } from '../styles';

function Servicos({ navigation }) {
  const { analyticsData } = useAnalytics();

  const { isConnected } = useNetInfo();

  const listaServicos = [
    {
      id: 'residencia_medica',
      titulo: 'Residências',
      ativo: true,
      icone: ResidenciaMedicaIcon,
      navegacao: {
        net: true,
        componente: ROTAS.RESIDENCIA_MEDICA,
      },
    },
    {
      id: 'qualiquiz',
      titulo: 'QualiQuiz',
      ativo: true,
      icone: QualiQuizIcon,
      navegacao: {
        net: true,
        componente: 'QUALIQUIZ',
      },
    },
    {
      id: 'Integra_SUS',
      titulo: 'IntegraSUS',
      ativo: true,
      icone: Servico1,
      navegacao: {
        net: true,
        componente: 'webview',
        titulo: 'IntegraSUS',
        url: 'https://integrasus.saude.ce.gov.br',
      },
    },
    {
      id: 'Forca_Trabalho_Saude_CE',
      titulo: 'Força Trabalho CE',
      ativo: true,
      icone: Servico8,
      navegacao: {
        net: true,
        componente: 'browser',
        titulo: 'ForcaTrabalhoSaudeCE',
        url: 'https://cisec.esp.ce.gov.br/forca-de-trabalho',
      },
    },
    {
      id: 'elmo',
      titulo: 'Elmo',
      ativo: true,
      icone: Servico7,
      navegacao: {
        net: true,
        componente: ROTAS.ELMO,
        titulo: 'Elmo',
      },
    },
    {
      id: 'SUS_no_Ceara',
      titulo: 'SUS no Ceará',
      ativo: true,
      icone: Servico2,
      navegacao: {
        componente: ROTAS.SUS_NO_CEARA,
      },
    },
    // TODO: abilitar Acoes_do_governo ao fim do período eleitoral
    // {
    //   id: 'Acoes_do_governo',
    //   titulo: 'Ações do governo',
    //   ativo: true,
    //   icone: Servico4,
    //   navegacao: {
    //     net: true,
    //     componente: 'webview',
    //     titulo: 'Ações do governo',
    //     url: 'https://coronavirus.ceara.gov.br/isus/governo/',
    //   },
    // },
    {
      id: 'ESP',
      titulo: 'Escola de Saúde Pública - ESP/CE',
      icone: Servico5,
      ativo: true,
      navegacao: {
        net: true,
        componente: 'webview',
        titulo: 'ESP',
        url: 'https://www.esp.ce.gov.br/',
      },
    },
    {
      id: 'ESP_Virtual',
      titulo: 'ESP Virtual',
      ativo: true,
      icone: Servico6,
      navegacao: {
        net: true,
        componente: 'browser',
        titulo: 'ESP Virtual',
        url: 'http://espvirtual.esp.ce.gov.br/',
      },
    },
    {
      id: 'Fale_Conosco',
      titulo: 'Fale Conosco',
      ativo: true,
      icone: Servico3,
      navegacao: {
        componente: ROTAS.FALE_CONOSCO,
      },
    },
  ];

  // Exclui componentes que possuem dados no próprio iSUS-APP
  const excludeComponents = [ROTAS.ELMO, ROTAS.RESIDENCIA_MEDICA];

  const handleOnPressServiceButton = useCallback(
    item => {
      analyticsData(item.id, 'Click', 'Home');

      if (
        item.navegacao.net &&
        !excludeComponents.includes(item.navegacao?.componente) &&
        !isConnected
      ) {
        navigation.navigate(ROTAS.SEM_CONEXAO, {
          componente: item.navegacao.componente,
          title: item.navegacao.titulo,
          url: item.navegacao.url,
        });
        return;
      }

      if (item.navegacao.componente === 'browser') {
        Linking.openURL(item.navegacao.url);
        return;
      }

      navigation.navigate(item.navegacao.componente, {
        title: item.navegacao.titulo,
        url: item.navegacao.url,
      });
    },
    [isConnected, analyticsData],
  );

  return (
    <View>
      <Titulo>Serviços SUS Ceará</Titulo>
      <ListServices
        dados={listaServicos}
        renderItem={({ item }) => (
          <ServiceButton
            ativo={item.ativo}
            testID={`cartaoHome-servicos-${item.id}`}
            titulo={item.titulo}
            Icone={item.icone}
            onPress={() => handleOnPressServiceButton(item)}
          />
        )}
      />
    </View>
  );
}

export default Servicos;
