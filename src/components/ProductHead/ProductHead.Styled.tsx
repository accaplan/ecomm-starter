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

    li {
      text-align: center;
      padding: ${size[0]};
    }
  }
`;

const InputWrap = styled.li<{ selected: boolean }>`
  background: ${(p) => p.selected && color.primary};
  color: ${(p) => p.selected && "white"};
  cursor: pointer;
  display: block;

  input[type="radio"] {
    display: none;
  }
`;

export default {
  ProductOptions,
  InputWrap,
  AddToCart,
  ProductHead,
};
