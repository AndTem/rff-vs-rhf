import { useField, useFormState } from 'react-final-form';

const TextField = ({ name }: { name: string }) => {
  const field = useField(name, {
    subscription: { value: true, invalid: true, error: true },
  });

  return (
    <>
      <input {...field.input} />
      {field.meta.invalid && <p>{field.meta.error}</p>}
    </>
  );
};

const StateView = () => {
  const { submitFailed, submitError } = useFormState({
    subscription: { submitFailed: true, submitError: true },
  });

  return <>{submitFailed && <p>{submitError}</p>}</>;
};
