import { Share } from 'react-native';
import aoCompartilhar from '~/components/ConteudoDrawer/aoCompartilhar';

describe('aoCompartilhar', () => {
  it('Deve chamar Share.share() ao compartilhar', async () => {
    const spy = jest.spyOn(Share, 'share');

    await aoCompartilhar();

    expect(spy).toHaveBeenCalled();
  });
});
