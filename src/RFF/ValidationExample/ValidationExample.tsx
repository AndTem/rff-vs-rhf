import { Field, Form } from 'react-final-form';
import createDecorator from 'final-form-focus';

type FormValues = {
  login: string;
  password: string;
  repeatPassword: string;
  isInvalidLogin: boolean;
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

const loginValidate = (
  value: string | undefined,
  values: any
): string | null => {
  if (values.isInvalidLogin) {
    return 'Такой login уже есть';
  }

  return null;
};

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
          style={{ display: 'grid', justifyContent: 'center', gap: '16px' }}
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
          <button
            type="button"
            onClick={() => {
              setTimeout(() => {
                formProps.form.change('isInvalidLogin', true);
              }, 2000);
            }}
          >
            Verify Login
          </button>
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
