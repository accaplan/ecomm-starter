import {
  product,
  ProductInfo,
  ProductConfigurations,
  ProductData,
} from "sanity-shopify-toolkit";

export default {
  ...product,

  fields: [
    //
    ...ProductInfo,
    ...ProductConfigurations(),
    ...ProductData,

    {
      type: "seo",
      name: "seo",
    },
  ],
};
