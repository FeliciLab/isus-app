import AsyncStorage from '@react-native-async-storage/async-storage';
import { renderHook, act } from '@testing-library/react-hooks';
import InAppReview from 'react-native-in-app-review';
import useAppReview from '~/hooks/useAppReview';
import moment from 'moment';

describe('App Review Hook', () => {
  afterAll(() => {
    jest.resetModule();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Não deve ativar InAppReview na primeira vez', async () => {
    const expectItemSavedToAsyncStorage = [
      '@isus:app-review',
      moment().format()
    ];

    const { result } = renderHook(() => useAppReview());

    await act(() => result.current.onAppReview());

    expect(AsyncStorage.getItem).toBeCalledWith('@isus:app-review');
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      ...expectItemSavedToAsyncStorage,
    );

    expect(InAppReview.RequestInAppReview).not.toHaveBeenCalled();
  });

  it('Não deve ativar o InAppReview antes de 15 dias após o primeiro login ou última solicitação de review com InAppReview', async () => {
    const expectedItem = moment().subtract(10, 'days').format();

    jest
      .spyOn(AsyncStorage, 'getItem')
      .mockReturnValueOnce(Promise.resolve(expectedItem));

    const { result } = renderHook(() => useAppReview());

    await act(() => result.current.onAppReview());
    expect(AsyncStorage.getItem).toBeCalledWith('@isus:app-review');

    expect(InAppReview.RequestInAppReview).not.toHaveBeenCalled();
  });

  it('Deve ativar InAppReview depois de 15 dias de última solicitação de Review e salvar a data no Async Storage', async () => {

    const expectedItem = moment().subtract(15, 'days').format();
    const expectItemSavedToAsync = ['@isus:app-review', moment().format()];

    jest
      .spyOn(AsyncStorage, 'getItem')
      .mockReturnValueOnce(Promise.resolve(expectedItem));

    jest.spyOn(AsyncStorage, 'setItem');

    const { result } = renderHook(() => useAppReview());

    await act(() => result.current.onAppReview());

    expect(AsyncStorage.getItem).toBeCalledWith('@isus:app-review');
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      ...expectItemSavedToAsync,
    );
    expect(InAppReview.RequestInAppReview).toHaveBeenCalled();
  });
});
