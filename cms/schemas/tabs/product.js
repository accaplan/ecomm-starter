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

    {
      name: "shopify",
      type: "object",
      fields: [
        {
          name: "productId",
          type: "number",
          readOnly: true,
        },
        {
          name: "title",
          type: "string",
          readOnly: true,
        },
        {
          name: "defaultPrice",
          type: "string",
          readOnly: true,
        },
        {
          name: "defaultVariant",
          type: "object",
          fields: [
            {
              name: "barcode",
              type: "string",
              readOnly: true,
            },
            {
              name: "inventoryPolicy",
              type: "string",
              readOnly: true,
            },
            {
              name: "inventoryQuantity",
              type: "number",
              readOnly: true,
            },
            {
              name: "price",
              type: "string",
              readOnly: true,
            },
            {
              name: "sku",
              type: "string",
              readOnly: true,
            },
            {
              name: "taxable",
              type: "boolean",
              readOnly: true,
            },
            {
              name: "title",
              type: "string",
              readOnly: true,
            },
            {
              name: "variantId",
              type: "number",
              readOnly: true,
            },
          ],
        },
        {
          name: "variants",
          type: "array",
          readOnly: true,
          of: [
            {
              type: "reference",
              to: { type: "productVariant" },
            },
          ],
        },
      ],
    },
  ],
};
