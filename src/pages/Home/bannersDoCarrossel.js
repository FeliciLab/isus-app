import React, { useContext } from 'react';
import Banner from '../../components/Banner';
import CovidHeroes from '../../assets/images/banners/covidHeroes.png';
import IDSaude from '../../assets/images/banners/IDSaude.png';
import CartilhaSaudeMental from '../../assets/images/banners/cartilhaSaudeMental.png';
import ProtocoloSindromeCoronarianaAguda from '../../assets/images/banners/protocoloSindromeAguda.png';
import GuiaAssistenciaFarmaceutica from '../../assets/images/banners/guiaAssistenciaFarmaceutica.jpg';
import { AutenticacaoContext } from '../../context/AutenticacaoContext';
import features from '../../constantes/features';
import estaAtiva from '../../utils/estaAtiva';

const bannersDoCarrossel = () => {
  const { estaLogado } = useContext(AutenticacaoContext);

  if (estaAtiva(features.LINHAS_DE_CUIDADO)) {
    if (estaAtiva(features.BANNER_ASSISTENCIA_FARMACEUTICA)) {
      return [
        {
          banner:
            <Banner
              titulo="Guia de Assistência Farmacêutica"
              imagem={GuiaAssistenciaFarmaceutica}
              enderecoUrl="https://coronavirus.ceara.gov.br/project/secretaria-de-saude-disponibiliza-guia-da-assistencia-farmaceutica-no-estado-do-ceara/"
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
        }
      ];
    }
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
    }
  ];
};

export default bannersDoCarrossel;
