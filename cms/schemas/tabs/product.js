import {
  product,
  ProductInfo,
  ProductConfigurations,
} from "@tylermcrobert/sanity-schemas";

export default {
  ...product,

  fields: [
    ...ProductInfo,
    ...ProductConfigurations(),

    {
      name: "data",
      title: "Shopify Data",
      type: "object",
      readOnly: true,
      options: {
        collapsable: true,
      },
      fields: [
        {
          type: "string",
          name: "price",
        },
      ],
    },
  ],
};
