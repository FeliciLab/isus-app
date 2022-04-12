import AsyncStorage from '@react-native-community/async-storage';

describe('Testes do AsyncStorage', () => {
  beforeEach(() => {
    AsyncStorage.clear();
  });

  it('Conseguir escrever e ler um item do AsyncStorage', async () => {
    await AsyncStorage.setItem('username', 'testUser');

    const usernameValue = await AsyncStorage.getItem('username');

    expect(usernameValue).toBe('testUser');
  });
});
