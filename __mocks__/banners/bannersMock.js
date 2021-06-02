const banners = [
  {
    id: 1,
    titulo: 'Vacina\u00e7\u00e3o',
    imagem: 'images/banners/vacinaCovid19.png',
    valor: 'https://coronavirus.ceara.gov.br/vacina',
    tipo: 'webview',
    ordem: 1,
    ativo: true,
    options: { localImage: 'app', labelAnalytics: 'banner_vacina_covid19' }
  },
  {
    id: 2,
    titulo: 'Guia de Assist\u00eancia Farmac\u00eautica',
    imagem: 'images/banners/guiaAssistenciaFarmaceutica.jpg',
    valor:
      'https://coronavirus.ceara.gov.br/project/secretaria-de-saude-disponibiliza-guia-da-assistencia-farmaceutica-no-estado-do-ceara/',
    tipo: 'webview',
    ordem: 2,
    ativo: true,
    options: {
      localImage: 'app',
      labelAnalytics: 'guia_assistencia_farmaceutica'
    }
  },
  {
    id: 3,
    titulo: 'ID Sa\u00fade',
    imagem: 'images/banners/IDSaude.png',
    valor: 'PERFIL',
    tipo: 'rota',
    ordem: 3,
    ativo: true,
    options: { localImage: 'app', login: true, labelAnalytics: 'id_saude' }
  },
  {
    id: 4,
    titulo: 'ID Sa\u00fade',
    imagem: 'images/banners/IDSaude.png',
    valor: 'LOGIN',
    tipo: 'rota',
    ordem: 3,
    ativo: true,
    options: { localImage: 'app', login: false, labelAnalytics: 'id_saude' }
  }
];

export const bannersAutenticado = banners.filter(i => i.options.login !== false);
export const bannersNaoAutenticado = banners.filter(i => i.options.login !== true);
export const bannersRota = banners.filter(i => i.tipo === 'rota');

export default banners;
