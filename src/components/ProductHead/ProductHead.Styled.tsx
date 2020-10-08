import styled from "styled-components";
import { color, size } from "style";
import { AddToCartButton } from "@tylermcrobert/shopify-react";

const ProductHead = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${size[0]};
`;

const AddToCart = styled(AddToCartButton)<{ unavailable: boolean }>`
  color: white;
  padding: ${size.xs} ${size[0]};
  border-radius: 555px;
  background: ${(p) => (p.unavailable ? "gray" : color.primary)};
`;

const ProductOptions = styled.div`
  margin: ${size[0]} 0;
  cursor: pointer;

  ul {
    display: flex;
  }
`;

const InputWrap = styled.li<{ selected: boolean }>`
  input[type="radio"] {
    display: none;

    &:checked + label {
      background: ${color.primary};
      color: white;
    }
  }
  label {
    cursor: pointer;
    padding: ${size.sm} ${size[0]};
    display: inline-block;
    border-radius: 999px;
  }
`;

export default {
  ProductOptions,
  InputWrap,
  AddToCart,
  ProductHead,
};
