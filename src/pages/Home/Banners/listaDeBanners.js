import React, { useContext } from 'react';
import Banner from '../../../components/Banner';
import IDSaude from '../../../assets/images/banners/IDSaude.png';
import VacinaCovid19 from '../../../assets/images/banners/vacinaCovid19.png';
import GuiaAssistenciaFarmaceutica from '../../../assets/images/banners/guiaAssistenciaFarmaceutica.jpg';
import { AutenticacaoContext } from '../../../context/AutenticacaoContext';
import { TESTIDS } from '../../../constantes/testIDs';
import { urls } from '../../../constantes/urls';
import { labelsAnalytics } from '../../../constantes/labelsAnalytics';
import estaAtiva from '../../../utils/estaAtiva';
import features from '../../../constantes/features';

const bannersDoCarrossel = () => {
  const { estaLogado } = useContext(AutenticacaoContext);
  const banners = [
    {
      banner:
        <Banner
          labelDoAnalytics={labelsAnalytics.HOME_BANNER_1}
          testID={TESTIDS.HOME_BANNER_1}
          titulo="Guia de Assistência Farmacêutica"
          imagem={GuiaAssistenciaFarmaceutica}
          enderecoUrl="https://coronavirus.ceara.gov.br/project/secretaria-de-saude-disponibiliza-guia-da-assistencia-farmaceutica-no-estado-do-ceara/"
        />
    },
    {
      banner:
        <Banner
          labelDoAnalytics={labelsAnalytics.HOME_BANNER_2}
          testID={TESTIDS.HOME_BANNER_2}
          titulo="ID Saúde"
          imagem={IDSaude}
          pagina={estaLogado ? 'PERFIL' : 'LOGIN'}
        />
    }
  ];

  if (estaAtiva(features.VACINACOVID19)) {
    banners.unshift({
      banner:
        <Banner
          labelDoAnalytics={labelsAnalytics.HOME_BANNER_0}
          testID={TESTIDS.HOME_BANNER_0}
          titulo="Vacinação"
          imagem={VacinaCovid19}
          enderecoUrl={urls.VACINA_COVID19}
        />
    });
  }

  return banners;
};

export default bannersDoCarrossel;
