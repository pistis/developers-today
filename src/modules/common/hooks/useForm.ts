import { useEffect, useState } from 'react';

export interface IReturnUseForm<T> {
  values: T;
  errors: any;
  submitting: boolean;
  clear: () => void;
  handleChange: (event: React.ChangeEvent<any>) => void;
  handleSubmit: (event: React.FormEvent) => void;
  setValue: (name: string, value: any) => void;
  setValues: React.Dispatch<React.SetStateAction<T>>;
}

const useForm = <T>({
  initialValues,
  onSubmit,
  validate,
}: {
  initialValues: T;
  onSubmit: (values: T) => void;
  validate: (values: T) => any;
}): IReturnUseForm<T> => {
  const [values, setValues] = useState(initialValues);
  const setValue = (name: string, value: any) => {
    setValues({ ...values, [name]: value });
  };
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event: React.ChangeEvent<any>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    setSubmitting(true);
    event.preventDefault();
    await new Promise((r) => setTimeout(r, 500));
    setErrors(validate(values));
  };

  const clear = () => {
    setValues(initialValues);
  };

  const submit = async () => {
    try {
      await onSubmit(values);
      clear();
    } catch (e) {
      console.error(e); // TODO : ? 에러처리를 특별히 해야할까?
    }
  };
  useEffect(() => {
    if (submitting) {
      if (Object.keys(errors).length === 0) {
        submit();
      }
      setSubmitting(false);
    }
  }, [errors]);

  return {
    values,
    errors,
    submitting,
    clear,
    handleChange,
    handleSubmit,
    setValue,
    setValues,
  };
};

export default useForm;
