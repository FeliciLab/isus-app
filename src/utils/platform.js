import { Platform } from 'react-native';
import packageJson from '../../package.json';

export function pegarSO() {
  return Platform.OS;
}

export function pegarVersao() {
  return packageJson.version;
}
