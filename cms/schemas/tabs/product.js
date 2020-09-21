export default {
  type: "document",
  name: "product",
  fields: [
    {
      name: "title",
      type: "string",
      description: "This is from Shopify and must be modified there",
      readOnly: true,
    },

    {
      name: "slug",
      type: "slug",
      readOnly: true,
      description: "This is from Shopify and must be modified there",
    },
  ],
};
