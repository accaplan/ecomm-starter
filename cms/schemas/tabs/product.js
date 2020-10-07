import {
  product,
  ProductInfo,
  ProductConfigurations,
  ProductData,
} from "@tylermcrobert/sanity-schemas";

export default {
  ...product,

  fields: [
    //
    ...ProductInfo,
    ...ProductConfigurations(),
    ...ProductData,
  ],
};
