import React, { useContext, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { ScrollView } from 'react-native-gesture-handler';
import {
  ContainerBody,
  ContainerForm,
  RowButton,
  RowInput,
  Title
} from './styles';
import { BotaoLaranja } from '../Botoes/BotoesCirculares';
import InputCategoria from './InputCategoria';
import InputEspecialidades from './InputEspecialidades';
import InputSetores from './InputSetores';
import FormContext from '../../context/FormContext';
import { AutenticacaoContext } from '../../context/AutenticacaoContext';
import { infoProfissional } from '../../models/pessoa';

const FormProfissional = ({
  actionPress,
  labelButton,
  hiddenActionButton
}) => {
  const { control, setValues } = useContext(FormContext);
  const { dadosUsuario } = useContext(AutenticacaoContext);

  useEffect(() => {
    setValues({ ...infoProfissional(dadosUsuario) });
  }, [dadosUsuario]);

  return (
    <>
      <ContainerBody>
        <ScrollView>
          <ContainerForm>
            <Title>Cadastro Profissional</Title>
            <RowInput>
              <InputCategoria />
            </RowInput>
            <RowInput>
              <Controller
                control={control}
                name="_hidden.categoriaProfissional"
                defaultValue=""
                render={({ value }) => (
                  <>
                    <InputEspecialidades categoria={value} />
                  </>
                )}
              />
            </RowInput>
            <RowInput>
              <InputSetores />
            </RowInput>
          </ContainerForm>
        </ScrollView>
        <RowButton>
          {!hiddenActionButton && (
            <BotaoLaranja onPress={actionPress}>
              {labelButton || 'Continuar'}
            </BotaoLaranja>
          )}
        </RowButton>
      </ContainerBody>
    </>
  );
};

export default FormProfissional;
