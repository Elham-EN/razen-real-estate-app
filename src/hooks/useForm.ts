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

  //In this case, it creates a copy of the previous form data object, updates
  //the value of the specified field, and returns the updated form data object.
  //This ensures that the state is updated in an immutable way, avoiding any
  //side effects.
  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prevFormData) => {
      // create a copy of the previous form data
      const newFormData = { ...prevFormData };
      // update the value of the field
      newFormData[field] = value;
      // return the updated form data
      return newFormData;
    });
  };

  return [formData, handleChange];
}

/**
 * When I say that the state is updated in an immutable way, I mean
 * that the state is not modified directly, but rather a new copy of
 * the state is created with the necessary changes. This approach
 * ensures that the previous state remains unchanged, which can help
 * prevent unexpected side effects in your code.
 *
 * By using an immutable approach, when you update the state, you
 * create a new copy of the state with the changes, rather than directly
 * modifying the original state. This approach allows you to maintain
 * the previous state and avoid any side effects.
 */
