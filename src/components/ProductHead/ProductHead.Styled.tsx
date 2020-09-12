import styled from "styled-components";
import { size } from "style";

const ProductHead = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${size[0]};
`;

export default {
  ProductHead,
};
