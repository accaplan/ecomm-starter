import styled from "styled-components";
import { LineItem as LineItemNode } from "@tylermcrobert/shopify-react";

const Cart = styled.div<{ open: boolean }>`
  width: 100%;
  max-width: 30rem;
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  background: white;
  transform: translate3d(${(p) => (p.open ? 0 : "100%")}, 0, 0);
  transition: 200ms ease-out transform;
`;

const LineItem = styled(LineItemNode.Wrapper)`
  border: 1px solid blue;
  display: grid;
  grid-template-columns: 5rem 1fr;
`;

export default {
  LineItem,
  Cart,
};
