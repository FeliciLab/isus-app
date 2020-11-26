import React, { useContext } from 'react';
import BannerManejo from './bannerManejo';
import Banner from './banner';
import CovidHeroes from '../../assets/images/banners/covidHeroes.png';
import IDSaude from '../../assets/images/banners/IDSaude.png';
import CartilhaSaudeMental from '../../assets/images/banners/cartilhaSaudeMental.png';
import ProtocoloSindromeCoronarianaAguda from '../../assets/images/banners/protocoloSindromeAguda.png';
import { AutenticacaoContext } from '../../context/AutenticacaoContext';
import features from '../../constantes/features';
import estaAtiva from '../../utils/estaAtiva';

const bannersDoCarrossel = () => {
  const { estaLogado } = useContext(AutenticacaoContext);

  if (estaAtiva(features.LINHAS_DE_CUIDADO)) {
    return [
      {
        banner:
          <Banner
            titulo="Covid-19 Heroes"
            imagem={CovidHeroes}
            enderecoUrl="https://heroescovid19study.org/survey/"
          />
      },
      {
        banner:
          <Banner
            titulo="ID Saúde"
            imagem={IDSaude}
            pagina={estaLogado ? 'PERFIL' : 'LOGIN'}
          />
      },
      {
        banner:
          <Banner
            titulo="Cartilha de Saúde Mental"
            imagem={CartilhaSaudeMental}
            enderecoUrl="https://coronavirus.ceara.gov.br/cartilhas-sobre-saude-mental/"
          />
      }
    ];
  }

  return [
    {
      banner:
        <Banner
          titulo="Protocolo do primeiro atendimento ao paciente com síndrome coroniana aguda"
          imagem={ProtocoloSindromeCoronarianaAguda}
          enderecoUrl="https://coronavirus.ceara.gov.br/project/protocolo-da-sesa-orienta-atendimentos-a-pacientes-com-sindrome-coronariana-aguda/"
        />
    },
    {
      banner:
        <Banner
          titulo="Covid-19 Heroes"
          imagem={CovidHeroes}
          enderecoUrl="https://heroescovid19study.org/survey/"
        />
    },
    {
      banner:
        <Banner
          titulo="ID Saúde"
          imagem={IDSaude}
          pagina={estaLogado ? 'PERFIL' : 'LOGIN'}
        />
    },
    {
      banner:
        <Banner
          titulo="Cartilha de Saúde Mental"
          imagem={CartilhaSaudeMental}
          enderecoUrl="https://coronavirus.ceara.gov.br/cartilhas-sobre-saude-mental/"
        />
    },
    {
      banner: <BannerManejo />
    },
  ];
};

export default bannersDoCarrossel;
