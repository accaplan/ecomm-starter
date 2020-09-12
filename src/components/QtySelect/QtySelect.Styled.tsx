import { QtySelector } from "@tylermcrobert/shopify-react";
import { size } from "style";
import styled from "styled-components";

const QtySelect = styled(QtySelector)`
  border: 1px solid blue;
  display: inline-block;
  border-radius: 9999px;
  padding: 0 ${size[0]};

  span {
    padding: 0 calc(${size[0]} / 2);
  }
`;

export default {
  QtySelect,
};
