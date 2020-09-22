export default {
  type: "document",
  name: "productVariant",
  fields: [
    {
      name: "title",
      type: "string",
      readOnly: true,
    },

    {
      name: "shopify",
      type: "object",
      fields: [
        {
          name: "price",
          type: "string",
          readOnly: true,
        },
        {
          name: "productId",
          type: "number",
          readOnly: true,
        },

        {
          name: "sku",
          type: "string",
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
        {
          name: "variantTitle",
          type: "string",
          readOnly: true,
        },
      ],
    },
  ],
};

/**
 *   "main": {
    "title": "ADIDAS | CLASSIC BACKPACK Auto renew"
  },
  "shopify": {
    "price": "56.00",
    "productId": 4895391219844444,
    "sku": "AD-03-black-OS",
    "title": "ADIDAS | CLASSIC BACKPACK Auto renew",
    "variantId": 33649202299012,
    "variantTitle": "OS / black"
  }
}
 */
