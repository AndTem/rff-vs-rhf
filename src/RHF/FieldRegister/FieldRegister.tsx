import { Controller, useController, useForm } from 'react-hook-form';

type FormValues = {
  login: string;
  password: string;
  repeatPassword: string;
};

const FieldRegisterExample = () => {
  const { register, handleSubmit, control } = useForm<FormValues>();

  const { field, fieldState } = useController({
    name: 'repeatPassword',
    control,
  });

  const onSubmit = (values: FormValues) => {
    console.log('values');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('login')} />
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value, name, ref } }) => (
          <input
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            name={name}
            ref={ref}
          />
        )}
      />
      <input {...field} />
      {fieldState.invalid && <p>fieldState.error?.message</p>}
    </form>
  );
};

export default FieldRegisterExample;
