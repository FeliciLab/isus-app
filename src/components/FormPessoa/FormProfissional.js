import React, { useContext, useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { ScrollView } from 'react-native-gesture-handler';
import {
  ContainerBody,
  ContainerForm,
  RowButton,
  RowInput
} from './styles';
import { BotaoLaranja } from '../Botoes/BotoesCirculares';
import InputCategoria from './InputCategoria';
import InputEspecialidades from './InputEspecialidades';
import InputUnidadeServico from './InputUnidadeServico';
import FormContext from '../../context/FormContext';
import PessoaModel from '../../models/pessoa';
import { AutenticacaoContext } from '../../context/AutenticacaoContext';

const FormProfissional = ({
  actionPress,
  labelButton,
  hiddenActionButton
}) => {
  const [carregando, definirCarregando] = useState(false);
  const [infoProfissional, definirInfoProfissional] = useState('{}');
  const { control, setValue } = useContext(FormContext);
  const { pessoa } = useContext(AutenticacaoContext);

  useEffect(() => {
    const infoProf = { ...PessoaModel.mapInfoProfissional(pessoa, true) };
    definirInfoProfissional({ ...infoProf });
    setValue('_hidden.categoriaProfissional', infoProf.categoriaProfissional);
  }, []);

  return (
    <>
      <ContainerBody>
        <ScrollView>
          <ContainerForm>
            <RowInput>
              <InputCategoria defaultValue={infoProfissional.categoriaProfissional} />
            </RowInput>
            <RowInput>
              <Controller
                control={control}
                name="_hidden.categoriaProfissional"
                defaultValue=""
                render={({ value }) => (
                  <>
                    <InputEspecialidades
                      categoria={value}
                      defaultValue={infoProfissional.especialidades}
                    />
                  </>
                )}
              />
            </RowInput>
            <RowInput>
              <InputUnidadeServico
                defaultValue={infoProfissional.unidadeServico}
              />
            </RowInput>
          </ContainerForm>
          {
            !hiddenActionButton && (
              <RowButton>
                <BotaoLaranja
                  loading={carregando}
                  disabled={carregando}
                  onPress={async () => {
                    definirCarregando(true);
                    try {
                      await actionPress();
                    } finally {
                      definirCarregando(false);
                    }
                  }}
                >
                  {labelButton || 'Continuar'}
                </BotaoLaranja>
              </RowButton>
            )
          }
        </ScrollView>
      </ContainerBody>
    </>
  );
};

export default FormProfissional;
