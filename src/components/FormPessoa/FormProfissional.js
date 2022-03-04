import React, { useContext, useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { ScrollView } from 'react-native-gesture-handler';
import FormContext from '~/context/FormContext';
import useAutenticacao from '~/hooks/useAutenticacao';
import PessoaModel from '~/models/pessoa';
import { BotaoLaranja } from '../Botoes/BotoesCirculares';
import InputCategoria from './InputCategoria';
import InputEspecialidades from './InputEspecialidades';
import InputUnidadeServico from './InputUnidadeServico';
import { ContainerBody, ContainerForm, RowButton, RowInput } from './styles';

const FormProfissional = ({ actionPress, labelButton, hiddenActionButton }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [infoProfissional, setInfoProfissional] = useState('{}');

  const { control, setValue } = useContext(FormContext);

  const { pessoa } = useAutenticacao();

  useEffect(() => {
    const infoProf = { ...PessoaModel.mapInfoProfissional(pessoa, true) };
    setInfoProfissional({ ...infoProf });
    setValue('_hidden.categoriaProfissional', infoProf.categoriaProfissional);
  }, []);

  return (
    <ContainerBody>
      <ScrollView>
        <ContainerForm>
          <RowInput>
            <InputCategoria
              defaultValue={infoProfissional.categoriaProfissional}
            />
          </RowInput>
          <RowInput>
            <Controller
              control={control}
              name="_hidden.categoriaProfissional"
              defaultValue=""
              render={({ value }) => (
                <InputEspecialidades
                  categoria={value}
                  defaultValue={infoProfissional.especialidades}
                />
              )}
            />
          </RowInput>
          <RowInput>
            <InputUnidadeServico
              defaultValue={infoProfissional.unidadeServico}
            />
          </RowInput>
        </ContainerForm>
        {!hiddenActionButton && (
          <RowButton>
            <BotaoLaranja
              loading={isLoading}
              disabled={isLoading}
              onPress={async () => {
                setIsLoading(true);
                try {
                  await actionPress();
                } finally {
                  setIsLoading(false);
                }
              }}>
              {labelButton || 'Continuar'}
            </BotaoLaranja>
          </RowButton>
        )}
      </ScrollView>
    </ContainerBody>
  );
};

export default FormProfissional;
