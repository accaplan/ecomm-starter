import { Action, SetQuantity } from "./useProductState";
import { Dispatch } from "react";
import { ProductSchemaOptionMeta } from "sanity-shopify-toolkit";

export const productHelpers = (dispatch: Dispatch<Action>) => {
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

  const addProductToCart = () => {
    // if (productState.currentVariant.available) {
    //   addToCart(productState.currentVariant.id, productState.quantity);
    // }
  };

  return { setQuantity, setOptions, addProductToCart };
};
