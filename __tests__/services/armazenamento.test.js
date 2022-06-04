import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  // converterImagemParaBase64,
  pegarChavesCom,
  pegarDados,
  pegarDadosDeChavesCom,
  pegarTodasAsChaves,
  removerDados,
  salvarDados,
} from '~/services/armazenamento';

// import RNFetchBlob from 'rn-fetch-blob';

jest.mock('rn-fetch-blob');


describe('armazenamento', () => {
  it('deve salvar os dados no AsyncStorage', async () => {
    const chaveMock = 'chaveMock';
    const valorMock = 'valorMock';

    await salvarDados(chaveMock, valorMock);

    expect(AsyncStorage.setItem).toHaveBeenCalled();
  });

  it('deve pegar os dados no AsyncStorage', async () => {
    const chaveMock = 'chaveMock';

    await pegarDados(chaveMock);

    expect(AsyncStorage.getItem).toHaveBeenCalled();
  });

  it('deve pegar os dados no AsyncStorage', async () => {
    await pegarTodasAsChaves();

    expect(AsyncStorage.getAllKeys).toHaveBeenCalled();
  });

  it('deve pegar todas as chaves que contenham uma parte de uma String', async () => {
    const parteDaChaveMock = 'parteDaChaveMock';

    await pegarChavesCom(parteDaChaveMock);

    expect(AsyncStorage.getAllKeys).toHaveBeenCalled();
  });

  it('deve pegar os dados de chaves que contenham uma parte de uma string', async () => {
    const parteDaChaveMock = 'parteDaChaveMock';

    await pegarDadosDeChavesCom(parteDaChaveMock);

    expect(AsyncStorage.getAllKeys).toHaveBeenCalled();
  });

  it('deve remove um dado do AsyncStorage', async () => {
    const chaveMock = 'chaveMock';

    await removerDados(chaveMock);

    expect(AsyncStorage.removeItem).toHaveBeenCalled();
  });

  // TODO: ainda não sei como testar isso
  // it('deve converter imagem para base64', async () => {
  //   const urlImagemMock = 'urlImagemMock';

  //   await converterImagemParaBase64(urlImagemMock);

  //   expect(encodeURI).toHaveBeenCalled();
  // });
});
