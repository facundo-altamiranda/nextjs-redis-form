import { SchemaType } from "../schema/page";

const validateForm = (
  required: SchemaType["required"],
  formData: { [key: string]: string | boolean }
) => {
  let isValid = true;

  const errors: { [key: string]: boolean } = required.reduce(
    (formErrors, formField) => {
      const fieldValue = formData[formField];

      if (!fieldValue) {
        isValid = false;

        return { ...formErrors, ...{ [formField]: true } };
      }

      return formErrors;
    },
    {}
  );

  return {
    errors,
    isValid,
  };
};

export default validateForm;
