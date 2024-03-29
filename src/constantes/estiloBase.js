import { DefaultTheme } from 'react-native-paper';

export const CORES = {
  BRANCO: '#FFFFFF',
  LARANJA: '#FF9800',
  VERDE: '#4CAF50',
  VERDE_AMARELO: '#4CAF40',
  VERMELHO: '#F2453D',
  ROXO: '#9C27B0',
  INDIGO: '#4054B2',
  INDIGO_DYE: '#004964',
  AZUL: '#304FFE',
  AZUL_RESIDENCIAS: '#2FAFE5',
  AZUL_OFICINA: '#59AAB8',
  AZUL_OFICINA_DARK: '#0091AC',
  AZUL_ESCURO_ROYAL: '#00003C',
  AMARELO: '#FFEB3B',
  CINZA: '#BDBDBD',
  CINZA_WEB: '#828282',
  CINZA_DESABILITADO: '#DFDFDF',
  CINZA_ESCURO: '#808080',
  CINZA_CLARO: '#F5F5F5',
  CINZA_INPUT: '#CCC',
  CINZA_INPUT_DARK: '#999',
  PRETO: '#000000',
  PRETO_INATIVO: '#191919',
  PRETO30: '#1e1e1e',
  PRETO60: '#00003C',
  PRETO_MISTERIOSO: '#1e1e1e',
  PRETO54: 'rgba(0, 0, 0, 0.54)',
  PRETO87: 'rgba(0,0,0, 0.87)',
  QUALIQUIZ: '#4E377C',
  QUALIQUIZ_LIGTH: '#8E6ADB',
};

export const INPUT_THEMES = {
  AZUL: {
    ...DefaultTheme,
    colors: {
      primary: '#fff',
      accent: '#fff',
      text: '#fff',
      background: CORES.AZUL,
      placeholder: '#fff',
    },
  },
  LARANJA: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: CORES.LARANJA,
      accent: CORES.LARANJA,
      underlineColor: 'transparent',
      background: CORES.BRANCO,
      placeholder: CORES.CINZA,
    },
  },
};

export default {
  CORES,
  INPUT_THEMES,
};
