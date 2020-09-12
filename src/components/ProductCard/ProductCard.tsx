import { AddToCartButton, useProduct } from "@tylermcrobert/shopify-react";
import React from "react";
import S from "./ProductCard.Styled";

const ProductCard = () => {
  const { product } = useProduct();
  console.log(product.vendor);

  return (
    <S.ProductCard>
      {product.title}
      <img src={product.images[0].src} />
      <AddToCartButton />
    </S.ProductCard>
  );
};

export default ProductCard;
