import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect } from 'react';

type FormValues = {
  login: string;
  password: string;
  repeatPassword: string;
  name: string;
};

const FieldRegisterExample = () => {
  const { handleSubmit, watch, setError, register, trigger, formState } =
    useForm<FormValues>({ mode: 'onTouched' });

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    console.log('values', values);
  };

  const [passwordValue, repeatPasswordValue, loginValue] = watch([
    'password',
    'repeatPassword',
    'login',
  ]);

  useEffect(() => {
    if (loginValue?.length > 2) {
      setTimeout(() => {
        setError('login', { message: 'Логин занят' });
      }, 2000);
    }
  }, [loginValue]);

  useEffect(() => {
    if (repeatPasswordValue) {
      trigger('repeatPassword');
    }
  }, [passwordValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: 'grid', justifyContent: 'center' }}
    >
      <input
        {...register('login', {
          required: 'Обязательное поле',
        })}
        placeholder="Login"
      />
      {formState.errors.login?.message && (
        <p>{formState.errors.login?.message}</p>
      )}
      <input
        {...register('password', {
          maxLength: { value: 5, message: 'Не меньше 5' },
          required: 'Обязательное поле',
        })}
        placeholder="Password"
      />
      {formState.errors.password?.message && (
        <p>{formState.errors.password?.message}</p>
      )}
      <input
        {...register('repeatPassword', {
          maxLength: { value: 5, message: 'Не меньше 5' },
          required: 'Обязательное поле',
          validate: (value) =>
            passwordValue === value ? undefined : 'Invalid',
        })}
        placeholder="Repeat password"
      />
      {formState.errors.repeatPassword?.message && (
        <p>{formState.errors.repeatPassword?.message}</p>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

export default FieldRegisterExample;
