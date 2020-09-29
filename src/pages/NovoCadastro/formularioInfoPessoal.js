import React, {
  useContext,
  useEffect,
  useLayoutEffect
} from 'react';
import {
  DefaultTheme
} from 'react-native-paper';

import { TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown-v2';
import TextInputMask from 'react-native-text-input-mask';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { emailValido, cpfValido, nomeValido } from '../../utils/validadores';
import FormContext from '../../context/FormContext';
import { getMunicipiosCeara } from '../../apis/apiCadastro';
import { salvarDados } from '../../services/armazenamento';
import {
  Titulo, Scroll,
  TituloDoFormulario, CampoDeTexto,
  TextoDeErro, Botao,
  ConteudoDropdown, IconeDropdown
} from './styles';
import BarraDeStatus from '../../components/barraDeStatus';
import featuresAtivas from '../../featureAtivas';

export default function FormularioInfoPessoal({ navigation }) {
  const dropdown = React.createRef();
  const [botaoAtivo, alteraBotaoAtivo] = React.useState(false);
  const [nomeCidades, alteraNomeCidades] = React.useState(() => []);
  const [cidades, pegaCidades] = React.useState([]);


  const theme = {
    ...DefaultTheme,
    colors: {
      primary: '#304FFE'
    }
  };

  const {
    register, setValue, trigger, errors
  } = useContext(
    FormContext
  );
  useEffect(() => {
    register('nomeCompleto', {
      required: true,
      validate: nomeCompleto => nomeValido(nomeCompleto)
        || 'O nome deve conter apenas letras.'
    });
    register('email', {
      required: true,
      validate: email => emailValido(email) || 'O email deve ser no formato exemplo@exemplo.com'
    });
    register('telefone', {
      required: true,
      minLength: {
        value: 11,
        message: 'O seu telefone deve ter pelo menos 11 números.'
      },
      maxLength: 14
    });
    if (featuresAtivas.includes('312')) {
      register('cpf', {
        required: true,
        minLength: {
          value: 11,
          message: 'O seu CPF deve ter pelo menos 11 números.'
        },
        validate: cpf => cpfValido(cpf) || 'CPF Inválido',
        maxLength: 14
      });
    } else {
      register('cpf', {
        required: true,
        minLength: {
          value: 11,
          message: 'O seu CPF deve ter pelo menos 11 números.'
        },
        maxLength: 14
      });
    }
    register('cidade', {
      required: true
    });
  }, [register]);

  const pegarId = (municipio) => {
    let teste = null;
    cidades.forEach((element) => {
      if (element.nome === municipio) {
        teste = element.id;
      }
    });
    return teste;
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="arrow-left" size={28} color="#304FFE" />
        </TouchableOpacity>
      )
    });
  });


  const alteraValor = async (campo, valor) => {
    setValue(campo, valor);
    await trigger();
    alteraBotaoAtivo(Object.entries(errors).length === 0);
  };

  useEffect(() => {
    async function pegarCidades() {
      const response = await getMunicipiosCeara();
      alteraNomeCidades(response.data.map(item => item.nome));
      pegaCidades(response.data.map(item => item));
    }
    pegarCidades();
  }, []);

  useEffect(() => {
    async function guardarCidades() {
      await salvarDados('municipios', nomeCidades);
      await salvarDados('objeto', cidades);
    }
    guardarCidades();
  }, [nomeCidades]);

  return (
    <>
      <Scroll>
        <BarraDeStatus barStyle="dark-content" backgroundColor="#FFF" />
        <Titulo>Vamos realizar seu cadastro, precisamos apenas de algumas informações:</Titulo>
        <TituloDoFormulario>Informações Pessoais: </TituloDoFormulario>
        <CampoDeTexto
          label="Nome Completo"
          name="nomeCompleto"
          underlineColor="#BDBDBD"
          onChangeText={text => alteraValor('nomeCompleto', text)}
          mode="outlined"
          theme={theme}
        />
        {errors.nomeCompleto && (
          <TextoDeErro>
            {' '}
            {errors.nomeCompleto.message}
            {' '}
          </TextoDeErro>
        )}
        <CampoDeTexto
          label="E-mail"
          name="email"
          keyboardType="email-address"
          onChangeText={text => alteraValor('email', text)}
          mode="outlined"
          theme={theme}
        />
        {errors.email && (
          <TextoDeErro>
            {' '}
            {errors.email.message}
            {' '}
          </TextoDeErro>
        )}
        <CampoDeTexto
          label="Telefone"
          name="telefone"
          keyboardType="number-pad"
          onChangeText={text => text}
          mode="outlined"
          theme={theme}
          maxLength={15}
          render={props => (
            <TextInputMask
              {...props}
              onChangeText={(formatted, extracted) => {
                props.onChangeText(formatted);
                alteraValor('telefone', extracted);
              }}
              mask="([00]) [00000]-[0000]"
            />
          )}
        />
        {errors.telefone && (
          <TextoDeErro>
            {' '}
            {errors.telefone.message}
            {' '}
          </TextoDeErro>
        )}
        <CampoDeTexto
          label="CPF"
          name="cpf"
          keyboardType="number-pad"
          onChangeText={text => text}
          mode="outlined"
          theme={theme}
          maxLength={14}
          render={props => (
            <TextInputMask
              {...props}
              onChangeText={(formatted, extracted) => {
                props.onChangeText(formatted);
                alteraValor('cpf', extracted);
              }}
              mask="[000].[000].[000]-[00]"
            />
          )}
        />
        {errors.cpf && (
          <TextoDeErro>
            {' '}
            {errors.cpf.message}
            {' '}
          </TextoDeErro>
        )}
        <ConteudoDropdown>
          <Dropdown
            ref={dropdown}
            label="Município de Residência"
            data={nomeCidades}
            labelExtractor={cidade => cidade}
            valueExtractor={cidade => cidade}
            onChangeText={(cidade) => {
              alteraValor('cidade', { id: pegarId(cidade), nome: cidade });
            }}
          />
          <IconeDropdown
            name="arrow-drop-down"
            onPress={() => dropdown.current.focus()}
          />
        </ConteudoDropdown>
        <Botao
          disabled={!botaoAtivo}
          label="Próximo"
          labelStyle={{ color: '#fff' }}
          mode="contained"
          onPress={() => navigation.navigate('FormularioInfoProfissional')}
        >
          Próximo
        </Botao>
      </Scroll>
    </>
  );
}
