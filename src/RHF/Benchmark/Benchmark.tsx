import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';

type FormValues = {
  login: string;
  password: string;
  repeatPassword: string;
  name: string;
};

const FieldRegisterExample = () => {
  const [isShowForm, setIsShowForm] = useState(false);
  const [isShowFields, setIsShowFields] = useState(true);

  const { handleSubmit, register, formState } = useForm<FormValues>({
    defaultValues: Array.from({ length: 100 }).reduce<any>(
      (value, _, index) => ({
        ...value,
        [`index-${index}`]: `value-${index}`,
      }),
      {}
    ),
  });

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    console.log('values', values);
  };

  if (!isShowForm) {
    return (
      <button type="button" onClick={() => setIsShowForm(true)}>
        Show
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: 'grid', justifyContent: 'center' }}
    >
      {console.log('render rhf')}
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
      {isShowFields &&
        Array.from({ length: 100 }).map((_, index) => (
          <input
            key={`index-${index}`}
            {...register(`index-${index}` as any, {
              maxLength: { value: 5, message: 'Не меньше 5' },
              required: 'Обязательное поле',
            })}
            placeholder="Repeat password"
          />
        ))}
      <button type="submit">Submit</button>
      <button type="button" onClick={() => setIsShowForm(!isShowForm)}>
        {isShowForm ? 'Hide form' : 'Show form'}
      </button>
      {isShowForm && (
        <button type="button" onClick={() => setIsShowFields(!isShowFields)}>
          {isShowFields ? 'Hide fields' : 'Show fields'}
        </button>
      )}
    </form>
  );
};

export default FieldRegisterExample;
