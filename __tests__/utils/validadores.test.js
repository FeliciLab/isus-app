import { cpfValido } from '~/utils/validadores';

describe('validadores', () => {
  describe('cpfValido', () => {
    it('deve invalidar para cpf vazio', async () => {
      const response = cpfValido('');

      expect(response).not.toBeTruthy();
    });

    it('deve invalidar cpf com menos de 11 dígitos', async () => {
      const response = cpfValido('111');

      expect(response).not.toBeTruthy();
    });

    it('deve invalidar cpf com mais de 11 dígitos', async () => {
      const response = cpfValido('111.111.111-111');

      expect(response).not.toBeTruthy();
    });

    it('deve invalidar cpf com dígitos todos iguais', async () => {
      for (let n = 0; n < 10; n++) {
        const cpfMock = String(n).repeat(11); // gerar string NNNNNNNNNNN para 0 <= N <= 9

        const response = cpfValido(cpfMock);

        expect(response).not.toBeTruthy();
      }
    });

    it('deve validar cpf válido com caracteres especiais', async () => {
      const cpfMock = '088.505.320-67'; // cpf gerado por https://www.4devs.com.br/gerador_de_cpf

      const response = cpfValido(cpfMock);

      expect(response).toBeTruthy();
    });

    it('deve validar cpf válido sem caracteres especiais', async () => {
      const cpfMock = '08850532067'; // cpf gerado por https://www.4devs.com.br/gerador_de_cpf

      const response = cpfValido(cpfMock);

      expect(response).toBeTruthy();
    });
  });
});
