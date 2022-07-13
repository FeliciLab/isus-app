import { useNetInfo } from '@react-native-community/netinfo';
import React, { useCallback } from 'react';
import { Linking, View } from 'react-native';
import AcoesGovernoIcon from '~/assets/icons/servicos/acoes-governo-icon.svg';
import ElmoIcon from '~/assets/icons/servicos/elmo-icon.svg';
import EspIcon from '~/assets/icons/servicos/esp-icon.svg';
import EspVirtualIcon from '~/assets/icons/servicos/esp-virtual-icon.svg';
import FaleConoscoIcon from '~/assets/icons/servicos/fale-conosco-icon.svg';
import ForcaTrabalhoIcon from '~/assets/icons/servicos/forca-trabalho-icon.svg';
import IntegraSusIcon from '~/assets/icons/servicos/integra-sus-icon.svg';
import QualiquizIcon from '~/assets/icons/servicos/qualiquiz-icon.svg';
import ResidenciasIcon from '~/assets/icons/servicos/residencias-icon.svg';
import SusNoCeIcon from '~/assets/icons/servicos/sus-no-ce-icon.svg';
import ListServices from '~/components/ListServices';
import NewServiceButton from '~/components/NewServiceButton';
import { CORES } from '~/constantes/estiloBase';
import ROTAS from '~/constantes/rotas';
import useAnalytics from '~/hooks/useAnalytics';
import { Titulo } from '../styles';

function Servicos({ navigation }) {
  const { analyticsData } = useAnalytics();

  const { isConnected } = useNetInfo();

  const iconBackgroundColor = CORES.LARANJA;

  const listaServicos = [
    {
      id: 'residencia_medica',
      titulo: 'Residências',
      ativo: true,
      icone: ResidenciasIcon,
      navegacao: {
        net: true,
        componente: ROTAS.RESIDENCIA_MEDICA,
      },
    },
    {
      id: 'qualiquiz',
      titulo: 'QualiQuiz',
      ativo: true,
      icone: QualiquizIcon,
      navegacao: {
        net: true,
        componente: 'QUALIQUIZ',
      },
    },
    {
      id: 'Integra_SUS',
      titulo: 'IntegraSUS',
      ativo: true,
      icone: IntegraSusIcon,
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
      icone: ForcaTrabalhoIcon,
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
      icone: ElmoIcon,
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
      icone: SusNoCeIcon,
      navegacao: {
        componente: ROTAS.SUS_NO_CEARA,
      },
    },
    // TODO: abilitar Acoes_do_governo ao fim do período eleitoral
    {
      id: 'Acoes_do_governo',
      titulo: 'Ações do governo',
      ativo: false, // desativado
      icone: AcoesGovernoIcon,
      navegacao: {
        net: true,
        componente: 'webview',
        titulo: 'Ações do governo',
        url: 'https://coronavirus.ceara.gov.br/isus/governo/',
      },
    },
    {
      id: 'ESP',
      titulo: 'Escola de Saúde Pública - ESP/CE',
      icone: EspIcon,
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
      icone: EspVirtualIcon,
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
      icone: FaleConoscoIcon,
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
        dados={listaServicos.filter(item => item.ativo)}
        renderItem={({ item }) => (
          <NewServiceButton
            testID={`cartaoHome-servicos-${item.id}`}
            titulo={item.titulo}
            Icone={item.icone}
            onPress={() => handleOnPressServiceButton(item)}
            iconBackgroundColor={iconBackgroundColor}
          />
        )}
      />
    </View>
  );
}

export default Servicos;
