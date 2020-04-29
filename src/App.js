import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Routes from './routes';

export default function App() {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}
