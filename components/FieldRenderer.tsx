import React, { ChangeEvent, useMemo } from "react";

import type { SchemaType } from "../schema/page";

interface FieldRendererProps {
  error: boolean;
  fieldName: string;
  formData: { [key: string]: string | boolean };
  handleInputChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  schema: SchemaType;
}

const FieldRenderer: React.FC<FieldRendererProps> = ({
  error = false,
  fieldName,
  formData,
  handleInputChange,
  schema,
}) => {
  const { conditionalRendering, placeholder, title, type } =
    schema.properties[fieldName];

  const shouldRender = useMemo(() => {
    if (!conditionalRendering) {
      return true;
    }

    return conditionalRendering(formData);
  }, [formData]);

  if (!shouldRender) {
    return null;
  }

  if (type === "string") {
    return (
      <div key={fieldName} className="mb-4">
        <label htmlFor={fieldName} className="block text-gray-700">
          {title}
        </label>
        <input
          type="text"
          id={fieldName}
          name={fieldName}
          onChange={handleInputChange}
          className="my-1 px-4 py-2 block w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder={placeholder || `Enter your ${fieldName}`}
        />
        {error && (
          <span className="mt-2 sm:text-sm text-red-600">
            This field is required.
          </span>
        )}
      </div>
    );
  }

  if (type === "text") {
    return (
      <div key={fieldName} className="mb-4">
        <label htmlFor={fieldName} className="block text-gray-700">
          {title}
        </label>
        <textarea
          id={fieldName}
          name={fieldName}
          rows={8}
          onChange={handleInputChange}
          className="my-1 px-4 py-2 block w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder={placeholder || `Enter your ${fieldName}`}
        ></textarea>
        {error && (
          <span className="sm:text-sm text-red-600">
            This field is required.
          </span>
        )}
      </div>
    );
  }

  if (type === "boolean") {
    return (
      <div key={fieldName} className="mb-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id={fieldName}
            name={fieldName}
            onChange={handleInputChange}
            className="my-1 mr-2 focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <label htmlFor={fieldName} className="block text-gray-700">
            {title}
          </label>
        </div>
        {error && (
          <span className="mt-2 sm:text-sm text-red-600">
            This field is required.
          </span>
        )}
      </div>
    );
  }

  // we don't support this input type
  return null;
};

export default FieldRenderer;
