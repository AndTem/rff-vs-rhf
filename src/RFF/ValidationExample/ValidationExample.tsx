import { Field, Form } from 'react-final-form';
import createDecorator from 'final-form-focus';

type FormValues = {
  login: string;
  password: string;
  repeatPassword: string;
};

const focusOnErrors = createDecorator();

const compose =
  (...validators: any) =>
  (...args: any) => {
    return validators.reduce(
      (error: any, validator: any) => error || validator(...args),
      null
    );
  };

const isRequiredRule = (value?: string): string | null =>
  value ? null : 'Обязательное поле';

const minLenRule = (value?: string): string | null =>
  value ? null : 'Обязательное поле';

const repeatPasswordRule = (
  value: string | undefined,
  values?: FormValues
): string | null => (values?.password === value ? null : 'Invalid');

const loginValidate = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve('Такой login уже есть');
    }, 2000);
  });

const FieldRegisterExample = () => {
  const handleSubmit = (values: FormValues) => {
    console.log(values);

    return { login: 'Такой login уже есть' };
  };

  return (
    <Form<FormValues>
      onSubmit={handleSubmit}
      decorators={[focusOnErrors as any]}
    >
      {(formProps) => (
        <form
          onSubmit={formProps.handleSubmit}
          style={{ display: 'grid', justifyContent: 'center' }}
        >
          <Field<FormValues['login']>
            name="login"
            validate={compose(loginValidate, isRequiredRule)}
          >
            {({ input, meta }) => (
              <>
                <input {...input} placeholder="Login" />
                {meta.submitError ||
                  (meta.invalid && meta.touched && <p>{meta.error}</p>)}
              </>
            )}
          </Field>
          <Field<FormValues['password']>
            name="password"
            validate={compose(isRequiredRule, minLenRule)}
          >
            {({ input, meta }) => (
              <>
                <input {...input} placeholder="Password" />
                {meta.submitError ||
                  (meta.invalid && meta.touched && <p>{meta.error}</p>)}
              </>
            )}
          </Field>
          <Field<FormValues['repeatPassword']>
            name="repeatPassword"
            validate={compose(repeatPasswordRule, isRequiredRule, minLenRule)}
          >
            {({ input, meta }) => (
              <>
                <input {...input} placeholder="Repeat password" />
                {meta.submitError ||
                  (meta.invalid && meta.touched && <p>{meta.error}</p>)}
              </>
            )}
          </Field>
          <button type="submit">Submit</button>
        </form>
      )}
    </Form>
  );
};

export default FieldRegisterExample;
