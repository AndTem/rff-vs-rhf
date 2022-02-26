import { Field, Form } from 'react-final-form';
import createDecorator from 'final-form-focus';
import { useState } from 'react';

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

const FieldRegisterExample = () => {
  const [isShowForm, setIsShowForm] = useState(false);
  const [isShowFields, setIsShowFields] = useState(true);

  const handleSubmit = (values: FormValues) => {
    console.log(values);

    return { login: 'Такой login уже есть' };
  };

  if (!isShowForm) {
    return (
      <button type="button" onClick={() => setIsShowForm(true)}>
        Show
      </button>
    );
  }

  return (
    <Form<FormValues>
      onSubmit={handleSubmit}
      decorators={[focusOnErrors as any]}
      initialValues={Array.from({ length: 100 }).reduce<any>(
        (value, _, index) => ({
          ...value,
          [`index-${index}`]: `value-${index}`,
        }),
        {}
      )}
    >
      {(formProps) => (
        <form
          onSubmit={formProps.handleSubmit}
          style={{ display: 'grid', justifyContent: 'center' }}
        >
          {console.log('render rff')}
          <Field<FormValues['login']> name="login" validate={isRequiredRule}>
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
          {isShowFields &&
            Array.from({ length: 100 }).map((_, index) => (
              <Field
                key={`index-${index}`}
                name={`index-${index}`}
                validate={compose(isRequiredRule, minLenRule)}
              >
                {({ input, meta }) => (
                  <>
                    <input {...input} placeholder="Repeat password" />
                    {meta.submitError ||
                      (meta.invalid && meta.touched && <p>{meta.error}</p>)}
                  </>
                )}
              </Field>
            ))}
          <button type="submit">Submit</button>
          <button type="button" onClick={() => setIsShowForm(!isShowForm)}>
            {isShowForm ? 'Hide form' : 'Show form'}
          </button>
          {isShowForm && (
            <button
              type="button"
              onClick={() => setIsShowFields(!isShowFields)}
            >
              {isShowFields ? 'Hide fields' : 'Show fields'}
            </button>
          )}
        </form>
      )}
    </Form>
  );
};

export default FieldRegisterExample;
