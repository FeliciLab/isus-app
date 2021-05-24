import React, { useContext } from 'react';
import { TextInput } from 'react-native-paper';
import { Controller } from 'react-hook-form';
import FormContext from '../../context/FormContext';

function formatarMascarar ({antigo, valor, mascara, padrao}) {
  if (antigo && antigo.length >= valor.length) {
    return valor
  }

  const caracterMascara = padrao === undefined ? '#' : padrao;
  const mascaras = mascara.split('');
  const valores = mascaras.reduce((acumulado, atual) => {
      if (atual === caracterMascara) return acumulado
      return acumulado.replace(atual, '')
  }, valor).split('');
  
  const resultado = valores.reduce((acumulado, atual) => {
      return acumulado.replace(caracterMascara, atual);
  }, mascara);

  if (resultado.indexOf(caracterMascara) < 0) return resultado.slice(0, mascara.length)

  return resultado.slice(0, resultado.indexOf(caracterMascara));
}

const FormTextInputMask = ({
  name, 
  label, 
  placeholder, 
  theme, 
  rules, 
  mask,
  padraoMascara,
  numero
}) => {
  const { control } = useContext(FormContext);
  const [antigo, definirAntigo] = React.useState('');
  
  const formatar = (valor) => formatarMascarar({
    antigo: antigo, 
    valor, 
    mascara: mask, 
    padrao: padraoMascara
  });

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue=""
      render={({ onChange, onBlur, value }) => {
        return (
          <TextInput
            keyboardType={numero ? 'number-pad': 'default'}
            mode="outlined"
            label={label}
            placeholder={placeholder || label}
            onChangeText={v => {
              const valor = formatar(v)
              onChange(valor)
              definirAntigo(valor)
            }}
            selectionColor={theme.colors.primary}
            onBlur={onBlur}
            value={formatar(value)}
            theme={theme}
          />
        )
      }}
    />
  );
};

FormTextInputMask.defaulProps = {
  padraoMascara: '#'
}

export default FormTextInputMask;
