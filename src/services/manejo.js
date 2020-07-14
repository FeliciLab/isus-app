import manejoJson from '../pages/ClinicalManagement/json/versao_manejo.json';
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
const atualizarVersaoDoManejo = async (manejoStorage) => {
  try {
    if (!manejoStorage || manejoStorage.versao !== manejoJson.versao) {
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
    await atualizarVersaoDoManejo(manejoStorage);
  } catch (err) {
    console.log(err);
  }
};

const atualizarEstadoDaVersaoDoManejo = async (versaoManejo) => {
  await salvarDados('manejo', versaoManejo);
};


export { pegarVersaoDoManejo, gerenciarVersaoDoManejo, atualizarEstadoDaVersaoDoManejo };
