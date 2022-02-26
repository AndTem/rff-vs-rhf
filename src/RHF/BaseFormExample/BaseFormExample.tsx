import {
  FormProvider,
  SubmitHandler,
  UseFormProps,
  UseFormReturn,
  useForm,
  useFormContext,
} from 'react-hook-form';
import { ReactNode } from 'react';

type FormProps<Values extends object> = {
  children: (props: UseFormReturn<Values>) => ReactNode;
  onSubmit: SubmitHandler<Values>;
} & UseFormProps<Values>;

const Form = <Values extends object>({
  children,
  onSubmit,
  ...props
}: FormProps<Values>) => {
  const methods = useForm(props);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children(methods)}</form>
    </FormProvider>
  );
};

const TextField = ({ name }: { name: string }) => {
  const { register } = useFormContext();

  return <input {...register(name)} />;
};

type FormValues = {
  login: string;
  password: string;
};

const BaseFormHooksExample = () => {
  const handleSubmit = (values: FormValues) => {
    console.log('values');
  };

  return (
    <Form onSubmit={handleSubmit}>
      {() => (
        <>
          <TextField name="login" />
          <TextField name="password" />
        </>
      )}
    </Form>
  );
};

export default BaseFormHooksExample;
