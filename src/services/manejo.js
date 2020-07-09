import manejoJson from './manejo.json';
import { salvarDados, pegarDados } from './armazenamento';

/**
 * Pega a versão do Manejo no Storage
 * @returns {object} manejo
 */
const pegarVersaoDoManejo = async () => {
  try {
    return await pegarDados('manejo');
  } catch (err) {
    console.log(err);
    throw err;
  }
};

/**
 * Adiciona nova versão do manejo caso necessário
 * @param {{}} manejoStorage
 * @return void
 */
const adicionarVersaoDoManejo = async (manejoStorage) => {
  try {
    if (!manejoStorage || manejoStorage.versao < manejoJson.versao) {
      await salvarDados('manejo', manejoJson);
    }
  } catch (err) {
    console.log(err);
  }
};

/**
 * gerencia a versão do manejo
 * @return void
 */
const gerenciarVersaoDoManejo = async () => {
  try {
    const manejoStorage = await pegarVersaoDoManejo();
    console.log(manejoStorage, manejoJson);
    await adicionarVersaoDoManejo(manejoStorage);
  } catch (err) {
    console.log(err);
  }
};


export default gerenciarVersaoDoManejo;
