import Reactotron, { asyncStorage } from 'reactotron-react-native';

const reactotron = Reactotron.configure({ name: 'React Native iSUS' })
  .useReactNative()
  .use(asyncStorage())
  .connect();

console.tron = Reactotron;

Reactotron.clear();

export default reactotron;
