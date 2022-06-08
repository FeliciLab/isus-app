import {
  getListOgertas,
  getSaguUserInfo,
  getUserPresencas,
  marcarPresenca,
  updateSaguUserInfo,
} from '~/services/frequencias';
import request from '~/services/request';

jest.mock('../../src/services/request');

const userIdMock = 'userIdMock';

const ofertaIdMock = 'ofertaIdMock';

const presencaMock = {};

const saguUserInfoMock = {};

describe('frequencias', () => {
  it('getListOgertas', async () => {
    getListOgertas();

    expect(request.get).toHaveBeenCalledWith('/sagu/ofertas');
  });

  it('getSaguUserInfo', async () => {
    getSaguUserInfo(userIdMock);

    expect(request.get).toHaveBeenCalledWith(`/sagu/userInfo/${userIdMock}`);
  });

  it('getUserPresencas', async () => {
    getUserPresencas(userIdMock, ofertaIdMock);

    expect(request.get).toHaveBeenCalledWith(
      `/sagu/presencas/${userIdMock}/${ofertaIdMock}`,
    );
  });

  it('marcarPresenca', async () => {
    marcarPresenca(userIdMock, ofertaIdMock, presencaMock);

    expect(request.post).toHaveBeenCalledWith(
      `/sagu/presencas/${userIdMock}/${ofertaIdMock}`,
      presencaMock,
    );
  });

  it('updateSaguUserInfo', async () => {
    updateSaguUserInfo(userIdMock, saguUserInfoMock);

    expect(request.put).toHaveBeenCalledWith(
      `/sagu/userInfo/${userIdMock}`,
      saguUserInfoMock,
    );
  });
});
