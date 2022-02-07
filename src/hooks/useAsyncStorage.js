import AsyncStorage from '@react-native-community/async-storage';
import { useState } from 'react';

function useAsyncStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(async () => {
    await getStoredItem(key, initialValue);
  });

  async function getStoredItem(key, initialValue) {
    try {
      const item = await AsyncStorage.getItem(key);
      const value = item ? JSON.parse(item) : initialValue;
      setStoredValue(value);
    } catch (error) {
      console.log(error);
    }
  }

  const setValue = async value => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      await AsyncStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

export default useAsyncStorage;
