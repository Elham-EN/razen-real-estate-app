import { useState } from "react";

interface FormData {
  fullname: string;
  email: string;
  password: string;
}

const initialFormData: FormData = {
  fullname: "",
  email: "",
  password: "",
};

/**
 * A Custom hook function that returns an array of two element, the first one is an
 * object of type FormData and the second one is a function that takes two parameters
 * "key" and "value". This function will be used to update the values of the props of
 * formData Object
 */
export default function useForm(): [
  FormData,
  (key: keyof FormData, value: string) => void
] {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleChange = (key: keyof FormData, value: string) => {
    //Spreading the existing props of formData into new object, add new key
    //value pair or update the existing key value pair in the formData object
    setFormData({ ...formData, [key]: value });
  };

  return [formData, handleChange];
}
