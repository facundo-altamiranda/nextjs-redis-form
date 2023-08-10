import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";

import FieldRenderer from "./FieldRenderer";
import type { SchemaType } from "../schema/page";
import validateForm from "../utils/validateForm";

interface FormProps {
  schema: SchemaType;
}

const Form: React.FC<FormProps> = ({ schema }) => {
  const { push } = useRouter();
  const [redisError, setRedisError] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: boolean } | {}>(
    {}
  );
  const [formData, setFormData] = useState<{ [key: string]: string | boolean }>(
    {}
  );

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = event.target;
    const fieldValue =
      type === "checkbox" ? (event.target as HTMLInputElement).checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: fieldValue,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { errors, isValid } = validateForm(schema.required, formData);

    if (!isValid) {
      setFormErrors(errors);
      return;
    }

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setRedisError(false);
        push("/site");
      }
    } catch (error) {
      setRedisError(true);
    } finally {
      setFormErrors({});
    }
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      {!!redisError && (
        <div
          className="mb-4 rounded-lg bg-red-100 p-6 text-base text-red-800"
          role="alert"
        >
          An error has occurred, please check again later.
        </div>
      )}
      {Object.keys(schema.properties).map((fieldName) => (
        <FieldRenderer
          error={formErrors && formErrors[fieldName]}
          fieldName={fieldName}
          formData={formData}
          handleInputChange={handleInputChange}
          key={fieldName}
          schema={schema}
        />
      ))}
      <div>
        <button
          type="submit"
          className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Form;
