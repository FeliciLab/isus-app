import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

/**
 * Salva os dados no AsyncStorage
 * @param {String} chave Chave de acesso ao valor.
 * @param {{}} valor Valor a ser armazenado.
 */
const salvarDados = async (chave, valor) => {
  try {
    const valorJson = JSON.stringify(valor);
    await AsyncStorage.setItem(chave, valorJson);
  } catch (e) {
    console.log(e);
  }
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

const pegarImagem = async chave => AsyncStorage.getItem(chave);

const salvarImagemPorUrl = async (chave, urlImagem) => {
  try {
    const response = await converterImagemParaBase64(urlImagem);
    console.log('RESPONSE', response);
    const { imagemBase64 } = response;
    await AsyncStorage.setItem(chave, imagemBase64);
  } catch (err) {
    console.log('ERRO', err);
  }
};

const converterImagemParaBase64 = async (urlImagem) => {
  const { data } = await axios.post('http://192.168.15.14:7000/api/imagemBase64', { urlImagem }, {
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' }
  });
  return data;
};


const Armazenamento = {
  salvarDados,
  pegarDados,
  pegarTodasAsChaves,
  pegarChavesCom,
  pegarDadosDeChavesCom,
  removerDados,
  salvarImagemPorUrl,
  pegarImagem
};

export {
  salvarDados, pegarDados, pegarTodasAsChaves, pegarChavesCom,
  pegarDadosDeChavesCom, removerDados, salvarImagemPorUrl, pegarImagem
};

export default Armazenamento;
