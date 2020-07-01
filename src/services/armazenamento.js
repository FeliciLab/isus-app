import AsyncStorage from '@react-native-community/async-storage';

/**
 * Salva os dados no ASyncStorage
 * @param {String} chave Chave de acesso ao valor.
 * @param {{}} valor valor a ser armazenado.
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
 * Pega os dados no ASyncStorage
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


export { salvarDados, pegarDados };
