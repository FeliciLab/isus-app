import React, { createContext } from 'react';
import { useForm } from 'react-hook-form';

const FormContext = createContext({});

export const FormProvider = ({ initValues, children }) => {
  const {
    register,
    trigger,
    handleSubmit,
    setValue,
    getValues,
    control,
    unregister,
    formState: { errors },
  } = useForm({
    defaultValues: initValues,
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const setValues = obj =>
    Object.keys(obj).forEach(key => setValue(key, obj[key]));
  const fieldsEmpty = list =>
    list.filter(item => getValues(item) === '').length > 0;

  return (
    <FormContext.Provider
      value={{
        register,
        errors,
        trigger,
        handleSubmit,
        setValue,
        setValues,
        getValues,
        control,
        unregister,
        // formState,
        fieldsEmpty,
      }}>
      {children}
    </FormContext.Provider>
  );
};

FormProvider.defaultProps = {
  initValues: {},
};

export default FormContext;
