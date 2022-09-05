import { labelsAnalytics } from '~/constantes/labelsAnalytics';
import { TESTIDS } from '~/constantes/testIDs';
import { urls } from '~/constantes/urls';

const { MONKEYPOX: LABEL_MONKEYPOX } = labelsAnalytics;
const { MONKEYPOX: TESTID_MONKEYPOX } = TESTIDS;

export const linkList = [
  {
    title: 'Documentos Oficiais',
    testId: TESTID_MONKEYPOX.DOCUMENTOS_OFICIAIS,
    analyticsId: LABEL_MONKEYPOX.DOCUMENTOS_OFICIAIS,
    url: urls.SITE_SESA_DOWNLOAD_MONKEYPOX,
  },
  {
    title: 'Manejo Clinico e Prevencao de Controle de infecção para Monkeypox',
    testId: TESTID_MONKEYPOX.MANEJO_CLINICO,
    analyticsId: LABEL_MONKEYPOX.MANEJO_CLINICO,
    url: urls.MANEJO_CLINICO_MONKEYPOX,
  },
];
