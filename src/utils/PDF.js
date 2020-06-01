import RNFetchBlob from 'rn-fetch-blob';
import { PermissionsAndroid, Platform } from 'react-native';

const permissionToStorage = async (originUrl, destPath) => {
  const { PERMISSIONS, RESULTS } = PermissionsAndroid;
  try {
    const granted = await PermissionsAndroid.request(PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
      title: 'Precisamos de Acesso ao seu armazenamento',
      message:
          'Precisamos de Acesso ao seu armazenamento para salvar arquivos importantes',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    });
    if (granted === RESULTS.GRANTED) {
      savePdf(originUrl, destPath);
    } else {
      console.log('Permission Denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

const savePdf = (originUrl, destPath) => {
  const filePath = RNFetchBlob.fs.dirs.DocumentDir;

  RNFetchBlob
    .config({
      fileCache: true,
      path: `${filePath}/${destPath}`,
    })
    .fetch('GET', originUrl)
    .then((response) => {
      console.log('Success Log: ', response);
      if (Platform.OS === 'ios') {
        RNFetchBlob.ios.openDocument(response.data);
      } else {
        RNFetchBlob.android.actionViewIntent(response.data, 'application/pdf');
      }
    })
    .catch((errors) => {
      console.log(' Error Log: ', errors);
    });
};

export { permissionToStorage, savePdf };
