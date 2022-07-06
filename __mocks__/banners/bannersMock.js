const banners = [
  {
    id: 6,
    titulo: 'Regulação de Pacientes',
    imagem:
      'https://coronavirus.ceara.gov.br/wp-content/uploads/2022/01/BANNER-ISUS.png',
    valor:
      'https://coronavirus.ceara.gov.br/project/nota-informativa-orienta-sobre-os-procedimentos-de-regulacao-de-pacientes-com-sindrome-gripal-sindrome-respiratoria-aguda-grave/',
    tipo: 'webview',
    ordem: 1,
    ativo: true,
    options: {
      localImagem: 'web',
      labelAnalytics: 'banner_regulacao_pacientes',
    },
  },
  {
    id: 13,
    titulo: 'Nota Técnica ESP/SESA',
    imagem:
      'https://coronavirus.ceara.gov.br/wp-content/uploads/2022/01/unnamed-1.png',
    valor:
      'https://coronavirus.ceara.gov.br/project/nt-esp-sesa-01-2021-orientacoes-sore-uso-de-oseltamivir-para-tratamento-de-influenza/',
    tipo: 'webview',
    ordem: 2,
    ativo: true,
    options: {
      localImagem: 'web',
      labelAnalytics: 'notaTecnica_esp_sesa',
    },
  },
  {
    id: 16,
    titulo: 'Guia de Diversidade',
    imagem:
      'https://coronavirus.ceara.gov.br/wp-content/uploads/2022/05/Manual-de-Diversidade.png',
    valor:
      'https://coronavirus.ceara.gov.br/project/guia-de-diversidade-igualdade-no-servico-publico-de-saude-do-ceara/',
    tipo: 'webview',
    ordem: 3,
    ativo: true,
    options: {
      localImagem: 'web',
      labelAnalytics: 'banner_guia_diversidade',
    },
  },
  {
    id: 17,
    titulo: 'Oficina de Design',
    imagem: 'images/banners/oficinaDesign.png',
    valor: 'OFICINA_DESIGN',
    tipo: 'rota',
    ordem: 4,
    ativo: true,
    options: {
      localImagem: 'app',
      labelAnalytics: 'OFICINA_DESIGN',
    },
  },
];

export default banners;
