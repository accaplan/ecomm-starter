import {
  ProductSchemaBase,
  ProductSchemaVariant,
  ProductSchemaOptionMeta,
} from "sanity-shopify-toolkit";
import { useReducer } from "react";

export type ProductState = {
  currentVariant: ProductSchemaVariant;
  quantity: number;
};

export type SetQuantity = (qty: number) => void;

export type Action =
  | { type: "changeOptions"; options: ProductSchemaOptionMeta }
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
        const currentEnabledOptions = state.currentVariant.selectedOptions;
        const newOptions = currentEnabledOptions.map((option) =>
          option.categoryName === action.options.categoryName
            ? action.options
            : option
        );

        // eslint-disable-next-line no-console
        console.log(variants, newOptions);

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
  const setOptions = (options: ProductSchemaOptionMeta) => {
    dispatch({ type: "changeOptions", options });
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
