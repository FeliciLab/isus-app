import React, { createContext } from 'react';
import { useForm } from 'react-hook-form';

const FormContext = createContext({});

export const FormProvider = ({ initValues, children }) => {
  const {
    control,
    errors,
    handleSubmit,
    setValue,
    getValues
  } = useForm({
    defaultValues: initValues || {},
    mode: 'onBlur',
    reValidateMode: 'onChange'
  });

  const setValues = obj => Object.keys(obj).forEach(key => setValue(key, obj[key]));

  return (
    <FormContext.Provider
      value={{
        control,
        errors,
        handleSubmit,
        setValue,
        setValues,
        getValues
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

FormProvider.defaultProps = {
  initValues: {},
};


export default FormContext;
