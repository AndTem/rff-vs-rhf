import { useController, useForm } from 'react-hook-form';

type FormValues = {
  login: string;
  password: string;
  repeatPassword: string;
};

const FieldRegisterExample = () => {
  const { handleSubmit, control, formState, watch } = useForm<FormValues>();

  const { fieldState } = useController({
    name: 'repeatPassword',
    control,
  });

  const onSubmit = (values: FormValues) => {
    console.log('values');
  };

  const loginValue = watch('login');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {formState.isSubmitSuccessful && <p>Success</p>}
      {fieldState.invalid && <p>{fieldState.error?.message}</p>}
      {loginValue}
    </form>
  );
};

export default FieldRegisterExample;
