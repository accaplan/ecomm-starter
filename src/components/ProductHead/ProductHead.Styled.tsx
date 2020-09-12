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

export default {
  AddToCart,
  ProductHead,
};
