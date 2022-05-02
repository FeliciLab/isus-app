import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import {
  atualizarUsuarioApi,
  verificarCPFCadastrado,
} from '~/apis/apiCadastro';
import Alerta from '~/components/alerta';
import BarraDeStatus from '~/components/barraDeStatus';
import { BotaoLaranja } from '~/components/Botoes/BotoesCirculares';
import ControlledSelectModal from '~/components/ControlledSelectModal';
import ControlledTextInput from '~/components/ControlledTextInput/index';
import ControlledTextInputMask from '~/components/ControlledTextInputMask/index';
import { cabecalhoVoltarRota } from '~/components/layoutEffect/cabecalhoLayout';
import ValidationFieldIndicator from '~/components/ValidationFieldIndicator/index';
import { CORES, INPUT_THEMES } from '~/constantes/estiloBase';
import { labelsAnalytics } from '~/constantes/labelsAnalytics';
import ROTAS from '~/constantes/rotas';
import { PERFIL } from '~/constantes/textos';
import useAnalytics from '~/hooks/useAnalytics';
import useAutenticacao from '~/hooks/useAutenticacao';
import { useMunicipios } from '~/hooks/useMunicipios';
import schema from './schema';
import {
  Container,
  ContainerBody,
  ContainerForm,
  ConteudoFormulario,
  RowButton,
  RowInput,
  Scroll,
  Title,
  TituloPrincipal,
} from './styles';

