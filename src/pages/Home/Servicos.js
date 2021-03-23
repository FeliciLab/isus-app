import React from 'react';
import { Linking } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import QualiQuizIcon from '../../assets/icons/servicos/qualiquiz.svg';
import Servico1 from '../../assets/icons/servicos/servico_1.svg';
import Servico2 from '../../assets/icons/servicos/servico_2.svg';
import Servico3 from '../../assets/icons/servicos/servico_3.svg';
import Servico4 from '../../assets/icons/servicos/servico_4.svg';
import Servico5 from '../../assets/icons/servicos/servico_5.svg';
import Servico6 from '../../assets/icons/servicos/servico_6.svg';
import Servico7 from '../../assets/icons/servicos/servico_7.svg';
import CartaoHome from './cartaoHome';
import { analyticsData } from '../../utils/analytics';
import estaAtiva from '../../utils/estaAtiva';
import features from '../../constantes/features';
import ROTAS from '../../constantes/rotas';
import { Titulo } from './styles';
import Carrossel from '../../components/Carrossel';

function Servicos({ navigation }) {
  const netInfo = useNetInfo();

  const listaServicos = [
    {
      id: 'Integra_SUS',
      titulo: 'IntegraSUS',
      ativo: true,
      icone: Servico1,
      navegacao: {
        net: true,
        componente: 'webview',
        titulo: 'IntegraSUS',
        url: 'https://integrasus.saude.ce.gov.br'
      }
    },
    {
      id: 'SUS_no_Ceara',
      titulo: 'SUS no Ceará',
      ativo: true,
      icone: Servico2,
      navegacao: {
        componente: ROTAS.SUS_NO_CEARA
      }
    },
    {
      id: 'Fale_Conosco',
      titulo: 'Fale Conosco',
      ativo: true,
      icone: Servico3,
      navegacao: {
        componente: ROTAS.FALE_CONOSCO
      }
    },
    {
      id: 'Acoes_do_governo',
      titulo: 'Ações do governo',
      ativo: true,
      icone: Servico4,
      navegacao: {
        net: true,
        componente: 'webview',
        titulo: 'Ações do governo',
        url: 'https://coronavirus.ceara.gov.br/isus/governo/'
      }
    },
    {
      id: 'ESP',
      titulo: 'ESP',
      icone: Servico5,
      ativo: true,
      navegacao: {
        net: true,
        componente: 'webview',
        titulo: 'ESP',
        url: 'https://www.esp.ce.gov.br/'
      }
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
        url: 'http://espvirtual.esp.ce.gov.br/'
      }
    }
  ];

  if (estaAtiva(features.QUALIQUIZ)) {
    listaServicos.unshift({
      id: 'qualiquiz',
      titulo: 'QualiQuiz',
      ativo: true,
      icone: QualiQuizIcon,
      navegacao: {
        net: true,
        componente: 'QUALIQUIZ'
      }
    });
  }

  if (estaAtiva(features.ELMO)) {
    listaServicos.unshift({
      id: 'elmo',
      titulo: 'Elmo',
      ativo: true,
      icone: Servico7,
      navegacao: {
        net: true,
        componente: ROTAS.ELMO,
        titulo: 'Elmo'
      }
    });
  }


  const onPress = (item) => {
    analyticsData(item.id, 'Click', 'Home');
    if (item.navegacao.net && !netInfo.isConnected) {
      navigation.navigate(ROTAS.SEM_CONEXAO, {
        componente: item.navegacao.componente,
        title: item.navegacao.titulo,
        url: item.navegacao.url
      });
      return;
    }

    if (item.navegacao.componente === 'browser') {
      Linking.openURL(item.navegacao.url);
      return;
    }

    navigation.navigate(item.navegacao.componente, {
      title: item.navegacao.titulo,
      url: item.navegacao.url
    });
  };

  return (
    <>
      <Titulo>Serviços</Titulo>
      <Carrossel
        dados={listaServicos}
        aoRenderizarItem={({ item }) => (
          <CartaoHome
            key={item.id}
            ativo={item.ativo}
            testID={`cartaoHome-servicos-${item.id}`}
            titulo={item.titulo}
            Icone={item.icone}
            onPress={() => onPress(item)}
          />
        )}
      />
    </>
  );
}

export default Servicos;
