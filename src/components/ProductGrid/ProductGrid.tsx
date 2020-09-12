import React from "react";
import S from "./ProductGrid.Styled";

const ProductGrid: React.FC = ({ children }) => {
  return <S.ProductGrid>{children}</S.ProductGrid>;
};

export default ProductGrid;
