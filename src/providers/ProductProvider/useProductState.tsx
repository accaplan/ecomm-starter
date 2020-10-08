import {
  ProductSchemaBase,
  ProductSchemaVariant,
} from "sanity-shopify-toolkit";
import { useReducer } from "react";

export type ProductState = {
  currentVariant: ProductSchemaVariant;
  quantity: number;
};

export type SetQuantity = (qty: number) => void;
export type SetOptionPayload = { categoryName: string; variantName: string };

export type Action =
  | { type: "changeOptions"; options: any }
  | { type: "changeQuantity"; quantity: number }
  | { type: "resetDefault" };

export const useProductState = (product: ProductSchemaBase) => {
  const { variants } = product.options;

  const productReducer = (
    state: ProductState,
    action: Action
  ): ProductState => {
    switch (action.type) {
      case "changeOptions":
        return {
          ...state,
          // currentVariant: client.product.helpers.variantForOptions(
          //   product,
          //   action.options
          // ),
        };
      case "resetDefault":
        return { ...state, quantity: 1, currentVariant: variants[0] };
      case "changeQuantity":
        return { ...state, quantity: action.quantity };

      default:
        return state;
    }
  };

  const [productState, dispatch] = useReducer(productReducer, {
    quantity: 1,
    currentVariant: variants[0],
  });

  /**
   * Set product quantity
   * @param quantity Desired quantity
   */
  const setQuantity: SetQuantity = (quantity) =>
    dispatch({ type: "changeQuantity", quantity });

  /**
   * Change variant based on options
   */
  const setOptions = ({ categoryName, variantName }: SetOptionPayload) => {
    // eslint-disable-next-line no-console
    console.log({ [categoryName]: variantName });

    // const current = productState.currentVariant.selectedOptions.reduce(
    //   (acc, option) => ({ ...acc, [option.name]: option.value }),
    //   {}
    // );
    // dispatch({ type: "changeOptions", options: { ...current, ...options } });
  };

  const addProductToCart = () => {
    // if (productState.currentVariant.available) {
    //   addToCart(productState.currentVariant.id, productState.quantity);
    // }
  };

  return {
    setOptions,
    dispatch,
    productState,
    setQuantity,
    addProductToCart,
  };
};
