import styled from "styled-components";
import { LineItem as LineItemNode } from "@tylermcrobert/shopify-react";
import { size } from "style";

const Cart = styled.div<{ open: boolean }>`
  width: 100%;
  max-width: 30rem;
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  background: white;
  transform: translate3d(${(p) => (p.open ? 0 : "100%")}, 0, 0);
  transition: 200ms transform ease-out;
  padding: ${size[0]};
`;

const Shadow = styled.div<{ open: boolean }>`
  background: black;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  opacity: ${(p) => (p.open ? 0.2 : 0)};
  pointer-events: ${(p) => (p.open ? "all" : "none")};
  transition: 200ms opacity ease-out;
`;

const LineItem = styled(LineItemNode.Wrapper)`
  border: 1px solid blue;
  display: grid;
  grid-template-columns: 5rem 1fr;
`;

export default {
  Shadow,
  LineItem,
  Cart,
};
