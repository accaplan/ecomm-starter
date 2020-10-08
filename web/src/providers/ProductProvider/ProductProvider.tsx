import {
  ProductSchemaVariant,
  ProductSchemaOptionMeta,
} from "sanity-shopify-toolkit";
import React, { createContext, useContext } from "react";
import { ProductSchema } from "types";
import { ProductState, SetQuantity, useProductState } from "./useProductState";
import { useCart } from "@tylermcrobert/shopify-react";

const ProductContext = createContext<{
  cmsProduct: ProductSchema;
  productState: ProductState;
  setQuantity: SetQuantity;
  setOptions: (options: ProductSchemaOptionMeta) => void;
  addToCart: () => void;
}>({
  cmsProduct: (null as unknown) as ProductSchema,
  productState: {
    quantity: 1,
    currentVariant: (null as unknown) as ProductSchemaVariant,
  },
  setQuantity: () => null,
  setOptions: () => null,
  addToCart: () => null,
});

export const useProduct = () => useContext(ProductContext);

export const ProductProvider: React.FC<{
  cmsProduct: ProductSchema;
}> = ({ children, cmsProduct }) => {
  const { addToCart: addProduct } = useCart();
  const { productState, dispatch } = useProductState(cmsProduct);

  /**
   * Add current variant/qty to cart
   */
  const addToCart = () => {
    const data = JSON.parse(productState.currentVariant.data);
    const formattedVariant = btoa(data.admin_graphql_api_id);
    addProduct(formattedVariant, productState.quantity);
  };

  /**
   * Set product quantity
   * @param quantity Desired quantity
   */
  const setQuantity: SetQuantity = (quantity) =>
    dispatch({ type: "changeQuantity", quantity });

  /**
   * Change variant based on options
   */
  const setOptions = (options: ProductSchemaOptionMeta) => {
    dispatch({ type: "changeOptions", options });
  };

  return (
    <ProductContext.Provider
      value={{ addToCart, cmsProduct, productState, setQuantity, setOptions }}
    >
      {children}
    </ProductContext.Provider>
  );
};