function EdicaoInfoPessoal() {
  const [exibicaoDoAlerta, setExibicaoDoAlerta] = useState(false);

  const [mensagemDoAlerta, setMensagemDoAlerta] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const { analyticsData } = useAnalytics();

  const { municipios, fetchMunicipios } = useMunicipios();

  const { user, updateUser } = useAutenticacao();

  const {
    clearErrors,
    control,
    formState: { errors },
    handleSubmit,
    setError,
    setValue,
  } = useForm({
    // OBS: Modos de validação onChange causam re-render ao mudar valores.
    mode: 'all', // all = Validation will trigger on the blur and change events
    reValidateMode: 'onSubmit', // onSubmit = 'onChange'
    defaultValues: {
      nomeCompleto: '',
      email: '',
      telefone: '',
      cpf: '',
      municipioSelectedId: '',
    },
    resolver: yupResolver(schema),
  });

  const [isValidatingCpfCadastrado, setIsValidatingCpfCadastrado] = useState(
    false,
  );

  const theme = INPUT_THEMES.LARANJA;

  useLayoutEffect(() => {
    cabecalhoVoltarRota({
      navegador: navigation,
      titulo: PERFIL.EDICAO_INFO_PESSOAIS.CABECALHO,
      cor: 'brancoPreto',
      rota: ROTAS.PERFIL,
    });
  }, []);

  const mostrarAlerta = mensagem => {
    setExibicaoDoAlerta(true);
    setMensagemDoAlerta(mensagem);
  };

  const cpfAlreadyRegistered = useCallback(async cpf => {
    try {
      if (cpf && cpf.length >= 11) {
        setIsValidatingCpfCadastrado(true);

        const { data } = await verificarCPFCadastrado(cpf);

        if (data?.cpf_existe) {
          setError('cpf', { type: 'custom', message: 'CPF já cadastrado.' });
          return true;
        }
      }
    } catch (err) {
      mostrarAlerta('Erro ao validar CPF.');
      console.log(err);
    } finally {
      setIsValidatingCpfCadastrado(false);
    }
    return false;
  }, []);

  const hasErrors =
    errors?.nomeCompleto?.message ||
    errors?.email?.message ||
    errors?.telefone?.message ||
    errors?.cpf?.message ||
    errors?.municipioSelectedId?.message;

  async function submitForm(data) {
    try {
      setIsLoading(true);

      // cpf do form é validado somente se for diferente do cpf já cadastrado
      if (
        data.cpf.replace(/\D+/g, '') !== user.cpf &&
        (await cpfAlreadyRegistered(data.cpf.replace(/\D+/g, '')))
      ) {
        return;
      } else {
        clearErrors('cpf');
      }

      const formSelectedMunicipio = municipios.find(
        m => m.id === parseInt(data.municipioSelectedId),
      );

      // .replace() p/ remoção de - e () do cpf e telefone
      const infoPessoal = {
        nomeCompleto: data.nomeCompleto.trim(),
        telefone: data.telefone.replace(/\D+/g, ''),
        cpf: data.cpf.replace(/\D+/g, ''),
        cidade: formSelectedMunicipio.nome,
        cidadeId: formSelectedMunicipio.id,
      };

      const result = await atualizarUsuarioApi({
        ...user,
        ...infoPessoal,
        termos: true,
      });

      // Sync p/ atualização em user@AutenticacaoContext & AsyncStorage
      await updateUser();

      if (result) {
        analyticsData(
          labelsAnalytics.EDITAR_INFORMACOES_PESSOAL,
          'Click',
          'atualizar informacao pessoal',
        );
        navigation.navigate('TelaDeSucesso', {
          textoApresentacao: PERFIL.EDICAO_INFO_PESSOAIS.MSG_SUCESSO,
          telaDeRedirecionamento: ROTAS.PERFIL,
          telaDeBackground: CORES.VERDE,
        });
      }
    } catch (err) {
      console.log(err);
      mostrarAlerta(
        'Encontramos erros no formulário. Verifique antes de prosseguir',
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMunicipios();
    setValue('nomeCompleto', user.name.trim());
    setValue('email', user.email);
    setValue('telefone', user.telefone.toString());
    setValue('cpf', user.cpf.toString());
    setValue('municipioSelectedId', user.municipio?.id.toString());
  }, []);

  return (
    <Container>
      <BarraDeStatus backgroundColor={CORES.BRANCO} barStyle="dark-content" />
      <Scroll>
        <ConteudoFormulario>
          <TituloPrincipal testID="texto">
            Edite as informações pessoais que você deseja atualizar:
          </TituloPrincipal>
        </ConteudoFormulario>
        <ContainerBody>
          <ContainerForm>
            <Title>Informações pessoais</Title>
            <RowInput>
              <ControlledTextInput
                control={control}
                label="Nome Completo"
                mode="outlined"
                name="nomeCompleto"
                placeholder="Nome Completo"
                theme={theme}
              />
            </RowInput>
            <RowInput>
              <ControlledTextInput
                control={control}
                disabled
                keyboardType="email-address"
                label="E-mail"
                mode="outlined"
                name="email"
                placeholder="email@email.com"
                theme={theme}
              />
            </RowInput>
            <RowInput>
              <ControlledTextInputMask
                control={control}
                keyboardType="phone-pad"
                label="Telefone"
                mask="([00]) [00000]-[0000]"
                mode="outlined"
                name="telefone"
                placeholder="(99) 99999-9999"
                theme={theme}
              />
            </RowInput>
            <RowInput>
              <ControlledTextInputMask
                control={control}
                keyboardType="numeric"
                label="CPF"
                mask="[000].[000].[000]-[00]"
                mode="outlined"
                name="cpf"
                placeholder="000.000.000-00"
                theme={theme}
              />
              {isValidatingCpfCadastrado && (
                <ValidationFieldIndicator message="Validando CPF" />
              )}
            </RowInput>
            <RowInput>
              <ControlledSelectModal
                control={control}
                items={municipios.map(item => ({
                  value: String(item.id),
                  label: String(item.nome),
                }))}
                mode="outlined"
                name="municipioSelectedId"
                placeholder="Selecione o município de residência"
                title="Município de residência"
              />
            </RowInput>
          </ContainerForm>
          <RowButton>
            <BotaoLaranja
              disabled={hasErrors || isLoading}
              loading={isLoading}
              onPress={handleSubmit(submitForm)}>
              Salvar
            </BotaoLaranja>
          </RowButton>
        </ContainerBody>
        <Alerta
          visivel={exibicaoDoAlerta}
          textoDoAlerta={mensagemDoAlerta}
          duration={4000}
          onDismiss={() => setExibicaoDoAlerta(false)}
        />
      </Scroll>
    </Container>
  );
}

export default EdicaoInfoPessoal;
