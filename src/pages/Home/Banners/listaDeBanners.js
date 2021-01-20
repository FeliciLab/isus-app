import React, { useContext } from 'react';
import Banner from '../../../components/Banner';
import CovidHeroes from '../../../assets/images/banners/covidHeroes.png';
import IDSaude from '../../../assets/images/banners/IDSaude.png';
import GuiaAssistenciaFarmaceutica from '../../../assets/images/banners/guiaAssistenciaFarmaceutica.jpg';
import { AutenticacaoContext } from '../../../context/AutenticacaoContext';

const bannersDoCarrossel = () => {
  const { estaLogado } = useContext(AutenticacaoContext);
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
};

export default bannersDoCarrossel;
