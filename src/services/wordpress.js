import { Config } from 'react-native-config';

// TODO: esse arquivo não deveria estar aqui. Deveria ser um obj de axios.
export default {
  urlPostagem: id =>
    `${Config.API_URL.replace(
      '/api/',
      '',
    )}/wordpress/postagem/${id}/renderizar`,
};
