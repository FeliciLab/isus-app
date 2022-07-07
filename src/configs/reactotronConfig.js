import Reactotron, { asyncStorage } from 'reactotron-react-native';

// TODO: melhor colocar esse aquivo em uma pasta chamada configs
const reactotron = Reactotron.configure({ name: 'React Native iSUS' })
  .useReactNative()
  .use(asyncStorage())
  .connect();

console.tron = Reactotron;

Reactotron.clear();

console.log('Reactotron Configured');

export default reactotron;
