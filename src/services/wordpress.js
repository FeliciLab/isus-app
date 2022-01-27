import { Config } from 'react-native-config';

export default {
  urlPostagem: id =>
    `${Config.API_URL.replace(
      '/api/',
      '',
    )}/wordpress/postagem/${id}/renderizar`,
};
