import { ProductSchemaVariant } from "@tylermcrobert/sanity-schemas";
import React, { createContext, useContext } from "react";
import { ProductSchema } from "types";
import { ProductState, SetQuantity, useProductState } from "./useProductState";

const ProductContext = createContext<{
  cmsProduct: ProductSchema;
  productState: ProductState;
  setQuantity: SetQuantity;
}>({
  cmsProduct: (null as unknown) as ProductSchema,
  productState: {
    quantity: 1,
    currentVariant: (null as unknown) as ProductSchemaVariant,
  },
  setQuantity: () => null,
});

export const useProduct = () => useContext(ProductContext);

export const ProductProvider: React.FC<{
  cmsProduct: ProductSchema;
}> = ({ children, cmsProduct }) => {
  const { productState, setQuantity } = useProductState(
    cmsProduct.options.variants
  );

  return (
    <ProductContext.Provider value={{ cmsProduct, productState, setQuantity }}>
      {children}
    </ProductContext.Provider>
  );
};
