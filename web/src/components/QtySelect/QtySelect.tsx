import { QtySelector } from "@tylermcrobert/shopify-react";
import React from "react";
import S from "./QtySelect.Styled";

const QtySelect: typeof QtySelector = (props) => {
  return <S.QtySelect {...props} />;
};

export default QtySelect;
