export default {
  $schema: "http://json-schema.org/draft-07/schema#",
  type: "object",
  properties: {
    heading: {
      placeholder: "Enter the heading",
      title: "Heading",
      type: "string",
    },
    description: {
      placeholder: "Enter the description",
      title: "Description",
      type: "string",
    },
    primaryButtonText: {
      placeholder: "Enter the primary button text",
      title: "Primary Button Text",
      type: "string",
    },
    secondaryButtonText: {
      placeholder: "Enter the secondary button text",
      title: "Secondary Button Text",
      type: "string",
    },
    truncateDescription: {
      conditionalRendering: (formData) =>
        formData["description"] && formData["description"].length >= 100,
      title: "Truncate Description",
      type: "boolean",
    },
  },
  required: [
    "heading",
    "description",
    "primaryButtonText",
    "secondaryButtonText",
  ],
};

export type SchemaType = {
  type: string;
  properties: {
    [key: string]: {
      conditionalRendering?: (formData: {
        [key: string]: string | boolean;
      }) => boolean;
      placeholder?: string;
      title: string;
      type: string;
    };
  };
  required: string[];
};
