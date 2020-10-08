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

        const matchingVariant = variants.find((variant) => {
          // Check each options and see if they both match 'newOptions'
          const variantMatches = variant.selectedOptions
            .map((variantCandidateOption) => {
              const hasMatch = newOptions.find(
                (newOption) =>
                  newOption.categoryName ===
                    variantCandidateOption.categoryName &&
                  newOption.value === variantCandidateOption.value
              );

              return hasMatch;
            })
            .filter((a) => a);

          const isMatch = variantMatches.length === newOptions.length;
          return isMatch ? variant : null;
        });

        return {
          ...state,
          currentVariant: matchingVariant || state.currentVariant,
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

  return {
    dispatch,
    productState,
  };
};
