import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useState } from 'react';

function useAsyncStorageState(key, initialValue) {
  const { getItem, setItem, removeItem } = useAsyncStorage(key);

  const [storedValue, setStoredValue] = useState(async () => {
    try {
      await getStoredItem(key, initialValue);
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  async function getStoredItem(key, initialValue) {
    try {
      const item = await getItem();
      const value = item ? JSON.parse(item) : initialValue;
      setStoredValue(value);
    } catch (error) {
      console.log(error);
    }
  }

  const setValue = async value => {
    try {
      if (!value) {
        setStoredValue(value);
        removeItem();
      } else {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        await setItem(JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

export default useAsyncStorageState;
