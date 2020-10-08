import {
  ProductSchemaVariant,
  ProductSchemaOptionMeta,
} from "sanity-shopify-toolkit";
import React, { createContext, useContext } from "react";
import { ProductSchema } from "types";
import { ProductState, SetQuantity, useProductState } from "./useProductState";

const ProductContext = createContext<{
  cmsProduct: ProductSchema;
  productState: ProductState;
  setQuantity: SetQuantity;
  setOptions: (options: ProductSchemaOptionMeta) => void;
}>({
  cmsProduct: (null as unknown) as ProductSchema,
  productState: {
    quantity: 1,
    currentVariant: (null as unknown) as ProductSchemaVariant,
  },
  setQuantity: () => null,
  setOptions: () => null,
});

export const useProduct = () => useContext(ProductContext);

export const ProductProvider: React.FC<{
  cmsProduct: ProductSchema;
}> = ({ children, cmsProduct }) => {
  const { productState, setQuantity, setOptions } = useProductState(cmsProduct);

  return (
    <ProductContext.Provider
      value={{ cmsProduct, productState, setQuantity, setOptions }}
    >
      {children}
    </ProductContext.Provider>
  );
};
