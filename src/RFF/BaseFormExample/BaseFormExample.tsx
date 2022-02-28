import { Field, Form, useField, useForm } from 'react-final-form';
import { useEffect } from 'react';

type FormValues = {
  login: string;
  password: string;
};

const TextField = ({ name }: { name: string }) => {
  const field = useField(name);

  const { change } = useForm();

  useEffect(() => {
    change('example', 22);
  }, []);

  return <input {...field.input} />;
};

const BaseFormExample = () => {
  const handleSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <Form<FormValues> onSubmit={handleSubmit}>
      {(formProps) => (
        <form onSubmit={formProps.handleSubmit}>
          <Field<FormValues['login']> name="login">
            {({ input }) => <input {...input} />}
          </Field>
          <TextField name="password" />
        </form>
      )}
    </Form>
  );
};

export default BaseFormExample;
