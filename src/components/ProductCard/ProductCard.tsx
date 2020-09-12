import { AddToCartButton, useProduct } from "@tylermcrobert/shopify-react";
import React from "react";
import S from "./ProductCard.Styled";

const ProductCard = () => {
  const { product } = useProduct();

  const image = product.images && product.images[0]?.src;

  return (
    <S.ProductCard>
      {product.title}
      {image && <img src={image} />}
      <AddToCartButton />
    </S.ProductCard>
  );
};

export default ProductCard;
