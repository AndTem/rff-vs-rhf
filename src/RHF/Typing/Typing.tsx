// @ts-nocheck
/* eslint-disable */

import { useController, useForm, useWatch } from 'react-hook-form';

type FormValues = {
  login: string;
  password: string;
  repeatPassword: string;
};

const TypingExample = () => {
  const { handleSubmit, control, formState, watch, setValue } =
    useForm<FormValues>();

  const { fieldState } = useController({
    name: 'repeatPasword',
    control,
  });

  // context
  const login = useController<FormValues>({
    name: 'login',
  });

  const onSubmit = (values: FormValues) => {
    console.log('values');
  };

  const loginValue = watch('login');

  loginValue.map();

  const loginValue2 = useWatch({ name: 'login', control });

  setValue('login', false);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {formState.isSubmitSuccessful && <p>Success</p>}
      {fieldState.invalid && <p>{fieldState.error?.message}</p>}
      {loginValue}
    </form>
  );
};

export default TypingExample;
