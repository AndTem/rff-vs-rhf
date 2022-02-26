import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';

type FormValues = {
  login: string;
  password: string;
};

const BaseFormHooksExample = () => {
  const { register, handleSubmit, formState } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    console.log('values');
  };

  const onSubmitError: SubmitErrorHandler<FormValues> = ({
    login,
    password,
  }) => {
    console.log(login, password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onSubmitError)}>
      <input {...register('login')} />
      <input {...register('password')} type="password" />
      {!formState.isValid && <p>Is valid!</p>}
    </form>
  );
};

export default BaseFormHooksExample;
