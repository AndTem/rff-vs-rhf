// @ts-nocheck
/* eslint-disable */

import { useField, useForm, useFormState } from 'react-final-form';

type FormValues = {
  login: string;
  password: string;
  repeatPassword: string;
};

const TextField = () => {
  const { change } = useForm<FormValues>();

  const field = useField<FormValues['login']>('name', {
    subscription: { value: true, invalid: true, error: true },
  });

  field.input.value.map();

  change('login', true);

  return (
    <>
      <input {...field.input} />
      {field.meta.invalid && <p>{field.meta.error}</p>}
    </>
  );
};

const StateView = () => {
  const { submitFailed, submitError } = useFormState({
    subscription: { submitFailed: true, submitError: true },
  });

  return <>{submitFailed && <p>{submitError}</p>}</>;
};
