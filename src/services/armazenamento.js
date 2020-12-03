import AsyncStorage from '@react-native-community/async-storage';
import RNFetchBlob from 'rn-fetch-blob';

/**
 * Salva os dados no AsyncStorage
 * @param {String} chave Chave de acesso ao valor.
 * @param {{}} valor Valor a ser armazenado.
 */
const salvarDados = async (chave, valor) => {
  const valorJson = JSON.stringify(valor);
  const responseStorage = await AsyncStorage.setItem(chave, valorJson);
  return responseStorage;
};

/**
 * Pega os dados no AsyncStorage
 * @param {String} chave Chave de acesso ao valor.
 */
const pegarDados = async (chave) => {
  try {
    const valorJson = await AsyncStorage.getItem(chave);
    return valorJson != null ? JSON.parse(valorJson) : null;
  } catch (e) {
    console.log(e);
  }
  return null;
};

/**
 * Pega todas as chaves de dados no AsyncStorage
 */
const pegarTodasAsChaves = async () => {
  try {
    const chaves = await AsyncStorage.getAllKeys();
    return chaves;
  } catch (e) {
    console.log(e);
  }
  return null;
};

/**
 * Pega todas as chaves que contenham uma parte de uma String
 * @param {String} parteDaChave Parte do nome de alguma chave
 */
const pegarChavesCom = async (parteDaChave) => {
  try {
    const chaves = await pegarTodasAsChaves();
    const chavesEncontradas = chaves.filter(chave => chave.includes(parteDaChave));
    return chavesEncontradas;
  } catch (e) {
    console.log(e);
  }
  return null;
};

/**
 * Pega os dados de chaves que contenham uma parte de uma string
 * @param {String} parteDaChave Parte do nome de alguma chave
 */
const pegarDadosDeChavesCom = async (parteDaChave) => {
  try {
    const chavesEncontradas = await pegarChavesCom(parteDaChave);
    const dadosEncontrados = chavesEncontradas.map(chave => pegarDados(chave));
    return Promise.all(dadosEncontrados);
  } catch (e) {
    console.log(e);
  }
  return null;
};

/**
 * Remove um dado do AsyncStorage
 * @param {String} chave Chave de acesso ao valor
 */
const removerDados = async (chave) => {
  try {
    await AsyncStorage.removeItem(chave);
  } catch (e) {
    console.log(e);
  }
};

const converterImagemParaBase64 = async (urlImagem) => {
  const response = await RNFetchBlob.config({ fileCache: true }).fetch('GET', encodeURI(urlImagem));
  const file = await response.readFile('base64');
  return file;
};


const Armazenamento = {
  salvarDados,
  pegarDados,
  pegarTodasAsChaves,
  pegarChavesCom,
  pegarDadosDeChavesCom,
  removerDados,
  converterImagemParaBase64
};

export {
  salvarDados, pegarDados, pegarTodasAsChaves, pegarChavesCom,
  pegarDadosDeChavesCom, removerDados, converterImagemParaBase64
};

export default Armazenamento;
